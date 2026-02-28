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
		enabled: false, // We use purely wallet signatures
	},
	socialProviders: {},
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
			},
		},
	],
});
