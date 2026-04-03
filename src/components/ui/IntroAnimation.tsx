"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export const IntroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // gsap.context ensures smooth cleanup in React 18 strict mode
    const ctx = gsap.context(() => {
      if (
        !pathRef.current ||
        !containerRef.current ||
        !logoRef.current ||
        !bgWrapperRef.current
      )
        return;

      const pathLength = pathRef.current.getTotalLength();
      const l = pathLength + 5;

      // 1. Initial Setup: Make the scribble fully cover the screen
      gsap.set(pathRef.current, {
        strokeDasharray: l,
        strokeDashoffset: 0,
        strokeWidth: "35%", 
        opacity: 1,
      });

      // 2. Start the shaking animation instantly (pulled from your original code)
      const shakeTween = gsap.to(logoRef.current, {
        rotation: 5,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)", // This gives it that specific, choppy stop-motion feel
      });

      const tl = gsap.timeline({
        onComplete: () => {
          // Hide completely from DOM after animation finishes
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

      // 3. Logo scale and fade out after 1s delay
      tl.to(logoRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: "power3.inOut",
        onStart: () => {
          // Kill the shaking tween smoothly right as it starts to fade out
          shakeTween.kill();
          gsap.to(logoRef.current, { rotation: 0, duration: 0.2 }); 
        }
      });

      // 4. The Seamless Swap: Instantly hide the solid background wrapper
      tl.set(bgWrapperRef.current, { autoAlpha: 0 });

      // 5. The Scribble Reveal: Animate the path OUT to reveal the homepage
      const durOut = 2.2; 
      tl.to(
        pathRef.current,
        {
          strokeDashoffset: -l, // Un-draw the line
          duration: durOut,
          ease: "power2.inOut",
        },
        "<" 
      ).to(
        pathRef.current,
        {
          strokeWidth: "0%", // Shrink the line width as it exits
          duration: durOut,
          ease: "power2.inOut",
        },
        "<"
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] origin-top overflow-hidden"
    >
      {/* BOTTOM LAYER: The Scribble SVG 
        Colored exact same blue as the background. Acts as the reveal mechanism.
      */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3222 3114"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full pointer-events-none text-[#5468ff]"
      >
        <path
          ref={pathRef}
          d="M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945C960.614 35.3048 997.574 24.7448 944.014 110.385C890.454 196.025 745.254 378.185 571.454 634.385C397.654 890.585 199.654 1215.3 110.854 1382.58C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62C107.334 1531.38 139.014 1512.9 367.854 1319.9C596.694 1126.9 1021.73 759.945 1255.21 555.065C1488.69 350.185 1517.73 318.505 1527.41 306.145C1537.09 293.785 1526.53 301.705 1346.85 618.625C1167.17 935.545 818.694 1561.22 635.214 1896.74C451.734 2232.26 443.814 2258.66 447.654 2268.3C451.494 2277.94 467.334 2270.02 511.134 2236.9C554.934 2203.78 626.214 2145.7 966.534 1817.46C1306.85 1489.22 1914.05 892.585 2263.81 557.505C2613.57 222.425 2687.49 166.985 2741.41 129.185C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248C2838.53 122.745 2817.41 167.625 2584.77 544.505C2352.13 921.385 1370.37 2165.43 1139.25 2537.83C908.134 2910.23 902.854 2926.07 902.774 2939.51C902.694 2952.95 907.974 2963.51 1255.21 2613.87C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037C2079.88 3256.96 2911.24 2018.56 3172 1793"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>

   
      <div
        ref={bgWrapperRef}
        className="absolute inset-0 z-10 flex items-center justify-center bg-[#5468ff] text-white"
      >
        {/* We keep the ref and transformOrigin on this wrapper for GSAP */}
        <div
          ref={logoRef}
          className="select-none relative w-[250px] h-[80px] md:w-[350px] md:h-[100px]" 
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/assets/icons/digitallogo.svg" // <-- REPLACE with your actual image path
            alt="The Digital Company Logo"
            fill
            priority // ensures the intro image loads immediately
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};