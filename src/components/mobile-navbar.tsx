'use client';
import { AlignJustify } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ConnectButton } from '@suiet/wallet-kit';
import Link from 'next/link';


interface MobileNavbarProps {
    isConnected: boolean;

}

export default function MobileNavbar({  }: MobileNavbarProps) {
    return (
        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <AlignJustify />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="md:hidden space-y-2">
                    <DropdownMenuItem>
                        <Link href="/dashboard" className="text-primary hover:text-primary/80 transition-colors">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/play" className="text-primary hover:text-primary/80 transition-colors">
                            Play and Earn
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                       <ConnectButton/>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}