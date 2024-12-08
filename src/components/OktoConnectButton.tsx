'use client';
import { useOkto } from "okto-sdk-react";
import { OktoContextType } from "okto-sdk-react";

export default function OktoConnectButton() {
    const { showOnboardingModal } = useOkto() as OktoContextType;

    return (
        <button
            onClick={() => showOnboardingModal()}
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium
                hover:bg-primary/90 transition-all duration-200 
                flex items-center gap-2 shadow-sm"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
            Connect Wallet
        </button>
    )
}