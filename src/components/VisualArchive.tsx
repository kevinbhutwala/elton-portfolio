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
  originalFileName: string;
}

const archivePhotos: ArchivePhoto[] = [
  {
    id: 'c1',
    src: '/clicks/IMG_2580.jpg',
    title: 'Solitary Fishing Boat at Dusk',
    category: 'Coastal Twilight',
    iso: 'ISO 200',
    shutter: '1/160s',
    focal: '35mm Cine',
    location: 'Goa Coastline',
    aspect: '9:16 Scope',
    colorGrade: 'Sunset Amber & Teal Wave',
    originalFileName: 'IMG_2580',
  },
  {
    id: 'c2',
    src: '/clicks/IMG_2536.jpg',
    title: 'Vidhana Soudha Fireworks Celebration',
    category: 'Night Still',
    iso: 'ISO 1250',
    shutter: '1/50s',
    focal: '28mm Prime',
    location: 'Bangalore, Karnataka',
    aspect: '9:16 Scope',
    colorGrade: 'Pyrotechnic Crimson & Gold',
    originalFileName: 'IMG_2536',
  },
  {
    id: 'c3',
    src: '/clicks/IMG_2595.jpg',
    title: 'Lewis Afterparty',
    category: 'Night Still',
    iso: 'ISO 3200',
    shutter: '1/30s',
    focal: '24mm Wide Prime',
    location: 'Social Club, Bangalore',
    aspect: '9:16 Frame',
    colorGrade: 'Neon Red & Club Motion Flare',
    originalFileName: 'IMG_2595',
  },
  {
    id: 'c4',
    src: '/clicks/IMG_2591.jpg',
    title: 'Sachet Parampara Live Concert',
    category: 'Live Stage',
    iso: 'ISO 1600',
    shutter: '1/250s',
    focal: '50mm Cine',
    location: 'Live Arena Concert',
    aspect: '9:16 Frame',
    colorGrade: 'Stage Pyro & Amber Haze',
    originalFileName: 'IMG_2591',
  },
  {
    id: 'c5',
    src: '/clicks/IMG_2593.jpg',
    title: 'BMW M2 Coupe Street Motion Blur',
    category: 'Automotive Motion',
    iso: 'ISO 400',
    shutter: '1/20s Panning',
    focal: '85mm Portrait Cine',
    location: 'Bangalore City Traffic',
    aspect: '3:4 Aspect',
    colorGrade: 'Warm Tungsten Motion Tracking',
    originalFileName: 'IMG_2593',
  },
  {
    id: 'c6',
    src: '/clicks/IMG_2556.jpg',
    title: 'Golden Sunset Silhouette by the Shore',
    category: 'Golden Hour',
    iso: 'ISO 100',
    shutter: '1/500s',
    focal: '50mm Prime',
    location: 'Goa Beach',
    aspect: '9:16 Frame',
    colorGrade: 'Amber Sunburst & Deep Black Silhouettes',
    originalFileName: 'IMG_2556',
  },
  {
    id: 'c7',
    src: '/clicks/IMG_2581.jpg',
    title: 'Gilded Sunlight on Ocean Waves',
    category: 'Nature Texture',
    iso: 'ISO 160',
    shutter: '1/800s',
    focal: '70mm Telephoto',
    location: 'Arabian Sea Shore',
    aspect: '9:16 Frame',
    colorGrade: 'Liquid Gold Highlights & Deep Indigo',
    originalFileName: 'IMG_2581',
  },
  {
    id: 'c8',
    src: '/clicks/IMG_2592.jpg',
    title: 'Chembra Peak, Wayanad, Kerala',
    category: 'Cinematics',
    iso: 'ISO 250',
    shutter: '1/125s',
    focal: '85mm Landscape Cine',
    location: 'Chembra Peak, Wayanad, Kerala',
    aspect: '3:4 Aspect',
    colorGrade: 'Moody Forest Green & Cloud Diffusion',
    originalFileName: 'IMG_2592',
  },
  {
    id: 'c9',
    src: '/clicks/IMG_2589.jpg',
    title: 'Wave One Skyscraper at Twilight Glow',
    category: 'Architectural',
    iso: 'ISO 320',
    shutter: '1/80s',
    focal: '35mm T2.0',
    location: 'Urban Skyline',
    aspect: '2:3 Vertical',
    colorGrade: 'Purple Sunset & Glass Blue Reflex',
    originalFileName: 'IMG_2589',
  },
  {
    id: 'c10',
    src: '/clicks/IMG_2541.jpg',
    title: 'Canopy of Coconut Palms over Rocky Cove',
    category: 'Cinematics',
    iso: 'ISO 200',
    shutter: '1/250s',
    focal: '16mm Ultra-Wide',
    location: 'Vagator / Anjuna Shore, Goa',
    aspect: '3:4 Aspect',
    colorGrade: 'Tropical Emerald & Sky Cyan',
    originalFileName: 'IMG_2541',
  },
  {
    id: 'c11',
    src: '/clicks/IMG_0010.jpg',
    title: 'Curved Palm on Clear Turquoise Waters',
    category: 'Cinematics',
    iso: 'ISO 100',
    shutter: '1/640s',
    focal: '24mm Wide Prime',
    location: 'Island Shoreline',
    aspect: '3:4 Aspect',
    colorGrade: 'Clean Aqua Cyan & Coastal White',
    originalFileName: 'IMG_0010',
  },
  {
    id: 'c12',
    src: '/clicks/IMG_0108.jpg',
    title: 'Portuguese Heritage Baroque Church',
    category: 'Architectural',
    iso: 'ISO 160',
    shutter: '1/400s',
    focal: '35mm Cine',
    location: 'Old Goa Heritage Basilica',
    aspect: '3:4 Aspect',
    colorGrade: 'Whitewash Stucco & Deep Teal Sky',
    originalFileName: 'IMG_0108',
  },
  {
    id: 'c13',
    src: '/clicks/IMG_2594.jpg',
    title: 'Pamban Sea Bridge & Railway Cabin',
    category: 'Cinematics',
    iso: 'ISO 250',
    shutter: '1/200s',
    focal: '50mm Vintage Prime',
    location: 'Pamban Bridge, Rameshwaram',
    aspect: '2:3 Vertical',
    colorGrade: 'Ocean Cerulean & Vintage Ochre',
    originalFileName: 'IMG_2594',
  },
  {
    id: 'c14',
    src: '/clicks/IMG_2540.jpg',
    title: 'Artisan Cafe Still Life with Matcha & Croissant',
    category: 'Lifestyle Still',
    iso: 'ISO 400',
    shutter: '1/120s',
    focal: '50mm F1.8 Prime',
    location: 'Boutique Roastery, Bangalore',
    aspect: '3:4 Aspect',
    colorGrade: 'Warm Coffee Brown & Matcha Green',
    originalFileName: 'IMG_2540',
  },
  {
    id: 'c15',
    src: '/clicks/IMG_2539.jpg',
    title: 'Luxury Courtyard Pool & Cloudscape',
    category: 'Architectural',
    iso: 'ISO 125',
    shutter: '1/500s',
    focal: '18mm Ultra-Wide',
    location: 'Boutique Resort Lounge',
    aspect: '3:4 Aspect',
    colorGrade: 'Sunlit Azure & Sandstone Ochre',
    originalFileName: 'IMG_2539',
  },
];

