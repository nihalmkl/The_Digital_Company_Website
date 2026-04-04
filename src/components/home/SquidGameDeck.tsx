"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────
type CardTheme = "Maroon Red" | "Pink" | "Orange" | "Blue" | "Light Green" | "Green";
type CardType  = "Social" | "360" | "Activation" | "Design";

interface CardData {
  id:         number;
  title:      string;
  client:     string;
  type:       CardType;
  theme:      CardTheme;
  href:       string;
  image:      string;
  videoId?:   string;
  sticker:    string;
  stickerAlt: string;
}

// ─── Card Dataset (from source HTML) ─────────────────────────────────────────
const CDN = "https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939";

const CARDS: CardData[] = [
  {
    id: 1, title: "Feestje bouwe? App Douwe", client: "Douwe Egberts",
    type: "Social", theme: "Maroon Red", href: "/work/feestje-bouwe-app-douwe",
    image:   `${CDN}/68a46f25779a71fac3a11903_SnapInsta.jpg`,
    videoId: "1111296392",
    sticker: `${CDN}/68554241c2a3d2d86af1ab96_camera.svg`, stickerAlt: "Camera",
  },
  {
    id: 2, title: "Skibidi school", client: "Hema",
    type: "360", theme: "Pink", href: "/work/back-2-school",
    image:   `${CDN}/6880a344675f3a6144ed04df_01_HEMA_Back2School.avif`,
    videoId: "1103715825",
    sticker: `${CDN}/684a770ce7588a79d7cae693_bam.svg`, stickerAlt: "BAM",
  },
  {
    id: 3, title: "Hema socials", client: "Hema",
    type: "Social", theme: "Pink", href: "/work/hema-socials",
    image:   `${CDN}/686b7e0ed3ab3045b28a2012_3.avif`,
    videoId: "1099686069",
    sticker: `${CDN}/684a779451033677451dfc6b_smiley.svg`, stickerAlt: "Smiley",
  },
  {
    id: 4, title: "Kipsalon", client: "KFC",
    type: "360", theme: "Orange", href: "/work/kfc-kipsalon",
    image: `${CDN}/68663be0740c68b890d87ff6_kfc-kipsalon-thumbnail.avif`,
    sticker: `${CDN}/68556a8d46f4ae0aaa2ccd0d_lets-go.svg`, stickerAlt: "Let's Go",
  },
  {
    id: 5, title: "Squid Game", client: "Netflix",
    type: "Activation", theme: "Maroon Red", href: "/work/squid-game",
    image:   `${CDN}/6866999038def993f6901d98_c4b0a4b3-aa91-4239-85ab-0d24b205d802.avif`,
    videoId: "1098535315",
    sticker: `${CDN}/685569f6d4cfce7e8cc1b92b_cute.svg`, stickerAlt: "Cute",
  },
  {
    id: 6, title: "Lava wings", client: "KFC",
    type: "360", theme: "Orange", href: "/work/lava-wings",
    image:   `${CDN}/6866645f4654135be7a4e31f_kfc-LavaHotwings-project_thumbnail.avif`,
    videoId: "1098474208",
    sticker: `${CDN}/68554241c2a3d2d86af1ab96_camera.svg`, stickerAlt: "Camera",
  },
  {
    id: 7, title: "Your Next Story", client: "Cheaptickets",
    type: "360", theme: "Blue", href: "/work/your-next-story",
    image: `${CDN}/686cfe8ad8d2b53a8149d3fe_09-_-CheapTickets---Mock.avif`,
    sticker: `${CDN}/68556a8d46f4ae0aaa2ccd0d_lets-go.svg`, stickerAlt: "Let's Go",
  },
  {
    id: 8, title: "Jumbo Socials", client: "Jumbo",
    type: "Social", theme: "Blue", href: "/work/jumbo-socials",
    image:   `${CDN}/6867db00e618408f5fcbd90b_02.avif`,
    videoId: "1098806692",
    sticker: `${CDN}/685569f6d4cfce7e8cc1b92b_cute.svg`, stickerAlt: "Cute",
  },
  {
    id: 9, title: "Brand Campaign", client: "Naïf",
    type: "360", theme: "Light Green", href: "/work/naif-campaign",
    image:   `${CDN}/6867e54237e5dc45682b7ad1_project.avif`,
    videoId: "1098828807",
    sticker: `${CDN}/685569f6d4cfce7e8cc1b92b_cute.svg`, stickerAlt: "Cute",
  },
  {
    id: 10, title: "Brand Campaign", client: "Oxxio",
    type: "360", theme: "Blue", href: "/work/oxxio",
    image: `${CDN}/6867e08349ee400c76db25bb_1.avif`,
    sticker: `${CDN}/68556a7139df865b400fb432_good-vibes.svg`, stickerAlt: "Good Vibes",
  },
  {
    id: 11, title: "Netflix Socials", client: "Netflix",
    type: "Social", theme: "Light Green", href: "/work/netflix-socials",
    image:   `${CDN}/686d2b4a8061f50048495f40_duncan.avif`,
    videoId: "1099693520",
    sticker: `${CDN}/68554241c2a3d2d86af1ab96_camera.svg`, stickerAlt: "Camera",
  },
  {
    id: 12, title: "Smoothiebox", client: "Smoothiebox",
    type: "Design", theme: "Green", href: "/work/smoothiebox",
    image:   `${CDN}/686b959b09dca3375fba5ba4_1.avif`,
    videoId: "1099336073",
    sticker: `${CDN}/684a775e6fa681bca50721f3_hands-love.svg`, stickerAlt: "Hands Love",
  },
  {
    id: 13, title: "KFC Socials", client: "KFC",
    type: "Social", theme: "Orange", href: "/work/kfc-socials",
    image:   `${CDN}/68668570b1d8971ed16d3beb_02.avif`,
    videoId: "1098506799",
    sticker: `${CDN}/68554241c2a3d2d86af1ab96_camera.svg`, stickerAlt: "Camera",
  },
  {
    id: 14, title: "Ferry", client: "Netflix",
    type: "360", theme: "Maroon Red", href: "/work/netflix-ferry",
    image: `${CDN}/68668b10ee9a57f9367edf77_Ferry.avif`,
    sticker: `${CDN}/684a771ffad423c560f26204_fistbumb.svg`, stickerAlt: "Fist Bumb",
  },
];

