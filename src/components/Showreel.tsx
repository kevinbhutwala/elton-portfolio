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
  const [durationStr, setDurationStr] = useState('01:05');

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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
              Featured <span className="text-crimson font-light">Cinema</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              Goa Cinematics — 35mm golden hour emulation, coastal ocean waves, and lyrical heritage pacing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full">9:16 VERTICAL</span>
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-amber-400">35MM FILM TONE</span>
          </div>
        </div>

        {/* Master Vertical Cinema Frame - Centered Luxury Display */}
        <div className="relative w-full flex justify-center items-center py-4">
          {/* Ambient Ambient Glow Behind the Vertical Monitor */}
          <div className="absolute w-full max-w-md h-[90%] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-cyan-500/10 blur-3xl opacity-70 pointer-events-none" />

          {/* Symmetrical 9:16 Cinema Monitor */}
          <div
            ref={videoContainerRef}
            className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[9/16] bg-[#07070a] border border-white/15 hover:border-amber-400/50 rounded-2xl sm:rounded-3xl overflow-hidden group shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.12)] transition-all duration-500"
          >
            {/* Production Field Monitor Viewfinder Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/40 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/40 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40 pointer-events-none z-30 transition-all duration-300 group-hover:border-amber-400" />

            {/* Top Monitor Info Bar */}
            <div className="absolute top-4 left-8 right-8 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase tracking-wider">
                  REC · 24 FPS
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-semibold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                GOA CINEMATICS
              </span>
            </div>

            {/* Actual 9:16 Video Element */}
            <video
              ref={videoRef}
              src="/videos/goa-cinematics.mp4"
              poster="/thumbnails/goa-cinematics.jpg"
              playsInline
              loop
              muted={isMuted}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer filter contrast-[1.12] brightness-[1.03] saturate-[1.05]"
            />

            {/* High-DPI Poster Overlay (Visible when not playing) */}
            <div
              className={`absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Image
                src="/thumbnails/goa-cinematics.jpg"
                alt="Goa Cinematics Reel"
                fill
                priority
                quality={100}
                unoptimized
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className="object-cover filter contrast-[1.08] brightness-[1.02]"
              />
              {/* Subtle Natural Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
            </div>

            {/* Center Play Button Overlay (visible when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/25 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center group/btn hover:scale-110 hover:border-amber-400 hover:bg-amber-400 transition-all duration-300 shadow-[0_0_50px_rgba(245,158,11,0.4)] pointer-events-auto cursor-pointer"
                  aria-label="Play Reel"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 text-offWhite group-hover/btn:text-obsidian transition-colors fill-current ml-1" />
                  <span className="text-[9px] font-mono font-bold tracking-wider text-offWhite group-hover/btn:text-obsidian uppercase mt-0.5">
                    PLAY
                  </span>
                </button>
              </div>
            )}

            {/* Bottom Minimal Controls Bar */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 flex flex-col gap-2 bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-3 transition-all opacity-95 group-hover:opacity-100">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={togglePlay}
                    className="text-offWhite hover:text-amber-400 transition-colors p-1"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <span className="text-offWhite tabular-nums text-[11px] font-mono">
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
                  className="flex-1 mx-2 sm:mx-3 h-1.5 bg-neutral-800 cursor-pointer relative overflow-hidden group/track rounded-full touch-none"
                >
                  <div
                    className="h-full bg-gradient-to-r from-crimson via-amber-gold to-offWhite relative transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Sound and Fullscreen */}
                <div className="flex items-center gap-2">
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
        </div>
      </div>
    </section>
  );
}
