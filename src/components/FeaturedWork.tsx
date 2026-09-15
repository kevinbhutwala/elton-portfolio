'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { projectsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import {
  Play,
  ArrowUpRight,
  Clock,
  Volume2,
  VolumeX,
  Smartphone,
  Film,
  Sparkles,
  Zap,
  Disc,
  Radio,
} from 'lucide-react';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

export default function FeaturedWork({ onSelectProject }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [unmutedVideoId, setUnmutedVideoId] = useState<string | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const categories = [
    'All',
    'Vertical Reels',
    'Commercial',
    'Documentary',
    'Music Video',
    'Campaign',
  ];

  // If page URL hash is #vertical-cinema, auto-switch to Vertical Reels filter
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#vertical-cinema') {
        setActiveCategory('Vertical Reels');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCardMouseEnter = (id: string) => {
    audioEngine.playHoverTick();
    setHoveredProjectId(id);
    const vid = videoRefs.current[id];
    if (vid) {
      vid.play().catch(() => {});
      setPlayingVideoId(id);
    }
  };

  const handleCardMouseLeave = (id: string) => {
    setHoveredProjectId(null);
    const vid = videoRefs.current[id];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      if (playingVideoId === id) {
        setPlayingVideoId(null);
      }
    }
  };

  const toggleCardAudio = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audioEngine.playMechanicalClick();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setUnmutedVideoId(vid.muted ? null : id);
    }
  };

  // Filtered projects
  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Vertical Reels') return p.isVertical;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Funky sticker badges and styling for odd/even variety
  const getOddEvenMeta = (index: number, project: Project) => {
    const isEven = index % 2 === 0;

    switch (project.id) {
      case 'wayanad-cinematics':
        return {
          sticker: '🎬 DCI MASTER // 4K SCOPE',
          tagColor: 'from-amber-400 to-amber-500 text-obsidian shadow-[0_4px_20px_rgba(245,158,11,0.4)]',
          rotation: '-rotate-2',
          badgeCorner: 'top-right',
          timecode: 'TC 00:01:28:12',
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
          reelType: 'MASTER WIDESCREEN CUT',
        };
      case 'supercars-dubai':
        return {
          sticker: '⚡ 60 FPS // HYPERCAR RHYTHM',
          tagColor: 'from-cyan-400 to-teal-400 text-obsidian shadow-[0_4px_20px_rgba(0,240,255,0.4)]',
          rotation: 'rotate-2',
          badgeCorner: 'top-right',
          timecode: 'TC 00:00:38:22',
          accentBorder: 'hover:border-cyan-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.2)]',
          reelType: 'HIGH-VELOCITY REEL',
        };
      case 'goa-auto-expo':
        return {
          sticker: '🏁 EXPO // B-ROLL SPEED-RAMP',
          tagColor: 'from-amber-400 via-orange-400 to-amber-500 text-obsidian shadow-[0_4px_20px_rgba(245,158,11,0.4)]',
          rotation: '-rotate-3',
          badgeCorner: 'top-left',
          timecode: 'TC 00:00:52:14',
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
          reelType: 'CAMPAIGN EXHIBITION',
        };
      case 'dj-doel-blr':
        return {
          sticker: '🔊 128 BPM // BASS-DROP CUT',
          tagColor: 'from-fuchsia-400 via-pink-500 to-rose-500 text-white shadow-[0_4px_20px_rgba(236,72,153,0.4)]',
          rotation: 'rotate-3',
          badgeCorner: 'top-right',
          timecode: 'TC 00:00:44:06',
          accentBorder: 'hover:border-pink-500/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(236,72,153,0.22)]',
          reelType: 'CLUB STROBE CUT',
        };
      case 'goa-cinematics':
        return {
          sticker: '🌅 35MM GOLDEN HOUR EMULATION',
          tagColor: 'from-amber-300 via-yellow-400 to-amber-500 text-obsidian shadow-[0_4px_20px_rgba(234,179,8,0.4)]',
          rotation: '-rotate-2',
          badgeCorner: 'top-left',
          timecode: 'TC 00:01:05:00',
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
          reelType: 'POETIC VISUAL ESSAY',
        };
      case 'turtle-matcha-cafe':
        return {
          sticker: '🍵 ASMR MACRO // 120 FPS FOLEY',
          tagColor: 'from-emerald-400 via-teal-400 to-cyan-400 text-obsidian shadow-[0_4px_20px_rgba(52,211,153,0.4)]',
          rotation: 'rotate-2',
          badgeCorner: 'top-right',
          timecode: 'TC 00:00:30:18',
          accentBorder: 'hover:border-emerald-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(52,211,153,0.2)]',
          reelType: 'ARTISANAL COMMERCIAL',
        };
      case 'flake-house':
        return {
          sticker: '✦ HIGH-FASHION EDITORIAL',
          tagColor: 'from-purple-400 via-indigo-400 to-cyan-400 text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)]',
          rotation: '-rotate-2',
          badgeCorner: 'top-left',
          timecode: 'TC 00:00:45:00',
          accentBorder: 'hover:border-purple-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.2)]',
          reelType: 'LIFESTYLE LOOKBOOK',
        };
      default:
        return {
          sticker: isEven ? '⚡ RHYTHM CUT // 24 FPS' : '✦ A-ROLL CINEMA // DCI',
          tagColor: isEven
            ? 'from-amber-400 to-amber-500 text-obsidian'
            : 'from-cyan-400 to-teal-400 text-obsidian',
          rotation: isEven ? '-rotate-2' : 'rotate-2',
          badgeCorner: isEven ? 'top-right' : 'top-left',
          timecode: 'TC 00:00:48:12',
          accentBorder: isEven ? 'hover:border-amber-400/80' : 'hover:border-cyan-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)]',
          reelType: 'SELECTED CUT',
        };
    }
  };

  return (
    <section
      id="work"
      className="relative py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden border-t border-white/[0.06]"
    >
      {/* Anchor for direct jump to Vertical Cinema */}
      <div id="vertical-cinema" className="absolute -top-24 pointer-events-none" />

      {/* Decorative Large Background Typography */}
      <div className="absolute top-10 right-4 sm:right-12 text-[8rem] sm:text-[14rem] md:text-[20rem] font-display font-extrabold text-white/[0.015] leading-none pointer-events-none select-none tracking-tighter">
        CUTS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Editorial Top Badge Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="tracking-wide">ASYMMETRICAL EDITORIAL COLLAGE · ZERO REPETITION</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.08] via-amber-400/20 to-transparent" />
        </div>

        {/* Section Heading & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-offWhite tracking-tight">
              Selected Works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
              Every timeline is sculpted with asymmetrical pacing, dynamic motion ramps, and bespoke color grading.
              Explore horizontal master cuts and high-retention 9:16 mobile cinema below.
            </p>
          </div>

          {/* Filter Bar with Sound Feedback */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? projectsData.length
                  : cat === 'Vertical Reels'
                  ? projectsData.filter((p) => p.isVertical).length
                  : projectsData.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    setActiveCategory(cat);
                  }}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-obsidian border-amber-400 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.02]'
                      : 'bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:border-white/25 hover:text-offWhite'
                  }`}
                >
                  {cat === 'Vertical Reels' && <Smartphone className="w-3 h-3" />}
                  {cat === 'Commercial' && <Film className="w-3 h-3" />}
                  {cat === 'Music Video' && <Disc className="w-3 h-3" />}
                  {cat === 'Documentary' && <Sparkles className="w-3 h-3" />}
                  {cat === 'Campaign' && <Zap className="w-3 h-3" />}
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-black/20 text-obsidian font-bold'
                        : 'bg-white/[0.06] text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FUNKY ASYMMETRICAL EDITORIAL COLLAGE (Odd/Even Stagger, Small & Big) */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;
            const isPlaying = playingVideoId === project.id;
            const isSoundOn = unmutedVideoId === project.id;
            const meta = getOddEvenMeta(index, project);
            const isEven = index % 2 === 0;

            // Determine Responsive Column Span & Height Styles based on layout hierarchy
            let colSpanClasses = 'lg:col-span-6';
            let cardHeightClasses = 'aspect-[4/5] sm:aspect-[3/4]';
            let staggerClass = '';

            if (!project.isVertical) {
              // Master Widescreen Banner (BIG - 12 cols)
              colSpanClasses = 'md:col-span-2 lg:col-span-12';
              cardHeightClasses = '';
              staggerClass = 'mb-2';
            } else if (project.id === 'supercars-dubai') {
              // Featured Lead Vertical Reel (BIG - 7 cols)
              colSpanClasses = 'lg:col-span-7';
              cardHeightClasses = 'aspect-[9/14] sm:aspect-[9/13]';
              staggerClass = 'lg:translate-y-0';
            } else if (project.id === 'goa-auto-expo') {
              // Staggered Downward Even Card (MEDIUM/COMPACT - 5 cols)
              colSpanClasses = 'lg:col-span-5';
              cardHeightClasses = 'aspect-[9/15] sm:aspect-[9/14]';
              staggerClass = 'lg:translate-y-12';
            } else if (project.id === 'dj-doel-blr') {
              // High-Energy Club Strobe (COMPACT/PUNCHY - 4 cols)
              colSpanClasses = 'lg:col-span-4';
              cardHeightClasses = 'aspect-[9/16]';
              staggerClass = 'lg:-translate-y-4';
            } else if (project.id === 'goa-cinematics') {
              // Poetic Vintage Frame (MEDIUM - 4 cols)
              colSpanClasses = 'lg:col-span-4';
              cardHeightClasses = 'aspect-[9/16]';
              staggerClass = 'lg:translate-y-8';
            } else if (project.id === 'turtle-matcha-cafe') {
              // Sensory Food ASMR (COMPACT/PUNCHY - 4 cols)
              colSpanClasses = 'lg:col-span-4';
              cardHeightClasses = 'aspect-[9/16]';
              staggerClass = 'lg:translate-y-2';
            } else if (project.id === 'flake-house') {
              // Editorial Fashion Reel (EXPANSIVE - 12 cols or 8 cols depending on filter)
              colSpanClasses = filteredProjects.length > 5 ? 'md:col-span-2 lg:col-span-12' : 'lg:col-span-6';
              cardHeightClasses = filteredProjects.length > 5 ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[9/15]';
              staggerClass = 'lg:mt-4';
            } else {
              // Fallback Odd / Even Alternating Stagger
              colSpanClasses = isEven ? 'lg:col-span-5' : 'lg:col-span-7';
              cardHeightClasses = isEven ? 'aspect-[9/15]' : 'aspect-[9/14]';
              staggerClass = isEven ? 'lg:translate-y-8' : 'lg:translate-y-0';
            }

            // -------------------------------------------------------------
            // CASE A: Master Widescreen Card Layout (!isVertical)
            // -------------------------------------------------------------
            if (!project.isVertical) {
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => handleCardMouseEnter(project.id)}
                  onMouseLeave={() => handleCardMouseLeave(project.id)}
                  className={`group relative ${colSpanClasses} ${staggerClass} bg-carbon/95 backdrop-blur-xl border border-white/[0.08] ${meta.accentBorder} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl ${meta.glowShadow}`}
                >
                  {/* Funky Overlapping Gaffer Tape Sticker */}
                  <div
                    className={`absolute -top-3.5 right-6 z-30 px-3.5 py-1 rounded-sm bg-gradient-to-r ${meta.tagColor} font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest ${meta.rotation} shadow-lg pointer-events-none transition-transform group-hover:scale-105`}
                  >
                    {meta.sticker}
                  </div>

                  {/* Negative Film Sprockets Bar along top edge */}
                  <div className="w-full bg-black/80 px-4 py-1.5 flex items-center justify-between border-b border-white/[0.06] text-[9px] font-mono text-neutral-500 select-none">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-ping" />
                      <span>KODAK VISION3 500T · 5219</span>
                    </span>
                    <span className="hidden sm:inline tracking-wider">FRAME 0024 // DCI SCOPE 2.39:1</span>
                    <span className="text-amber-400 font-bold">{meta.timecode}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Widescreen Video Frame */}
                    <div className="lg:col-span-8 relative aspect-video sm:aspect-[2.39/1] lg:aspect-auto w-full bg-neutral-950 overflow-hidden min-h-[260px] sm:min-h-[400px]">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        quality={100}
                        unoptimized={true}
                        priority
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {project.videoUrl && (
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
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        />
                      )}

                      {/* Vignette & Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-black/50 pointer-events-none" />

                      {/* Badges & Sound Toggle */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-200">
                            {project.fps}
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleCardAudio(e, project.id)}
                          className="p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-offWhite hover:text-amber-400 transition-colors shadow-xl"
                          title={isSoundOn ? 'Mute' : 'Preview Audio'}
                          aria-label="Toggle audio"
                        >
                          {isSoundOn ? (
                            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                          ) : (
                            <VolumeX className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>
                      </div>

                      {/* Hover Center Callout */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
                          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                      >
                        <div className="px-6 py-3 rounded-full bg-offWhite text-obsidian text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <Play className="w-4 h-4 fill-current text-obsidian" />
                          <span>Inspect Master Timeline & Grade</span>
                        </div>
                      </div>

                      {/* Bottom Image Meta & Sound Wave Indicator */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-neutral-300">
                        <div className="flex items-center gap-2">
                          <span>{project.camera}</span>
                          <span className="hidden sm:inline text-neutral-500">|</span>
                          <span className="hidden sm:inline text-neutral-400">2.39:1 DCI SCOPE</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Animated Soundwave EQ Bars */}
                          <div className="flex items-end gap-1 h-3">
                            <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-1.5" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2.5" />
                          </div>
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {project.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Details Column */}
                    <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-carbon/90">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            FEATURE CUT {project.number}
                          </span>
                          <span className="text-xs text-neutral-400 font-mono">
                            RELEASE {project.year}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-offWhite tracking-tight group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-amber-400/90 mt-1">
                          {project.subtitle}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs space-y-2.5">
                          <div>
                            <span className="text-neutral-500 font-mono block text-[10px] uppercase">Client / Production</span>
                            <span className="text-neutral-200 font-medium">{project.client}</span>
                          </div>

                          <div>
                            <span className="text-neutral-500 font-mono block text-[10px] uppercase">Editorial Pacing & Rhythm</span>
                            <p className="text-neutral-300 leading-relaxed text-xs line-clamp-3 mt-0.5">
                              {project.synopsis}
                            </p>
                          </div>

                          {project.editDecisions?.[0] && (
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] text-neutral-300">
                              <span className="text-amber-400 font-semibold block mb-0.5">Key Cut Decision:</span>
                              {project.editDecisions[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.08]">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.software.map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                          <span>Explore Deep-Dive Breakdown</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // -------------------------------------------------------------
            // CASE B: Flake House Editorial Lookbook Banner (Wide Banner Mode)
            // -------------------------------------------------------------
            if (project.id === 'flake-house' && filteredProjects.length > 5) {
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => handleCardMouseEnter(project.id)}
                  onMouseLeave={() => handleCardMouseLeave(project.id)}
                  className={`group relative ${colSpanClasses} ${staggerClass} bg-carbon/95 backdrop-blur-xl border border-white/[0.08] ${meta.accentBorder} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl ${meta.glowShadow}`}
                >
                  {/* Overlapping Sticker */}
                  <div
                    className={`absolute -top-3.5 left-8 z-30 px-3.5 py-1 rounded-sm bg-gradient-to-r ${meta.tagColor} font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest ${meta.rotation} shadow-lg pointer-events-none transition-transform group-hover:scale-105`}
                  >
                    {meta.sticker}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                    <div className="md:col-span-5 relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[340px] bg-neutral-950 overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        quality={100}
                        unoptimized={true}
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {project.videoUrl && (
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
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-black/40 pointer-events-none" />

                      <div className="absolute top-4 right-4 z-20">
                        <button
                          onClick={(e) => toggleCardAudio(e, project.id)}
                          className="p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-offWhite hover:text-purple-400 transition-colors shadow-xl"
                          aria-label="Toggle audio"
                        >
                          {isSoundOn ? (
                            <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                          ) : (
                            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                          )}
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 z-20 text-[10px] font-mono text-neutral-300">
                        <span>{meta.timecode}</span>
                      </div>
                    </div>

                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full bg-carbon/90">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-purple-400">
                            PROJECT {project.number} // LOOKBOOK
                          </span>
                          <span className="text-xs text-neutral-400 font-mono">{project.fps}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-offWhite tracking-tight group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-purple-300/90 mt-1">
                          {project.subtitle} · {project.client}
                        </p>

                        <p className="text-xs text-neutral-300 mt-3 leading-relaxed max-w-xl">
                          {project.synopsis}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.software.map((sw, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-300"
                            >
                              {sw}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                          <span>View Fashion Cut</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // -------------------------------------------------------------
            // CASE C: Funky Asymmetrical Vertical Reels Cards (Odd / Even Styles)
            // -------------------------------------------------------------
            return (
              <div
                key={project.id}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => handleCardMouseEnter(project.id)}
                onMouseLeave={() => handleCardMouseLeave(project.id)}
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className={`group relative ${colSpanClasses} ${cardHeightClasses} ${staggerClass} w-full bg-carbon/95 backdrop-blur-xl border border-white/[0.08] ${meta.accentBorder} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-2xl ${meta.glowShadow} flex flex-col justify-between`}
              >
                {/* Overlapping Gaffer Tape Sticker (Hangs over corner) */}
                <div
                  className={`absolute z-30 ${
                    meta.badgeCorner === 'top-left' ? '-top-3 sm:-top-3.5 left-4 sm:left-6' : '-top-3 sm:-top-3.5 right-4 sm:right-6'
                  } px-3 py-1 rounded-sm bg-gradient-to-r ${meta.tagColor} font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider ${meta.rotation} shadow-lg pointer-events-none transition-transform group-hover:scale-105`}
                >
                  {meta.sticker}
                </div>

                {/* Film Perforation Sprockets on Odd Cards (Left Border) / Even Cards (Right Border) */}
                <div
                  className={`absolute top-0 bottom-0 ${
                    isEven ? 'right-1 sm:right-1.5' : 'left-1 sm:left-1.5'
                  } z-20 flex flex-col justify-between py-6 pointer-events-none select-none opacity-40 group-hover:opacity-80 transition-opacity`}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-2.5 rounded-[1px] bg-black/80 border border-white/20"
                    />
                  ))}
                </div>

                {/* Poster / Hero Image */}
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                  quality={100}
                  unoptimized={true}
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Smooth Video Loop on Hover / Touch */}
                {project.videoUrl && (
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
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                )}

                {/* Dark Contrast Gradients for maximum text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/60 pointer-events-none group-hover:opacity-85 transition-opacity" />

                {/* Top Info Bar: Category, Frame Rate & Audio Toggle */}
                <div className="relative z-20 p-3.5 sm:p-5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-neutral-200">
                      {project.category}
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md text-[10px] font-mono text-neutral-300">
                      {project.fps}
                    </span>
                  </div>

                  {/* Interactive Audio Toggle */}
                  <button
                    onClick={(e) => toggleCardAudio(e, project.id)}
                    className="p-2 sm:p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-offWhite hover:text-amber-400 transition-colors shrink-0 shadow-lg"
                    title={isSoundOn ? 'Mute' : 'Listen'}
                    aria-label="Toggle sound"
                  >
                    {isSoundOn ? (
                      <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Center Hover Action Pill */}
                <div
                  className={`relative z-20 flex flex-col items-center justify-center my-auto transition-all duration-200 pointer-events-none ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  <div className="px-4 py-2 rounded-full bg-offWhite text-obsidian text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 shadow-2xl backdrop-blur-md">
                    <Play className="w-3.5 h-3.5 fill-current text-obsidian" />
                    <span>Open Case Study</span>
                  </div>
                </div>

                {/* Bottom Detailed Info Box with Odd/Even Accents */}
                <div className="relative z-20 p-3.5 sm:p-5 pointer-events-none">
                  {/* Project Number & Live Timecode */}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      CUT {project.number}
                    </span>
                    <span className="text-neutral-300 font-normal flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-extrabold text-offWhite tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Client / Subtitle */}
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {project.client} · <span className="text-neutral-500">{project.camera}</span>
                  </p>

                  {/* Editorial Highlight / Footer */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 font-mono">
                    <span className="text-neutral-300 truncate max-w-[65%]">
                      {project.editDecisions?.[0] || project.software[0]}
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5 shrink-0">
                      <span>View Reel</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Timeline Legend / Production Watermark */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>PREVIEWS SYNCED WITH 24.000 / 60.000 FPS AUDIO STEMS</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TOTAL ASSETS: {projectsData.length} CUTS</span>
            <span className="text-neutral-600">|</span>
            <span className="text-amber-400">NO DRIFT · ZERO LATENCY</span>
          </div>
        </div>
      </div>
    </section>
  );
}

