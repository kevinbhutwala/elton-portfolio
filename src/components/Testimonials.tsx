'use client';

import React, { useState } from 'react';
import { testimonialsData } from '@/data/portfolioData';
import { audioEngine } from '@/lib/audioEngine';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    audioEngine.playMechanicalClick();
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    audioEngine.playMechanicalClick();
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="relative py-28 md:py-40 bg-carbon overflow-hidden border-t border-borderDark/40">
      {/* Decorative Large Number */}
      <div className="absolute top-10 right-6 md:right-12 text-[12rem] md:text-[18rem] font-display font-light text-white/[0.02] leading-none pointer-events-none select-none">
        07
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Endorsements</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        <div className="relative bg-obsidian border border-white/[0.08] rounded-2xl p-6 sm:p-12 shadow-2xl">
          <Quote className="w-10 h-10 text-amber-400/20 mb-6" />

          {/* Large Quote Typography */}
          <blockquote className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-offWhite leading-relaxed tracking-tight mb-8 min-h-[120px] flex items-center">
            “{current.quote}”
          </blockquote>

          {/* Author Details & Slider Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/[0.08] pt-6">
            <div>
              <h4 className="font-display text-base sm:text-lg text-offWhite font-semibold tracking-tight">
                {current.author}
              </h4>
              <p className="text-xs font-medium text-amber-400 mt-0.5">
                {current.role}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5 font-normal">
                {current.company}
              </p>
            </div>

            {/* Slider Switcher buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-medium tabular-nums mr-2">
                0{currentIndex + 1} / 0{testimonialsData.length}
              </span>
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 border border-borderDark hover:border-amber-gold hover:text-amber-gold flex items-center justify-center text-offWhite transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 border border-borderDark hover:border-amber-gold hover:text-amber-gold flex items-center justify-center text-offWhite transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
