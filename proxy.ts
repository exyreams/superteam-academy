/**
 * @fileoverview Internationalization middleware configuration.
 * Handles locale detection and redirection for Superteam Academy.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en|es|pt-br|hi|zh|fr|ru|ja)/:path*"],
};
