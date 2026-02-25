'use client';

import { FC, ReactNode, useMemo, useCallback, useEffect, useRef } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from "sonner";

// Import default styles
import '@solana/wallet-adapter-react-ui/styles.css';

const network = WalletAdapterNetwork.Devnet;

const WalletNotification = () => {
    const { connected, wallet } = useWallet();
    const prevConnected = useRef(false);

    useEffect(() => {
        if (connected && !prevConnected.current) {
            toast.success("Wallet Connected", {
                description: `Connected to ${wallet?.adapter.name}`,
            });
        } else if (!connected && prevConnected.current) {
            toast.info("Wallet Disconnected", {
                description: "You have disconnected your wallet.",
            });
        }
        prevConnected.current = connected;
    }, [connected, wallet]);

    return null;
};

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = useMemo(() => clusterApiUrl(network), []);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    const onError = useCallback((error: WalletError) => {
        console.error(error);
        toast.error("Wallet Error", {
            description: error.message ? error.message : "An unknown error occurred",
        });
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={onError}>
                <WalletModalProvider>
                    <WalletNotification />
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
