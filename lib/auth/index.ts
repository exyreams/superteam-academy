import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthEndpoint } from "better-auth/plugins";
import { db } from "../db";
import nacl from "tweetnacl";
import bs58 from "bs58";

export const auth = betterAuth({
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
		// Custom Solana Credentials plugin
		{
			id: "solana-auth",
			endpoints: {
				signInSolana: createAuthEndpoint(
					"/sign-in/solana",
					{
						method: "POST",
					},
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					async (ctx: any) => {
						if (!ctx.request) {
							return new Response(JSON.stringify({ error: "No request" }), {
								status: 400,
							});
						}

						const body = await ctx.request.json();
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

							// Upsert User
							let userParams = await db.query.user.findFirst({
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								where: (users: any, { eq }: any) => eq(users.id, publicKey),
							});

							if (!userParams) {
								// Create new user linked to this pubkey
								userParams = await ctx.context.internalAdapter.createUser({
									id: publicKey,
									name: publicKey.slice(0, 4) + "..." + publicKey.slice(-4),
									email: `${publicKey}@solana.local`, // Dummy email since BA expects it
									emailVerified: true,
									role: "learner",
									createdAt: new Date(),
									updatedAt: new Date(),
								});
							}

							// Create session
							const session = await ctx.context.internalAdapter.createSession(
								userParams!.id,
								ctx.request,
							);

							return new Response(
								JSON.stringify({ user: userParams, session }),
								{ status: 200 },
							);
						} catch (error) {
							console.error(error);
							return new Response(
								JSON.stringify({ error: "Authentication failed" }),
								{ status: 500 },
							);
						}
					},
				),
				linkSolana: createAuthEndpoint(
					"/link/solana",
					{
						method: "POST",
					},
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					async (ctx: any) => {
						if (!ctx.request) {
							return new Response(JSON.stringify({ error: "No request" }), {
								status: 400,
							});
						}

						const body = await ctx.request.json();
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
							let currentSession = null;
							try {
								// Attempt to extract session from headers
								currentSession = await ctx.context.internalAdapter.getSession(
									ctx.request,
								);
							} catch (e) {
								/* ignore */
							}

							// If BA's internal lookup fails or isn't populated, we fallback to requesting it manually if possible, but let's assume it works here
							if (!currentSession && ctx.context.session) {
								currentSession = ctx.context.session;
							}

							// Check cookies if still null
							if (!currentSession) {
								// We have to rely on the client sending the auth cookie which BA parses.
								// If we get here it means the user isn't authenticated yet
								return new Response(
									JSON.stringify({ error: "Not authenticated" }),
									{ status: 401 },
								);
							}

							const userId = currentSession.session
								? currentSession.session.userId
								: currentSession.user?.id;

							if (!userId) {
								return new Response(
									JSON.stringify({ error: "Invalid session structure" }),
									{ status: 401 },
								);
							}

							// Create new account linking
							await ctx.context.internalAdapter.createAccount({
								userId: userId,
								providerId: "solana",
								accountId: publicKey,
								createdAt: new Date(),
								updatedAt: new Date(),
							});

							return new Response(JSON.stringify({ success: true }), {
								status: 200,
							});
						} catch (error) {
							console.error(error);
							return new Response(JSON.stringify({ error: "Linking failed" }), {
								status: 500,
							});
						}
					},
				),
			},
		},
	],
});
