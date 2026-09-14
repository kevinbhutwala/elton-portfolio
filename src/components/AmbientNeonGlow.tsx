'use client';

import React from 'react';

export default function AmbientNeonGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Deep Obsidian / Pure Black Base Canvas */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Atmospheric Black-to-Obsidian Radial Falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(16,16,26,0.85)_0%,rgba(5,5,7,0.98)_70%)]" />

      {/* Soft Neon Gradient Light Orbs (Gentle / "Light Light" Studio Glow) */}

      {/* 1. Neon Cyan / Electric Blue (Top-Right / Master Hero & Showreel Glow) */}
      <div
        className="absolute -top-[10%] right-[-5%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.14)_0%,rgba(6,182,212,0.06)_45%,transparent_70%)] blur-[140px] sm:blur-[160px] animate-ambient-drift-1"
      />

      {/* 2. Neon Crimson / Rose Glow (Mid-Left / Work & Vertical Cinema Glow) */}
      <div
        className="absolute top-[32%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,30,86,0.12)_0%,rgba(229,56,59,0.05)_45%,transparent_70%)] blur-[150px] sm:blur-[170px] animate-ambient-drift-2"
      />

      {/* 3. Neon Violet / Electric Indigo Glow (Lower-Right / The Edit Timeline) */}
      <div
        className="absolute top-[60%] -right-[8%] w-[52vw] h-[52vw] max-w-[750px] max-h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.13)_0%,rgba(99,102,241,0.05)_50%,transparent_70%)] blur-[150px] sm:blur-[180px] animate-ambient-drift-3"
      />

      {/* 4. Neon Amber / Warm Cinematic Gold (Bottom / About & Contact Glow) */}
      <div
        className="absolute -bottom-[8%] left-[15%] w-[65vw] h-[50vw] max-w-[900px] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.10)_0%,rgba(229,168,83,0.04)_50%,transparent_70%)] blur-[140px] sm:blur-[160px] animate-ambient-drift-1"
      />

      {/* 5. Center Ambient Neon Core Pulse (Very Low Intensity 0.04 for Soft Depth) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,rgba(229,56,59,0.03)_40%,transparent_70%)] blur-[180px] animate-pulse-glow"
      />

      {/* Subtle Studio Cross-Grid Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_100%)] opacity-70" />

      {/* Soft Vignette Border: Blends Edges Seamlessly into Pitch Black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050507_92%)] opacity-85" />
    </div>
  );
}
