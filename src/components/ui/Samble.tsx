'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: '8%',
        strokeWidthMax: '31%',
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7,
    },
};

interface TransitionScribbleProps {
    /** Ref to the element that triggers the transition (e.g., your Logo button) */
    triggerRef?: React.RefObject<HTMLElement | null>;
    /** Ref to a custom cursor if you need to hide it during transition */
    cursorRef?: React.RefObject<HTMLElement | null>;
    /** The SVG or Node to display spinning in the center of the screen */
    logoNode?: React.ReactNode;
    /** Whether the animation should run automatically on mount */
    autoPlay?: boolean;
}

export default function TransitionScribble({
    triggerRef,
    cursorRef,
    logoNode,
    autoPlay = true,
}: TransitionScribbleProps) {
    // ─── Refs ─────────────────────────────────────────────────────────────
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const transitionLogoWrapperRef = useRef<HTMLDivElement>(null);
    const transitionLogoSvgRef = useRef<HTMLDivElement>(null);
    const isAnimatingRef = useRef(false);

    // ─── Animation Logic ──────────────────────────────────────────────────
    const runScribbleAnimation = useCallback(
        (e?: Event | React.MouseEvent) => {
            if (e) e.preventDefault();

            if (
                isAnimatingRef.current ||
                document.body.classList.contains('is-transitioning') ||
                !svgRef.current ||
                !pathRef.current ||
                !transitionLogoWrapperRef.current ||
                !transitionLogoSvgRef.current
            ) {
                return;
            }

            isAnimatingRef.current = true;
            document.body.classList.add('is-transitioning');

            const config = ANIMATION_CONFIG.transitionScribble;
            const durIn = config.durationIn || 0.8;
            const durOut = config.durationOut || 1.5;

            // Colors
            const transitionColors = [
                'var(--color-green)',
                'var(--color-lightblue)',
                'var(--color-darkblue)',
                'var(--color-lightgreen)',
                'var(--color-orange)',
                'var(--color-maroon)',
                'var(--color-pink)',
            ];
            const randomColor =
                transitionColors[Math.floor(Math.random() * transitionColors.length)];

            const lightColors = [
                'var(--color-lightblue)',
                'var(--color-lightgreen)',
                'var(--color-pink)',
            ];
            const logoColor = lightColors.includes(randomColor) ? '#000' : '#fff';

            // Initial Setup
            gsap.set(svgRef.current, {
                scale: config.scale,
                color: randomColor,
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
            });

            const pathLength = pathRef.current.getTotalLength();
            const l = pathLength + 5;

            gsap.set(pathRef.current, {
                strokeDasharray: l,
                strokeDashoffset: l,
                strokeWidth: config.strokeWidthStart,
                opacity: 1,
            });

            transitionLogoWrapperRef.current.style.color = logoColor;
            gsap.set(transitionLogoWrapperRef.current, { opacity: 0, scale: 1 });

            // Hide custom cursor if passed
            if (cursorRef?.current) {
                gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
            }

            // Timeline Setup
            const drawTl = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove('is-transitioning');
                    gsap.set(pathRef.current, { strokeWidth: '0%' });
                    gsap.set(transitionLogoWrapperRef.current, { opacity: 0 });
                    isAnimatingRef.current = false;
                },
            });

            // Scribble In
            drawTl.to(pathRef.current, { strokeDashoffset: 0, duration: durIn, ease: 'power1.inOut' }, 0);
            drawTl.to(pathRef.current, { strokeWidth: config.strokeWidthMax, duration: durIn, ease: 'power2.inOut' }, 0);

            // Trigger scroll reset midpoint
            drawTl.call(
                () => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const lenis = (window as any).__lenis;
                    if (lenis) lenis.scrollTo(0, { immediate: true });
                    else window.scrollTo(0, 0);
                },
                undefined,
                durIn
            );

            // Scribble Out
            drawTl.to(pathRef.current, { strokeDashoffset: -l, duration: durOut, ease: 'power2.inOut' }, durIn);
            drawTl.to(pathRef.current, { strokeWidth: config.strokeWidthStart, duration: durOut, ease: 'power2.inOut' }, durIn);

            // Dynamic Logo Animation
            drawTl.set(transitionLogoWrapperRef.current, { autoAlpha: 0 }, 0);
            drawTl.to(
                transitionLogoWrapperRef.current,
                {
                    autoAlpha: 1,
                    duration: durIn * 0.5,
                    ease: 'power2.out',
                    onStart: () => {
                        gsap.to(transitionLogoSvgRef.current, {
                            rotation: 5,
                            duration: 0.15,
                            repeat: -1,
                            yoyo: true,
                            ease: 'steps(1)',
                            overwrite: 'auto',
                        });
                    },
                },
                durIn * 0.5
            );

            drawTl.set(
                transitionLogoWrapperRef.current,
                {
                    autoAlpha: 0,
                    onComplete: () => {
                        gsap.killTweensOf(transitionLogoSvgRef.current);
                        gsap.set(transitionLogoSvgRef.current, { rotation: 0 });
                    },
                },
                durIn + durOut * 0.48
            );
        },
        [cursorRef]
    );

    // ─── Lifecycle & Events ───────────────────────────────────────────────
    useEffect(() => {
        let timer: NodeJS.Timeout;
        const currentTrigger = triggerRef?.current;

        // Attach event listener to trigger ref instead of querying the DOM
        if (currentTrigger) {
            currentTrigger.addEventListener('click', runScribbleAnimation);
        }

        if (autoPlay) {
            timer = setTimeout(() => runScribbleAnimation(), 100);
        }

        // Cleanup: avoids memory leaks and React 18 strict mode double-firing
        return () => {
            if (timer) clearTimeout(timer);
            if (currentTrigger) {
                currentTrigger.removeEventListener('click', runScribbleAnimation);
            }

            // Safely kill specific GSAP tweens connected to our refs
            if (pathRef.current) gsap.killTweensOf(pathRef.current);
            if (svgRef.current) gsap.killTweensOf(svgRef.current);
            if (transitionLogoWrapperRef.current) gsap.killTweensOf(transitionLogoWrapperRef.current);
            if (transitionLogoSvgRef.current) gsap.killTweensOf(transitionLogoSvgRef.current);
            
            document.body.classList.remove('is-transitioning');
        };
    }, [autoPlay, runScribbleAnimation, triggerRef]);

    return (
        <>
            {/* The Scribble SVG */}
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3222 3114"
                fill="none"
                preserveAspectRatio="none"
                className="pointer-events-none w-full h-full"
            >
                <path
                    ref={pathRef}
                    d="M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945C960.614 35.3048 997.574 24.7448 944.014 110.385C890.454 196.025 745.254 378.185 571.454 634.385C397.654 890.585 199.654 1215.3 110.854 1382.58C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62C107.334 1531.38 139.014 1512.9 367.854 1319.9C596.694 1126.9 1021.73 759.945 1255.21 555.065C1488.69 350.185 1517.73 318.505 1527.41 306.145C1537.09 293.785 1526.53 301.705 1346.85 618.625C1167.17 935.545 818.694 1561.22 635.214 1896.74C451.734 2232.26 443.814 2258.66 447.654 2268.3C451.494 2277.94 467.334 2270.02 511.134 2236.9C554.934 2203.78 626.214 2145.7 966.534 1817.46C1306.85 1489.22 1914.05 892.585 2263.81 557.505C2613.57 222.425 2687.49 166.985 2741.41 129.185C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248C2838.53 122.745 2817.41 167.625 2584.77 544.505C2352.13 921.385 1370.37 2165.43 1139.25 2537.83C908.134 2910.23 902.854 2926.07 902.774 2939.51C902.694 2952.95 907.974 2963.51 1255.21 2613.87C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037C2079.88 3256.96 2911.24 2018.56 3172 1793"
                    stroke="currentColor"
                    strokeLinecap="round"
                    style={{
                        strokeWidth: '0%',
                        strokeDashoffset: '0.001',
                        strokeDasharray: '0px, 999999px',
                    }}
                />
            </svg>

            {/* Replaces the dynamically created document.createElement('div') */}
            <div
                ref={transitionLogoWrapperRef}
                className="fixed left-1/2 top-1/2 z-[10000] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0 pointer-events-none transition-colors duration-100"
            >
                <div ref={transitionLogoSvgRef} className="h-auto w-[150px]">
                    {logoNode}
                </div>
            </div>
        </>
    );
}