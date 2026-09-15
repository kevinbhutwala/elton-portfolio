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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400 mb-3 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>About the Editor</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-offWhite tracking-tight mb-5">
              Elton D&apos;Mello
            </h2>

            {/* Main Bio Paragraph */}
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed mb-6 font-sans">
              {bioData.aboutBio}
            </p>

            <div className="border-l-2 border-amber-400 pl-5 py-1 mb-8">
              <p className="text-sm md:text-base text-neutral-400 font-normal italic">
                “{bioData.quote}”
              </p>
            </div>

            {/* Specialization Pills */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-3">
                Software Arsenal & Core Workflow
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'CapCut Pro',
                  'Adobe Premiere Pro',
                  'After Effects',
                  'LUTs in Premiere Pro',
                  'Color Grading in CapCut Pro',
                  'Topaz Video AI',
                  'AI Speech & Voice Isolation',
                  'DaVinci Resolve (In Progress)',
                  'Sound Design',
                  'High-Retention Reels',
                ].map((spec) => (
                  <span
                    key={spec}
                    className={`px-3.5 py-1.5 border rounded-full font-medium transition-colors ${
                      spec.includes('CapCut') ||
                      spec.includes('Premiere') ||
                      spec.includes('After Effects') ||
                      spec.includes('LUTs') ||
                      spec.includes('Color Grading') ||
                      spec.includes('AI')
                        ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 font-semibold'
                        : spec.includes('DaVinci')
                        ? 'bg-white/[0.04] border-white/15 text-neutral-300'
                        : 'bg-white/[0.03] border-white/10 text-neutral-300'
                    }`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Specs Studio Rack */}
            <div className="border-t border-white/[0.08] pt-6 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                Studio Workstation & Calibration
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bioData.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors flex flex-col justify-between"
                  >
                    <span className="text-neutral-500 font-mono text-[10px] uppercase">{item.label}</span>
                    <span className="text-offWhite font-semibold mt-1 text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
