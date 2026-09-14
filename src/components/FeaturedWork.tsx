'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { projectsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { Play, ArrowUpRight, Clock, Video } from 'lucide-react';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

export default function FeaturedWork({ onSelectProject }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = ['All', 'Commercial', 'Music Video', 'Fashion', 'Documentary', 'Campaign'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Curated Portfolio</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              Selected Work
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              Commercial films, music videos, and brand campaigns crafted with cinematic pacing.
            </p>
          </div>

          {/* Category Filter Tabs with Smooth Horizontal Scrolling for Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => audioEngine.playHoverTick()}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 border ${
                  activeCategory === cat
                    ? 'bg-offWhite text-obsidian border-offWhite font-semibold shadow-md'
                    : 'bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:border-white/20 hover:text-offWhite'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: 1 col on mobile, 2 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => {
                  audioEngine.playHoverTick();
                  setHoveredProjectId(project.id);
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="group relative bg-carbon border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Visual Video Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                  {/* Poster Image */}
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Video Preview on Hover / Active */}
                  {project.videoUrl && isHovered && (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-10 animate-fade-in"
                    />
                  )}

                  {/* Dark subtle gradient overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-200">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-200 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Play Action Pill on Hover */}
                  <div
                    className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-200 pointer-events-none ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="px-4 py-2 rounded-full bg-white text-obsidian text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Case Study</span>
                    </div>
                  </div>

                  {/* Bottom Meta Bar on image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-20 flex items-center justify-between text-xs text-neutral-300 font-medium">
                    <span>{project.camera}</span>
                    <span>{project.aspect}</span>
                  </div>
                </div>

                {/* Project Info Footer */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-amber-400">
                        {project.year}
                      </span>
                      <span className="text-xs font-medium text-neutral-400">
                        {project.fps}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-offWhite tracking-tight group-hover:text-amber-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-neutral-400 mt-1">
                      {project.client}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.synopsis}
                    </p>
                  </div>

                  {/* Software & View Trigger */}
                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {project.software.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      View Project
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
