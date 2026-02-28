"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModal } from "@/components/shared/WalletModal";
import { Button } from "@/components/ui/button";
import bs58 from "bs58";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth/client";
import { GithubLogo, GoogleLogo, Wallet } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

export function AuthWalletButton() {
	const { publicKey, signMessage, disconnect } = useWallet();
	const t = useTranslations("Auth.walletButton");
	const [loading, setLoading] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	// If the wallet exists but there is no session, we prompt for signature
	const handleSignIn = async () => {
		if (!publicKey || !signMessage) {
			setModalOpen(true);
			return;
		}

		try {
			setLoading("wallet");
			const message = `Sign this message to authenticate with Superteam Academy: ${Date.now()}`;
			const messageBytes = new TextEncoder().encode(message);

			// Request signature from Phantom
			const signature = await signMessage(messageBytes);

			// Send to our Custom Better Auth Plugin
			const res = await fetch("/api/auth/sign-in/solana", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					publicKey: publicKey.toBase58(),
					signature: bs58.encode(signature),
					message: message,
				}),
			});

			if (!res.ok) throw new Error("Authentication failed");

			// Reload UI to fetch the new Better Auth session
			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error("Failed to authenticate wallet");
			disconnect(); // Clear the bad wallet state
		} finally {
			setLoading(null);
		}
	};

	const handleOAuthSignIn = async (provider: "github" | "google") => {
		try {
			setLoading(provider);
			await signIn.social({
				provider,
				callbackURL: "/",
			});
		} catch {
			toast.error(`Failed to sign in with ${provider}`);
			setLoading(null);
		}
	};

	return (
		<div className="flex flex-col w-full gap-3">
			{/* GitHub SignIn */}
			<Button
				variant="outline"
				onClick={() => handleOAuthSignIn("github")}
				disabled={loading !== null}
				className="w-full h-11 border-ink-secondary/20 bg-bg-surface hover:bg-ink-primary/5 text-ink-primary font-mono uppercase tracking-widest text-xs rounded-none transition-colors flex items-center justify-center gap-3"
			>
				{loading === "github" ? (
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
				) : (
					<div className="flex items-center gap-3">
						<GithubLogo className="w-5 h-5" />
						{t("github")}
					</div>
				)}
			</Button>

			{/* Google SignIn */}
			<Button
				variant="outline"
				onClick={() => handleOAuthSignIn("google")}
				disabled={loading !== null}
				className="w-full h-11 border-ink-secondary/20 bg-bg-surface hover:bg-ink-primary/5 text-ink-primary font-mono uppercase tracking-widest text-xs rounded-none transition-colors flex items-center justify-center gap-3"
			>
				{loading === "google" ? (
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
				) : (
					<div className="flex items-center gap-3">
						<GoogleLogo className="w-5 h-5" />
						{t("google")}
					</div>
				)}
			</Button>

			{/* Solana Wallet SignIn */}
			<Button
				onClick={handleSignIn}
				disabled={loading !== null}
				className="w-full h-11 bg-ink-primary text-bg-base hover:bg-ink-secondary font-mono uppercase tracking-widest text-xs rounded-none transition-colors flex items-center justify-center gap-3"
			>
				{loading === "wallet" ? (
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
				) : (
					<Wallet className="w-5 h-5" />
				)}
				{loading === "wallet"
					? t("authenticating")
					: publicKey
						? t("walletSignIn")
						: t("walletConnect")}
			</Button>

			<WalletModal open={modalOpen} onOpenChange={setModalOpen} />
		</div>
	);
}
