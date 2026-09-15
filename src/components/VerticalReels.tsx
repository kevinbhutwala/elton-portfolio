'use client';

import React, { useState, useRef } from 'react';
import { Project } from '@/types';
import { projectsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles, Smartphone } from 'lucide-react';

interface VerticalReelsProps {
  onSelectProject: (project: Project) => void;
}

export default function VerticalReels({ onSelectProject }: VerticalReelsProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedId, setMutedId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const verticalProjects = projectsData.filter((p) => p.isVertical);

  const handleCardMouseEnter = (id: string) => {
    audioEngine.playHoverTick();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.play().catch(() => {});
      setPlayingId(id);
    }
  };

  const handleCardMouseLeave = (id: string) => {
    const vid = videoRefs.current[id];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      if (playingId === id) {
        setPlayingId(null);
      }
    }
  };

  const toggleSound = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audioEngine.playMechanicalClick();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedId(vid.muted ? null : id);
    }
  };

  return (
    <section id="vertical-cinema" className="relative py-16 sm:py-24 md:py-32 bg-carbon overflow-hidden border-t border-white/[0.06]">
      {/* Subtle Background Watermark */}
      <div className="absolute top-10 right-6 md:right-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        9:16
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>9:16 Vertical Cinema</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              Vertical Reels
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              High-velocity commercial cuts, luxury automotive edits, and brand reels crafted for maximum retention.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10 w-fit">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Tap or hover to preview with sound</span>
          </div>
        </div>

        {/* Vertical Reel Cards Grid: 2 columns on mobile, 2 on sm, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {verticalProjects.map((project) => {
            const isPlaying = playingId === project.id;
            const isSoundOn = mutedId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => handleCardMouseEnter(project.id)}
                onMouseLeave={() => handleCardMouseLeave(project.id)}
                className="group relative aspect-[9/16] bg-obsidian border border-white/[0.08] hover:border-white/30 overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Real HTML5 Video element */}
                <video
                  ref={(el) => {
                    videoRefs.current[project.id] = el;
                  }}
                  src={project.videoUrl}
                  poster={project.heroImage}
                  playsInline
                  loop
                  muted={!isSoundOn}
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.12] brightness-[1.02] saturate-[1.05] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/60 pointer-events-none group-hover:opacity-75 transition-opacity" />

                {/* Top Card Info Bar */}
                <div className="relative z-20 p-2.5 sm:p-3.5 flex items-center justify-between">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/65 backdrop-blur-md border border-white/10 rounded-full text-[11px] sm:text-xs font-medium text-neutral-200">
                    {project.category}
                  </span>

                  {/* Sound Toggle Button */}
                  <button
                    onClick={(e) => toggleSound(e, project.id)}
                    className="p-1.5 sm:p-2 bg-black/65 backdrop-blur-md border border-white/10 text-offWhite hover:text-amber-gold transition-colors rounded-full"
                    title={isSoundOn ? 'Mute' : 'Unmute'}
                  >
                    {isSoundOn ? (
                      <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Center Play Indicator */}
                {!isPlaying && (
                  <div className="relative z-20 flex flex-col items-center justify-center my-auto pointer-events-none">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs font-medium text-neutral-200 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      {project.duration}
                    </span>
                  </div>
                )}

                {/* Bottom Metadata */}
                <div className="relative z-20 p-3 sm:p-4 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-medium text-neutral-400 mb-1">
                    <span className="text-amber-400 font-semibold">{project.number}</span>
                    <span>{project.fps}</span>
                  </div>

                  <h3 className="font-display text-sm sm:text-lg font-bold text-offWhite tracking-tight group-hover:text-amber-gold transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 hidden xs:block sm:block font-medium">
                    {project.client}
                  </p>

                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs text-neutral-300 font-medium">
                    <span>Watch Cut</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
