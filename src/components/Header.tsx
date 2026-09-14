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
            href="#"
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
                onClick={() => audioEngine.playMechanicalClick()}
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

      {/* Clean Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-obsidian/98 backdrop-blur-xl flex flex-col justify-between p-8 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between pt-4 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
              <Image
                src="/images/elton-dmello.jpg"
                alt="Elton D'Mello"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-offWhite">
              Elton D&apos;Mello
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-muted hover:text-offWhite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 my-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                audioEngine.playMechanicalClick();
                setIsMobileMenuOpen(false);
              }}
              className="text-2xl font-display font-semibold text-offWhite hover:text-amber-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-6">
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-3 bg-offWhite text-obsidian font-semibold text-xs rounded-full uppercase tracking-wider shadow-lg"
          >
            Get in Touch
          </button>
          <div className="flex justify-between items-center text-xs text-neutral-400">
            <span>Goa & Bangalore, India</span>
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
      </div>
    </>
  );
}
