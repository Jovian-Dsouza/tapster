'use clent';
import { WalletProvider } from "@suiet/wallet-kit";

export default function WalletProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <WalletProvider>
            {children}
        </WalletProvider>
    );
}