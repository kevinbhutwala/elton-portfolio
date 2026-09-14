'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { audioEngine } from '@/lib/audioEngine';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioEngine.playMechanicalClick();
    setIsMobileMenuOpen(false);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Vertical Reels', href: '#vertical-cinema' },
    { label: 'Showreel', href: '#reel' },
    { label: 'Archive', href: '#archive' },
    { label: 'The Edit', href: '#timeline' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-obsidian/90 backdrop-blur-md border-b border-borderDark/60 shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Small, Clean, Visually Refined Brand Title */}
          {/* Iconic E Monogram Brand Logo */}
          <a
            href="#hero"
            aria-label="Elton D'Mello - Home"
            className="flex items-center gap-3 group"
            onMouseEnter={() => audioEngine.playHoverTick()}
            onClick={() => audioEngine.playMechanicalClick()}
          >
            {/* Prominent E Logo Mark */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#1c1c22] to-[#0d0d10] border border-white/15 flex items-center justify-center shadow-lg group-hover:border-amber-400/60 group-hover:shadow-[0_0_15px_rgba(229,168,83,0.2)] transition-all">
              <span className="font-display text-sm font-black bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                E
              </span>
              {/* Subtle Red Cut / Playhead Accent */}
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_6px_#E5383B]" />
            </div>

            {/* Name & Title */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-offWhite tracking-tight group-hover:text-amber-400 transition-colors">
                Elton D&apos;Mello
              </span>
              <span className="hidden sm:inline-block text-xs text-neutral-400 font-normal">
                · Video Editor
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-muted hover:text-offWhite transition-colors"
                onMouseEnter={() => audioEngine.playHoverTick()}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Sound & Compact Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-borderDark/80 hover:border-borderDark rounded text-xs text-muted hover:text-offWhite transition-all"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-muted" />
                  <span className="text-[11px]">Mute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-gold" />
                  <span className="text-[11px] text-amber-gold font-medium">Sound On</span>
                </>
              )}
            </button>

            {/* Compact CTA */}
            <button
              onClick={() => {
                audioEngine.playMechanicalClick();
                onOpenContact();
              }}
              className="px-4 py-1.5 bg-offWhite text-obsidian hover:bg-amber-gold text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-1.5 text-offWhite hover:text-amber-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* High-End Cinematic Slide-Over Drawer Menu for Mobile & Tablet */}
      {/* Backdrop */}
      <div
        onClick={() => {
          audioEngine.playMechanicalClick();
          setIsMobileMenuOpen(false);
        }}
        className={`fixed inset-0 z-[120] bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[130] w-[88vw] max-w-sm bg-[#0a0a0d] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#1c1c22] to-[#0d0d10] border border-amber-400/40 flex items-center justify-center shadow-lg">
              <span className="font-display text-sm font-black text-amber-400">
                E
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-crimson" />
            </div>
            <div>
              <div className="text-sm font-semibold text-offWhite tracking-tight">
                Elton D&apos;Mello
              </div>
              <div className="text-[11px] text-neutral-400">
                Video Editor · Storyteller
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-offWhite transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col gap-1.5 my-auto py-6 overflow-y-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 px-3">
            Portfolio Navigation
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => audioEngine.playHoverTick()}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] text-offWhite hover:text-amber-400 font-medium text-base transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-neutral-500 group-hover:text-amber-400/80">
                  0{idx + 1}
                </span>
                <span>{link.label}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="space-y-3 pt-5 border-t border-white/[0.08]">
          {/* Quick Audio Switcher */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
            <span className="text-neutral-400 flex items-center gap-2">
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>Audio Soundscape</span>
            </span>
            <button
              onClick={handleAudioToggle}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                !isMuted ? 'bg-amber-400 text-obsidian font-bold' : 'bg-white/10 text-neutral-300'
              }`}
            >
              {!isMuted ? 'Active' : 'Muted'}
            </button>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-3 bg-offWhite text-obsidian hover:bg-amber-400 font-semibold text-xs rounded-full uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Social Direct Links */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 px-1">
            <a
              href="https://wa.me/918310826860"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp (+91 83108 26860)
            </a>
            <a
              href="https://www.instagram.com/_elton.dmello___/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-white transition-colors"
            >
              @_elton.dmello___
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
