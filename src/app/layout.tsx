'use client'
import Navbar from "@/components/navbar";
import "./globals.css";
import '@suiet/wallet-kit/style.css';
import WalletProviderWrapper from '@/components/wallet-provider-wrapper';
import { OktoWalletProvider } from "@/components/OktoWalletProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <WalletProviderWrapper>
          <OktoWalletProvider>
            {children}
          </OktoWalletProvider>
        </WalletProviderWrapper>
      </body>
    </html>
  );
}
