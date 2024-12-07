'use client';
import Link from 'next/link';
import MobileNavbar from '@/components/mobile-navbar';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useEffect } from 'react';

export default function Navbar() {

    const wallet = useWallet()

    useEffect(() => {
        if (!wallet.connected) return;
        console.log('connected wallet name: ', wallet.name)
        console.log('account address: ', wallet.account?.address)
        console.log('account publicKey: ', wallet.account?.publicKey)
    }, [wallet.connected])

    return (
        <nav className="fixed w-full z-50 flex justify-between items-center py-4 px-4 border-b border-primary/10 bg-secondary/80">
            <Link href={'/'} className="flex items-center group">
                <h1 className="ml-2 text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                    Label.xyz
                </h1>
            </Link>
            <div className="hidden md:flex items-center gap-2">
                <div className="flex flex-row gap-x-6 mr-8">
                    <Link href={'/dashboard'} className={cn('text-primary', 'hover:text-primary/80', 'transition-colors')}>
                        Dashboard
                    </Link>
                    <Link href={'/play'} className={cn('text-primary', 'hover:text-primary/80', 'transition-colors')}>
                        Play and Earn
                    </Link>
                </div>
                <div>
                    <ConnectButton />
                </div>
            </div>
            <MobileNavbar />
        </nav>
    );
}