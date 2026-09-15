'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { audioEngine } from '@/lib/audioEngine';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sliders, Film, ArrowRight, Smartphone } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gradeSplit, setGradeSplit] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:00');

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioEngine.playMechanicalClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Stop Lenis smooth scroll while modal is open
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) {
      lenis.stop();
    }

    // Capture current scroll position and freeze background
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

      // Restore document and body scroll
      document.documentElement.style.overflow = htmlOriginalOverflow;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      // Restore window scroll position
      window.scrollTo(0, scrollY);

      // Restart Lenis
      if (lenis) {
        lenis.start();
      }
    };
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const current = video.currentTime;
      const total = video.duration;
      setProgress((current / total) * 100);

      const curM = String(Math.floor(current / 60)).padStart(2, '0');
      const curS = String(Math.floor(current % 60)).padStart(2, '0');
      setCurrentTimeStr(`${curM}:${curS}`);
    };

    const handleLoadedMetadata = () => {
      const total = video.duration;
      const durM = String(Math.floor(total / 60)).padStart(2, '0');
      const durS = String(Math.floor(total % 60)).padStart(2, '0');
      setDurationStr(`${durM}:${durS}`);
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [project]);

  if (!project) return null;

  const togglePlay = () => {
    audioEngine.playMechanicalClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    audioEngine.playHoverTick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
  };

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setGradeSplit(Math.max(0, Math.min(100, pos)));
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider) return;
    handleSliderMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
    setProgress(percent * 100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
      data-lenis-prevent
      className="fixed inset-0 z-[1000] bg-obsidian/98 backdrop-blur-2xl overflow-y-auto overscroll-contain touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Fixed Control Bar */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-obsidian/95 border-b border-white/[0.08] px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between gap-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-300 min-w-0 truncate">
          <span className="text-amber-400 font-bold shrink-0">{project.number}</span>
          <span className="text-neutral-600 shrink-0">/</span>
          <span className="text-offWhite font-semibold tracking-wide truncate">
            {project.title}
          </span>
          <span className="hidden md:inline text-neutral-400 truncate">· {project.subtitle}</span>
        </div>

        <button
          onClick={() => {
            audioEngine.playMechanicalClick();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.04] text-xs font-medium text-neutral-200 hover:text-white transition-all shrink-0 min-h-[36px]"
          aria-label="Close Project Case Study"
        >
          <span>Close</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
        {/* Project Header Title */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-amber-400 mb-3">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.aspect}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-offWhite tracking-tight">
            {project.title}
          </h1>
          <p className="mt-2 text-base sm:text-lg text-neutral-400 font-medium">
            {project.client}
          </p>
        </div>

        {/* Video Player Display: Responsive Layout for Horizontal vs Vertical */}
        {project.isVertical ? (
          /* Vertical 9:16 Cinema Player with Side-by-side Overview */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-5 flex justify-center">
              <div
                ref={videoContainerRef}
                className="relative aspect-[9/16] w-full max-w-[250px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[340px] bg-carbon border border-white/15 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] group"
              >
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.heroImage}
                  playsInline
                  loop
                  muted={isAudioMuted}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer filter contrast-[1.12] brightness-[1.02] saturate-[1.05]"
                />

                {/* Vertical Play Overlay */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-obsidian/50 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-crimson flex items-center justify-center text-white shadow-2xl">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Vertical Scrubber Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/85 backdrop-blur-md flex flex-col gap-2 text-xs font-medium text-neutral-300">
                  {/* Progress scrubber bar */}
                  <div
                    onClick={handleSeek}
                    onTouchStart={(e) => {
                      if (!videoRef.current || !videoRef.current.duration || !e.touches[0]) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
                      videoRef.current.currentTime = percent * videoRef.current.duration;
                      setProgress(percent * 100);
                    }}
                    onTouchMove={(e) => {
                      if (!videoRef.current || !videoRef.current.duration || !e.touches[0]) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
                      videoRef.current.currentTime = percent * videoRef.current.duration;
                      setProgress(percent * 100);
                    }}
                    className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden relative cursor-pointer touch-none"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-crimson to-amber-gold transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={togglePlay} className="text-offWhite hover:text-amber-400 p-1" aria-label="Play/Pause">
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <span className="tabular-nums text-offWhite text-[11px]">{currentTimeStr} / {durationStr}</span>
                    <button onClick={toggleMute} className="text-offWhite hover:text-amber-400 p-1" aria-label="Mute/Unmute">
                      {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Video Production Stills & Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-2 gap-3">
                {project.gallery.slice(0, 2).map((imgUrl, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl border border-white/[0.08] overflow-hidden group shadow-lg">
                    <Image
                      src={imgUrl}
                      alt={`Production Still ${i + 1}`}
                      fill
                      quality={95}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-carbon border border-white/[0.08] rounded-xl text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase block text-[10px]">Client</span>
                  <span className="text-neutral-200 font-semibold truncate block">{project.client}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block text-[10px]">Camera</span>
                  <span className="text-neutral-200 font-semibold truncate block">{project.camera}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block text-[10px]">FPS</span>
                  <span className="text-neutral-200 font-semibold">{project.fps}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block text-[10px]">Suite</span>
                  <span className="text-amber-400 font-semibold truncate block">{project.software[0]}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Horizontal 16:9 / 2.39:1 Cinema Player (Wayanad) */
          <div
            ref={videoContainerRef}
            className="relative aspect-video w-full bg-carbon border border-white/[0.08] rounded-xl sm:rounded-2xl overflow-hidden group mb-10 sm:mb-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <video
              ref={videoRef}
              src={project.videoUrl}
              poster={project.heroImage}
              playsInline
              loop
              muted={isAudioMuted}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer filter contrast-[1.12] brightness-[1.02] saturate-[1.05]"
            />

            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-obsidian/40 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-crimson/95 hover:bg-crimson text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_40px_rgba(229,56,59,0.7)]">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Bottom Scrubber Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/80 backdrop-blur-md flex items-center justify-between text-xs font-medium text-neutral-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <button onClick={togglePlay} className="hover:text-offWhite transition-colors p-1" aria-label="Play/Pause">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span className="text-offWhite tabular-nums text-xs">{currentTimeStr} / {durationStr}</span>
              </div>

              <div
                onClick={handleSeek}
                onTouchStart={(e) => {
                  if (!videoRef.current || !videoRef.current.duration || !e.touches[0]) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
                  videoRef.current.currentTime = percent * videoRef.current.duration;
                  setProgress(percent * 100);
                }}
                onTouchMove={(e) => {
                  if (!videoRef.current || !videoRef.current.duration || !e.touches[0]) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
                  videoRef.current.currentTime = percent * videoRef.current.duration;
                  setProgress(percent * 100);
                }}
                className="flex-1 mx-3 sm:mx-6 h-2 sm:h-2.5 bg-neutral-800 rounded-full overflow-hidden relative cursor-pointer touch-none"
              >
                <div
                  className="h-full bg-gradient-to-r from-crimson to-amber-gold transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={toggleMute} className="hover:text-offWhite transition-colors p-1" aria-label="Mute/Unmute">
                  {isAudioMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 bg-carbon border border-white/[0.08] rounded-xl mb-10 sm:mb-16 text-xs font-medium">
          <div>
            <span className="text-neutral-500 uppercase block text-[11px] mb-1">Client</span>
            <span className="text-offWhite font-semibold break-words">{project.client}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[11px] mb-1">Camera System</span>
            <span className="text-offWhite font-semibold break-words">{project.camera}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[11px] mb-1">Timecode Base</span>
            <span className="text-offWhite font-semibold">{project.fps}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[11px] mb-1">Software Suite</span>
            <span className="text-amber-400 font-semibold break-words">{project.software.join(' · ')}</span>
          </div>
        </div>

        {/* INTERACTIVE COLOR GRADING COMPARISON SLIDER */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-semibold text-offWhite tracking-wide">
                Color Grading Comparison · Log vs Final Film Master
              </h3>
            </div>
            <span className="text-xs font-medium text-neutral-400 hidden sm:inline">
              Drag slider to compare
            </span>
          </div>

          <div
            ref={sliderRef}
            onMouseDown={() => setIsDraggingSlider(true)}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseMove={onMouseMove}
            onTouchStart={(e) => {
              setIsDraggingSlider(true);
              if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
            }}
            onTouchEnd={() => setIsDraggingSlider(false)}
            onTouchMove={onTouchMove}
            onClick={(e) => handleSliderMove(e.clientX)}
            className="relative aspect-video w-full bg-carbon border border-white/[0.08] rounded-xl sm:rounded-2xl overflow-hidden select-none cursor-ew-resize touch-none"
          >
            {/* Graded Look */}
            <Image
              src={project.gradeImage}
              alt="Graded Final"
              fill
              quality={95}
              className="object-cover"
            />
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-amber-400 border border-white/10">
              Graded Master
            </div>

            {/* Raw Log Look */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${gradeSplit}%` }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.rawImage}
                  alt="Raw Camera Log"
                  fill
                  quality={95}
                  className="object-cover filter contrast-75 brightness-110 saturate-50"
                />
              </div>
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-neutral-300 border border-white/10">
                Raw Camera Log
              </div>
            </div>

            {/* Split Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-offWhite shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ left: `${gradeSplit}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-obsidian border-2 border-offWhite flex items-center justify-center text-xs font-bold text-offWhite shadow-lg">
                ⇄
              </div>
            </div>
          </div>
        </div>

        {/* Production Stills Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-10 sm:mb-16">
            <h4 className="text-xs font-semibold text-offWhite uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Production Stills & Grading Frames</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((imgUrl, i) => (
                <div key={i} className="relative aspect-video rounded-xl border border-white/[0.08] overflow-hidden group shadow-xl">
                  <Image
                    src={imgUrl}
                    alt={`Production Still ${i + 1}`}
                    fill
                    quality={95}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA within modal */}
        <div className="p-5 sm:p-8 bg-carbon border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
          <div>
            <h4 className="font-display text-lg sm:text-xl text-offWhite font-bold">
              Have a similar film or reel in mind?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Let’s structure your footage into an award-winning cut.
            </p>
          </div>
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              onClose();
              const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
              if (lenis) {
                lenis.scrollTo('#contact');
              } else {
                const contactEl = document.getElementById('contact');
                contactEl?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-offWhite hover:bg-amber-gold text-obsidian text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg"
          >
            <span>Discuss This Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
