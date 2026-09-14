'use client';

import React from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    audioEngine.playMechanicalClick();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 sm:py-16 bg-carbon border-t border-white/[0.06] text-xs text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#1c1c22] to-[#0d0d10] border border-white/15 flex items-center justify-center shadow-md">
            <span className="font-display text-sm font-black bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              E
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-crimson" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-offWhite tracking-tight">
              Elton D&apos;Mello
            </div>
            <div className="text-xs text-neutral-500 font-medium mt-0.5">
              Video Editor · Visual Storyteller · Colorist
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-neutral-500 font-normal">
          <span>© 2026 Elton D’Mello. Crafted with rhythm, pacing & cuts.</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => audioEngine.playHoverTick()}
          className="flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.02]"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
