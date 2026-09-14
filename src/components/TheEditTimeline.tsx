'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { editTimelineStages } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Sliders, Activity, Film, Music, Eye } from 'lucide-react';

export default function TheEditTimeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // default to Rhythm & Pacing

  const currentStage = editTimelineStages[activeStageIndex];

  return (
    <section id="timeline" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Number */}
      <div className="absolute top-10 left-6 md:left-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Editing Architecture</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              The Edit Timeline
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              Explore the multi-track NLE pipeline from raw camera rushes to final master delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-300 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span>Interactive NLE Scrubber</span>
          </div>
        </div>

        {/* Interactive Timeline Stepper Header */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-8">
          {editTimelineStages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.stage}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  setActiveStageIndex(idx);
                }}
                onMouseEnter={() => audioEngine.playHoverTick()}
                className={`p-3 sm:p-3.5 text-left rounded-xl border transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.08] border-amber-400/80 shadow-lg'
                    : 'bg-carbon/40 border-white/[0.06] hover:border-white/20 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={isActive ? 'text-amber-400 font-bold' : 'text-neutral-500 font-medium'}>
                    {stage.stage}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                </div>
                <div className={`text-xs font-semibold tracking-wide ${isActive ? 'text-offWhite' : 'text-neutral-300'}`}>
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* The NLE Interface Simulator Container */}
        <div className="bg-carbon border border-white/[0.08] rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl relative">
          {/* NLE Window Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-offWhite font-semibold tracking-wide text-xs">
                DAVINCI_TIMELINE_ELTON_STUDIO.DRP
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 text-xs font-medium">
              <span>LUT: <span className="text-amber-400">{currentStage.lut}</span></span>
              <span className="hidden sm:inline">· 48.0 kHz</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Live Program Monitor Preview (Left / Center) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative aspect-video w-full bg-obsidian border border-white/[0.08] rounded-xl overflow-hidden group">
                <Image
                  src={currentStage.previewImg}
                  alt={currentStage.name}
                  fill
                  className="object-cover transition-all duration-500 filter contrast-105"
                />

                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-md text-xs font-medium text-amber-400 border border-white/10">
                  Program: {currentStage.name}
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-md text-xs font-medium text-neutral-300 border border-white/10">
                  TC 01:00:{activeStageIndex * 15}:00
                </div>

                {/* Viewfinder crosshairs */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              </div>

              {/* Stage Description text */}
              <div className="bg-obsidian/80 p-3.5 rounded-xl border border-white/[0.06] text-xs">
                <span className="text-amber-400 font-semibold block mb-0.5">
                  Stage Objective
                </span>
                <span className="text-neutral-300 leading-relaxed">
                  {currentStage.desc}
                </span>
              </div>
            </div>

            {/* NLE Multi-Track Timeline View (Right) */}
            <div className="lg:col-span-7 flex flex-col gap-2 text-xs select-none">
              {/* Timeline Header Ruler */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs text-neutral-400 font-medium">
                <span>TRACK</span>
                <div className="flex gap-8 sm:gap-16">
                  <span>00:00</span>
                  <span>00:15</span>
                  <span>00:30</span>
                  <span>00:45</span>
                  <span>01:00</span>
                </div>
              </div>

              {/* Track V2 */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-10 text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>V2</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-amber-400/10 w-3/4" />
                  <span className="relative z-10 truncate">{currentStage.v2}</span>
                </div>
              </div>

              {/* Track V1 */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-10 text-xs text-crimson font-semibold flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>V1</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-crimson/15 w-full" />
                  <span className="relative z-10 truncate">{currentStage.v1}</span>
                </div>
              </div>

              {/* Track A1 Dialogue */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-10 text-xs text-blue-400 font-semibold flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  <span>A1</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-blue-500/10 w-5/6" />
                  <span className="relative z-10 truncate">{currentStage.a1}</span>
                </div>
              </div>

              {/* Track A2 SFX & Foley */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-10 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  <span>A2</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-emerald-500/10 w-2/3" />
                  <span className="relative z-10 truncate">{currentStage.a2}</span>
                </div>
              </div>

              {/* Track A3 Music & Sub */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-10 text-xs text-purple-400 font-semibold flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  <span>A3</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-purple-500/10 w-4/5" />
                  <span className="relative z-10 truncate">{currentStage.a3}</span>
                </div>
              </div>

              {/* Playhead Scrub Slider */}
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center gap-4">
                <span className="text-xs text-neutral-400 font-medium">Playhead:</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={activeStageIndex}
                  onChange={(e) => {
                    audioEngine.playHoverTick();
                    setActiveStageIndex(Number(e.target.value));
                  }}
                  className="flex-1 accent-amber-400 cursor-pointer"
                />
                <span className="text-amber-400 font-semibold text-xs">
                  Stage {currentStage.stage} of 06
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
