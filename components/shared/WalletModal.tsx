'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations("Wallet");

    const handleWalletClick = (walletName: WalletName) => {
        select(walletName);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-bg-base border-ink-secondary/20 dark:border-border">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold uppercase tracking-widest text-ink-primary">
                        {t("title")}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {wallets.map((wallet) => (
                        <Button
                            key={wallet.adapter.name}
                            variant="outline"
                            className="group w-full justify-start gap-4 h-14 rounded-none border border-ink-secondary/20 dark:border-border bg-transparent text-ink-primary hover:bg-ink-primary/5 hover:text-ink-primary hover:border-ink-primary/50 transition-all font-mono uppercase text-sm"
                            onClick={() => handleWalletClick(wallet.adapter.name)}
                        >
                            <img 
                                src={wallet.adapter.icon} 
                                alt={wallet.adapter.name} 
                                className="w-6 h-6" 
                            />
                            {wallet.adapter.name}
                            {wallet.readyState === 'Installed' && (
                                <span className="ml-auto text-[10px] text-ink-secondary bg-ink-secondary/10 px-2 py-0.5 rounded-full group-hover:bg-ink-primary/10 group-hover:text-ink-primary transition-colors">
                                    {t("detected")}
                                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
