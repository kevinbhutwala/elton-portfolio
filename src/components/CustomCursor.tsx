'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'play' | 'view' | 'drag' | 'link'>('default');

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate cursor if device has fine pointer / hover capability
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for hover targets
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], a, button, input, textarea, select');

      if (interactiveEl) {
        const cursorData = interactiveEl.getAttribute('data-cursor');
        if (cursorData === 'play') {
          setCursorVariant('play');
          setCursorText('PLAY');
          setIsHovered(true);
        } else if (cursorData === 'view') {
          setCursorVariant('view');
          setCursorText('VIEW');
          setIsHovered(true);
        } else if (cursorData === 'drag') {
          setCursorVariant('drag');
          setCursorText('DRAG');
          setIsHovered(true);
        } else {
          setCursorVariant('link');
          setCursorText('');
          setIsHovered(true);
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth RAF loop for outer ring
    let animId: number;
    const render = () => {
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'w-1.5 h-1.5 bg-amber-gold'
        }`}
      />

      {/* Magnetic / expanding ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] ${
          cursorVariant === 'play'
            ? 'w-20 h-20 bg-crimson/80 border border-crimson text-white scale-100 shadow-[0_0_24px_rgba(229,56,59,0.5)]'
            : cursorVariant === 'view'
            ? 'w-20 h-20 bg-amber-gold/90 border border-amber-gold text-obsidian scale-100 font-bold'
            : cursorVariant === 'drag'
            ? 'w-16 h-16 bg-white/20 border border-white/40 text-white text-[10px]'
            : isHovered
            ? 'w-12 h-12 bg-white/10 border border-amber-gold/60 scale-110'
            : 'w-8 h-8 border border-white/25 bg-transparent'
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[9px] tracking-[0.25em] uppercase font-mono font-semibold select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
