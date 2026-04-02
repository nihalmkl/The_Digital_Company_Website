"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const IntroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context ensures smooth cleanup in React 18 strict mode
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide completely from DOM and accessibility tree after animation
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

      // 1. Slight logo scale and fade out after 1s delay
      tl.to(logoRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        delay: 1, // 1 second delay as requested
        ease: "power3.inOut",
      })
      // 2. The modern curved wipe up
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        // Animating border-radius creates that modern, liquid-like curve seen in the video
        borderBottomLeftRadius: "50%", 
        borderBottomRightRadius: "50%",
      }, "-=0.2"); // Overlap slightly with the logo animation for fluidity

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      // Hex #5468ff is a close match to the royal blue in the video
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#5468ff] text-white origin-top overflow-hidden"
    >
      <div 
        ref={logoRef} 
        // Tailwind styling for the logo (mimicking the cursive/script in the video)
        className="text-4xl md:text-5xl font-bold tracking-tight select-none"
        style={{ fontFamily: "cursive" }} // Replace with your actual custom font
      >
        The Digital Company
      </div>
    </div>
  );
};