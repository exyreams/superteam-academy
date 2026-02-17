'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// Removed Image import as we might not have next/image configured for external wallet icons, 
// using simple img or assumption that adapter provides icon URL.
// Actually adapter provides `adapter.icon`.

export interface WalletModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const WalletModal: FC<WalletModalProps> = ({ open, onOpenChange }) => {
    const { wallets, select, connect } = useWallet();

    const handleWalletClick = async (walletName: WalletName) => {
        select(walletName);
        try {
            await connect();
            // Connection happens async, but we can close modal or let the button handle it
            // Ideally wait for 'connecting' state?
            // Usually select() triggers connection if autoConnect is on, or we call connect().
            // But strict mode might require user interaction.
            // Let's just select and close.
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-bg-base border-ink-primary">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold uppercase tracking-widest text-ink-primary">
                        Connect Wallet
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {wallets.map((wallet) => (
                        <Button
                            key={wallet.adapter.name}
                            variant="outline"
                            className="w-full justify-start gap-4 h-14 rounded-none border border-ink-primary bg-transparent text-ink-primary hover:bg-ink-primary hover:text-bg-base transition-colors font-mono uppercase text-sm"
                            onClick={() => handleWalletClick(wallet.adapter.name)}
                        >
                            <img 
                                src={wallet.adapter.icon} 
                                alt={wallet.adapter.name} 
                                className="w-6 h-6" 
                            />
                            {wallet.adapter.name}
                            {wallet.readyState === 'Installed' && (
                                <span className="ml-auto text-[10px] text-ink-secondary bg-bg-base/50 px-2 py-0.5 rounded-full">
                                    DETECTED
                                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
