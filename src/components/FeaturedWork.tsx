'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { projectsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Play, ArrowUpRight, Clock, Volume2, VolumeX, Smartphone, Film } from 'lucide-react';

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

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Vertical Reels') return p.isVertical;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

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

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Anchor for direct jump to Vertical Cinema */}
      <div id="vertical-cinema" className="absolute -top-24 pointer-events-none" />

      {/* Decorative Large Number Watermark */}
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

        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              Selected Works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              High-velocity commercial cuts, luxury automotive reels, and widescreen travel films crafted for maximum retention and cinematic emotion.
            </p>
          </div>

          {/* Category Filter Tabs */}
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
                      ? projectsData.filter((p) => p.isVertical).length
                      : projectsData.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Multi-Format Grid: Native 9:16 for Vertical Reels, 16:9 for Widescreen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProjects.map((project) => {
            const isVertical = project.isVertical;
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
                className={`group relative bg-carbon border border-white/[0.08] hover:border-white/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between ${
                  !isVertical ? 'sm:col-span-2 aspect-[16/10] sm:aspect-auto' : 'aspect-[9/16]'
                }`}
              >
                {/* Visual Media Container */}
                <div className={`relative w-full overflow-hidden bg-neutral-950 flex-1 ${!isVertical ? 'aspect-[16/9]' : 'h-full'}`}>
                  {/* High-Resolution Poster Image with Quality 95 */}
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes={!isVertical ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px'}
                    quality={95}
                    priority={project.number === '01' || project.number === '02'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* HTML5 Video Element for Smooth Hover / Touch Preview */}
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

                  {/* Dark Vignette Overlay for Crisp Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/25 to-black/50 opacity-90 group-hover:opacity-75 transition-opacity pointer-events-none" />

                  {/* Top Badges & Sound Toggle */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-neutral-200">
                        {project.category}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-400">
                        {project.aspect.includes('9:16') ? '9:16' : '16:9'}
                      </span>
                    </div>

                    {/* Interactive Audio Preview Toggle */}
                    <button
                      onClick={(e) => toggleCardAudio(e, project.id)}
                      className="p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-offWhite hover:text-amber-400 transition-colors shadow-lg"
                      title={isSoundOn ? 'Mute Preview' : 'Preview Sound'}
                      aria-label="Toggle card sound"
                    >
                      {isSoundOn ? (
                        <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </button>
                  </div>

                  {/* Center Play Button Pill */}
                  <div
                    className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-200 pointer-events-none ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    <div className="px-3.5 py-1.5 rounded-full bg-offWhite/95 text-obsidian text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                      <Play className="w-3 h-3 fill-current" />
                      <span>View Case Study</span>
                    </div>
                  </div>

                  {/* Bottom Meta Overlay on Card */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono font-semibold mb-1">
                      <span>PROJECT {project.number}</span>
                      <span className="text-neutral-300 font-normal flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {project.duration}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-offWhite tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Card Sub-Info Bar (for 16:9 widescreen cards) */}
                {!isVertical && (
                  <div className="p-4 sm:p-5 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <p className="text-neutral-400 text-xs line-clamp-1 max-w-md">
                      {project.synopsis}
                    </p>
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      View Cut
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
