'use client';

import React, { useEffect, useState } from 'react';
import { audioEngine } from '@/lib/audioEngine';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          audioEngine.playCinematicSweep();
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 300);
      } else {
        setProgress(current);
        const frames = String(current % 24).padStart(2, '0');
        const seconds = String(Math.floor(current / 24)).padStart(2, '0');
        setTimecode(`01:00:${seconds}:${frames}`);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-obsidian flex flex-col justify-between p-8 md:p-16 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isFading ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Metadata */}
      <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
          <span className="text-offWhite font-semibold">Master Reel · Loading</span>
        </div>
        <div className="tabular-nums font-mono text-xs">{timecode}</div>
        <div className="hidden sm:block">4K DCI · 24 FPS</div>
      </div>

      {/* Center Monogram / Brand Title */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/15 bg-white/[0.03] flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <span className="font-display text-2xl md:text-3xl text-offWhite font-bold">
              E<span className="text-amber-400">·</span>L
            </span>
          </div>
        </div>

        {/* Big name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-offWhite uppercase">
          ELTON
        </h1>
        <p className="mt-3 text-xs md:text-sm font-medium tracking-wide text-neutral-400 uppercase">
          Video Editor · Visual Storyteller
        </p>
      </div>

      {/* Bottom Progress Counter */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
          <span className="text-neutral-300">
            Initializing Timeline & Video Stream...
          </span>
          <span className="text-amber-400 font-semibold text-sm sm:text-base tabular-nums">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>

        <div className="w-full h-1 bg-white/[0.08] rounded-full relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crimson via-amber-gold to-offWhite transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
          <span>Elton D’Mello Portfolio</span>
          <span>Goa · Bangalore · Global</span>
        </div>
      </div>
    </div>
  );
}
