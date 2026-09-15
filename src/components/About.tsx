'use client';

import React from 'react';
import Image from 'next/image';
import { bioData } from '@/data/portfolioData';
import { MapPin, Globe, Instagram, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-carbon/40 backdrop-blur-[2px] border-t border-borderDark/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column (Left) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-[340px] bg-obsidian border border-borderDark hover:border-amber-400/50 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.08)] transition-all duration-500 p-2 group">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={bioData.photo}
                  alt="Elton D'Mello - Video Editor"
                  fill
                  quality={95}
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 bg-obsidian/90 backdrop-blur-md p-3 rounded border border-borderDark/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-offWhite block">{bioData.name}</span>
                    <span className="text-[11px] text-muted">Video Editor & Visual Storyteller</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>

            {/* Direct Instagram Profile Link */}
            <a
              href={bioData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-2 px-5 bg-obsidian border border-borderDark hover:border-amber-gold text-xs text-muted hover:text-offWhite transition-all rounded-full w-full max-w-[340px]"
            >
              <Instagram className="w-3.5 h-3.5 text-crimson" />
              <span>Follow on Instagram {bioData.instagramHandle}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Location & Status */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 w-full max-w-[340px] px-2 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-crimson" />
                <span>{bioData.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Globe className="w-3.5 h-3.5" />
                <span>{bioData.availability}</span>
              </div>
            </div>
          </div>

          {/* Biography & Skills (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400 mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Editor & Colorist</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-offWhite tracking-tight mb-4">
              Elton D&apos;Mello
            </h2>

            {/* Concise Impact Statement */}
            <p className="text-lg sm:text-xl text-neutral-200 leading-relaxed font-sans mb-6">
              Shaping raw rushes into rhythmic, emotive cinema across commercial films, music visuals, and high-retention mobile reels.
            </p>

            <div className="border-l-2 border-amber-400 pl-4 py-1 mb-8">
              <p className="text-sm sm:text-base text-neutral-400 italic">
                “{bioData.quote}”
              </p>
            </div>

            {/* Software Arsenal */}
            <div>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                Core Suite
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Premiere Pro', 'CapCut Pro', 'After Effects', 'Color LUTs', 'DaVinci Resolve'].map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-neutral-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
