// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Safe SSR check for ScrollTrigger registration
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─── Data ────────────────────────────────────────────────────────────────────
// const rows = [
//   { text: "CREATIVE DESIGN", direction: -1, speed: 1 },
//   { text: "VISUAL STORIES", direction: 1, speed: 1.1 },
//   { text: "MOTION & CODE", direction: -1, speed: 0.9 },
//   { text: "BOLD THINKING", direction: 1, speed: 1.2 },
//   { text: "FUTURE FORWARD", direction: -1, speed: 1 },
//   { text: "INFINITE IDEAS", direction: 1, speed: 0.95 },
// ];

// // ─── Helper: duplicate text for a seamless strip ──────────────────────────────
// const REPEAT = 4;
// function buildStrip(text) {
//   const chunk = `${text} · `;
//   return Array(REPEAT).fill(chunk).join("");
// }

// // ─── Row component ────────────────────────────────────────────────────────────
// function MarqueeRow({ text, direction, speed, index }) {
//   const stripRef = useRef(null);

//   useEffect(() => {
//     // Wrap inside gsap.context for proper React 18 cleanup
//     let ctx = gsap.context(() => {
//       const el = stripRef.current;
//       if (!el) return;

//       const distance = el.scrollWidth / 2;
//       const xStart = direction === -1 ? 0 : -distance;
//       const xEnd = direction === -1 ? -distance : 0;

//       gsap.fromTo(
//         el,
//         { x: xStart },
//         {
//           x: xEnd,
//           ease: "none",
//           scrollTrigger: {
//             trigger: document.body, // Safer than documentElement
//             start: "top top",
//             end: "bottom bottom",
//             scrub: 1.2 * speed,
//           },
//         }
//       );
//     });

//     // Revert completely destroys the timeline and the ScrollTrigger
//     return () => ctx.revert();
//   }, [direction, speed]);

//   return (
//     <div className="row-wrapper" style={{ "--index": index }}>
//       <div ref={stripRef} className="strip">
//         <span className="strip-inner">{buildStrip(text)}</span>
//       </div>
//     </div>
//   );
// }

// // ─── Main page component ──────────────────────────────────────────────────────
// export default function ScrollTextAnimation() {
//   const heroRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const pageRef = useRef(null);

//   // Entry animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".row-wrapper", {
//         opacity: 0,
//         y: 60,
//         duration: 1.1,
//         stagger: 0.12,
//         ease: "power3.out",
//         delay: 0.3,
//       });
//       gsap.from(heroRef.current, {
//         opacity: 0,
//         y: -30,
//         duration: 1,
//         ease: "power3.out",
//       });
//       gsap.from(subtitleRef.current, {
//         opacity: 0,
//         y: 20,
//         duration: 1,
//         delay: 0.5,
//         ease: "power3.out",
//       });
//     }, pageRef); // Scope animations to this specific component

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={pageRef}>
//       {/* ── Global styles injected via <style> ─────────────────────────────── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         :root {
//           --bg:       #0a0a0a;
//           --fg:       #f0ece4;
//           --accent:   #e8c547;
//           --mid:      #1a1a1a;
//           --border:   rgba(240,236,228,0.08);
//           --font-display: 'Bebas Neue', sans-serif;
//           --font-body:    'DM Sans', sans-serif;
//         }

//         html { scroll-behavior: smooth; }

//         body {
//           background: var(--bg);
//           color: var(--fg);
//           font-family: var(--font-body);
//           overflow-x: hidden;
//         }

//         /* ── Page shell ──────────────────────────────────────────────────── */
//         .page {
//           min-height: 500vh;
//         }

//         /* ── Sticky panel that holds the rows ───────────────────────────── */
//         .sticky-stage {
//           position: sticky;
//           top: 0;
//           height: 100vh;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           overflow: hidden;
//           gap: 0;
//         }

//         /* ── Grain overlay ───────────────────────────────────────────────── */
//         .sticky-stage::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
//           pointer-events: none;
//           z-index: 10;
//         }

//         /* ── Top badge ───────────────────────────────────────────────────── */
//         .top-badge {
//           position: absolute;
//           top: 2rem;
//           left: 50%;
//           transform: translateX(-50%);
//           font-family: var(--font-body);
//           font-size: 0.7rem;
//           font-weight: 500;
//           letter-spacing: 0.25em;
//           text-transform: uppercase;
//           color: var(--accent);
//           border: 1px solid var(--accent);
//           padding: 0.35rem 1rem;
//           border-radius: 999px;
//           z-index: 20;
//           white-space: nowrap;
//         }

//         /* ── Corner scroll indicator ─────────────────────────────────────── */
//         .scroll-hint {
//           position: absolute;
//           bottom: 2rem;
//           right: 2.5rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//           z-index: 20;
//         }
//         .scroll-hint span {
//           font-size: 0.65rem;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: rgba(240,236,228,0.4);
//           writing-mode: vertical-rl;
//         }
//         .scroll-line {
//           width: 1px;
//           height: 48px;
//           background: linear-gradient(to bottom, var(--accent), transparent);
//           animation: scrollPulse 1.6s ease-in-out infinite;
//         }
//         @keyframes scrollPulse {
//           0%, 100% { opacity: 0.3; transform: scaleY(1); }
//           50%       { opacity: 1;   transform: scaleY(1.15); }
//         }

//         /* ── Each row wrapper ────────────────────────────────────────────── */
//         .row-wrapper {
//           position: relative;
//           overflow: hidden;
//           padding: 0.1rem 0;
//         }

