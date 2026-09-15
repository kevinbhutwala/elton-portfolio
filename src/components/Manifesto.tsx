'use client';

import React from 'react';
import { Activity, Palette, Eye } from 'lucide-react';

export default function Manifesto() {
  return (
    <section className="py-20 sm:py-24 md:py-28 bg-transparent border-t border-b border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400 mb-6 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Editorial Philosophy</span>
        </div>

        {/* Big Impact Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-offWhite leading-[1.15] tracking-tight max-w-4xl mx-auto">
          Every cut has a purpose. <span className="text-amber-400 font-serif italic">Zero</span> arbitrary frames.
        </h2>

        <p className="mt-5 text-base sm:text-lg text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          I work with rhythm, sound, and emotional resonance to transform raw rushes into films and high-retention campaigns that stay in the mind.
        </p>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 text-left">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-offWhite mb-1 font-display tracking-wide">
              Rhythm & Pulse Pacing
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Cutting to the emotional cadence of audio stems, breath, and action dynamics, creating momentum that feels natural and inevitable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-crimson/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 border border-crimson/20 flex items-center justify-center text-crimson mb-4 group-hover:scale-110 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-offWhite mb-1 font-display tracking-wide">
              Color Timing & Tone
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Rich celluloid warmth, calibrated skin tones, and rich contrast curves designed in Premiere Pro and CapCut Pro with custom LUTs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-offWhite mb-1 font-display tracking-wide">
              Maximum Viewer Retention
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Hooking viewer attention within the first 0.3 seconds and preserving tension through seamless match cuts and kinetic sound design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
