"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Play, Pause, Maximize, VolumeX, Volume2, VolumeOff } from "lucide-react";
import Image from "next/image";

// ─── Sticker: Sparkles ────────────────────────────────────────────────────────
const SparklesSticker = () => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="70" cy="70" r="62" fill="#FFF176" opacity="0.18" />
    <path d="M70 12 C72 42 98 68 128 70 C98 72 72 98 70 128 C68 98 42 72 12 70 C42 68 68 42 70 12Z" fill="#FFD600" stroke="#E6B800" strokeWidth="2" />
    <path d="M108 20 C109 30 117 38 127 39 C117 40 109 48 108 58 C107 48 99 40 89 39 C99 38 107 30 108 20Z" fill="#FFF176" stroke="#FFD600" strokeWidth="1.5" />
    <path d="M28 90 C28.6 95 33 99.4 38 100 C33 100.6 28.6 105 28 110 C27.4 105 23 100.6 18 100 C23 99.4 27.4 95 28 90Z" fill="#FFF9C4" stroke="#FFD600" strokeWidth="1.2" />
    <circle cx="70" cy="70" r="6" fill="#FFFDE7" opacity="0.9" />
  </svg>
);

const HandCursorSVG = () => (
  <Image
  src="/assets/icons/cursorpointer.svg"
  alt="hand icon"
  width={32}
  height={32}
/>
);

