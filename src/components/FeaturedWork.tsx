'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { projectsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Play, ArrowUpRight, Clock, Volume2, VolumeX, Smartphone, Film, Sparkles, Sliders, Eye } from 'lucide-react';

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

  // Separate widescreen showcase from vertical reels for mathematical grid alignment
  const widescreenProjects = projectsData.filter((p) => !p.isVertical);
  const verticalProjects = projectsData.filter((p) => p.isVertical);

  // Filtered lists depending on selected category tab
  const showWidescreen = activeCategory === 'All' || activeCategory === 'Commercial' || activeCategory === 'Documentary';
  const displayWidescreen = widescreenProjects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const displayVertical = verticalProjects.filter((p) => {
    if (activeCategory === 'All' || activeCategory === 'Vertical Reels') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Anchor for direct jump to Vertical Cinema */}
      <div id="vertical-cinema" className="absolute -top-24 pointer-events-none" />

      {/* Decorative Large Watermark */}
      <div className="absolute top-10 right-6 md:right-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Curated Portfolio · Zero Repetition</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Heading & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
              Selected Works
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
              Every project is cut with deliberate pacing, micro-transitions, and custom color timing. Select a format below to inspect vertical mobile cuts or widescreen master films.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
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
                      ? 'bg-offWhite text-obsidian border-offWhite font-semibold shadow-lg scale-[1.02]'
                      : 'bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:border-white/20 hover:text-offWhite'
                  }`}
                >
                  {cat === 'Vertical Reels' && <Smartphone className="w-3 h-3 text-amber-400" />}
                  {cat === 'Commercial' && <Film className="w-3 h-3 text-amber-400" />}
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/15 text-obsidian font-bold' : 'bg-white/[0.06] text-neutral-400'}`}>
                    {cat === 'All'
                      ? projectsData.length
                      : cat === 'Vertical Reels'
                      ? verticalProjects.length
                      : projectsData.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 1. LEAD WIDESCREEN CINEMA SPOTLIGHT (if visible in filter) */}
        {/* ---------------------------------------------------- */}
        {showWidescreen && displayWidescreen.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Featured Widescreen Master Cut</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">16:9 / 2.39:1 DCI SCOPE</span>
            </div>

            {displayWidescreen.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              const isPlaying = playingVideoId === project.id;
              const isSoundOn = unmutedVideoId === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => handleCardMouseEnter(project.id)}
                  onMouseLeave={() => handleCardMouseLeave(project.id)}
                  className="group relative bg-carbon border border-white/[0.08] hover:border-amber-400/50 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Visual 16:9 Video Canvas (8 cols on desktop) */}
                    <div className="lg:col-span-8 relative aspect-video sm:aspect-[2.39/1] lg:aspect-auto w-full bg-neutral-950 overflow-hidden min-h-[260px] sm:min-h-[380px]">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 900px"
                        quality={95}
                        priority
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

                      {/* Vignette & Letterbox Lines */}
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-black/40 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-200">
                            {project.fps}
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleCardAudio(e, project.id)}
                          className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-offWhite hover:text-amber-400 transition-colors shadow-lg"
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

                      {/* Hover Watch Button */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="px-5 py-2.5 rounded-full bg-offWhite text-obsidian text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Open Case Study & Grade Split</span>
                        </div>
                      </div>

                      {/* Bottom Image Meta */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-neutral-300">
                        <span>{project.camera}</span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          {project.duration}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Project Information Column (4 cols on desktop) */}
                    <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-carbon/90">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            PROJECT {project.number}
                          </span>
                          <span className="text-xs text-neutral-400 font-medium">
                            {project.year}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-offWhite tracking-tight group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-amber-400/90 mt-1">
                          {project.subtitle}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs space-y-2">
                          <div>
                            <span className="text-neutral-500 font-mono block text-[10px] uppercase">Client / Production</span>
                            <span className="text-neutral-200 font-medium">{project.client}</span>
                          </div>

                          <div>
                            <span className="text-neutral-500 font-mono block text-[10px] uppercase">Editing Approach</span>
                            <p className="text-neutral-300 leading-relaxed text-xs line-clamp-3 mt-0.5">
                              {project.synopsis}
                            </p>
                          </div>

                          {project.editDecisions?.[0] && (
                            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] text-neutral-300">
                              <span className="text-amber-400 font-semibold block mb-0.5">Key Cut Decision:</span>
                              {project.editDecisions[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tool Badges & CTA */}
                      <div className="mt-6 pt-4 border-t border-white/[0.08]">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.software.map((tool, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
                              {tool}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                          <span>Explore Breakdown</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 2. HIGH-VELOCITY VERTICAL REELS SHOWCASE (9:16) */}
        {/* Uniform, flawlessly aligned 2-col on mobile, 4-col on desktop */}
        {/* ---------------------------------------------------- */}
        {displayVertical.length > 0 && (
          <div>
            {/* Header when showing both or filtered */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Vertical Cinema & High-Retention Reels</span>
                <span className="text-neutral-500 hidden sm:inline">({displayVertical.length} cuts)</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">NATIVE 9:16 MOBILE RESOLUTION</span>
            </div>

            {/* Mathematically Flawless Uniform 9:16 Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {displayVertical.map((project) => {
                const isHovered = hoveredProjectId === project.id;
                const isPlaying = playingVideoId === project.id;
                const isSoundOn = unmutedVideoId === project.id;

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
                    className="group relative aspect-[9/16] w-full bg-carbon border border-white/[0.08] hover:border-amber-400/60 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between"
                  >
                    {/* Poster Image */}
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                      quality={95}
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

                    {/* Dark Vignette Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/55 pointer-events-none group-hover:opacity-80 transition-opacity" />

                    {/* Top Info Bar: Category & Sound Toggle */}
                    <div className="relative z-20 p-2.5 sm:p-3.5 flex items-center justify-between gap-1">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-neutral-200 truncate max-w-[70%]">
                        {project.category}
                      </span>

                      {/* Interactive Audio Toggle */}
                      <button
                        onClick={(e) => toggleCardAudio(e, project.id)}
                        className="p-1 sm:p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-offWhite hover:text-amber-400 transition-colors shrink-0 shadow-lg"
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

                    {/* Center Action Indicator */}
                    <div
                      className={`relative z-20 flex flex-col items-center justify-center my-auto transition-all duration-200 pointer-events-none ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                    >
                      <div className="px-3 py-1.5 rounded-full bg-offWhite/95 text-obsidian text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Case Study</span>
                      </div>
                    </div>

                    {/* Bottom Detailed Info Box */}
                    <div className="relative z-20 p-2.5 sm:p-4 pointer-events-none">
                      {/* Project Number & Duration */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-amber-400 mb-1">
                        <span className="font-bold">PROJ {project.number}</span>
                        <span className="text-neutral-300 font-normal flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {project.duration}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm md:text-base font-display font-bold text-offWhite tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Client */}
                      <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                        {project.client}
                      </p>

                      {/* Subtle Editing Technique Badge */}
                      <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span className="truncate">{project.software[0] || 'Premiere Pro'}</span>
                        <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                          <span>View</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
