/**
 * @fileoverview Root layout for localized routes.
 * Handles font loading, metadata, internationalization providers, and global guards.
 */
import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
	variable: "--font-barlow-condensed",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Superteam Academy",
	description:
		"The premier technical training ground for the next generation of Solana architects.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/favicon-light.svg",
				href: "/favicon-light.svg",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/favicon-dark.svg",
				href: "/favicon-dark.svg",
			},
		],
	},
	alternates: {
		languages: {
			en: "/en",
			es: "/es",
			"pt-br": "/pt-br",
			hi: "/hi",
			zh: "/zh",
			fr: "/fr",
			ru: "/ru",
			ja: "/ja",
		},
	},
};

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { OnboardingGuard } from "@/components/auth/OnboardingGuard";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { WalletContextProvider } from "@/components/providers/WalletContextProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${jetbrainsMono.variable} ${barlowCondensed.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<QueryProvider>
							<WalletContextProvider>
								<OnboardingGuard />
								{children}
							</WalletContextProvider>
						</QueryProvider>
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
