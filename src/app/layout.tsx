/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Navbar from "@/components/navbar";
import { Poppins } from 'next/font/google';
import "./globals.css";
import '@suiet/wallet-kit/style.css';
import WalletProviderWrapper from '@/components/wallet-provider-wrapper';
import { OktoWalletProvider } from "@/components/OktoWalletProvider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
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

