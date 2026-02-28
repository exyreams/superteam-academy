"use client";

import { UserSettings } from "@/lib/data/settings";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { linkSocial, useSession } from "@/lib/auth/client";
import { useState } from "react";
import bs58 from "bs58";
import { toast } from "sonner";

interface AccountSettingsProps {
	settings: UserSettings["account"];
}

export function AccountSettings({ settings }: AccountSettingsProps) {
	const { publicKey, signMessage } = useWallet();
	const { setVisible } = useWalletModal();
	const { data: sessionData } = useSession();
	const [isLinking, setIsLinking] = useState(false);

	const handleLinkWallet = async () => {
		if (!publicKey || !signMessage) {
			setVisible(true);
			return;
		}

		try {
			setIsLinking(true);
			const message = `Link this wallet to Superteam Academy: ${Date.now()}`;
			const messageBytes = new TextEncoder().encode(message);

			const signature = await signMessage(messageBytes);

			// We will create this endpoint in the custom plugin in the next step
			const res = await fetch("/api/auth/link/solana", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					publicKey: publicKey.toBase58(),
					signature: bs58.encode(signature),
					message: message,
				}),
			});

			if (!res.ok) throw new Error("Failed to link wallet");
			toast.success("Wallet linked successfully");
			window.location.reload();
		} catch (error) {
			toast.error(
				"Error linking wallet. Make sure it isn't already attached to another account.",
			);
		} finally {
			setIsLinking(false);
		}
	};

	const handleLinkOAuth = async (provider: "github" | "google") => {
		try {
			await linkSocial({
				provider,
				callbackURL: "/settings",
			});
		} catch (error) {
			toast.error(`Failed to initiate ${provider} link`);
		}
	};
	return (
		<div className="border border-border bg-bg-surface p-6 flex flex-col gap-5">
			<div className="border-b border-border pb-2 mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]">
				<i className="bi bi-shield-lock"></i> Account &amp; Auth
			</div>

			{/* Primary Email */}
			<div className="flex flex-col gap-1.5">
				<label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
					Primary Email
				</label>
				<input
					type="email"
					defaultValue={settings.email}
					className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
				/>
			</div>

			{/* Connected Wallets */}
			<div className="flex flex-col gap-1.5">
				<label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
					Connected Wallets
				</label>

				{/* Dynamic Display based on Session ID (which is the wallet address for now) */}
				<div className="flex items-center justify-between border border-border px-3 py-3">
					<span className="text-[10px] tracking-widest break-all mr-2">
						Solana {sessionData?.user?.id && `(${sessionData.user.id})`}
					</span>
					{sessionData?.user?.id ? (
						<span
							className="text-[10px] font-bold shrink-0"
							style={{ color: "#2D6A4F" }}
						>
							ACTIVE
						</span>
					) : (
						<button
							onClick={handleLinkWallet}
							disabled={isLinking}
							className="shrink-0 border border-ink-secondary bg-transparent px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base transition-colors disabled:opacity-50"
						>
							{isLinking ? "Linking..." : "Link"}
						</button>
					)}
				</div>
			</div>

			{/* OAuth Providers */}
			{/* Note: In a real implementation we would fetch the list of linked accounts from the session database. For this demo we use the UI shell structure but wire up the action buttons. */}
			<div className="flex flex-col gap-1.5">
				<label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
					OAuth Providers
				</label>
				{settings.oauthProviders.map((provider) => (
					<div
						key={provider.name}
						className="flex items-center justify-between border border-border px-3 py-3"
					>
						<span className="flex items-center gap-2">
							<i className={provider.icon}></i> {provider.name}
						</span>
						{provider.linked ? (
							<span className="text-[10px] font-bold tracking-widest">
								LINKED
							</span>
						) : (
							<button
								onClick={() =>
									handleLinkOAuth(
										provider.name.toLowerCase() as "github" | "google",
									)
								}
								className="border border-ink-secondary bg-transparent px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base transition-colors"
							>
								Link
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
