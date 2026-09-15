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
    'Fashion',
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

  // Accent borders and glow styling
  const getOddEvenMeta = (index: number, project: Project) => {
    switch (project.id) {
      case 'wayanad-cinematics':
        return {
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
        };
      case 'gulf-of-mannar':
        return {
          accentBorder: 'hover:border-emerald-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(52,211,153,0.2)]',
        };
      case 'supercars-dubai':
        return {
          accentBorder: 'hover:border-cyan-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.2)]',
        };
      case 'goa-auto-expo':
        return {
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
        };
      case 'dj-doel-blr':
        return {
          accentBorder: 'hover:border-pink-500/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(236,72,153,0.22)]',
        };
      case 'goa-cinematics':
        return {
          accentBorder: 'hover:border-amber-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]',
        };
      case 'turtle-matcha-cafe':
        return {
          accentBorder: 'hover:border-emerald-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(52,211,153,0.2)]',
        };
      case 'flake-house':
        return {
          accentBorder: 'hover:border-purple-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.2)]',
        };
      case 'hair-salon-work':
        return {
          accentBorder: 'hover:border-rose-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(251,113,133,0.2)]',
        };
      default:
        return {
          accentBorder: index % 2 === 0 ? 'hover:border-amber-400/80' : 'hover:border-cyan-400/80',
          glowShadow: 'hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)]',
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
        {/* Section Heading & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-offWhite tracking-tight">
              Selected Works
            </h2>
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
                  {cat === 'Fashion' && <Sparkles className="w-3 h-3 text-pink-400" />}
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
        {/* CLEAN LUXURY EDITORIAL GRID (Balanced Alignment & High Visual Fidelity) */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;
            const isPlaying = playingVideoId === project.id;
            const isSoundOn = unmutedVideoId === project.id;
            const meta = getOddEvenMeta(index, project);
            const isEven = index % 2 === 0;

            // Determine Grid Column Spanning:
            // Horizontal Master Cut spans full width across all 3 columns.
            // All vertical reel cards share identical, clean 1-column span and uniform 9:16 aspect ratio.
            const isHeroBanner = !project.isVertical;
            const colSpanClasses = isHeroBanner ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'col-span-1';

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
                  className={`group relative ${colSpanClasses} bg-carbon/95 backdrop-blur-xl border border-white/[0.08] ${meta.accentBorder} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl ${meta.glowShadow}`}
                >
                  {/* Full-Bleed Widescreen Video Frame */}
                  <div className="relative aspect-video sm:aspect-[2.39/1] w-full bg-neutral-950 overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="100vw"
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
                        autoPlay
                        loop
                        muted={!isSoundOn}
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      />
                    )}

                    {/* Clean Top & Bottom Scrims: Center remains clear, text remains 100% visible */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />

                    {/* Top Badges & Sound Toggle */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-400 shadow-md">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-200 shadow-md">
                          {project.fps}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleCardAudio(e, project.id)}
                        className="p-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-offWhite hover:text-amber-400 transition-colors shadow-xl"
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
                        <span>Watch Master Cut</span>
                      </div>
                    </div>

                    {/* Bottom Ultra-Visible Title, Client & Duration Overlay */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-400 mb-1.5 tracking-wider uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>FEATURE CUT {project.number} · {project.client}</span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-200 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shrink-0 shadow-lg">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-400 font-bold">{project.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // -------------------------------------------------------------
            // CASE C: Symmetrical Luxury Vertical Reels Cards (Uniform 9:16 Aspect Ratio)
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
                className={`group relative ${colSpanClasses} aspect-[9/16] w-full bg-carbon/95 backdrop-blur-xl border border-white/[0.08] ${meta.accentBorder} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-2xl ${meta.glowShadow} flex flex-col justify-between`}
              >
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

                {/* Smooth Video Loop in Full Master HD on Hover */}
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
                    preload="auto"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                )}

                {/* Clean Top & Bottom Scrims: Center video stays clear, text & badges 100% visible */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Top Info Bar: Category Badge & Audio Toggle */}
                <div className="relative z-20 p-3.5 sm:p-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-amber-400 shadow-md">
                    {project.category}
                  </span>

                  {/* Interactive Audio Toggle */}
                  <button
                    onClick={(e) => toggleCardAudio(e, project.id)}
                    className="p-2 sm:p-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 transition-colors shrink-0 shadow-lg"
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

                {/* Bottom Scrim & Ultra High-Contrast Typography */}
                <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black via-black/85 to-transparent pt-20 pointer-events-none">
                  {/* Category & Duration */}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      CUT {project.number}
                    </span>
                    <span className="text-neutral-200 font-medium flex items-center gap-1 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-amber-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Client */}
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-1 mt-1 font-medium">
                    {project.client}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

