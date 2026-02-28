"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import bs58 from "bs58";
import { useState } from "react";
import { toast } from "sonner";
import { Wallet } from "@phosphor-icons/react";

export function AuthWalletButton() {
	const { publicKey, signMessage, disconnect } = useWallet();
	const { setVisible } = useWalletModal();
	const [loading, setLoading] = useState(false);

	// If the wallet exists but there is no session, we prompt for signature
	const handleSignIn = async () => {
		if (!publicKey || !signMessage) {
			setVisible(true);
			return;
		}

		try {
			setLoading(true);
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
			setLoading(false);
		}
	};

	return (
		<Button
			onClick={handleSignIn}
			disabled={loading}
			className="bg-[#14F195] hover:bg-[#10c479] text-black font-semibold shadow-[0_0_15px_rgba(20,241,149,0.3)] transition-all duration-300"
		>
			<Wallet className="w-4 h-4 mr-2" />
			{loading
				? "Authenticating..."
				: publicKey
					? "Sign In to Academy"
					: "Connect Wallet"}
		</Button>
	);
}
