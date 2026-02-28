import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// Since we are developing locally, Next.js handles the base URL by default
});

export const { signIn, signUp, useSession, signOut } = authClient;