//         .row-wrapper::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0; right: 0;
//           height: 1px;
//           background: var(--border);
//         }
//         .row-wrapper:first-child::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 1px;
//           background: var(--border);
//         }

//         /* ── The moving strip ────────────────────────────────────────────── */
//         .strip {
//           will-change: transform;
//           white-space: nowrap;
//           padding: 0.4rem 0;
//         }

//         .strip-inner {
//           display: inline-block;
//           font-family: var(--font-display);
//           font-size: clamp(4rem, 9vw, 9rem);
//           line-height: 1;
//           letter-spacing: 0.02em;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(240,236,228,0.18);
//           transition: -webkit-text-stroke 0.3s;
//           user-select: none;
//         }

//         .row-wrapper:nth-child(even) .strip-inner {
//           color: var(--fg);
//           -webkit-text-stroke: 0px transparent;
//         }

//         /* ── Centre hero text (sits above the strips via z-index) ─────────── */
//         .hero-overlay {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           pointer-events: none;
//           z-index: 5;
//         }

//         .hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(1.2rem, 3vw, 2.5rem);
//           letter-spacing: 0.45em;
//           text-transform: uppercase;
//           color: var(--fg);
//           mix-blend-mode: difference;
//           text-align: center;
//         }

//         .hero-subtitle {
//           margin-top: 0.75rem;
//           font-size: clamp(0.7rem, 1.2vw, 0.85rem);
//           letter-spacing: 0.3em;
//           text-transform: uppercase;
//           color: var(--accent);
//           text-align: center;
//         }

//         .accent-dot {
//           display: inline-block;
//           width: 6px;
//           height: 6px;
//           background: var(--accent);
//           border-radius: 50%;
//           margin: 0 0.25em;
//           vertical-align: middle;
//         }

//         /* ── Scroll content below sticky ─────────────────────────────────── */
//         .scroll-content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 10vh 2rem;
//           gap: 6rem;
//         }

//         .content-card {
//           max-width: 680px;
//           width: 100%;
//           border: 1px solid var(--border);
//           padding: 3rem;
//           position: relative;
//           background: var(--mid);
//         }

//         .content-card::before {
//           content: attr(data-number);
//           position: absolute;
//           top: -1.5rem;
//           left: 2.5rem;
//           font-family: var(--font-display);
//           font-size: 5rem;
//           color: var(--accent);
//           opacity: 0.12;
//           line-height: 1;
//         }

//         .card-label {
//           font-size: 0.65rem;
//           letter-spacing: 0.3em;
//           text-transform: uppercase;
//           color: var(--accent);
//           margin-bottom: 1rem;
//         }

//         .card-heading {
//           font-family: var(--font-display);
//           font-size: clamp(2rem, 4vw, 3.5rem);
//           letter-spacing: 0.04em;
//           line-height: 1.05;
//           margin-bottom: 1.25rem;
//         }

//         .card-body {
//           font-size: 0.95rem;
//           line-height: 1.75;
//           color: rgba(240,236,228,0.55);
//           font-weight: 300;
//         }

//         /* ── Footer ──────────────────────────────────────────────────────── */
//         .site-footer {
//           text-align: center;
//           padding: 4rem 2rem;
//           border-top: 1px solid var(--border);
//           font-size: 0.7rem;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: rgba(240,236,228,0.2);
//         }
//       `}</style>

//       <div className="page">
//         {/* ── Sticky scrolling stage ── */}
//         <div className="sticky-stage">
//           <div className="top-badge">Scroll to Explore</div>

//           {/* animated rows */}
//           {rows.map((row, i) => (
//             <MarqueeRow
//               key={i}
//               text={row.text}
//               direction={row.direction}
//               speed={row.speed}
//               index={i}
//             />
//           ))}

//           {/* centre overlay */}
//           <div className="hero-overlay">
//             <h1 ref={heroRef} className="hero-title">
//               The Studio<span className="accent-dot" />Works
//             </h1>
//             <p ref={subtitleRef} className="hero-subtitle">
//               Crafting experiences that endure
//             </p>
//           </div>

//           {/* scroll cue */}
//           <div className="scroll-hint">
//             <div className="scroll-line" />
//             <span>Scroll</span>
//           </div>
//         </div>

//         {/* ── Below-fold content ── */}
//         <div className="scroll-content">
//           {[
//             {
//               n: "01",
//               label: "Our Discipline",
//               heading: "Design as a system, not a style.",
//               body: "We build cohesive visual languages that scale across every touchpoint — from a single icon to a full brand world.",
//             },
//             {
//               n: "02",
//               label: "Our Process",
//               heading: "Iteration is the product.",
//               body: "Every pixel is questioned. Every motion is purposeful. We treat each frame of animation as seriously as the headline it supports.",
//             },
//             {
//               n: "03",
//               label: "Our Belief",
//               heading: "Bold ideas deserve bold execution.",
//               body: "Safe design is invisible design. We take calculated creative risks to produce work that doesn't just look different — it performs differently.",
//             },
//           ].map((card) => (
//             <div className="content-card" key={card.n} data-number={card.n}>
//               <div className="card-label">{card.label}</div>
//               <h2 className="card-heading">{card.heading}</h2>
//               <p className="card-body">{card.body}</p>
//             </div>
//           ))}
//         </div>

//         <footer className="site-footer">
//           © {new Date().getFullYear()} The Studio · All rights reserved
//         </footer>
//       </div>
//     </div>
//   );
// }