// ─── Theme Palette ────────────────────────────────────────────────────────────
// Changed to directly map to pure Tailwind classes
const THEME_MAP: Record<CardTheme, { cardBg: string; tagBg: string; tagText: string }> = {
  "Maroon Red":  { cardBg: "bg-[#5A1422]", tagBg: "bg-[#F5D0DC]", tagText: "text-[#5A1422]" },
  "Pink":        { cardBg: "bg-[#B53D6A]", tagBg: "bg-[#FDE8F0]", tagText: "text-[#8A1F45]" },
  "Orange":      { cardBg: "bg-[#B54A10]", tagBg: "bg-[#FDEAD0]", tagText: "text-[#7A2E08]" },
  "Blue":        { cardBg: "bg-[#1640B0]", tagBg: "bg-[#D8E8FF]", tagText: "text-[#0A2880]" },
  "Light Green": { cardBg: "bg-[#5A9A2A]", tagBg: "bg-[#E8F8D0]", tagText: "text-[#2A5A0A]" },
  "Green":       { cardBg: "bg-[#1A7040]", tagBg: "bg-[#D0F0E0]", tagText: "text-[#0A4020]" },
};

// ─── Per-offset card transforms (matches source HTML exactly) ─────────────────
function getCardPos(offset: number) {
  const abs = Math.abs(offset);
  const dir = offset >= 0 ? 1 : -1;
  if (abs === 0) return { xp: 0,      yp: 0, rot: 0,      scale: 1.0, opacity: 1, z: 5 };
  if (abs === 1) return { xp: dir*25,   yp: 1, rot: dir*10,  scale: 0.9, opacity: 1, z: 4 };
  if (abs === 2) return { xp: dir*45,   yp: 5, rot: dir*15,  scale: 0.8, opacity: 1, z: 3 };
  return             { xp: dir*55,   yp: 5, rot: dir*20,  scale: 0.6, opacity: 0, z: 2 };
}