// ─── Sticker: Smiley ─────────────────────────────────────────────────────────
const SmileyEmojiSticker = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="63" cy="63" r="52" fill="#00000022" />
    <circle cx="60" cy="60" r="52" fill="#FFD600" stroke="#1A1A1A" strokeWidth="5" />
    <ellipse cx="42" cy="50" rx="6" ry="7" fill="#1A1A1A" />
    <ellipse cx="78" cy="50" rx="6" ry="7" fill="#1A1A1A" />
    <circle cx="45" cy="47" r="2" fill="white" />
    <circle cx="81" cy="47" r="2" fill="white" />
    <path d="M35 68 Q60 95 85 68" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx="34" cy="72" rx="9" ry="5" fill="#FF8A80" opacity="0.55" />
    <ellipse cx="86" cy="72" rx="9" ry="5" fill="#FF8A80" opacity="0.55" />
  </svg>
);
export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLDivElement>(null);
  const controlsRef  = useRef<HTMLElement>(null);
  const smileyRef    = useRef<HTMLDivElement>(null);
  const sparkleRef   = useRef<HTMLDivElement>(null);
  const circleRef    = useRef<SVGPathElement>(null);
  
  // SEPARATED REFS FOR CUSTOM CURSORS
  const muteBadgeRef  = useRef<HTMLDivElement>(null);
  const handCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(controlsRef.current, { autoAlpha: 0, y: 10 });
    
    // Initial states for both cursors
    // The hand cursor is slightly offset so the index finger tip is the actual pointer
    gsap.set(handCursorRef.current, { autoAlpha: 0, scale: 0.8, xPercent: -30, yPercent: -10 });
    gsap.set(muteBadgeRef.current, { autoAlpha: 0, scale: 0.8, xPercent: -50, yPercent: -50 });

    gsap.to(smileyRef.current, { y: "-=10", rotation: 8, yoyo: true, repeat: -1, duration: 2.8, ease: "sine.inOut" });
    gsap.to(sparkleRef.current, { rotation: 360, repeat: -1, duration: 14, ease: "linear" });

    return () => gsap.killTweensOf([smileyRef.current, sparkleRef.current]);
  }, []);

  useEffect(() => {
    gsap.set(heroTextRef.current, { x: "110%", opacity: 0 });

    const runEntry = () => {
      const tl = gsap.timeline();
      tl.to(heroTextRef.current, { x: "0%", opacity: 1, duration: 1.1, ease: "expo.out" })
        .fromTo(circleRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 1.4, ease: "power3.inOut" }, "-=0.7");
    };

    window.addEventListener("introComplete", runEntry);
    const fallback = setTimeout(runEntry, 3200);

    return () => {
      window.removeEventListener("introComplete", runEntry);
      clearTimeout(fallback);
    };
  }, []);

  const handleVideoHover = () => {
    gsap.to(controlsRef.current, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
    // Fade IN both cursors
    gsap.to([muteBadgeRef.current, handCursorRef.current], { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" });
  };
  
  const handleVideoLeave = () => {
    gsap.to(controlsRef.current, { autoAlpha: 0, y: 10, duration: 0.3, ease: "power2.in" });
    // Fade OUT both cursors
    gsap.to([muteBadgeRef.current, handCursorRef.current], { autoAlpha: 0, scale: 0.8, duration: 0.2 });
  };
  
  const handleVideoMove = (e: React.MouseEvent) => {
    // 1. Hand follows instantly
    gsap.to(handCursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.05, ease: "none", overwrite: "auto" });
    
    // 2. Mute badge trails behind smoothly (magnetic effect), offset slightly up and to the right
    gsap.to(muteBadgeRef.current, { 
      x: e.clientX + 20, 
      y: e.clientY - 20, 
      duration: 0.4, 
      ease: "power2.out", 
      overwrite: "auto" 
    });
  };

  const togglePlay = () => {
    if (!iframeRef.current?.contentWindow) return;
    const method = isPlaying ? 'pause' : 'play';
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ method }), '*');
    setIsPlaying(!isPlaying);
  };
  const toggleMute = () => {
    if (!iframeRef.current?.contentWindow) return;
    const value = isMuted ? 1 : 0;
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value }), '*');
    setIsMuted(!isMuted);
  };
  const toggleFullscreen = () => {
    if (!cardRef.current) return;
    if (!document.fullscreenElement) { cardRef.current.requestFullscreen().catch(console.error); } 
    else { document.exitFullscreen(); }
  };

  return (
    <div className="w-full p-3 md:p-5 box-border">
      
      {/* ─── MAGNETIC TRAILING MUTE BADGE ─── */}
      <div
        ref={muteBadgeRef}
        className="fixed top-0 left-0 pointer-events-none z-[90] flex items-center justify-center opacity-0"
      >
        <div className="relative flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 52 48"
            fill="#FFF9C4"
          >
            <path d="M51.9374 7.15723C51.4261 6.40359 50.38 7.32816 49.7458 7.55542C48.6021 7.9944 47.2965 8.46446 46.2388 8.97919C45.7938 9.20257 45.4737 9.40458 44.9214 9.60853C43.7798 9.97564 42.4703 10.0475 41.233 10.3175C40.5733 10.4476 40.0308 10.739 39.4199 10.8614C38.9457 10.9682 38.4422 10.9604 37.9601 11.0032C37.1737 11.1022 36.5043 11.2052 35.7412 11.178C35.144 11.1955 34.4571 11.1877 33.8404 11.0945C33.3134 11.0304 32.7358 11.1003 32.2264 11.0711C30.7959 10.9255 29.4864 10.7973 28.1886 10.0961C27.326 9.66291 26.5571 8.96365 25.7491 8.46446C24.7538 7.79239 24.0942 6.90084 23.4131 5.95101C22.689 4.95651 21.9923 3.83575 21.4166 2.76938C21.1024 2.24882 20.9307 1.68747 20.7394 1.12418C20.6125 0.809514 20.5891 0.467654 20.4271 0.275357C20.1734 -0.0470787 19.6192 -0.122832 19.3635 0.246222C19.1606 0.535637 19.102 0.898864 18.983 1.28151C18.7839 2.05264 18.6219 2.70917 18.4814 3.49001C18.4034 4.06495 18.3721 4.61465 18.2004 5.15658C17.7828 6.21906 17.7125 7.40974 17.3027 8.43144C17.1387 8.94423 16.7406 9.85521 16.4928 10.4768C16.1122 11.3761 15.9463 12.392 15.5423 13.2816C15.2652 13.874 15.1481 14.2411 14.8768 14.7714C14.4416 15.6513 13.8698 16.4263 13.3878 17.3237C13.0209 18.0404 12.5271 18.5804 12.1329 19.2952C11.93 19.6507 11.7524 20.0547 11.4889 20.346C10.7785 21.123 9.9452 21.9252 9.18993 22.6517C8.63373 23.1897 8.14779 23.9142 7.49011 24.3066C6.59824 24.8038 5.9386 25.6818 4.92183 25.9537C4.08655 26.3305 2.99366 26.2198 2.13692 26.4412C1.7466 26.6549 1.42654 26.82 0.938646 26.9754C0.636151 27.0628 0.331705 27.1444 0.146304 27.3678C-0.0644664 27.595 -0.0508039 27.9777 0.208756 28.1661C0.493687 28.4031 1.05769 28.339 1.48899 28.2652C2.27743 28.1913 2.97024 28.2244 3.79967 28.1603C4.42807 28.1525 5.05649 28.3137 5.67319 28.3526C7.13687 28.4322 8.56933 29.248 9.49633 30.3396C10.0603 31.1438 10.7434 31.9906 11.202 32.8822C11.5631 33.7874 12.01 34.6478 12.2422 35.5977C12.3554 36.6543 12.4491 37.711 12.5115 38.7657C12.531 39.6437 12.4803 40.4808 12.4745 41.3879C12.5623 42.6272 12.613 43.7771 12.2344 45.0027C12.1251 45.5699 11.9124 46.1662 11.8324 46.7178C11.7797 47.1665 12.0373 47.489 12.3417 47.7706C13.3527 48.532 13.6278 47.1976 14.2543 46.677C14.5704 46.3818 15.0505 46.0982 15.3823 45.7913C15.9248 45.2902 16.4303 44.7968 17.0568 44.3947C17.8101 43.9247 18.456 43.3983 19.225 42.936C19.8397 42.6136 20.3764 42.3882 20.9111 42.1357C21.8284 41.755 22.6812 41.3627 23.6492 41.0208C24.2171 40.8207 24.8514 40.6615 25.3783 40.3856C25.6886 40.2205 25.9013 40.0787 26.2136 39.9797C26.5883 39.8554 27.0176 39.8379 27.4138 39.7408C28.0032 39.5757 28.6374 39.5543 29.26 39.496C30.1851 39.3659 30.9813 39.2319 31.881 39.1076C32.7084 38.9696 33.5515 39.0629 34.381 39.0104C35.1811 38.9541 35.9871 39.0396 36.7424 39.1522C37.4254 39.2183 38.1397 39.2455 38.8208 39.4164C39.5331 39.5776 40.185 39.5796 40.8485 39.7058C41.5276 39.8495 42.1034 39.9855 42.8293 40.172C43.731 40.3992 44.6111 40.7702 45.5108 40.9742C46.2212 41.0849 46.8711 41.4811 47.5951 41.7822C48.4987 42.0813 49.9077 43.4022 50.8152 42.9379C51.1919 42.5631 50.3488 41.8308 50.1673 41.5045C50.0092 41.2889 49.8336 41.0422 49.6365 40.881C49.1544 40.5177 48.6665 40.1409 48.3465 39.6242C47.841 38.8725 47.3336 38.0995 46.8672 37.307C46.6291 36.8893 46.3246 36.6096 46.0456 36.1066C45.8075 35.6656 45.5655 35.1276 45.3488 34.6517C44.777 33.4824 44.5448 32.5423 44.2852 31.3671C44.1213 30.9534 43.9749 30.495 43.8266 30.0716C43.6646 29.5743 43.6783 29.0499 43.6119 28.5021C43.5358 27.494 43.407 26.4529 43.4402 25.4972C43.4382 24.3299 43.8539 23.1139 43.9749 21.9582C44.256 20.7054 44.7712 19.6604 45.2474 18.4192C45.667 17.4635 45.9148 16.4574 46.4671 15.5503C46.6974 15.1482 46.9589 14.7403 47.1033 14.3169C47.1306 14.2353 47.1287 14.2411 47.1423 14.2023C47.1736 14.1051 47.2029 14.008 47.2263 13.909C47.3395 13.3088 47.7161 12.7591 48.1299 12.3104C48.5729 11.817 48.8324 11.2848 49.2754 10.7487C49.6462 10.3058 49.9936 9.8455 50.3703 9.38709C50.9479 8.67424 52.2809 8.27022 51.9471 7.18637L51.9374 7.16695V7.15723Z" />
          </svg>
          <div className="absolute text-zinc-900 drop-shadow-sm flex items-center justify-center">
            {isMuted ? (
              <VolumeOff size={24} strokeWidth={2.5} />
            ) : (
              <Volume2 size={24} strokeWidth={2.5} />
            )}
          </div>
        </div>
      </div>

      {/* ─── PRIMARY INSTANT HAND CURSOR ─── */}
      <div 
        ref={handCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[91] opacity-0"
      >
        <HandCursorSVG />
      </div>

      <div
        ref={cardRef}
        className="relative w-full h-[calc(100vh-40px)] rounded-[1.5rem] bg-zinc-900 flex flex-col"
        style={{ overflow: "visible" }}
      >
        <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden z-0 pointer-events-none">
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1100291628?api=1&background=1&autoplay=1&loop=1&muted=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
        <div className="absolute inset-0 rounded-[1.5rem] bg-black/25 z-0 pointer-events-none" />

        {/* THIS IS THE OVERLAY CONFINING THE CURSOR. 
          cursor-none hides the default pointer. 
          The events handleVideoHover, handleVideoLeave, handleVideoMove confine the GSAP animation to this exact div.
        */}
        <div
          className="absolute inset-0 z-[5] cursor-none"
          onMouseEnter={handleVideoHover}
          onMouseLeave={handleVideoLeave}
          onMouseMove={handleVideoMove}
          onClick={toggleMute}
        />

        <div className="relative z-10 flex flex-col justify-end h-full w-full p-6 md:p-8 pointer-events-none pb-4 md:pb-6">
          <div
            ref={heroTextRef}
            className="text-center will-change-transform opacity-0 translate-x-[110%]"
            style={{ overflow: "visible" }}
          >
            <h1
              className="font-bold text-white leading-[1.08] tracking-tight cursor-[url('/assets/icons/cursortext.svg'),text]"
              style={{ fontSize: "clamp(2.4rem, 5.8vw, 5.2rem)" }}
            >
              {/* Line 1 */}
              <div className="relative block" style={{ overflow: "visible" }}>
                we make{" "}
                <span className="font-serif italic font-normal text-white">
                  advertising
                </span>{" "}
                for
                {/* Blue Smiley Face SVG */}
                <div
                  ref={smileyRef}
                  className="absolute pointer-events-none z-30"
                  style={{
                    top: "-2rem",
                    left: "35%",
                    width: "clamp(60px, 7vw, 100px)",
                    height: "clamp(60px, 7vw, 100px)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 112 112"
                    fill="none"
                    data-single-target=""
                    className="home-header__smiley-svg drop-shadow-md"
                  >
                    <path
                      d="M111.541 62.9592C108.403 88.6502 88.0773 108.436 62.6077 111.616C42.0425 114.101 20.5472 104.358 9.16949 86.9346C1.7695 75.4933 -1.43764 61.4177 0.603254 47.9337C2.43243 35.7929 7.97202 24.5046 16.7153 15.84C22.5499 9.914 29.8769 5.72439 37.6449 2.94407C46.2978 0.160279 55.5548 -0.706177 64.5653 0.588288C70.5144 1.52782 76.1998 3.52519 81.6005 6.24983C93.1621 12.0401 102.332 22.1557 107.459 33.9416C111.263 43.0899 112.856 53.0941 111.551 62.8896L111.541 62.9592Z"
                      fill="#82A0FF"
                    ></path>
                    <path
                      d="M101.146 61.0873C100.333 64.0799 100.392 67.2986 99.1533 70.1729C98.4696 71.9302 98.2092 73.8684 97.0257 75.3995C96.7653 75.7335 96.5605 76.0989 96.446 76.506C95.9254 78.6426 94.5786 80.3477 93.3187 82.0667C92.1594 83.6917 91.014 85.4003 89.3792 86.639C86.5747 89.9344 83.4127 92.8678 79.5149 94.8512C70.4384 100.412 59.3593 102.841 48.8389 100.864C44.8092 100.207 40.8558 99.0443 37.076 97.4785C33.1018 95.5472 29.3324 93.0801 25.9517 90.2406C24.3169 88.6538 22.5294 87.1784 21.1098 85.3863C19.5236 83.3507 17.6528 81.416 16.7503 78.9349C16.5907 78.5347 16.3442 78.1868 16.0735 77.8492C14.7893 76.2242 14.3346 74.2094 13.6334 72.3199C12.1236 68.7044 11.1379 64.9428 10.9435 61.0142C10.9053 59.5771 10.5062 58.1956 10.4298 56.755C10.2042 53.8494 10.8359 51.0795 11.3704 48.261C11.6342 44.555 13.0746 41.1762 14.3311 37.7382C15.1051 35.6504 16.4587 33.8513 17.2536 31.7913C17.4723 31.2241 17.7013 30.65 18.1283 30.2046C20.4572 28.1759 22.0226 30.0201 20.5753 32.4838C19.5826 33.7748 18.5101 34.9892 18.0415 36.5864C17.8679 37.0875 17.6528 37.5712 17.3543 38.0131C15.5529 40.4942 15.2127 43.5598 14.2235 46.3749C12.9844 50.0147 13.4009 53.8251 13.2308 57.5832C13.1649 59.0864 13.2239 60.6036 13.4252 62.0929C14.338 67.403 16.0353 72.6714 18.7843 77.3133C20.3809 80.212 22.4496 82.7661 24.4696 85.3689C26.7917 87.7317 29.4574 89.7221 32.0362 91.7821C33.7196 93.0035 35.6876 93.7412 37.5237 94.7086C41.8763 96.8034 46.4544 98.505 51.3068 98.8042C52.2404 98.8321 53.1429 99.1 54.0731 99.1C54.8471 99.107 55.628 98.9121 56.3639 98.8947C60.0708 99.2844 63.625 98.4493 67.1341 97.4506C71.386 96.438 75.6379 94.8652 79.1157 92.2275C81.5974 90.425 84.0792 88.5459 86.2762 86.3607C88.1401 84.4294 89.6049 82.2302 91.3125 80.2224C92.3642 78.6983 93.4784 76.4782 94.5127 74.7836C95.3492 73.1098 95.7692 71.2621 96.4495 69.5292C97.1228 67.5944 97.9072 65.684 98.3932 63.7006C98.7021 61.7345 98.5737 59.7093 98.5598 57.7398C98.5389 56.8142 98.5598 55.899 98.6639 54.9769C99.0422 51.5389 98.2162 48.254 97.3311 45.0352C96.6091 42.3524 95.7067 39.7043 94.4849 37.2058C92.4197 33.2041 89.7506 29.5399 86.8559 26.1472C83.739 23.6174 80.6915 20.9658 77.3108 18.8119C72.6216 15.9063 67.0716 15.0572 61.8618 13.5157C56.4819 13.0077 51.0013 13.2408 45.7186 14.6223C42.9037 15.4783 40.297 16.8075 37.4717 17.5766C36.7462 17.768 36.0417 17.9593 35.3891 18.3491C34.563 18.791 33.9348 19.5913 33.2372 20.1411C32.4666 20.7292 31.5885 21.1816 30.8284 21.7836C28.4855 23.5513 26.3682 25.6357 23.9386 27.2433C23.6158 27.3895 23.2722 27.2259 22.998 27.031C22.4357 26.6761 21.9255 26.1715 22.1858 25.6705C23.4353 23.3982 25.3513 21.5191 27.7011 20.3778C27.9579 20.1899 28.1592 19.9289 28.3605 19.6818C29.6691 18.0533 31.6232 17.3365 33.5044 16.557C35.1982 15.8297 36.5241 14.4518 38.2561 13.7837C43.0737 11.581 48.3842 11.1251 53.5906 10.6066C62.5907 9.65668 71.6255 12.4579 79.3552 16.985C83.7112 19.052 87.0607 22.5282 90.011 26.2516C91.4201 27.8349 93.1174 29.1363 94.0789 31.0467C96.8278 35.7861 99.49 40.7343 100.295 46.2427C101.114 51.0935 102.201 56.1043 101.16 61.0177L101.146 61.0803V61.0873Z"
                      fill="#E6FAB9"
                    ></path>
                    <path
                      d="M94.1962 63.5751C93.4673 64.5599 92.0685 64.2397 91.1522 63.6865C89.9165 63.0705 88.6497 62.312 87.296 61.877C87.1259 61.8735 86.9802 61.9466 86.8552 62.0893C86.5463 62.4929 86.3831 62.9905 86.2408 63.4707C85.859 65.402 84.5991 66.9052 83.4954 68.4955C82.527 69.9222 81.7322 71.4985 80.5867 72.7686C80.1078 73.3149 79.5837 73.8195 79.2921 74.5015C78.473 76.2866 76.5015 77.0174 75.4324 78.5798C73.7421 81.0156 71.2257 82.5641 68.6225 83.8516C65.6132 85.4905 62.3193 86.4231 58.8588 86.6876C53.4546 87.0599 45.4715 85.2504 41.06 82.1013C38.9219 80.4867 36.8046 78.8616 34.9997 76.8469C33.4968 75.1696 31.7301 73.6768 30.7513 71.6064C30.13 70.2945 29.7274 68.8852 28.936 67.6603C27.926 66.0249 27.0236 64.3372 26.4023 62.5173C25.9788 61.1915 25.6977 59.9214 25.0556 58.707C24.7918 58.1258 24.5106 57.2803 23.7054 57.59C22.4107 58.004 21.3521 58.8809 20.1338 59.3959C19.5715 59.6778 19.0058 60.1998 18.3497 59.991C17.3119 59.6326 17.1037 58.0806 17.9714 57.3916C19.3147 56.379 20.5885 55.262 22.1851 54.6113C22.8099 54.3642 23.4242 54.1172 24.0282 53.8249C25.6873 53.0315 27.3221 52.1163 29.1408 51.9284C30.1092 51.9249 32.6534 51.2429 32.8339 52.6278C32.8408 53.3412 32.223 53.9293 31.6052 54.2007C30.5257 54.6774 29.3838 55.0811 28.3078 55.5369C28.0683 55.6552 27.8983 55.8431 27.8705 56.1215C28.0614 58.9575 29.3595 61.4803 30.1787 64.0623C30.5743 65.0958 30.9041 66.178 31.3692 67.1732C32.0182 68.0466 32.8131 68.8191 33.3684 69.7656C34.5728 71.6133 35.5481 73.642 37.1829 75.1661C37.957 75.9421 38.9358 76.485 39.6195 77.341C40.6296 78.618 42.1776 79.1609 43.5139 79.9856C46.4503 81.9064 49.6574 83.2913 53.111 83.9629C54.0134 84.1717 54.9332 84.0847 55.8495 84.0534C58.1056 84.0221 60.4034 84.0221 62.5657 83.4584C64.6205 82.926 66.5017 81.8612 68.324 80.7233C70.4482 79.3488 72.7321 78.023 74.5196 76.1857C76.6403 73.9169 78.6361 71.4602 80.4063 68.8713C81.7183 67.034 82.2285 64.7513 83.7453 63.0706C84.0264 62.7574 84.3041 62.4512 84.4672 62.0719C85.0156 60.8574 84.9809 60.593 83.6273 60.1162C82.1487 59.4133 80.08 59.3681 79.2643 57.6839C79.0595 57.2315 79.2018 56.6957 79.476 56.299C80.198 55.0184 81.6454 55.3699 82.7491 55.9127C85.689 57.1793 88.7052 58.2372 91.4264 59.9562C92.0303 60.3807 92.7523 60.5303 93.3875 60.8992C94.2205 61.3794 94.7307 62.82 94.2309 63.5368L94.1997 63.5856L94.1962 63.5751Z"
                      fill="#E6FAB9"
                    ></path>
                    <path
                      d="M49.3772 44.0677C49.1203 45.8111 48.8184 47.5614 48.5199 49.3012C48.3671 50.2512 48.1832 51.149 47.5792 51.9006C46.7566 52.9271 45.5661 53.8632 44.2784 53.7936C43.3551 53.6161 42.1993 52.9097 42.0501 51.8763C41.4496 49.5448 40.8457 47.189 40.4083 44.8263C40.3458 44.4435 40.3319 44.0712 40.3805 43.6849C40.8456 40.6019 41.1511 37.4875 42.7512 34.7211C43.1191 34.0495 43.7092 33.5171 44.4311 33.3118C45.3717 33.0369 46.6108 32.9917 47.305 33.7538C49.155 36.3775 49.5507 40.835 49.3841 44.0051L49.3772 44.0712V44.0677Z"
                      fill="#E6FAB9"
                    ></path>
                    <path
                      d="M70.7539 45.1604C70.4381 46.7263 70.0667 48.3026 69.6988 49.865C69.3795 50.9889 69.3031 52.4191 68.2237 53.0942C67.1616 53.7971 65.735 53.3239 64.7389 52.6662C63.531 51.9111 62.9583 50.5087 62.7396 49.1377C61.8719 44.882 61.4762 40.4697 62.7743 36.2662C63.2151 34.9926 63.4997 33.1309 65.0894 32.8943C66.7277 32.7203 68.2757 33.5728 68.8311 35.1074C69.5218 36.7255 70.334 38.3262 70.2923 40.0973C70.4242 41.7467 70.872 43.4344 70.7609 45.0943L70.7505 45.1569L70.7539 45.1604Z"
                      fill="#E6FAB9"
                    ></path>
                  </svg>
                </div>
              </div>
              {/* Line 2 */}
              <div
                className="relative block mt-2 md:mt-3"
                style={{ overflow: "visible" }}
              >
                the new{" "}
                <span
                  className="relative inline-block"
                  style={{ overflow: "visible" }}
                >
                  mainstream
                  {/* Oval stroke */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      width: "112%",
                      height: "138%",
                      left: "-6%",
                      top: "-19%",
                      overflow: "visible",
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      ref={circleRef}
                      d="M 50 10 C 80 10, 95 30, 95 50 C 95 70, 80 90, 50 90 C 20 90, 5 70, 5 50 C 5 30, 20 10, 50 10 Z"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      opacity="0.8"
                    />
                  </svg>
                </span>
                {/* Sparkle */}
                <div
                  ref={sparkleRef}
                  className="absolute pointer-events-none z-30"
                  style={{
                    bottom: "3rem",
                    right: "18rem",
                    width: "clamp(44px, 5vw, 74px)",
                    height: "clamp(44px, 5vw, 74px)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 113 113"
                    fill="none"
                    data-single-target=""
                    className="home-header__star-svg"
                  >
                    <path
                      d="M56.4193 0.419312L60.3791 52.4595L112.419 56.4193L60.3791 60.3791L56.4193 112.419L52.4595 60.3791L0.419312 56.4193L52.4595 52.4595L56.4193 0.419312Z"
                      fill="#F0BEFA"
                    ></path>
                  </svg>
                </div>
              </div>
            </h1>
          </div>
        </div>

        {/* Footer Controls (Hides the custom cursors when hovered) */}
        <footer
          ref={controlsRef}
          className="absolute bottom-6 left-6 z-[60] pointer-events-auto"
          onMouseEnter={() =>
            gsap.to([muteBadgeRef.current, handCursorRef.current], { autoAlpha: 0, duration: 0.1 })
          }
          onMouseLeave={() =>
            gsap.to([muteBadgeRef.current, handCursorRef.current], { autoAlpha: 1, duration: 0.1 })
          }
        >
          <div className="flex gap-3">
            <button
              onClick={togglePlay}
              className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}