'use client';
import React from "react";
import Navbar from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
          {/* Add background grid here */}
        </div>
        <div className="max-w-7xl mx-auto px-4 flex min-h-screen w-full flex-col items-center flex-1 justify-center">
          <Hero />
        </div>
      </div>
    </main>
  );
}