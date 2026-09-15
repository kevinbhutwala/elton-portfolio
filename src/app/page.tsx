'use client';

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Project } from '@/types';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import ProjectModal from '@/components/ProjectModal';
import Showreel from '@/components/Showreel';
import TheEditTimeline from '@/components/TheEditTimeline';
import About from '@/components/About';
import VisualArchive from '@/components/VisualArchive';
import Services from '@/components/Services';
import MarqueeTrust from '@/components/MarqueeTrust';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import InteractiveCanvas from '@/components/InteractiveCanvas';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  const handleOpenContact = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo('#contact', { duration: 1.2 });
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayReel = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo('#reel', { duration: 1.2 });
    } else {
      const reelSection = document.getElementById('reel');
      reelSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-transparent text-offWhite selection:bg-crimson selection:text-white">
      {/* Background Interactive Canvas & Fluid Neon Spotlight */}
      <InteractiveCanvas />

      {/* Opening Preloader Film Clapper */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Persistent Floating Header */}
      <Header onOpenContact={handleOpenContact} />

      {/* Fullscreen Hero */}
      <Hero onPlayReel={handlePlayReel} />

      {/* Dedicated Master Showreel 2026 */}
      <Showreel />

      {/* Selected Featured Work - Unified Multi-Format Showcase */}
      <FeaturedWork onSelectProject={(p) => setSelectedProject(p)} />

      {/* Signature "THE EDIT" Interactive Timeline */}
      <TheEditTimeline />

      {/* About Elton - The Person Behind the Cut */}
      <About />

      {/* Visual Archive - Stills, Optics & Contact Sheet */}
      <VisualArchive />

      {/* Creative Services & Capabilities */}
      <Services onOpenContact={handleOpenContact} />

      {/* Bold Stats */}
      <Stats />

      {/* Trusted Studios Marquee */}
      <MarqueeTrust />

      {/* Contact & Brief Submission */}
      <Contact />

      {/* Minimal Footer */}
      <Footer />

      {/* Fullscreen Project Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
