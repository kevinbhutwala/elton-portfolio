'use client';

import React, { useState, useRef } from 'react';
import { Play, Film, Volume2, VolumeX, ArrowDown } from 'lucide-react';
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
    <section id="hero" className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-16">
      {/* Background Cinematic Video Loop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/goa-cinematics.mp4"
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="w-full h-full object-cover opacity-45 filter contrast-110 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-[#050507]/75" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-neutral-200">
            Available for Projects · Worldwide Remote
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-extrabold tracking-tight text-offWhite uppercase leading-none select-none">
          ELTON
        </h1>

        {/* Clean Subtitle */}
        <p className="mt-6 text-base sm:text-xl md:text-2xl font-display font-medium tracking-wide text-offWhite/90 uppercase">
          Video Editor <span className="text-crimson mx-2">/</span> Visual Storyteller
        </p>

        {/* Decent Punchy Tagline */}
        <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
          Cutting moments. Shaping rhythm. Creating emotion through video.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 sm:mt-10">
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              onPlayReel();
            }}
            className="px-6 py-3 bg-offWhite text-obsidian hover:bg-amber-gold font-sans font-semibold text-xs tracking-wide uppercase transition-all duration-200 flex items-center gap-2 rounded-full shadow-lg"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Showreel</span>
          </button>

          <a
            href="#work"
            onClick={() => audioEngine.playMechanicalClick()}
            className="px-6 py-3 border border-white/10 hover:border-white/30 text-offWhite font-sans font-medium text-xs tracking-wide uppercase transition-all duration-200 bg-white/[0.03] rounded-full"
          >
            View Projects
          </a>

          <button
            onClick={toggleVideoSound}
            className="p-3 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-offWhite transition-colors rounded-full bg-white/[0.03]"
            title={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Bottom subtle indicator */}
      <a
        href="#work"
        onClick={() => audioEngine.playHoverTick()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-offWhite transition-colors"
      >
        <span>Explore Work</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
