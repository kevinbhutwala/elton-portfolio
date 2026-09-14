'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { servicesData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onOpenContact: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number>(0);

  const activeService = servicesData[hoveredServiceIndex] || servicesData[0];

  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Number */}
      <div className="absolute top-10 left-6 md:left-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        06
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Capabilities & Craft</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-offWhite tracking-tight">
              Services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
              End-to-end video editing, pacing, color grading, and sound design tailored for high-end results.
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              onOpenContact();
            }}
            className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-offWhite font-medium text-xs tracking-wide transition-all flex items-center gap-2 w-fit"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Split Editorial Layout: Interactive List on Left, Live Floating Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Services Typography List (Left) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {servicesData.map((service, idx) => {
              const isSelected = hoveredServiceIndex === idx;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    audioEngine.playHoverTick();
                    setHoveredServiceIndex(idx);
                  }}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    setHoveredServiceIndex(idx);
                  }}
                  className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                    isSelected ? 'pl-3 sm:pl-5 bg-white/[0.02] rounded-xl' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-5">
                      <span className="text-xs font-semibold text-amber-400">
                        {service.number}
                      </span>
                      <h3
                        className={`text-lg sm:text-2xl md:text-3xl font-display tracking-tight transition-colors ${
                          isSelected ? 'text-offWhite font-bold' : 'text-neutral-400 group-hover:text-offWhite'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isSelected
                          ? 'text-amber-400 translate-x-0.5 -translate-y-0.5'
                          : 'text-neutral-600 group-hover:text-offWhite'
                      }`}
                    />
                  </div>

                  {/* Mobile expanded details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-white/[0.08] lg:hidden">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 font-normal">
                        {service.description}
                      </p>
                      <div className="space-y-2 text-xs text-neutral-300 font-medium">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Preview Panel (Right) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="bg-carbon border border-white/[0.08] rounded-2xl p-6 shadow-2xl relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-obsidian border border-white/[0.08] mb-6">
                <Image
                  src={activeService.previewImage}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-all duration-700 filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-amber-400 border border-white/10">
                  {activeService.tag}
                </div>
              </div>

              <h4 className="font-display text-xl sm:text-2xl text-offWhite font-bold mb-2 tracking-tight">
                {activeService.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                {activeService.description}
              </p>

              <div className="border-t border-white/[0.08] pt-4 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Key Deliverables
                </span>
                {activeService.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
