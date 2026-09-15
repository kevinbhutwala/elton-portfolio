'use client';

import React from 'react';
import { clientLogos } from '@/data/portfolioData';

export default function MarqueeTrust() {
  return (
    <section className="py-14 bg-obsidian/40 backdrop-blur-[2px] border-t border-b border-white/[0.06] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Selected Collaborations & Studios
        </span>
        <span className="text-xs font-medium text-amber-400 hidden sm:inline">
          Worldwide Network
        </span>
      </div>

      {/* Marquee Row 1 with smooth gradient edge fade */}
      <div className="flex w-full overflow-hidden whitespace-nowrap mb-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee shrink-0 items-center gap-10 sm:gap-16">
          {clientLogos.concat(clientLogos).map((client, idx) => (
            <div key={idx} className="flex items-center gap-3 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-amber-400 transition-colors" />
              <span className="font-display text-lg sm:text-2xl md:text-3xl text-offWhite/50 group-hover:text-offWhite uppercase tracking-wide transition-colors">
                {client.name}
              </span>
              <span className="text-xs font-medium text-neutral-400 border border-white/10 rounded-full px-2.5 py-0.5 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
                {client.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) with smooth gradient edge fade */}
      <div className="flex w-full overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee-reverse shrink-0 items-center gap-10 sm:gap-16">
          {clientLogos.concat(clientLogos).reverse().map((client, idx) => (
            <div key={idx} className="flex items-center gap-3 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-crimson transition-colors" />
              <span className="font-display text-base sm:text-xl md:text-2xl text-offWhite/35 group-hover:text-offWhite uppercase tracking-wide transition-colors font-light">
                {client.name}
              </span>
              <span className="text-xs font-medium text-neutral-500">
                2024–2026
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
