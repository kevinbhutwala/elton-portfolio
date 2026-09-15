'use client';

import React, { useState } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { Mail, Phone, MessageSquare, Instagram, ArrowUpRight, Clock, ShieldCheck, MapPin, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    audioEngine.playMechanicalClick();
    navigator.clipboard.writeText('eltonjohndmello@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };
  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-36 bg-transparent overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Number Watermark */}
      <div className="absolute top-10 right-6 md:right-12 text-[10rem] md:text-[18rem] font-display font-black text-white/[0.012] leading-none pointer-events-none select-none tracking-tighter">
        08
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Initiate Collaboration · Worldwide Remote</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-offWhite tracking-tight">
            Let&apos;s shape your next <span className="text-amber-400 font-normal">visual story</span>.
          </h2>
        </div>

        {/* High-Impact Contact Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
          {/* Card 1: Direct Email Priority Channel */}
          <a
            href="mailto:eltonjohndmello@gmail.com"
            onMouseEnter={() => audioEngine.playHoverTick()}
            onClick={() => audioEngine.playMechanicalClick()}
            className="group relative p-6 sm:p-8 rounded-2xl bg-carbon border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span>Send Mail</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                Direct Inquiries & Project Briefs
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg sm:text-2xl font-bold text-offWhite group-hover:text-amber-300 transition-colors break-all">
                  eltonjohndmello@gmail.com
                </h3>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all w-fit"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Response within 24 hours</span>
              </span>
              <span className="text-neutral-500 font-mono text-[11px]">PRIORITY DISPATCH</span>
            </div>
          </a>

          {/* Card 2: Instant WhatsApp & Phone Line */}
          <a
            href="https://wa.me/918310826860?text=Hi%20Elton%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20editing%20project."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => audioEngine.playHoverTick()}
            onClick={() => audioEngine.playMechanicalClick()}
            className="group relative p-6 sm:p-8 rounded-2xl bg-carbon border border-white/[0.08] hover:border-emerald-500/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-emerald-400 transition-colors">
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                WhatsApp & Direct Call Line
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-offWhite group-hover:text-emerald-300 transition-colors">
                +91 83108 26860
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant messenger active</span>
              </span>
              <span className="text-neutral-500 font-mono text-[11px]">1-TAP CONNECT</span>
            </div>
          </a>
        </div>

        {/* Social Ecosystem & Verification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <a
            href="https://www.instagram.com/_elton.dmello___/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => audioEngine.playHoverTick()}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-crimson/50 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <Instagram className="w-4 h-4 text-crimson" />
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-offWhite transition-colors" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono block uppercase">Social Visuals</span>
              <span className="text-xs font-semibold text-offWhite group-hover:text-amber-400 transition-colors">
                @_elton.dmello___
              </span>
            </div>
          </a>

          <a
            href="https://wa.me/918310826860"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => audioEngine.playHoverTick()}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/50 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-offWhite transition-colors" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono block uppercase">Quick Ping</span>
              <span className="text-xs font-semibold text-offWhite group-hover:text-emerald-400 transition-colors">
                WhatsApp Direct
              </span>
            </div>
          </a>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono block uppercase">Base & Hubs</span>
              <span className="text-xs font-semibold text-offWhite">
                Goa · Bangalore, IN
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="w-2 h-2 rounded-full bg-blue-400/80" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono block uppercase">Integrity</span>
              <span className="text-xs font-semibold text-offWhite">
                Full NDA Protection
              </span>
            </div>
          </div>
        </div>

        {/* Studio Production Finale Banner - Eliminates Dead Gap & Drives Bookings */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.12] bg-gradient-to-b from-[#131318] via-[#0e0e12] to-[#09090c] p-6 sm:p-10 md:p-14 shadow-2xl">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono text-amber-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE FOR PROJECTS · LET&apos;S COLLABORATE</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-offWhite tracking-tight mb-4">
                Have a vision in mind? Let&apos;s craft something unforgettable.
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light mb-6">
                From high-octane commercial automotive edits to cinematic travel reels, luxury café showcases, and festival stage visuals — every project is tuned with surgical rhythm, custom sound foley, and theater-grade color grading.
              </p>

              {/* Slate Tags */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  ✦ 4K UHD Master Delivery
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  ✦ 9:16 Vertical High-Retention
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  ✦ After Effects & Motion Graphics
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  ✦ Fast 48-Hour Turnaround
                </span>
              </div>
            </div>

            {/* Direct Action Hub */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href="mailto:eltonjohndmello@gmail.com?subject=New%20Project%20Inquiry%20-%20Elton%20D'Mello"
                onMouseEnter={() => audioEngine.playHoverTick()}
                onClick={() => audioEngine.playMechanicalClick()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-amber-400/20 text-center"
              >
                <span>Start a Project Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918310826860?text=Hi%20Elton%2C%20let's%20discuss%20a%20new%20video%20project."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverTick()}
                onClick={() => audioEngine.playMechanicalClick()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-offWhite font-semibold text-sm transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
