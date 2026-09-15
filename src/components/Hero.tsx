'use client';

import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowDown, Sparkles } from 'lucide-react';
import { audioEngine } from '@/lib/audioEngine';

interface HeroProps {
  onPlayReel: () => void;
}

export default function Hero({ onPlayReel }: HeroProps) {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoSound = () => {
    audioEngine.playMechanicalClick();
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] w-full flex items-center justify-center overflow-hidden bg-transparent pt-28 pb-20"
    >
      {/* Background Cinematic Video Loop with Multi-Stop Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/goa-cinematics.mp4"
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="w-full h-full object-cover opacity-35 filter contrast-115 brightness-90 scale-105 transition-all duration-1000"
        />
        {/* Soft Multi-Layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/25 to-[#050507]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,#050507_90%)] opacity-70" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Status & Availability Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-white/20 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-neutral-200 tracking-wide">
            Available for Projects · Worldwide
          </span>
        </div>

        {/* Hero Title with Subtle Neon Backlight & Directorial Tracking */}
        <div className="relative select-none my-2">
          {/* Ambient Glow Behind Name */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-crimson/10 to-amber-500/10 blur-3xl opacity-60 pointer-events-none" />

          <h1 className="relative text-7xl sm:text-9xl md:text-[10.5rem] lg:text-[12rem] font-display font-black tracking-tighter text-offWhite uppercase leading-[0.88] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            ELTON
          </h1>
        </div>

        {/* Editorial Subtitle with Stylized Delimiters */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm sm:text-xl md:text-2xl font-display font-medium tracking-wide uppercase text-neutral-200">
          <span>Video Editor</span>
          <span className="text-crimson font-light">/</span>
          <span className="text-offWhite">Visual Storyteller</span>
          <span className="text-crimson font-light">/</span>
          <span className="text-amber-400">Colorist</span>
        </div>

        {/* Punchy Concise Tagline */}
        <p className="mt-4 text-base sm:text-xl md:text-2xl text-neutral-300 font-display font-light tracking-wide max-w-xl mx-auto">
          Cutting rhythm. Shaping emotion.
        </p>

        {/* Magnetic Hero CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              onPlayReel();
            }}
            className="group relative px-7 py-3.5 bg-offWhite text-obsidian hover:bg-amber-gold font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(229,168,83,0.3)] hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110" />
            <span>Watch Showreel</span>
          </button>

          <a
            href="#work"
            onClick={() => audioEngine.playMechanicalClick()}
            className="px-7 py-3.5 border border-white/15 hover:border-amber-400/50 text-offWhite hover:text-amber-300 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl rounded-full shadow-lg hover:scale-105 active:scale-95"
          >
            View Projects
          </a>

          {/* Sound Toggle with Live Equalizer Visualizer */}
          <button
            onClick={toggleVideoSound}
            className="group flex items-center gap-2 px-4 py-3.5 border border-white/15 hover:border-white/30 text-neutral-300 hover:text-offWhite transition-all duration-200 rounded-full bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl"
            title={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            aria-label={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isVideoMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            ) : (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-amber-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse delay-150" />
                </span>
              </div>
            )}
            <span className="text-[11px] font-mono font-medium">
              {isVideoMuted ? 'MUTE' : 'AUDIO ON'}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <a
        href="#work"
        onClick={() => audioEngine.playHoverTick()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-offWhite transition-colors py-2 px-4 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md"
      >
        <span>Explore Work</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
