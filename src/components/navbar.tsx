"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import MobileNavbar from "./mobile-navbar";
import { Button } from "./ui/button";
import OktoConnectButton from './OktoConnectButton';



interface NavbarProps {
    className?: string;
}

export default function Navbar({ className }: NavbarProps) {
    const [active, setActive] = useState<string | null>(null);
    const wallet = useWallet()

    const createAccount = async (walletAddress: string) => {
        const res = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ walletAddress })
        })
        const data = await res.json()
        console.log('data:', data)
    }

    useEffect(() => {
        if (wallet.connected && wallet.account?.address) {
            createAccount(wallet.account?.address)
        };
    }, [wallet.connected])



    return (
        <div
            className={cn("fixed top-6 inset-x-0 mx-auto w-[70%] z-50", className)}
        >
            <nav
                onMouseLeave={() => setActive(null)}
                className="relative rounded-full border drop-shadow-xl border-slate-700 bg-white dark:border-none mx-auto shadow-input flex items-center justify-between px-4 md:px-8 py-2 md:py-4"
            >
                <Link href="/">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Tapster
                    </h1>
                </Link>
                <div className="hidden md:flex items-center gap-2">
                    <div className="flex flex-row gap-x-6 mr-8">
                        <Link href={'/dashboard'} className={cn('text-primary', 'hover:text-primary/80', 'transition-colors')}>
                            <Button variant={"link"}>
                                Dashboard
                            </Button>
                        </Link>
                        <Link href={'/play'} className={cn('text-primary', 'hover:text-primary/80', 'transition-colors')}>
                            <Button variant={"link"}> 
                                Play and Earn
                            </Button> 
                        </Link>
                    </div>
                    <div>
                        <div>
                            {process.env.NEXT_PUBLIC_ATTESTATION_TYPE === 'sui' ? <ConnectButton /> : <OktoConnectButton />}
                        </div>
                    </div>
                </div>
                <MobileNavbar />
            </nav>

        </div>
    );
}