type LensFilter = 'all' | 'cinematic' | 'night' | 'architecture' | 'nature';

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
    if (activeFilter === 'night') return p.category.includes('Night') || p.category.includes('Live Stage');
    if (activeFilter === 'cinematic') return p.category.includes('Cinematics') || p.category.includes('Automotive');
    if (activeFilter === 'architecture') return p.category.includes('Architectural') || p.category.includes('Lifestyle');
    if (activeFilter === 'nature') return p.category.includes('Nature') || p.category.includes('Coastal') || p.category.includes('Golden Hour');
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

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioEngine.playMechanicalClick();
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) lenis.stop();

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const htmlOriginalOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = htmlOriginalOverflow;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
      if (lenis) lenis.start();
    };
  }, [activePhoto, inspectIndex, filteredPhotos]);

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
        </div>

        {/* Lens / Aesthetic Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-carbon border border-white/[0.08] overflow-x-auto max-w-full text-xs">
            {[
              { id: 'all', label: 'All Clicks (15)' },
              { id: 'cinematic', label: 'Cinematics & Motion' },
              { id: 'night', label: 'Concert & Night' },
              { id: 'nature', label: 'Nature & Shore' },
              { id: 'architecture', label: 'Architecture & Stills' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  audioEngine.playHoverTick();
                  setActiveFilter(tab.id as LensFilter);
                }}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-amber-400 text-obsidian font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-offWhite hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>35MM STAGE ARCHIVE · RAW COLOR TIMED</span>
          </div>
        </div>

        {/* The Grid: 35mm Celluloid Contact Sheet */}
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
                <span className="text-neutral-300 font-mono text-[9px] bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/10">{photo.originalFileName}</span>
                <span className="text-neutral-400 hidden xs:inline">{photo.iso}</span>
              </div>

              {/* Image Container with Film Grain & Color Timing Filter */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-carbon">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  quality={95}
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
                    <span>Inspect Click</span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/75 backdrop-blur-sm border border-white/[0.08] transition-transform duration-300">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-semibold mb-0.5">
                    <span>{photo.category}</span>
                    <span className="text-neutral-400 font-mono text-[9px]">{photo.focal}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-offWhite truncate" title={photo.title}>
                    {photo.title}
                  </h4>
                  <div className="text-[10px] text-neutral-400 truncate mt-0.5 flex items-center justify-between">
                    <span>{photo.location}</span>
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
          <span className="text-[11px] text-neutral-500 font-mono">15 FRAMES IN LAB ARCHIVE</span>
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
              <span className="text-neutral-400 font-mono text-[10px] bg-white/[0.08] px-2 py-0.5 rounded border border-white/10">
                {activePhoto.originalFileName}
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
                quality={98}
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
