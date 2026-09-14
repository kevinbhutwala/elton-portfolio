'use client';

import React from 'react';

export default function Manifesto() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-carbon border-t border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Editorial Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-offWhite leading-tight tracking-tight">
          Every cut has a purpose.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
          I work with rhythm, sound, and emotion to transform raw footage into stories that leave a lasting impression.
        </p>
      </div>
    </section>
  );
}
