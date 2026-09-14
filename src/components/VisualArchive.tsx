'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { audioEngine } from '@/lib/audioEngine';
import { Camera, Eye, Sliders, Maximize2, X, Sparkles, Film, ChevronRight, ChevronLeft, Layers, Shuffle } from 'lucide-react';

interface ArchivePhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  iso: string;
  shutter: string;
  focal: string;
  location: string;
  aspect: string;
  colorGrade: string;
}

const archivePhotos: ArchivePhoto[] = [
  {
    id: 'c1',
    src: '/clicks/IMG_2580.jpg',
    title: 'Neon Drift & Night Pacing',
    category: 'Night Still',
    iso: 'ISO 1250',
    shutter: '1/50s',
    focal: '35mm Cine',
    location: 'Bangalore, IN',
    aspect: '9:16 Frame',
    colorGrade: 'Halation Teal & Amber',
  },
  {
    id: 'c2',
    src: '/clicks/IMG_2536.jpg',
    title: 'Celluloid Grain Study 01',
    category: 'Cinematics',
    iso: 'ISO 400',
    shutter: '1/48s',
    focal: '50mm Anamorphic',
    location: 'Goa Coast',
    aspect: '9:16 Scope',
    colorGrade: 'Kodak 5219 500T',
  },
  {
    id: 'c3',
    src: '/clicks/IMG_2539.jpg',
    title: 'Shadow Depth & Contrast Ratio',
    category: 'Lighting Rig',
    iso: 'ISO 800',
    shutter: '1/60s',
    focal: '28mm Prime',
    location: 'Studio Stage A',
    aspect: '3:4 Aspect',
    colorGrade: 'Monochrome Low-Key',
  },
  {
    id: 'c4',
    src: '/clicks/IMG_2540.jpg',
    title: 'Golden Hour Flare Timing',
    category: 'Outdoor Cut',
    iso: 'ISO 200',
    shutter: '1/120s',
    focal: '85mm T1.5',
    location: 'Western Ghats',
    aspect: '3:4 Aspect',
    colorGrade: 'Warm Honey Highlights',
  },
  {
    id: 'c5',
    src: '/clicks/IMG_2541.jpg',
    title: 'Atmospheric Fog & Diffusion',
    category: 'Location Scout',
    iso: 'ISO 640',
    shutter: '1/50s',
    focal: '35mm T2.0',
    location: 'Wayanad Highlands',
    aspect: '3:4 Aspect',
    colorGrade: 'Muted Forest Green',
  },
  {
    id: 'c6',
    src: '/clicks/IMG_2556.jpg',
    title: 'Architectural Symmetry Frame',
    category: 'Composition',
    iso: 'ISO 320',
    shutter: '1/100s',
    focal: '24mm Ultra-Wide',
    location: 'Metro Terminal',
    aspect: '9:16 Frame',
    colorGrade: 'Industrial Bleach Bypass',
  },
  {
    id: 'c7',
    src: '/clicks/IMG_2581.jpg',
    title: 'Motion Blur Kinetic Texture',
    category: 'Speed Ramp',
    iso: 'ISO 1600',
    shutter: '1/24s',
    focal: '40mm Anamorphic',
    location: 'Expressway Route',
    aspect: '9:16 Scope',
    colorGrade: 'Tungsten Electric Red',
  },
  {
    id: 'c8',
    src: '/clicks/IMG_2589.jpg',
    title: 'Editorial Portrait Silhouette',
    category: 'Subject Cut',
    iso: 'ISO 500',
    shutter: '1/80s',
    focal: '50mm Cine',
    location: 'Backstage',
    aspect: '2:3 Vertical',
    colorGrade: 'Rich Deep Obsidian',
  },
  {
    id: 'c9',
    src: '/clicks/IMG_2591.jpg',
    title: 'Prism Refraction & Optics',
    category: 'VFX Element',
    iso: 'ISO 800',
    shutter: '1/50s',
    focal: '65mm Macro',
    location: 'Color Suite BLR',
    aspect: '1:2 Cinematic Strip',
    colorGrade: 'Spectrum Flare Split',
  },
  {
    id: 'c10',
    src: '/clicks/IMG_2592.jpg',
    title: 'Nightclub Bass Vibration',
    category: 'Music Visual',
    iso: 'ISO 3200',
    shutter: '1/40s',
    focal: '24mm F1.4',
    location: 'Club 21A BLR',
    aspect: '3:4 Aspect',
    colorGrade: 'Magenta Neon Saturation',
  },
  {
    id: 'c11',
    src: '/clicks/IMG_2593.jpg',
    title: 'Minimal Negative Space Balance',
    category: 'Framing',
    iso: 'ISO 100',
    shutter: '1/250s',
    focal: '50mm Prime',
    location: 'Coastline Sand Bar',
    aspect: '3:4 Aspect',
    colorGrade: 'Clean Celluloid Neutral',
  },
  {
    id: 'c12',
    src: '/clicks/IMG_2594.jpg',
    title: 'Raw Tape Cassette Aesthetic',
    category: 'Finishing',
    iso: 'ISO 1000',
    shutter: '1/50s',
    focal: '35mm Vintage Glass',
    location: 'Sound Stage',
    aspect: '2:3 Vertical',
    colorGrade: 'Fuji Reala Emulsion',
  },
  {
    id: 'c13',
    src: '/clicks/IMG_0010.jpg',
    title: 'Goa Dusk Marine Horizon',
    category: 'Landscape',
    iso: 'ISO 250',
    shutter: '1/60s',
    focal: '28mm T1.9',
    location: 'North Goa Shore',
    aspect: '3:4 Aspect',
    colorGrade: 'Indigo Twilight Fade',
  },
  {
    id: 'c14',
    src: '/clicks/IMG_0108.jpg',
    title: 'Chiaroscuro Form & Texture',
    category: 'Cinematics',
    iso: 'ISO 400',
    shutter: '1/100s',
    focal: '50mm Cine',
    location: 'Heritage Studio',
    aspect: '3:4 Aspect',
    colorGrade: 'Golden Film Highlight',
  },
];

