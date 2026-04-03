'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ── 1. Create Lenis instance ────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,          // How long the inertia lasts (seconds). Higher = silkier
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      smoothWheel: true,      // Smooth mouse wheel
      touchMultiplier: 1.5,   // Touch sensitivity on mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // ── 2. Sync Lenis scroll position → GSAP ScrollTrigger ─────────────
    // This is CRITICAL — without it your existing GSAP scrub animations
    // will stutter because ScrollTrigger reads window.scrollY but Lenis
    // intercepts native scroll. This keeps them perfectly in sync.
    lenis.on('scroll', ScrollTrigger.update);

    // ── 3. Drive Lenis from GSAP's RAF ticker ──────────────────────────
    // Using GSAP's ticker (not requestAnimationFrame directly) ensures
    // Lenis and all GSAP animations run on the exact same frame cycle.
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis needs ms
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from skipping frames on tab switch

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}