// ─── Type Icon SVGs ───────────────────────────────────────────────────────────
function TypeIcon({ type }: { type: CardType }) {
  if (type === "Social") return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M13.118 2.048c-.436-.106-.868.152-1.041.566C11 6.5 8 8.555 8 11.27v6.455c0 1.147.664 2.275 1.836 2.702 2.65.965 4.398 1.162 7.123.926 2.091-.182 3.663-1.785 4.098-3.72l.845-3.756C22.465 11.377 20.563 9 18 9l-3-.001c.469-2.815 1.615-6.103-1.882-6.952z"/>
      <path d="M2 11c0-.828.672-1.5 1.5-1.5h2C6.328 9.5 7 10.172 7 11v8c0 .828-.672 1.5-1.5 1.5h-2C2.672 20.5 2 19.828 2 19v-8z"/>
    </svg>
  );
  if (type === "360") return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M13.75 7.75a.75.75 0 00-1.5 0c0 2.426-.536 4-1.517 4.983C9.751 13.714 8.176 14.25 5.75 14.25a.75.75 0 000 1.5c2.426 0 4 .536 4.983 1.517C11.714 18.249 12.25 19.824 12.25 22.25a.75.75 0 001.5 0c0-2.426.536-4 1.517-4.983C16.249 16.284 17.824 15.75 20.25 15.75a.75.75 0 000-1.5c-2.426 0-4-.536-4.983-1.517C14.284 11.751 13.75 10.176 13.75 7.75z"/>
    </svg>
  );
  if (type === "Activation") return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M9.328 7.69c-.988-.397-2-.634-2.68.371L1.37 16.814c-.926.506-.84 1.84.145 2.226l12.88 5.061c1.012.397 2.001-.571 1.48-1.494L13.173 17.97l4.847-2.644a1 1 0 00.055-1.735L9.328 7.691z"/>
    </svg>
  );
  // Design
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M5.713 8.128L5.467 8.694a1 1 0 01-.929.631 1 1 0 01-.929-.631l-.246-.566A4.08 4.08 0 001.308 5.539l-.761-.34A1 1 0 010 4.307a1 1 0 01.547-.892l.717-.32A4.14 4.14 0 003.539 1.32L3.793.709A1 1 0 014.72.009a1 1 0 01.928.7l.253.61A4.14 4.14 0 007.975 4.257l.718.32a1 1 0 01.547.892 1 1 0 01-.547.892l-.76.339a4.08 4.08 0 01-2.22 3.428zM19.229 3.37l-4.94 3.843c-3.946-.974-7.73 1.333-8.788 5.284-.102.38-.134.765-.167 1.169-.115 1.394-.243 3.005-3.333 5.33 2.5 1.5 7 3.002 10.503 3.002 4.456 0 8.56-2.437 10.756-6.373 1.537-2.738 1.874-5.966 1.173-9.063l3.84-4.947a1 1 0 00-1.388-1.296l-.657.051z"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FlickSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const collectionRef  = useRef<HTMLDivElement>(null);
  const draggerRef     = useRef<HTMLDivElement>(null);
  const scribbleRef    = useRef<SVGPathElement>(null);
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const infoWrapRef    = useRef<HTMLDivElement>(null);
  const drawPath1Ref   = useRef<SVGPathElement>(null);
  const drawPath2Ref   = useRef<SVGPathElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const dragStartX   = useRef(0);
  const isDragging   = useRef(false);
  const isAnimating  = useRef(false);
  const liveIdx      = useRef(0);

  // ── Position all cards ──────────────────────────────────────────────────────
  const applyPositions = useCallback((idx: number, animate: boolean) => {
    const total = CARDS.length;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      let offset = i - idx;
      // Circular normalise: pick shortest path around the deck
      if (offset >  total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const p = getCardPos(offset);
      if (animate) {
        gsap.to(el, {
          xPercent: p.xp,
          yPercent: p.yp,
          rotation: p.rot,
          scale:    p.scale,
          opacity:  p.opacity,
          zIndex:   p.z,
          duration: 0.55,
          ease:     "power3.out",
          overwrite: "auto",
        });
      } else {
        gsap.set(el, {
          xPercent: p.xp,
          yPercent: p.yp,
          rotation: p.rot,
          scale:    p.scale,
          opacity:  p.opacity,
          zIndex:   p.z,
        });
      }
    });
  }, []);

  // ── Navigate ─────────────────────────────────────────────────────────────────
  const navigateTo = useCallback((newIdx: number, animate = true) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const idx = ((newIdx % CARDS.length) + CARDS.length) % CARDS.length;
    liveIdx.current = idx;
    setActiveIdx(idx);
    applyPositions(idx, animate);
    // Animate info text out → in
    if (infoWrapRef.current) {
      gsap.fromTo(
        infoWrapRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    }
    setTimeout(() => { isAnimating.current = false; }, 600);
  }, [applyPositions]);

  // ── Init positions (no animation) ────────────────────────────────────────────
  useEffect(() => { applyPositions(0, false); }, [applyPositions]);

  // ── Scribble SVG scroll-draw ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scribbleRef.current) return;
      const len = scribbleRef.current.getTotalLength();
      gsap.set(scribbleRef.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(scribbleRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end:   "center 30%",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── "View project" underline SVG – draw on mount & card change ─────────────
  useEffect(() => {
    [drawPath1Ref.current, drawPath2Ref.current].forEach((path) => {
      if (!path) return;
      const len = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: `${len} 999`, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out", delay: 0.3 }
      );
    });
  }, [activeIdx]);

  // ── Drag & pointer handlers ───────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      navigateTo(liveIdx.current + (delta < 0 ? 1 : -1));
    }
  }, [navigateTo]);

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ── Shortcuts ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateTo(liveIdx.current + 1);
      if (e.key === "ArrowLeft")  navigateTo(liveIdx.current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigateTo]);

  const card  = CARDS[activeIdx];
  const theme = THEME_MAP[card.theme];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-black text-white font-sans overflow-hidden py-0 md:py-40"
    >
      {/* ── Large Organic Blob Background (pale green, bottom-right) ──────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <svg
          viewBox="0 0 449 458"
          fill="none"
          className="absolute right-[5%] bottom-[60%] md:right-[16%] md:bottom-[8%] w-[clamp(260px,48vw,580px)] opacity-[0.88]"
        >
          <path
            d="M404.776 223.259C398.804 258.396 403.743 292.836 415.688 327.792C416.361 329.723 417.484 333.136 416.339 334.169L416.226 334.281C415.328 335.201 413.218 335.089 410.681 334.595C400.847 332.777 391.912 330.554 382.078 329.229C352.936 326.647 323.413 330.778 296.718 343.531C273.728 353.858 258.259 366.813 243.576 387.131C226.872 406.103 219.576 425.029 217.667 450.376C217.151 459.469 213.02 460.143 208.889 451.454C200.537 434.503 193.532 416.273 182.172 401.141C171.013 386.974 159.047 372.717 144.813 361.784C136.977 355.991 129.726 349.391 121.419 344.249C117.153 341.578 112.281 340.006 107.97 337.536C92.9953 327.186 75.6629 320.922 58.2856 315.848C41.0655 310.146 23.1044 307.003 4.96379 305.723C1.32668 305.633-1.74915 305.341 1.14707 301.39C3.84122 297.977 6.58028 294.744 8.98257 291.085C15.3812 281.52 21.3757 271.462 23.8902 259.967C25.372 252.513 27.7743 245.172 28.0662 237.561C27.9315 219.734 23.3963 201.459 12.8442 186.911C5.86184 177.414 9.29689 175.258 20.1184 175.438C38.9326 175.438 57.163 170.589 74.9893 164.796C92.5014 159.565 110.687 155.232 125.595 144.163C143.286 132.174 160.439 118.928 173.977 102.314C177.21 98.3179 179.253 93.5134 182.082 89.2476C186.819 82.7367 192.32 76.6973 195.553 69.1986C199.998 59.9487 202.221 49.5313 204.825 39.6078C206.509 32.6928 208.462 25.7778 209.226 18.6832C210.326 14.4624 207.542-0.71468 212.257 0.0262124C214.928 0.609946 218.341 6.08806 220.384 9.05163C225.256 16.1687 230.24 23.2408 234.753 30.6049C240.321 40.3263 249.279 47.1515 257.496 54.3583C262.278 58.5792 266.409 63.8328 271.618 67.7168C276.759 71.6233 282.551 74.4747 288.164 77.6179C305.384 88.5965 324.715 94.6808 343.821 101.506C351.387 104.425 359.312 106.198 367.328 107.276C391.103 110.531 414.812 115.695 438.835 115.65C444.313 115.807 453.72 114.64 446.199 123.261C422.288 153.099 411.018 187.113 404.754 223.237L404.776 223.259Z"
            fill="#E6FAB9"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center">

        {/* ── Scribble SVG (scroll-drawn, top-left area) ─────────────────── */}
        <div
          className="absolute pointer-events-none select-none z-0 top-[-10%] left-[4%] w-[clamp(52px,7vw,90px)]"
          aria-hidden
        >
          <svg viewBox="0 0 80 109" fill="none" className="w-full h-auto text-white">
            <path
              ref={scribbleRef}
              d="M11.1056 107.429C11.1056 107.429 41.3921 75.9563 1.85536 45.3846C39.6893 67.1983 37.5729 21.5813 34.6647 13.925C40.0573 22.0799 72.2872 32.0642 78.2717 2.44878"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* CARD FAN (Center area)                                           */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="relative mx-auto w-[clamp(260px,28vw,340px)] h-[clamp(380px,45vw,540px)] mb-16 mt-8 overflow-visible">
          {/* ── Type label (Floating Top Right) ────────────────────── */}
          <div className="absolute top-[10%] -right-[15%] md:-right-[25%] z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-extrabold tracking-wide shadow-xl border border-black/5">
              <TypeIcon type={card.type} />
              <span className="lowercase">{card.type}</span>
            </div>
          </div>

          {/* ── Main Sticker (Floating Bottom Left) ────────────────────── */}
          <div className="absolute bottom-[5%] -left-[15%] md:-left-[25%] z-20 pointer-events-none drop-shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.sticker}
              alt={card.stickerAlt}
              draggable={false}
              className="w-20 h-20 md:w-32 md:h-32 object-contain select-none"
              loading="lazy"
            />
          </div>

          {/* ── Cards (all stacked & transformed) ─────────────────────────── */}
          <div
            ref={collectionRef}
            className="absolute inset-0 overflow-visible"
          >
            {CARDS.map((c, i) => {
              const t = THEME_MAP[c.theme];
              return (
                <div
                  key={c.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`absolute inset-0 select-none [will-change:transform,opacity] ${i === activeIdx ? "cursor-grab" : "cursor-pointer"}`}
                  onClick={() => { if (i !== activeIdx) navigateTo(i); }}
                >
                  {/* INNER WRAPPER: Handles the border, background, and clips the image/video */}
                  <div 
                    className={`absolute inset-0 rounded-[1.5rem] overflow-hidden border-[3px] border-white/90 shadow-[0_15px_50px_rgba(0,0,0,0.6)] ${t.cardBg}`}
                  >
                    {/* Thumbnail image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.title}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Video overlay — only on active card */}
                    {c.videoId && i === activeIdx && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <iframe
                          src={`https://player.vimeo.com/video/${c.videoId}?api=1&muted=1&loop=1&background=1`}
                          allow="autoplay; fullscreen; picture-in-picture"
                          title={c.title}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] border-0"
                        />
                      </div>
                    )}

                    {/* Bottom gradient for tag readability */}
                    <div
                      className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,transparent_40%)]"
                    />

                    {/* Loading spinner (shown while video buffers) */}
                    {c.videoId && i === activeIdx && (
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/40 pointer-events-none">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-8 h-8 hidden"
                        >
                          <path
                            fill="currentColor"
                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              dur="1s"
                              from="0 50 50"
                              to="360 50 50"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* CLIENT TAG: Placed outside the hidden overflow, overlapping the bottom edge */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-1.5 rounded-[12px] text-[12px] font-bold tracking-wide shadow-md whitespace-nowrap z-20 ${t.tagBg} ${t.tagText}`}
                  >
                    {c.client}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Drag overlay (covers the collection, handles all pointer events) ── */}
          <div
            ref={draggerRef}
            className="absolute -top-[40px] -bottom-[40px] -left-[80px] -right-[80px] z-10 cursor-grab touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM INFO (Centered project title + link)                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={infoWrapRef}
          className="flex flex-col items-center justify-center text-center gap-4 relative z-20 max-w-[clamp(260px,80vw,680px)] mx-auto"
        >
          {/* Project title */}
          <h3
            className="font-black text-white leading-tight text-[clamp(1.8rem,4vw,2.6rem)] cursor-[url('/assets/icons/cursortext.svg'),text]"
          >
            {card.title}
          </h3>

          {/* "View project" link with drawn SVG underline */}
          <Link
            href={card.href}
            className="group relative inline-flex items-center justify-center shrink-0 text-white text-[15px] font-bold pb-2 hover:text-white/80 transition-colors"
          >
            <span className="relative z-10">View project</span>

            {/* Animated double underline */}
            <svg
              viewBox="0 0 169 10"
              fill="none"
              aria-hidden
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full pointer-events-none overflow-visible"
            >
              <path
                ref={drawPath1Ref}
                d="M1 6.566C56.394 3.061 112.187 1.201 168 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={drawPath2Ref}
                d="M32.131 8.634C68.215 6.928 104.462 6.134 140.695 6.251"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}