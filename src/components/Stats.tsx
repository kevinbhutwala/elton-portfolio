'use client';

import React from 'react';
import { statsData } from '@/data/portfolioData';

export default function Stats() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col p-5 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/40 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1 group backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-offWhite tracking-tight mb-2 group-hover:text-amber-400 transition-colors">
                {stat.value < 10 && stat.value > 0 && !stat.suffix.toUpperCase().includes('M')
                  ? `0${stat.value}`
                  : stat.value}
                <span className="text-crimson font-light ml-0.5">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-offWhite tracking-wider uppercase mb-1.5 font-mono">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-400 leading-relaxed font-normal">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
