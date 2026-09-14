'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
    setProgress(percent * 100);
  };

  return (
    <section id="reel" className="relative py-16 sm:py-24 md:py-32 bg-carbon overflow-hidden border-t border-white/[0.06]">
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

        {/* Massive 2.39:1 Anamorphic Video Container */}
        <div
          ref={videoContainerRef}
          className="relative aspect-video sm:aspect-[2.39/1] w-full bg-obsidian border border-white/[0.08] rounded-xl sm:rounded-2xl overflow-hidden group shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
        >
          {/* Actual Video Element */}
          <video
            ref={videoRef}
            src="/videos/wayanad-cinematics.mov"
            playsInline
            muted={isMuted}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Letterbox Bars */}
          <div className="absolute top-0 left-0 right-0 h-3 md:h-6 bg-black z-10 pointer-events-none transition-all duration-500 group-hover:h-2" />
          <div className="absolute bottom-0 left-0 right-0 h-3 md:h-6 bg-black z-10 pointer-events-none transition-all duration-500 group-hover:h-2" />

          {/* Center Play Button Overlay (visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button
                onClick={togglePlay}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center group/btn hover:scale-110 hover:border-amber-400 hover:bg-amber-400 transition-all duration-300 shadow-2xl pointer-events-auto"
                aria-label="Play Reel"
              >
                <Play className="w-7 h-7 md:w-9 md:h-9 text-offWhite group-hover/btn:text-obsidian transition-colors fill-current ml-1" />
              </button>
            </div>
          )}

          {/* Top Info Overlay */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 text-xs font-medium text-neutral-200 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/75 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span>{isPlaying ? 'Playing 24 FPS' : 'Ready to Play'}</span>
            </div>
            <div className="bg-black/75 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm hidden xs:block">
              Wayanad Cinematics · 4K Master
            </div>
          </div>

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
                className="flex-1 mx-3 sm:mx-6 h-1.5 sm:h-2 bg-neutral-800 cursor-pointer relative overflow-hidden group/track rounded-full"
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
            <span>DaVinci Resolve Studio & Premiere Pro Pipeline</span>
          </div>
        </div>
      </div>
    </section>
  );
}
