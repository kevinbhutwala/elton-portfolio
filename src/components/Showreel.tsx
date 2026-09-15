'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, Sliders } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';


export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('01:28');

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const current = video.currentTime;
      const total = video.duration;
      setProgress((current / total) * 100);

      const curM = String(Math.floor(current / 60)).padStart(2, '0');
      const curS = String(Math.floor(current % 60)).padStart(2, '0');
      setCurrentTimeStr(`${curM}:${curS}`);
    };

    const handleLoadedMetadata = () => {
      const total = video.duration;
      const durM = String(Math.floor(total / 60)).padStart(2, '0');
      const durS = String(Math.floor(total % 60)).padStart(2, '0');
      setDurationStr(`${durM}:${durS}`);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    audioEngine.playMechanicalClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    audioEngine.playHoverTick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    audioEngine.playMechanicalClick();
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const seekToClientX = (clientX: number, target: HTMLDivElement) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = target.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = percent * videoRef.current.duration;
    setProgress(percent * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    seekToClientX(e.clientX, e.currentTarget);
  };

  return (
    <section id="reel" className="relative py-16 sm:py-24 md:py-32 bg-carbon/40 backdrop-blur-[2px] overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Number */}
      <div className="absolute top-10 right-6 md:right-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        03
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Master Reel</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
              Showreel <span className="text-crimson font-light">2026</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              Horizontal landscape master cut featuring Elton’s cinematography, pacing, and color timing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full">4K DCI Widescreen</span>
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-amber-400">2.39:1 Scope</span>
          </div>
        </div>

        {/* Massive 2.39:1 Anamorphic Video Container Styled like Field Monitor */}
        <div
          ref={videoContainerRef}
          className="relative aspect-video sm:aspect-[2.39/1] w-full bg-[#07070a] border border-white/10 hover:border-amber-400/40 rounded-xl sm:rounded-2xl overflow-hidden group shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.08)] transition-all duration-500"
        >
          {/* Production Field Monitor Viewfinder Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/30 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/30 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/30 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/30 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />

          {/* Actual Video Element */}
          <video
            ref={videoRef}
            src="/videos/wayanad-cinematics.mov"
            poster="/thumbnails/wayanad-cinematics.jpg"
            playsInline
            muted={isMuted}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Crystal-Clear High-DPI Vector Poster Overlay (Visible when not playing) */}
          <div
            className={`absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* High-Resolution Razor-Sharp Backdrop */}
            <Image
              src="/thumbnails/wayanad-cinematics.jpg"
              alt="Elton D'Mello Master Showreel"
              fill
              priority
              quality={100}
              unoptimized
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              className="object-cover"
            />

            {/* Deep Dynamic Contrast Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/55 pointer-events-none" />

            {/* Top Bar: Specs & Timecode */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between text-xs font-mono">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[10px] sm:text-xs">
                  MASTER SHOWREEL // 4K DCI
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-neutral-300 text-[11px]">
                <span className="text-amber-400 font-bold">RAW LOG ➔ REC.709 GRADE</span>
                <span className="text-neutral-500">|</span>
                <span className="font-mono text-neutral-400">TC 00:01:28:12</span>
              </div>
            </div>

            {/* Bottom-Left Vector Typography (100% Crisp Vector Sharpness) */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 max-w-lg">
              <div className="text-xs sm:text-sm font-mono font-bold text-amber-400/90 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>DIRECTOR'S CUT · 2026 EDITION</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-offWhite tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                ELTON D'MELLO
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-mono text-neutral-300 drop-shadow-md">
                2.39:1 DCI SCOPE · SONY FX3 · CUSTOM PREMIERE LUTs & GRADE
              </p>
            </div>

            {/* Bottom-Right Anamorphic Scope Badge */}
            <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400">
              <Sliders className="w-3 h-3 text-amber-400" />
              <span>35MM SENSOR PROFILE · 24.000 FPS</span>
            </div>
          </div>

          {/* Letterbox Bars */}
          <div className="absolute top-0 left-0 right-0 h-3 md:h-5 bg-black/90 z-20 pointer-events-none transition-all duration-500 group-hover:h-2" />
          <div className="absolute bottom-0 left-0 right-0 h-3 md:h-5 bg-black/90 z-20 pointer-events-none transition-all duration-500 group-hover:h-2" />

          {/* Center Play Button Overlay (visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <button
                onClick={togglePlay}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center group/btn hover:scale-110 hover:border-amber-400 hover:bg-amber-400 transition-all duration-300 shadow-[0_0_50px_rgba(245,158,11,0.35)] pointer-events-auto cursor-pointer"
                aria-label="Play Reel"
              >
                <Play className="w-7 h-7 md:w-8 md:h-8 text-offWhite group-hover/btn:text-obsidian transition-colors fill-current ml-1" />
                <span className="text-[9px] font-mono font-bold tracking-wider text-offWhite group-hover/btn:text-obsidian uppercase mt-0.5">
                  PLAY
                </span>
              </button>
            </div>
          )}

          {/* Bottom Minimal Film Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 transition-all opacity-95 group-hover:opacity-100">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-offWhite hover:text-amber-400 transition-colors p-1"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span className="text-offWhite tabular-nums">
                  {currentTimeStr} / {durationStr}
                </span>
              </div>

              {/* Scrubber track */}
              <div
                onClick={handleSeek}
                onTouchStart={(e) => {
                  if (e.touches[0]) seekToClientX(e.touches[0].clientX, e.currentTarget);
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) seekToClientX(e.touches[0].clientX, e.currentTarget);
                }}
                className="flex-1 mx-3 sm:mx-6 h-1.5 sm:h-2 bg-neutral-800 cursor-pointer relative overflow-hidden group/track rounded-full touch-none"
              >
                <div
                  className="h-full bg-gradient-to-r from-crimson via-amber-gold to-offWhite relative transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Sound and Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleAudio}
                  className="hover:text-offWhite transition-colors p-1"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-neutral-400 hover:text-offWhite" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-offWhite transition-colors p-1"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Caption Line */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400 font-medium">
          <div>Directed, edited, and finished by Elton D’Mello</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Premiere Pro & CapCut Pro Workflow · AI Enhanced</span>
          </div>
        </div>
      </div>
    </section>
  );
}
