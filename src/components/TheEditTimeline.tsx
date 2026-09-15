'use client';

import React, { useState, useRef } from 'react';
import { editTimelineStages } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Activity, Film, Music, Play, Pause } from 'lucide-react';

export default function TheEditTimeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // default to Rhythm & Pacing
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentStage = editTimelineStages[activeStageIndex];

  const handleStageChange = (idx: number) => {
    audioEngine.playMechanicalClick();
    setActiveStageIndex(idx);
    setIsPlayingPreview(false);
  };

  const toggleVideoPlayback = () => {
    audioEngine.playMechanicalClick();
    if (videoRef.current) {
      if (isPlayingPreview) {
        videoRef.current.pause();
        setIsPlayingPreview(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlayingPreview(true);
      }
    }
  };

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      setIsPlayingPreview(false);
    }
  }, [activeStageIndex]);

  return (
    <section id="timeline" className="relative py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Watermark */}
      <div className="absolute top-10 left-6 md:left-12 text-[10rem] md:text-[18rem] font-display font-black text-white/[0.012] leading-none pointer-events-none select-none tracking-tighter">
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex items-center justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              The Edit Timeline
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span>INTERACTIVE NLE</span>
          </div>
        </div>

        {/* Interactive Timeline Stepper Header */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-8">
          {editTimelineStages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.stage}
                onClick={() => handleStageChange(idx)}
                onMouseEnter={() => audioEngine.playHoverTick()}
                className={`p-3 sm:p-3.5 text-left rounded-xl border transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.08] border-amber-400/80 shadow-[0_10px_30px_rgba(229,168,83,0.15)]'
                    : 'bg-carbon/50 border-white/[0.06] hover:border-white/20 text-neutral-400 hover:bg-carbon'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-400" />
                )}
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={isActive ? 'text-amber-400 font-bold' : 'text-neutral-500 font-medium'}>
                    STAGE {stage.stage}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                </div>
                <div className={`text-xs font-semibold tracking-wide truncate ${isActive ? 'text-offWhite' : 'text-neutral-300'}`}>
                  {stage.name}
                </div>
                <div className="text-[10px] text-neutral-500 truncate mt-1">
                  {stage.software.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* The NLE Interface Simulator Container */}
        <div className="bg-carbon border border-white/[0.08] rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl relative">
          {/* NLE Window Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] pb-4 mb-6 text-xs gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-offWhite font-semibold tracking-wide text-xs font-mono">
                PROJECT_ELTON_STUDIO_TIMELINE.PRPROJ
              </span>
            </div>

            <div className="flex items-center gap-3 text-neutral-400 text-xs font-medium">
              <span className="bg-amber-400/10 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-400/20 font-mono text-[11px]">
                {currentStage.software}
              </span>
              <span className="text-neutral-500 hidden sm:inline">· 48.0 kHz 32-Bit Float</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Live Program Monitor Preview (Left / Center) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative aspect-video w-full bg-obsidian border border-white/[0.08] rounded-xl overflow-hidden group">
                {/* Live Video Switcher */}
                <video
                  ref={videoRef}
                  src={currentStage.previewVideo}
                  poster={currentStage.previewImg}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter contrast-105"
                />

                {/* Program Monitor Badges */}
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-400 border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Program: {currentStage.name}</span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-neutral-300 border border-white/10">
                  TC 01:00:{String(activeStageIndex * 15).padStart(2, '0')}:00
                </div>

                {/* Play/Pause Center Overlay */}
                <button
                  onClick={toggleVideoPlayback}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-2xl"
                  title={isPlayingPreview ? 'Pause Monitor' : 'Play Monitor'}
                >
                  {isPlayingPreview ? (
                    <Pause className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5 text-offWhite" />
                  )}
                </button>

                {/* Viewfinder crosshairs */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              </div>

              {/* Stage Info */}
              <div className="bg-obsidian/90 px-4 py-2.5 rounded-xl border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-semibold">STAGE {currentStage.stage} · {currentStage.name}</span>
                <span className="text-neutral-400">{currentStage.software}</span>
              </div>
            </div>

            {/* NLE Multi-Track Timeline View (Right) */}
            <div className="lg:col-span-7 flex flex-col gap-2.5 text-xs select-none">
              {/* Timeline Header Ruler with Real TC markers */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs text-neutral-400 font-mono">
                <span className="font-semibold text-neutral-300">NLE TRACK STACK</span>
                <div className="flex gap-6 sm:gap-12 text-[10px] text-neutral-500">
                  <span>00:00:00</span>
                  <span>00:15:00</span>
                  <span>00:30:00</span>
                  <span>00:45:00</span>
                  <span>01:00:00</span>
                </div>
              </div>

              {/* Track V2 - Overlays, Graphics, Titles */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-12 text-xs text-amber-400 font-semibold flex items-center gap-1 shrink-0">
                  <Film className="w-3 h-3" />
                  <span>V2</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-amber-400/15 w-3/4" />
                  <span className="relative z-10 truncate font-mono text-[11px]">{currentStage.v2}</span>
                </div>
              </div>

              {/* Track V1 - Primary Picture Story Spine */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-12 text-xs text-crimson font-semibold flex items-center gap-1 shrink-0">
                  <Film className="w-3 h-3" />
                  <span>V1</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-crimson/20 w-full" />
                  <span className="relative z-10 truncate font-mono text-[11px]">{currentStage.v1}</span>
                </div>
              </div>

              {/* Track A1 - Primary Dialogue & Voiceover */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-12 text-xs text-blue-400 font-semibold flex items-center gap-1 shrink-0">
                  <Music className="w-3 h-3" />
                  <span>A1</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-blue-500/15 w-5/6" />
                  <span className="relative z-10 truncate font-mono text-[11px]">{currentStage.a1}</span>
                </div>
              </div>

              {/* Track A2 - SFX, Whooshes & Kinetic Foley */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-12 text-xs text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                  <Activity className="w-3 h-3" />
                  <span>A2</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-emerald-500/15 w-2/3" />
                  <span className="relative z-10 truncate font-mono text-[11px]">{currentStage.a2}</span>
                </div>
              </div>

              {/* Track A3 - Music Score, Beat Drops & Sub Atmos */}
              <div className="flex items-center gap-3 bg-obsidian/70 p-2 rounded-lg border border-white/[0.06]">
                <div className="w-12 text-xs text-purple-400 font-semibold flex items-center gap-1 shrink-0">
                  <Music className="w-3 h-3" />
                  <span>A3</span>
                </div>
                <div className="flex-1 h-7 bg-white/[0.04] rounded-md flex items-center px-3 text-xs text-offWhite/90 relative overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-purple-500/15 w-4/5" />
                  <span className="relative z-10 truncate font-mono text-[11px]">{currentStage.a3}</span>
                </div>
              </div>

              {/* Interactive Playhead Scrub Slider */}
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs text-neutral-400 font-medium">Scrub Playhead:</span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={activeStageIndex}
                    onChange={(e) => handleStageChange(Number(e.target.value))}
                    className="flex-1 accent-amber-400 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2 justify-between sm:justify-end text-xs">
                  <span className="text-neutral-500 font-mono text-[11px]">SCRUBBER STEP</span>
                  <span className="text-amber-400 font-semibold">
                    Stage {currentStage.stage} of 06
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

