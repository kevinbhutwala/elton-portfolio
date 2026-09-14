'use client';

import React, { useState } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { Send, CheckCircle2, Mail, MessageSquare, Instagram, Globe } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Commercial Film',
    budget: '$5K – $10K',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playMechanicalClick();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      audioEngine.playCinematicSweep();
    }, 900);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Decorative Large Number */}
      <div className="absolute top-10 right-6 md:right-12 text-[10rem] md:text-[16rem] font-display font-light text-white/[0.015] leading-none pointer-events-none select-none">
        08
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Tag Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Initiate Collaboration</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Contact Headline */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
            Have a project in mind?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-lg">
            Available for commercial edits, music visuals, and brand reels. Based in India, collaborating worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Direct Links & Info (Left) */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            <div className="bg-carbon border border-white/[0.08] rounded-2xl p-6 space-y-6">
              <div>
                <span className="text-neutral-500 font-medium uppercase tracking-wider block text-[11px] mb-1">Direct Inquiries</span>
                <a
                  href="mailto:elton.editor@example.com"
                  className="text-base font-semibold text-offWhite hover:text-amber-400 transition-colors block"
                  onMouseEnter={() => audioEngine.playHoverTick()}
                >
                  elton.editor@example.com
                </a>
              </div>

              <div className="border-t border-white/[0.08] pt-4">
                <span className="text-neutral-500 font-medium uppercase tracking-wider block text-[11px] mb-1">WhatsApp / Phone</span>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors block"
                  onMouseEnter={() => audioEngine.playHoverTick()}
                >
                  +91 (0) 98765 43210
                </a>
              </div>

              <div className="border-t border-white/[0.08] pt-4">
                <span className="text-neutral-500 font-medium uppercase tracking-wider block text-[11px] mb-2.5">Channels & Profiles</span>
                <div className="grid grid-cols-2 gap-2.5 text-offWhite">
                  <a
                    href="https://www.instagram.com/_elton.dmello___/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/20 font-medium"
                  >
                    <Instagram className="w-3.5 h-3.5 text-crimson" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://vimeo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/20 font-medium"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Vimeo Pro</span>
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/20 font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Behance</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/20 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Turnaround Note */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-neutral-400 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
              <span className="leading-relaxed">Average response time within 24 hours. Full NDA support for unreleased commercial films and feature footage.</span>
            </div>
          </div>

          {/* Interactive Form (Right) */}
          <div className="lg:col-span-7 bg-carbon border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-display text-offWhite font-bold mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed mb-6">
                  Thank you for reaching out. Elton will review your project brief and respond within 24 hours with timeline availability.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-full border border-white/10 hover:border-amber-400 text-xs font-semibold text-offWhite transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Nolan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-obsidian border border-white/10 focus:border-amber-400 rounded-lg px-4 py-2.5 text-offWhite text-xs focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. director@studio.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-obsidian border border-white/10 focus:border-amber-400 rounded-lg px-4 py-2.5 text-offWhite text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-obsidian border border-white/10 focus:border-amber-400 rounded-lg px-4 py-2.5 text-offWhite text-xs focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Commercial Film">Commercial Film</option>
                      <option value="Music Visual">Music Visual / Video</option>
                      <option value="Brand Campaign">Brand Campaign</option>
                      <option value="Documentary Short">Documentary Short</option>
                      <option value="Fashion Editorial">Fashion Editorial</option>
                      <option value="Social Campaign">Social High-Velocity</option>
                      <option value="Color Grading Only">Color Grading Finishing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full bg-obsidian border border-white/10 focus:border-amber-400 rounded-lg px-4 py-2.5 text-offWhite text-xs focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Under $5K">Under $5K</option>
                      <option value="$5K – $10K">$5K – $10K</option>
                      <option value="$10K – $25K">$10K – $25K</option>
                      <option value="$25K+">$25K+ (Campaign / Feature)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Project Synopsis & Timeline *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell Elton about your footage, delivery deadline, reference links, and creative expectations..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 focus:border-amber-400 rounded-lg px-4 py-2.5 text-offWhite text-xs focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-offWhite text-obsidian hover:bg-amber-gold transition-all duration-300 text-xs font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSending ? (
                    <span>Sending Brief...</span>
                  ) : (
                    <>
                      <span>Start a Project</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
