'use client';

import React from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { ArrowUp, ArrowUpRight, Mail, Phone, Instagram, Film, Sparkles, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    audioEngine.playMechanicalClick();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    audioEngine.playMechanicalClick();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetId, { duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#08080b] border-t border-white/[0.08] text-neutral-400 select-none overflow-hidden">
      {/* Top Studio Grid - 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Column 1: Brand & Editorial Statement (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e1e26] to-[#0c0c10] border border-white/20 flex items-center justify-center shadow-lg">
                <span className="font-display text-base font-black bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  E
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-crimson" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-offWhite tracking-tight">
                  Elton D&apos;Mello
                </h4>
                <p className="text-xs text-neutral-400 font-mono">
                  Cinematics · Pacing · Color Grading
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-md">
              Specialized in high-impact video editing, automotive cinema, travel narratives, and commercial digital campaigns with surgical rhythm and theatrical color finishing.
            </p>

            {/* Live Studio Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio Status: Available for Projects</span>
            </div>
          </div>

          {/* Column 2: Quick Jump Navigation (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-offWhite/80 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Navigation</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, '#work')}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="hover:text-amber-400 transition-colors inline-block py-0.5"
                >
                  Selected Works
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onClick={(e) => handleNavClick(e, '#timeline')}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="hover:text-amber-400 transition-colors inline-block py-0.5"
                >
                  The Edit Suite
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="hover:text-amber-400 transition-colors inline-block py-0.5"
                >
                  About Elton
                </a>
              </li>
              <li>
                <a
                  href="#archive"
                  onClick={(e) => handleNavClick(e, '#archive')}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="hover:text-amber-400 transition-colors inline-block py-0.5"
                >
                  Visual Archive
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="hover:text-amber-400 transition-colors inline-block py-0.5"
                >
                  Project Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities & Disciplines (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-offWhite/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Disciplines</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                <span>Commercial Editing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                <span>9:16 Vertical Cinema</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                <span>DaVinci Color Grading</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                <span>Sound Design & Foley</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                <span>Festival & Stage Reels</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Channels (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-offWhite/80 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Channels</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="mailto:eltonjohndmello@gmail.com"
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="flex items-center justify-between group hover:text-amber-400 transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                    <span>eltonjohndmello@gmail.com</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918310826860"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="flex items-center justify-between group hover:text-emerald-400 transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                    <span>+91 83108 26860</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_elton.dmello___/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioEngine.playHoverTick()}
                  className="flex items-center justify-between group hover:text-crimson transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-neutral-500 group-hover:text-crimson transition-colors" />
                    <span>@_elton.dmello___</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-crimson transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              Goa · Bangalore, India · Remote Worldwide
            </div>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>IST (UTC+5:30) · High-Precision 24FPS Cinema Editing</span>
          </div>

          <div>
            <span>© 2026 Elton D’Mello. Master HD visual portfolio.</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => audioEngine.playHoverTick()}
            className="flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-amber-400 transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-amber-400/40 bg-white/[0.03]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
