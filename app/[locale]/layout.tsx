import type { Metadata } from "next";
import { JetBrains_Mono, Barlow_Condensed } from "next/font/google";
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
};

import { ThemeProvider } from "@/components/theme-provider";
import { WalletContextProvider } from "@/components/providers/WalletContextProvider";
import { Toaster } from "@/components/ui/sonner";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
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
            <WalletContextProvider>{children}</WalletContextProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
