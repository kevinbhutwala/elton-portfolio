'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { btsFramesData, bioData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Instagram, Film, ExternalLink, Camera } from 'lucide-react';

export default function BehindTheTimeline() {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  return (
    <section className="relative py-28 md:py-40 bg-carbon overflow-hidden border-t border-borderDark/40">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header Line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-amber-gold" />
          <span className="font-mono text-[10px] tracking-[0.5em] text-amber-gold uppercase">
            CONTACT SHEET // ARCHIVE
          </span>
          <div className="flex-1 h-[1px] bg-borderDark/40" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted">BTS</span>
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-offWhite uppercase tracking-tight leading-none">
              BEHIND THE <span className="font-editorial italic font-normal text-amber-gold">TIMELINE</span>
            </h2>
            <p className="mt-3 font-mono text-xs md:text-sm text-muted max-w-lg">
              Scrapbook of editing monitors, node graphs, vectorscopes, and unreleased project frames.
            </p>
          </div>

          <a
            href={bioData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => audioEngine.playHoverTick()}
            className="flex items-center gap-2 font-mono text-xs text-amber-gold hover:text-offWhite transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW ON INSTAGRAM {bioData.instagramHandle.toUpperCase()}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contact Sheet Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {btsFramesData.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                audioEngine.playMechanicalClick();
                setSelectedFrame(item.id);
              }}
              onMouseEnter={() => audioEngine.playHoverTick()}
              className="group relative aspect-[3/4] bg-obsidian border border-borderDark/70 hover:border-amber-gold overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between p-2"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[75%] overflow-hidden bg-carbon">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter grayscale contrast-125 group-hover:filter-none group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
              </div>

              {/* Bottom Film Strip Metadata */}
              <div className="pt-2 font-mono text-[9px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-subtle">
                  <span className="truncate">{item.category}</span>
                  <span className="text-amber-gold font-bold">●</span>
                </div>
                <div className="text-offWhite/80 truncate font-semibold mt-0.5">
                  {item.title}
                </div>
                <div className="text-muted text-[8px] mt-0.5">
                  {item.timecode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
