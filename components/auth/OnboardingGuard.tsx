/**
 * @fileoverview Client-side onboarding guard.
 * Monitors the authenticated user's session and redirects them to the onboarding
 * flow if it hasn't been completed yet.
 */
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSession } from "@/lib/auth/client";

/**
 * Guard component that enforces onboarding completion.
 * Place this in the root layout to protect the entire application.
 */
export function OnboardingGuard() {
	const { data: session, isPending } = useSession();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (isPending) return;

		// If not logged in, we don't force onboarding (Auth Guard handles login)
		if (!session) return;

		// Explicitly type the user to include additional fields from Better Auth
		const user = session.user as typeof session.user & {
			onboardingCompleted?: boolean;
		};
		const onboardingCompleted = user?.onboardingCompleted;

		// If onboarding not completed and NOT on onboarding page, redirect
		if (onboardingCompleted === false && !pathname.includes("/onboarding")) {
			router.push("/onboarding");
		}
	}, [session, isPending, pathname, router]);

	return null;
}
