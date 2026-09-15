'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  // Mouse tracking with fluid physics (inertia & lag)
  useEffect(() => {
    let animId: number;
    let targetX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500;
    let targetY = typeof window !== 'undefined' ? window.innerHeight * 0.3 : 300;
    let currentX = targetX;
    let currentY = targetY;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(updatePhysics);
      }
    };

    const updatePhysics = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        animId = requestAnimationFrame(updatePhysics);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Studio 24.000 FPS Real-time Timecode Generator (Direct DOM updates, zero React re-renders)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (!timecodeRef.current) return;
      const elapsedMs = Date.now() - startTime;
      const totalFrames = Math.floor((elapsedMs / 1000) * 24);
      const frames = totalFrames % 24;
      const totalSecs = Math.floor(totalFrames / 24);
      const secs = totalSecs % 60;
      const mins = Math.floor(totalSecs / 60) % 60;
      const hours = Math.floor(totalSecs / 3600);

      const pad = (n: number) => n.toString().padStart(2, '0');
      timecodeRef.current.textContent = `TC ${pad(hours)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
    }, 41.67); // 24fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Deep Obsidian Foundation */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Atmospheric Black Radial Depth Falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(18,18,28,0.85)_0%,rgba(5,5,7,0.98)_70%)]" />

      {/* Interactive Cursor Spotlight (Gentle Neon Cyan + Crimson Wash) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.08)_0%,rgba(255,30,86,0.05)_40%,transparent_70%)] blur-[120px] sm:blur-[140px] will-change-transform"
        style={{ transform: 'translate3d(50vw, 30vh, 0) translate(-50%, -50%)' }}
      />

      {/* Atmospheric Ambient Neon Glow Orbs */}
      {/* 1. Neon Cyan / Electric Blue (Top-Right / Master Hero & Showreel Glow) */}
      <div
        className="absolute -top-[10%] right-[-5%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12)_0%,rgba(6,182,212,0.05)_45%,transparent_70%)] blur-[140px] sm:blur-[160px] animate-ambient-drift-1"
      />

      {/* 2. Neon Crimson / Rose Glow (Mid-Left / Work & Vertical Cinema Glow) */}
      <div
        className="absolute top-[32%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,86,0.11)_0%,rgba(229,56,59,0.04)_45%,transparent_70%)] blur-[150px] sm:blur-[170px] animate-ambient-drift-2"
      />

      {/* 3. Neon Violet / Electric Indigo Glow (Lower-Right / The Edit Timeline) */}
      <div
        className="absolute top-[60%] -right-[8%] w-[52vw] h-[52vw] max-w-[750px] max-h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.11)_0%,rgba(99,102,241,0.04)_50%,transparent_70%)] blur-[150px] sm:blur-[180px] animate-ambient-drift-3"
      />

      {/* 4. Neon Amber / Warm Cinematic Gold (Bottom / About & Contact Glow) */}
      <div
        className="absolute -bottom-[8%] left-[15%] w-[65vw] h-[50vw] max-w-[900px] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.09)_0%,rgba(229,168,83,0.03)_50%,transparent_70%)] blur-[140px] sm:blur-[160px] animate-ambient-drift-1"
      />

      {/* Subtle Studio Cross-Grid Mesh Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_100%)] opacity-70" />

      {/* Soft Vignette Border: Blends Edges Seamlessly into Pitch Black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050507_92%)] opacity-85" />

      {/* Fixed Film Studio Corner HUD (Desktop only, unobtrusive) */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-40 items-center gap-3 px-3 py-1.5 rounded-full bg-[#08080c]/80 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono tracking-widest text-neutral-400 select-none shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span ref={timecodeRef} className="text-offWhite font-semibold tabular-nums">TC 00:00:00:00</span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-400">24.000 FPS</span>
        <span className="text-neutral-600">|</span>
        <span className="text-amber-400/90 font-medium">REC.709</span>
      </div>

      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-3 py-1.5 rounded-full bg-[#08080c]/80 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono tracking-wider text-neutral-400 select-none shadow-lg">
        <span className="text-neutral-500">FORMAT:</span>
        <span className="text-offWhite font-semibold">2.39:1 SCOPE</span>
      </div>
    </div>
  );
}
