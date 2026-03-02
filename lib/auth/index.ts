/**
 * @fileoverview Better Auth server-side configuration.
 * Defines the authentication engine, user schema extensions, and custom Solana plugin endpoints.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sessionMiddleware } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { createAuthEndpoint } from "better-auth/plugins";
import { multiSession } from "better-auth/plugins/multi-session";
import bs58 from "bs58";
import crypto from "crypto";
import nacl from "tweetnacl";
import { db } from "../db";
import { wallet as walletTable } from "../db/schema";

/**
 * The core authentication server instance.
 * Handles database persistence via Drizzle and implements the Solana sign-in/link flow.
 */
export const auth = betterAuth({
	trustedOrigins: ["http://localhost:3000"],
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: "learner",
			},
			bio: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			location: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			github: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			twitter: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			website: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			language: {
				type: "string",
				required: false,
				defaultValue: "en",
			},
			publicVisibility: {
				type: "boolean",
				required: false,
				defaultValue: true,
			},
			notifications: {
				type: "string",
				required: false,
				defaultValue: JSON.stringify({
					newCourses: true,
					leaderboardAlerts: false,
					directMessages: true,
				}),
			},
			onboardingCompleted: {
				type: "boolean",
				required: false,
				defaultValue: false,
			},
			preferredTracks: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			avatarSeed: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			walletAddress: {
				type: "string",
				required: false,
				defaultValue: null,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		},
	},
	plugins: [
		multiSession(),
		// Custom Solana Credentials plugin
		{
			id: "solana",
			endpoints: {
				signInSolana: createAuthEndpoint(
					"/sign-in/solana",
					{
						method: "POST",
					},
					async (ctx) => {
						try {
							// BetterAuth consumes the request body stream, so ctx.request.json()
							// will fail. We need to get the body from ctx.body (populated by BA)
							// or parse it ourselves from the raw request.
							let publicKey: string | undefined;
							let signature: string | undefined;
							let message: string | undefined;

							const body = (
								ctx as {
									body?: {
										publicKey?: string;
										signature?: string;
										message?: string;
									};
								}
							).body;
							if (body) {
								publicKey = body.publicKey;
								signature = body.signature;
								message = body.message;
							} else if (ctx.request) {
								// Fallback: try to clone and parse
								try {
									const parsed = await ctx.request.clone().json();
									publicKey = parsed.publicKey;
									signature = parsed.signature;
									message = parsed.message;
								} catch {
									return new Response(
										JSON.stringify({ error: "Failed to parse request body" }),
										{ status: 400 },
									);
								}
							} else {
								return new Response(
									JSON.stringify({ error: "No request body" }),
									{ status: 400 },
								);
							}

							if (!publicKey || !signature || !message) {
								return new Response(
									JSON.stringify({ error: "Missing parameters" }),
									{ status: 400 },
								);
							}

							// Verify the signature
							const signatureUint8 = bs58.decode(signature!);
							const messageUint8 = new TextEncoder().encode(message!);
							const pubKeyUint8 = bs58.decode(publicKey!);

							const isValid = nacl.sign.detached.verify(
								messageUint8,
								signatureUint8,
								pubKeyUint8,
							);

							if (!isValid) {
								return new Response(
									JSON.stringify({ error: "Invalid signature" }),
									{ status: 401 },
								);
							}

							// Upsert User
							let userParams = undefined;

							// 1. Check if the wallet exists in our dedicated wallet table
							const existingWallet = await db.query.wallet.findFirst({
								where: (w, { eq }) => eq(w.address, publicKey),
							});

							if (existingWallet && existingWallet.userId) {
								const existingUser = await db.query.user.findFirst({
									where: (users, { eq }) => eq(users.id, existingWallet.userId),
								});
								if (existingUser) {
									userParams = existingUser;
								}
							}

							// 2. Check if the account exists in BetterAuth's account table
							if (!userParams) {
								const existingAccount = await db.query.account.findFirst({
									where: (accounts, { eq, and }) =>
										and(
											eq(accounts.providerId, "solana"),
											eq(accounts.accountId, publicKey),
										),
								});

								if (existingAccount) {
									const existingUser = await db.query.user.findFirst({
										where: (users, { eq }) =>
											eq(users.id, existingAccount.userId),
									});
									if (existingUser) {
										userParams = existingUser;
									}
								}
							}

							// 3. Fallback: Check by walletAddress field on user table
							if (!userParams) {
								const existingUser = await db.query.user.findFirst({
									where: (users, { eq }) => eq(users.walletAddress, publicKey),
								});
								if (existingUser) {
									userParams = existingUser;
								}
							}

							// 4. Fallback: Check if user exists with ID = publicKey (old behavior)
							if (!userParams) {
								const existingUser = await db.query.user.findFirst({
									where: (users, { eq }) => eq(users.id, publicKey),
								});
								if (existingUser) {
									userParams = existingUser;
								}
							}

							if (!userParams) {
								// Create new user linked to this pubkey
								const newUser = await ctx.context.internalAdapter.createUser({
									name: publicKey!.slice(0, 4) + "..." + publicKey!.slice(-4),
									email: `${publicKey}@solana.local`,
									emailVerified: true,
									role: "learner",
									avatarSeed: Math.random().toString(36).substring(2, 15),
									walletAddress: publicKey!,
									createdAt: new Date(),
									updatedAt: new Date(),
								});
								userParams = newUser;

								// Populate new wallet table
								await db.insert(walletTable).values({
									id: crypto.randomUUID(),
									address: publicKey,
									userId: userParams!.id,
									provider: "solana",
									isPrimary: true,
									createdAt: new Date(),
									updatedAt: new Date(),
								});

								// Create initial account record for Solana
								await ctx.context.internalAdapter.createAccount({
									userId: userParams!.id,
									providerId: "solana",
									accountId: publicKey,
									createdAt: new Date(),
									updatedAt: new Date(),
								});
							}

							// Create session
							const session = await ctx.context.internalAdapter.createSession(
								userParams!.id,
							);

							// Use BetterAuth's official setSessionCookie — this handles:
							// 1. Signed cookie with the app secret
							// 2. Session data cache cookie
							// 3. Registering the new session in context
							await setSessionCookie(ctx, {
								session,
								user: userParams!,
							});

							return ctx.json({ user: userParams, session });
						} catch (error) {
							console.error("[signInSolana] ERROR:", error);
							return new Response(
								JSON.stringify({
									error: "Authentication failed",
									details:
										error instanceof Error ? error.message : String(error),
								}),
								{ status: 500 },
							);
						}
					},
				),
				linkSolana: createAuthEndpoint(
					"/link/solana",
					{
						method: "POST",
						use: [sessionMiddleware],
					},
					async (ctx) => {
						if (!ctx.request) {
							return new Response(JSON.stringify({ error: "No request" }), {
								status: 400,
							});
						}

						const body = (await ctx.request.json()) as {
							publicKey: string;
							signature: string;
							message: string;
						};
						const { publicKey, signature, message } = body;

						if (!publicKey || !signature || !message) {
							return new Response(
								JSON.stringify({ error: "Missing parameters" }),
								{ status: 400 },
							);
						}

						try {
							// Verify the signature
							const signatureUint8 = bs58.decode(signature);
							const messageUint8 = new TextEncoder().encode(message);
							const pubKeyUint8 = bs58.decode(publicKey);

							const isValid = nacl.sign.detached.verify(
								messageUint8,
								signatureUint8,
								pubKeyUint8,
							);

							if (!isValid) {
								return new Response(
									JSON.stringify({ error: "Invalid signature" }),
									{ status: 401 },
								);
							}

							// Ensure user is logged in
							const currentSession = ctx.context.session;

							if (!currentSession) {
								return new Response(
									JSON.stringify({ error: "Not authenticated" }),
									{ status: 401 },
								);
							}

							const userId = currentSession.session.userId;

							if (!userId) {
								return new Response(
									JSON.stringify({ error: "Invalid session structure" }),
									{ status: 401 },
								);
							}

							const existingWallet = await db.query.wallet.findFirst({
								where: (wallets, { eq, and, ne }) =>
									and(
										eq(wallets.address, publicKey),
										ne(wallets.userId, userId),
									),
							});

							if (existingWallet) {
								return new Response(
									JSON.stringify({
										error: "Wallet already linked to another account",
									}),
									{ status: 400 },
								);
							}

							// 2. Link in Better Auth accounts table (if not already linked)
							try {
								const existingAccount = await db.query.account.findFirst({
									where: (accounts, { eq, and }) =>
										and(
											eq(accounts.providerId, "solana"),
											eq(accounts.accountId, publicKey),
										),
								});

								if (!existingAccount) {
									await ctx.context.internalAdapter.createAccount({
										userId: userId,
										providerId: "solana",
										accountId: publicKey,
										createdAt: new Date(),
										updatedAt: new Date(),
									});
								}
							} catch (e) {
								console.error("Account linking error (non-fatal):", e);
								// We continue because we still want to record it in our wallet table
							}

							// 3. Update user table with primary wallet if not set
							const currentUser = await db.query.user.findFirst({
								where: (users, { eq }) => eq(users.id, userId),
							});

							if (currentUser && !currentUser.walletAddress) {
								await ctx.context.internalAdapter.updateUser(userId, {
									walletAddress: publicKey,
								});
							}

							// 4. Populate/Update our dedicated wallet table
							await db
								.insert(walletTable)
								.values({
									id: crypto.randomUUID(),
									address: publicKey,
									userId: userId,
									provider: "solana",
									isPrimary: !currentUser?.walletAddress,
									createdAt: new Date(),
									updatedAt: new Date(),
								})
								.onConflictDoUpdate({
									target: [walletTable.address],
									set: {
										userId: userId,
										updatedAt: new Date(),
									},
								});

							return new Response(JSON.stringify({ success: true }), {
								status: 200,
							});
						} catch (error) {
							console.error("Solana Link Error:", error);
							return new Response(
								JSON.stringify({
									error:
										error instanceof Error ? error.message : "Linking failed",
								}),
								{ status: 500 },
							);
						}
					},
				),
			},
		},
	],
});
