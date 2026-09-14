'use client';

import React from 'react';
import { processStages } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Clock, Wrench } from 'lucide-react';

export default function CreativeProcess() {
  return (
    <section className="relative py-28 md:py-40 bg-carbon overflow-hidden border-t border-borderDark/40">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header Line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-amber-gold" />
          <span className="font-mono text-[10px] tracking-[0.5em] text-amber-gold uppercase">
            FILM PRODUCTION WORKFLOW
          </span>
          <div className="flex-1 h-[1px] bg-borderDark/40" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted">PROCESS</span>
        </div>

        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-offWhite uppercase tracking-tight leading-none">
            HOW THE STORY <br />
            <span className="font-editorial italic font-normal text-amber-gold">TAKES SHAPE</span>
          </h2>
          <p className="mt-4 font-mono text-xs md:text-sm text-muted leading-relaxed">
            A rigorous, structured editorial methodology engineered to eliminate friction and deliver festival-ready cuts on schedule.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {processStages.map((stage, idx) => (
            <div
              key={stage.step}
              onMouseEnter={() => audioEngine.playHoverTick()}
              className="bg-obsidian border border-borderDark/80 hover:border-amber-gold/60 p-6 flex flex-col justify-between transition-all duration-300 group relative"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className="text-amber-gold font-bold text-lg">{stage.step}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted bg-carbon px-2 py-0.5 border border-borderDark">
                    <Clock className="w-3 h-3 text-crimson" />
                    {stage.duration}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-crimson uppercase tracking-widest mb-1">
                  {stage.subtitle}
                </div>
                <h3 className="font-display text-lg text-offWhite uppercase font-bold tracking-tight mb-3 group-hover:text-amber-gold transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                  {stage.description}
                </p>
              </div>

              {/* Tools tags */}
              <div className="border-t border-borderDark/60 pt-4">
                <span className="font-mono text-[9px] text-subtle uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Wrench className="w-2.5 h-2.5 text-amber-gold" />
                  TOOLS & ARTIFACTS
                </span>
                <div className="flex flex-wrap gap-1">
                  {stage.tools.map((tool, i) => (
                    <span key={i} className="font-mono text-[9px] text-offWhite/70 bg-carbon px-1.5 py-0.5 border border-borderDark/40">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