type LensFilter = 'all' | 'film-grain' | 'anamorphic' | 'cinematic' | 'night';

export default function VisualArchive() {
  const [activeFilter, setActiveFilter] = useState<LensFilter>('all');
  const [activePhoto, setActivePhoto] = useState<ArchivePhoto | null>(null);
  const [inspectIndex, setInspectIndex] = useState<number>(0);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [filterMode, setFilterMode] = useState<'normal' | 'cinematic' | 'bw' | 'warm'>('cinematic');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = archivePhotos.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'night') return p.category.includes('Night') || p.category.includes('Music');
    if (activeFilter === 'anamorphic') return p.focal.includes('Anamorphic') || p.aspect.includes('Scope');
    if (activeFilter === 'film-grain') return p.colorGrade.includes('Kodak') || p.colorGrade.includes('Grain') || p.colorGrade.includes('Fuji');
    if (activeFilter === 'cinematic') return p.category.includes('Cinematics') || p.category.includes('Lighting');
    return true;
  });

  const handleInspect = (photo: ArchivePhoto, idx: number) => {
    audioEngine.playMechanicalClick();
    setActivePhoto(photo);
    setInspectIndex(idx);
  };

  const nextPhoto = () => {
    audioEngine.playHoverTick();
    const nextIdx = (inspectIndex + 1) % filteredPhotos.length;
    setInspectIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const prevPhoto = () => {
    audioEngine.playHoverTick();
    const prevIdx = (inspectIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setInspectIndex(prevIdx);
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  const handleLoupeMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <section id="archive" className="relative py-20 sm:py-28 md:py-36 bg-obsidian overflow-hidden border-t border-white/[0.06]">
      {/* Background Studio Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Massive Background Ghost Label */}
      <div className="absolute top-8 right-6 md:right-16 text-[11rem] md:text-[18rem] font-display font-black text-white/[0.015] leading-none pointer-events-none select-none tracking-tighter">
        RAW
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400">
            <Camera className="w-3.5 h-3.5 text-crimson" />
            <span>Behind The Lens · Visual Lab</span>
          </div>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Section Heading with Editorial Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
              The Visual Archive <span className="text-crimson font-light">· Stills</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Every cinematic cut begins with light, frame composition, and optical texture. A curated contact sheet of raw captures, framing studies, and lighting textures by Elton.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { key: 'all', label: 'All Frames (14)' },
              { key: 'cinematic', label: 'Cinematics' },
              { key: 'film-grain', label: 'Film Stock' },
              { key: 'anamorphic', label: 'Anamorphic' },
              { key: 'night', label: 'Night / Neon' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  setActiveFilter(tab.key as LensFilter);
                }}
                onMouseEnter={() => audioEngine.playHoverTick()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border ${
                  activeFilter === tab.key
                    ? 'bg-amber-400 text-obsidian border-amber-400 font-semibold shadow-[0_0_20px_rgba(229,168,83,0.3)]'
                    : 'bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:border-white/20 hover:text-offWhite'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Film Contact Sheet Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleInspect(photo, idx)}
              onMouseEnter={() => audioEngine.playHoverTick()}
              className="group relative bg-[#0d0d11] border border-white/[0.08] hover:border-amber-400/50 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:-translate-y-1"
            >
              {/* Negative Film Strip Header Details */}
              <div className="px-3 py-2 bg-black/60 border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="text-amber-400/90 font-bold">EXP_{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-neutral-500">{photo.aspect}</span>
                <span className="text-neutral-400 hidden xs:inline">{photo.iso}</span>
              </div>

              {/* Image Container with Film Grain & Color Timing Filter */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-carbon">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-105"
                />

                {/* Subtle Celluloid Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity" />

                {/* Film Sprocket Perforation Accents */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-2 bg-amber-400/60 rounded-[1px]" />
                  <div className="w-1.5 h-2 bg-amber-400/60 rounded-[1px]" />
                </div>

                {/* Center Inspect Trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-offWhite flex items-center gap-1.5 shadow-2xl">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>Inspect Frame</span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/70 backdrop-blur-sm border border-white/[0.08] transition-transform duration-300">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-semibold mb-0.5">
                    <span>{photo.category}</span>
                    <span className="text-neutral-400 font-mono text-[9px]">{photo.focal}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-offWhite truncate">
                    {photo.title}
                  </h4>
                  <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {photo.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-neutral-300">
            <Film className="w-4 h-4 text-amber-400" />
            <span>Click any still frame to open high-precision inspector with 2.5x Loupe and color profile controls.</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">14 FRAMES IN LAB ARCHIVE</span>
        </div>
      </div>

      {/* FULLSCREEN HIGH-PRECISION FRAME INSPECTOR MODAL */}
      {activePhoto && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[2000] bg-obsidian/98 backdrop-blur-3xl overflow-y-auto overscroll-contain flex flex-col justify-between p-4 sm:p-8 md:p-12 animate-fade-in"
        >
          {/* Top Inspector Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-medium">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-obsidian text-[11px] font-bold">
                FRAME_{String(inspectIndex + 1).padStart(2, '0')} / {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <span className="text-offWhite font-semibold truncate text-sm">
                {activePhoto.title}
              </span>
              <span className="text-neutral-500 hidden sm:inline">· {activePhoto.location}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                audioEngine.playMechanicalClick();
                setActivePhoto(null);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-offWhite flex items-center gap-1.5 transition-all shrink-0"
              aria-label="Close Inspector"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Stage: Interactive Image Viewport with Loupe Zoom */}
          <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
            <div
              onMouseEnter={() => setIsLoupeActive(true)}
              onMouseLeave={() => setIsLoupeActive(false)}
              onMouseMove={handleLoupeMove}
              className={`relative max-h-[65vh] aspect-[3/4] w-auto bg-carbon rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] cursor-crosshair select-none ${
                filterMode === 'bw'
                  ? 'grayscale'
                  : filterMode === 'warm'
                  ? 'sepia-[0.25] saturate-125'
                  : filterMode === 'cinematic'
                  ? 'contrast-110 saturate-105'
                  : ''
              }`}
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                width={1200}
                height={1600}
                priority
                className="w-auto h-[65vh] object-contain rounded-2xl"
              />

              {/* Interactive Loupe Zoom Element */}
              {isLoupeActive && (
                <div
                  className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-amber-400 shadow-[0_0_30px_rgba(229,168,83,0.5)] overflow-hidden hidden md:block"
                  style={{
                    left: `calc(${loupePos.x}% - 72px)`,
                    top: `calc(${loupePos.y}% - 72px)`,
                    backgroundImage: `url(${activePhoto.src})`,
                    backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                    backgroundSize: '280%',
                  }}
                >
                  <div className="absolute inset-0 bg-amber-400/[0.05]" />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-400">
                    2.8X LOUPE
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Arrows for Rapid Cycling */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={prevPhoto}
                className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-offWhite transition-all"
                title="Previous Frame (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs text-neutral-400 font-mono px-3">
                {inspectIndex + 1} of {filteredPhotos.length}
              </div>

              <button
                onClick={nextPhoto}
                className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-offWhite transition-all"
                title="Next Frame (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Precision Specs & Color Profile Switcher */}
          <div className="p-4 sm:p-6 bg-carbon/90 border border-white/10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            {/* Optical Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full md:w-auto">
              <div>
                <span className="text-neutral-500 uppercase block text-[10px] font-mono">LENS & OPTICS</span>
                <span className="text-offWhite font-semibold">{activePhoto.focal}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block text-[10px] font-mono">SENSOR EXPOSURE</span>
                <span className="text-amber-400 font-semibold">{activePhoto.iso} · {activePhoto.shutter}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block text-[10px] font-mono">COLOR TIMING</span>
                <span className="text-offWhite font-semibold">{activePhoto.colorGrade}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block text-[10px] font-mono">CANVAS RATIO</span>
                <span className="text-neutral-300 font-semibold">{activePhoto.aspect}</span>
              </div>
            </div>

            {/* Quick Filter Switcher */}
            <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
              <span className="text-neutral-400 text-[11px] mr-1 hidden sm:inline">Color LUT:</span>
              {(['cinematic', 'warm', 'bw', 'normal'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    audioEngine.playHoverTick();
                    setFilterMode(mode);
                  }}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium uppercase tracking-wide border transition-all ${
                    filterMode === mode
                      ? 'bg-amber-400 text-obsidian border-amber-400 font-bold'
                      : 'bg-white/[0.04] text-neutral-400 border-white/10 hover:text-offWhite'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
