"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// Specific background colors/gradients based on the screenshot
const COL_1_LOGOS = [
  { alt: "Ace & Tate", src: "/assets/images/brands/brand1.svg", bg: "bg-gradient-to-br from-pink-300 to-rose-400" },
  { alt: "Hema", src: "/assets/images/brands/brand2.svg", bg: "bg-[#4b69f0]" },
  { alt: "ANWB", src: "/assets/images/brands/brand3.svg", bg: "bg-[#f5693c]" },
  { alt: "Netflix", src: "/assets/images/brands/brand4.svg", bg: "bg-gradient-to-b from-[#2d7864] to-emerald-400" },
  { alt: "Jumbo", src: "/assets/images/brands/brand5.svg", bg: "bg-yellow-400" },
];

const COL_2_LOGOS = [
  { alt: "Bol", src: "/assets/images/brands/brand6.svg", bg: "bg-gradient-to-t from-[#701a35] to-[#a0325a]" },
  { alt: "Oxxio", src: "/assets/images/brands/brand7.svg", bg: "bg-[#82a0ff]" },
  { alt: "Douwe Egberts", src: "/assets/images/brands/brand8.svg", bg: "bg-[#e6fab9]" },
  { alt: "Swapfiets", src: "/assets/images/brands/brand9.svg", bg: "bg-[#f0befa]" },
  { alt: "KFC", src: "/assets/images/brands/brand10.svg", bg: "bg-red-600" },
];

export default function Clients() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marquee1Ref = useRef<HTMLDivElement | null>(null);
  const marquee2Ref = useRef<HTMLDivElement | null>(null);
  const marqueeMobileRef = useRef<HTMLDivElement | null>(null); // Ref for mobile horizontal track 1
  const marqueeMobile2Ref = useRef<HTMLDivElement | null>(null); // Ref for mobile horizontal track 2
  
  // SVG Refs for draw animations
  const lineSvgRef = useRef<SVGPathElement | null>(null);
  const arrowSvgRef = useRef<SVGSVGElement | null>(null);
  const stickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const mm = gsap.matchMedia();

      // ─── DESKTOP (≥ 1024px): VERTICAL MARQUEES ─────────────────────────────
      mm.add("(min-width: 1024px)", () => {
        if (marquee1Ref.current && marquee2Ref.current) {
          // Column 1: Moves Bottom to Top (Upwards)
          gsap.to(marquee1Ref.current, {
            yPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "none",
          });

          // Column 2: Moves Top to Bottom (Downwards)
          gsap.fromTo(marquee2Ref.current, 
            { yPercent: -50 },
            {
              yPercent: 0,
              repeat: -1,
              duration: 20, 
              ease: "none",
            }
          );
        }
      });

      // ─── MOBILE (< 1024px): HORIZONTAL MARQUEES ────────────────────────────
      mm.add("(max-width: 1023px)", () => {
        // Row 1: Moves Right to Left (Horizontally)
        if (marqueeMobileRef.current) {
          gsap.to(marqueeMobileRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "none",
          });
        }
        
        // Row 2: Moves Left to Right (Horizontally)
        if (marqueeMobile2Ref.current) {
          gsap.fromTo(marqueeMobile2Ref.current, 
            { xPercent: -50 },
            {
              xPercent: 0,
              repeat: -1,
              duration: 20, 
              ease: "none",
            }
          );
        }
      });

      // ─── COMMON ANIMATIONS (Drawings & Stickers) ─────────────────────────
      // Underline Draw
      if (lineSvgRef.current) {
        gsap.fromTo(
          lineSvgRef.current,
          { strokeDashoffset: 132 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineSvgRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Arrow Draw
      if (arrowSvgRef.current) {
        const arrowPaths = arrowSvgRef.current.querySelectorAll("path");
        gsap.fromTo(
          arrowPaths,
          { strokeDashoffset: 765 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: arrowSvgRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Sticker Pop-in
      if (stickerRef.current) {
        gsap.fromTo(
          stickerRef.current,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stickerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
    ctx.revert()
    ScrollTrigger.clearMatchMedia()   // ✅ add this
  }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f0ebe6] font-['DM_Sans',_Arial,_sans-serif] text-[#2d2d2d] py-16 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-0 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-20">
          
          {/* ── LEFT COLUMN: TITLE & ILLUSTRATIONS ── */}
          <div className="relative w-full lg:w-[45%] flex flex-col items-center lg:items-start z-10 px-6 lg:pl-10 text-center lg:text-left">
            {/* Background Blob - Reduced size on mobile, preserved on desktop */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 404 474"
              fill="none"
              className="absolute -top-10 lg:-top-24 -left-6 lg:-left-16 w-[70%] max-w-[280px] lg:w-[120%] lg:max-w-[500px] -z-10 text-[#82A0FF]"
            >
              <path
                d="M404 184.722V184.884C403.091 209.438 394.748 233.366 380.75 253.538C372.609 266.421 363.762 279.183 352.147 289.178C347.359 295.499 341.4 300.587 334.896 305.11C331.078 307.473 327.543 310.138 323.826 312.642C318.978 315.368 313.908 317.791 308.757 319.891C301.707 322.698 293.728 322.799 286.375 324.132C285.588 324.293 284.598 324.515 284.093 325.061C283.204 325.929 283.608 327.342 283.972 328.413C285.224 331.845 286.456 335.197 287.81 338.428C291.244 345.637 293.264 353.29 294.132 361.266C295.728 374.734 292.981 388.142 288.092 400.621C282.113 414.958 270.862 426.387 259.105 436.18C244.481 446.337 228.785 455.02 212.12 461.239C205.979 464.026 199.515 465.964 192.95 467.418C189.072 468.872 185.315 470.164 181.174 470.548C172.367 471.578 163.782 474.142 154.793 474.001C143.218 474.041 131.361 472.486 120.735 467.681C118.291 466.731 116.11 465.298 114.231 463.48C110.514 460.028 106.252 456.999 103.525 452.617C96.7983 441.188 95.9701 426.831 98.3739 414.09C99.7677 406.538 100.354 398.723 102.798 391.373C105.383 384.487 108.292 377.783 110.979 370.898C112.615 367.142 109.686 367.748 107.323 368.697C98.0911 372.008 88.9001 375.744 79.2243 377.42C70.9423 379.318 62.4381 378.369 54.1763 377.42C50.2575 377.218 46.3185 376.713 42.6017 375.502C32.3603 372.352 23.3915 365.607 15.9983 357.974C9.19094 349.069 4.60555 338.711 2.44414 327.746C-0.606055 317.307 -0.424255 306.12 0.787745 295.377C0.706945 269.41 14.8873 237.728 31.6331 218.08C36.9255 210.246 44.2985 203.946 52.0351 198.595C57.8729 195.586 63.3673 191.628 69.9727 190.134C78.6991 188.761 87.6073 187.549 96.3741 188.7C107.787 191.022 119.2 194.495 129.421 200.129C141.178 208.428 134.532 194.354 132.734 188.842C128.129 176.181 125.523 162.914 122.048 149.91C120.291 141.712 119.362 133.373 118.614 125.033C117.463 119.076 117.059 113.059 116.675 107.021C116.11 95.2895 117.968 83.6383 118.816 72.0074C121.422 60.4775 124.412 49.0687 129.603 38.3061C142.794 10.1375 175.215 -19.6264 198.707 16.9827C205.232 29.6838 210.221 43.6369 212.443 57.7717C212.868 63.7487 214.282 69.6247 214.827 75.6017C214.989 80.6902 214.908 85.7788 215.191 90.8673C215.271 101.428 214.948 112.049 214.908 122.63C215.009 124.407 211.817 139.309 216.645 132.282C223.715 119.985 228.684 106.416 237.148 94.9058C241.915 88.5451 246.965 82.3258 252.338 76.47C255.389 73.8248 258.196 71.7853 260.843 68.6353C271.145 61.366 282.396 52.4005 295.809 56.4188C318.009 65.6468 285.992 116.613 278.417 130.162C275.71 135.008 272.942 139.895 269.569 144.317C267.468 147.225 269.064 147.184 271.367 145.791C282.032 139.612 293.304 134.18 305.303 131.131C323.826 123.862 344.471 121.822 364.044 125.518C372.124 128.345 379.861 132.181 386.527 137.633C391.557 141.45 394.243 147.083 396.93 152.636C399.718 156.473 400.667 161.097 401.616 165.741C402.849 171.92 404.02 178.523 403.899 184.742L404 184.722Z"
                fill="currentColor"
              ></path>
            </svg>

            <div className="relative inline-block mt-4 lg:mt-6">
              <h2 className="text-[2.8rem] sm:text-[3.5rem] md:text-6xl lg:text-[5rem] tracking-tight font-bold leading-[1.1] z-10 relative">
                proud to have <br /> worked <em className="italic font-light">with:</em>
              </h2>
              {/* Animated Underline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="132"
                height="5"
                viewBox="0 0 132 5"
                fill="none"
                className="absolute bottom-1 right-0 lg:bottom-2 lg:right-2 w-[90px] sm:w-[110px] md:w-[150px] text-black"
              >
                <path
                  ref={lineSvgRef}
                  d="M1 2.08377C44.3458 3.90451 87.9791 5.71442 131 1"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: "132px", strokeDashoffset: "132px" }}
                ></path>
              </svg>
            </div>

            {/* Graphics below title - Centered on Mobile, Taller for Arrow */}
            <div className="relative w-full h-56 sm:h-64 lg:h-32 mt-8 lg:mt-12 z-10 flex justify-center lg:block">
              {/* Animated Arrow - Visible on both, re-positioned for mobile */}
              <svg
                ref={arrowSvgRef}
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 386 127"
                fill="none"
                className="absolute block top-12 left-1/2 -translate-x-1/2 ml-[70px] sm:ml-[90px] w-[180px] sm:w-[220px] lg:top-[60px] lg:left-28 lg:translate-x-0 lg:ml-0 lg:w-full lg:max-w-[320px] text-black md:scale-y-[-1] rotate-40 md:rotate-15"
              >
                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "765px", strokeDashoffset: "765px" }}></path>
                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "765px", strokeDashoffset: "765px" }}></path>
              </svg>

              {/* Heart Image Sticker - Centered on Mobile */}
              <div
                ref={stickerRef}
                className="absolute top-0 lg:-top-1 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-16 w-20 h-24 sm:w-24 sm:h-28 transform-origin-center z-20"
              >
                <div className="w-full h-full drop-shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 157" className="w-full h-full object-contain">
                    <path d="M87.4167 107.783C85.1542 111.747 81.4406 115.002 80.9191 119.735C80.4192 122.898 80.9712 126.26 80.8643 129.479C80.8956 136.261 77.7906 142.585 73.197 147.523C69.8153 151.241 65.5151 154.131 60.5973 155.34C53.9344 156.915 46.7787 156.302 40.3955 154.097C33.8535 151.851 27.6342 147.135 22.6109 142.293C17.4765 137.444 13.12 131.626 9.42377 125.579C5.42422 118.821 1.99971 111.217 0.975458 103.302C-0.306431 90.8008 5.09062 77.7922 12.6541 67.6646C18.0803 60.9436 14.8177 59.1369 10.6553 53.4934C5.91115 47.2402 6.19487 37.8959 11.7721 32.2468C13.7103 30.0817 16.9396 28.9699 18.2638 26.3534C19.4674 24.1204 18.736 20.9402 18.7611 18.3935C18.7584 15.8111 19.1965 13.253 20.2735 10.8893C22.8399 5.22517 28.8367 1.11083 35.0554 0.468813C38.1708 0.124085 41.3182 0.795716 44.4368 0.68431C46.3752 0.658664 48.3186 0.387841 50.2735 0.219848C58.6102 -0.68094 67.2632 4.39392 69.9676 12.3058C70.5652 14.0267 70.8845 15.8342 70.9256 17.6534C71.0366 21.0386 69.7822 24.1653 70.8235 27.3261C71.3142 28.9282 72.31 30.3766 73.2303 31.821C74.3483 33.5265 75.1835 35.4493 75.6531 37.4232C77.1758 43.6888 75.4963 49.0335 73.2472 54.8206C71.9393 58.4614 72.7879 61.0643 75.5118 63.5625C77.8789 65.8586 80.2336 68.2931 81.5612 71.3593C82.8499 74.1882 83.1926 77.2177 84.406 80.0069C85.4021 82.4716 87.0071 84.6404 88.2459 86.9907C91.6388 93.4323 91.2845 101.4 87.4566 107.72L87.4166 107.787L87.4167 107.783Z" fill="#F0BEFA"></path><path d="M77.4332 95.8084C77.2118 93.317 76.0599 91.1211 74.2786 89.4624C73.1742 88.445 71.895 87.4275 70.4339 87.3113C69.5406 87.2075 68.6577 87.5309 67.7953 87.6881C67.5171 87.7314 67.3147 87.6955 67.2756 87.5294C67.37 86.6675 68.0085 85.8417 68.3013 85.0472C68.8698 83.7863 69.4299 82.6481 69.8239 81.304C70.4755 79.0349 70.2455 76.7294 68.6759 74.7466C67.3198 73.0053 65.3742 71.7735 63.0294 72.1863C62.636 72.2413 62.0517 72.3672 61.7785 72.1178C61.2683 71.5439 61.6256 70.4726 61.4852 69.7528C61.3541 65.3515 57.7605 62.908 53.4158 62.8204C53.1776 62.7965 52.9991 62.7488 52.9319 62.6499C52.8132 62.5153 53.0248 62.211 53.1564 62.0609C54.2175 60.7729 55.2176 59.8763 55.9617 58.3942C56.9153 56.0701 58.7172 54.2253 59.6708 51.9051C59.9675 51.1067 60.399 50.3914 60.9535 49.7356C63.06 47.0844 63.0834 43.8973 62.9594 40.8286C62.943 39.8637 62.6643 38.9619 62.0276 38.2059C60.8611 36.7574 58.6962 35.7587 56.8365 36.0217C55.7396 36.2025 54.6139 36.6956 53.5795 37.1769C50.9139 38.4593 48.7655 40.5687 47.386 43.1652C46.3124 45.6988 44.7442 47.7613 42.7629 49.7997C42.6154 49.9538 42.4042 50.1512 42.2135 50.1748C41.9989 50.2141 41.8008 50.0715 41.6269 49.8381C41.0498 49.0506 40.8786 48.0618 40.2658 47.2743C37.5981 43.6098 34.0414 40.8539 29.9613 38.9754C28.2324 38.2183 26.3837 38.7581 24.6856 39.3495C22.4276 39.9324 20.0023 38.4391 18.5037 40.9841C17.0659 43.2207 17.7906 46.0172 19.7984 47.6524C21.8443 49.7108 23.7469 51.8757 25.3508 54.2895C26.8911 56.6756 28.2007 59.2037 29.7091 61.6451C30.1078 62.3059 30.436 62.7254 30.9737 63.4061C31.2346 63.7346 31.3959 64.1737 31.0374 64.4778C27.6999 67.0248 24.6431 69.9518 22.1606 73.3104C19.8946 76.1195 17.7909 79.0949 16.242 82.3951C12.9827 88.604 10.912 95.6365 11.6333 102.684C12.5106 107.24 14.5366 111.544 16.404 115.762C17.18 117.546 18.3819 119.066 19.4764 120.652C20.4632 122.362 21.3186 124.13 22.7434 125.524C22.9174 125.749 23.0595 125.994 23.1936 126.248C23.7732 127.439 24.9024 128.199 25.7725 129.208C26.3974 129.932 26.7637 130.779 27.4008 131.452C28.1366 132.271 29.0276 132.98 29.8671 133.697C32.3813 135.85 34.6879 138.324 37.4898 140.031C40.0221 141.584 42.7142 142.896 45.6469 143.547C50.3304 144.414 55.6307 144.942 59.9016 142.372C61.6089 141.409 62.589 139.456 64.1146 138.22C66.1865 136.376 66.7441 133.719 67.6307 131.272C67.7952 130.79 67.7693 130.288 67.6439 129.797C67.0411 127.345 67.9562 124.669 66.9521 122.276C66.6173 121.476 67.1125 120.737 67.183 119.899C67.2365 119.385 67.1907 118.871 67.1051 118.361C67.0008 117.562 66.6227 116.68 66.8239 115.949C67.0569 115.221 67.3493 114.51 67.5188 113.763C67.6678 113.213 67.8246 112.664 68.0846 112.154C68.6482 111.166 69.5724 110.38 70.1202 109.36C70.9307 108.194 71.7332 107.017 72.5912 105.887C73.629 104.468 75.047 103.323 75.9103 101.821C76.9572 100.039 77.612 97.9795 77.4289 95.8875L77.4212 95.8124L77.4332 95.8084ZM54.66 40.4364C55.7713 39.5478 59.5205 39.5597 59.5017 41.4735C59.5391 42.1339 59.136 42.6713 58.8519 43.2681C58.1266 45.0547 56.5964 46.449 54.6651 46.7554C53.4132 46.9637 52.2062 46.8556 51.1484 46.1349C50.7323 45.8893 50.6108 45.4265 50.9021 45.0432C51.9645 43.3993 53.1697 41.7952 54.6082 40.4799L54.66 40.4364ZM28.8457 52.1262C28.7304 52.1459 28.5996 52.0864 28.461 51.9755C25.6778 49.5012 23.8338 46.5059 21.6324 43.4785C21.5257 43.3361 21.3083 43.0314 21.4596 42.9327C21.5791 42.8498 21.8808 42.8896 22.0634 42.9215C24.6236 43.3393 26.016 44.9106 27.4951 46.6679C28.2501 47.6651 29.4144 48.5837 29.6203 49.8691C29.6697 50.482 29.479 51.6365 28.8974 52.1144L28.8497 52.1262L28.8457 52.1262ZM30.308 55.2279C30.3643 55.054 30.5554 54.9079 30.7226 54.7973C31.8891 54.0314 32.8613 53.1466 33.1362 51.8183C33.3626 50.7152 33.2358 49.5328 32.6634 48.5634C31.7439 46.9135 30.6613 45.3385 29.6503 43.7399C29.3305 43.2058 28.6311 42.2007 29.8603 42.7635C34.0042 44.5907 35.9413 48.203 38.7378 51.4089C39.4975 52.2084 39.8631 53.2448 39.3986 54.2922C38.4076 57.083 36.1925 58.9748 33.9537 60.8507C32.8782 61.7037 30.9905 56.5335 30.437 55.8251C30.3462 55.659 30.2556 55.4532 30.2959 55.2793L30.312 55.2279L30.308 55.2279ZM71.1106 102.342C67.3042 107.194 64.7179 108.5 63.669 115.233C63.3846 117.013 63.696 118.769 63.6737 120.544C63.6515 122.3 63.3075 124.079 63.4403 125.819C63.5264 127.286 64.2679 128.718 64.0758 130.225C63.7722 132.913 61.9008 135.335 60.1578 137.398C58.3351 139.511 55.3695 140.26 52.6599 140.522C45.9024 140.981 39.3147 137.297 34.5885 132.839C33.3377 131.648 32.0152 130.527 30.7804 129.328C30.1354 128.647 29.63 127.832 28.9452 127.187C28.5139 126.74 27.8753 126.502 27.4559 126.07C26.7722 125.117 26.0449 124.147 25.2577 123.256C23.4038 120.799 21.7293 118.171 20.2775 115.449C19.1106 113.032 18.2738 110.477 17.3297 107.953C16.9244 106.901 16.1809 106.006 15.7836 104.926C15.402 103.91 15.259 102.83 15.1476 101.754C14.5804 98.2304 15.0937 94.6602 16.5315 91.3401C16.948 90.3717 17.0869 89.3161 17.4439 88.3358C18.001 86.9247 18.6613 85.5413 19.3691 84.1937C21.3274 80.8227 23.1513 77.2617 25.6682 74.2551C26.928 72.9238 28.2157 71.5847 29.6021 70.4117C30.6817 69.4915 31.7495 68.5435 32.5917 67.3937C33.9927 65.4536 36.0234 64.0282 37.7374 62.3099C38.6662 61.3855 39.0879 60.0573 39.9611 59.1092C40.5157 58.4059 41.3988 58.0312 42.0325 57.4308C43.5684 55.5224 44.8589 53.4161 46.2721 51.4088C46.9078 50.2271 47.6667 49.0377 49.2031 49.2093C50.5408 49.4242 51.8043 50.3983 53.1146 50.4906C53.8571 50.5625 54.5687 50.3695 55.2961 50.1963C55.9441 50.0348 56.4488 49.9682 55.9653 50.7704C53.4837 54.9831 51.4071 59.2397 48.5971 63.112C48.2337 63.6652 48.2789 64.3573 47.8442 64.8392C46.9198 65.6647 45.8575 66.1974 44.9965 67.0507C40.4955 70.6563 37.2613 75.4376 33.8372 80.0013C32.8629 81.4397 31.7023 82.7829 31.1402 84.4629C30.7019 85.9651 31.6833 86.9665 33.1238 86.2128C34.5005 85.5103 35.0779 83.9964 35.944 82.8229C36.3311 82.2974 36.7539 81.7877 37.1609 81.2701C40.7433 76.8529 44.1124 72.1468 48.6369 68.6204C50.7562 66.8431 55.2901 65.1317 57.1506 67.9768C58.2163 69.8245 57.2669 72.0775 56.7835 73.975C56.5788 74.564 56.168 75.046 55.686 75.437C54.3874 76.5033 52.9267 77.348 51.6675 78.5014C50.3725 79.6666 49.2754 81.0257 48.2219 82.4047C46.2703 85.0243 44.2119 87.549 42.2445 90.1449C41.6977 90.8878 41.0671 91.7531 41.0954 92.7021C41.189 94.2879 42.3417 95.1512 43.7634 94.0889C45.0982 92.908 45.617 91.0975 46.5873 89.6631C48.5268 87.0948 50.7119 84.6928 52.8453 82.3185C54.7838 80.0151 57.1733 78.2263 59.867 76.8728C61.2561 76.0162 63.201 75.2629 64.6589 76.2886C66.2473 77.4647 66.982 79.6877 66.3122 81.51C66.1478 81.9606 65.8921 82.3795 65.6325 82.7865C63.7838 85.4972 62.2006 88.3902 60.3005 91.0653C59.4385 92.1913 58.4776 93.2303 57.5603 94.3089C56.1244 95.9801 54.9501 97.8453 53.6767 99.6352C53.3092 100.2 52.7829 100.781 52.697 101.465C52.5701 102.513 54.0641 103.448 54.9992 102.946C56.4444 101.987 57.5142 100.509 58.5794 99.1698C59.5455 97.8026 60.4878 96.4077 61.9447 95.5076C62.4225 95.176 62.7815 94.7374 63.1208 94.2712C64.003 93.0225 65.3121 92.3635 66.6641 91.8864C68.0762 91.2908 69.6655 91.1382 71.1581 91.3296C72.6074 91.4378 73.0968 93.3957 73.4505 94.444C74.1828 97.3314 72.8747 99.9399 71.1744 102.275L71.1305 102.334L71.1106 102.342Z" fill="#A0325A"></path> <path d="M55.8287 13.8663C52.932 11.8091 50.7056 10.9219 47.4805 13.0086C46.252 13.7303 45.0352 14.4758 43.8345 15.1778C43.1625 15.6038 42.5257 15.0778 41.9677 14.694C39.8862 13.2104 37.1739 11.742 34.645 12.2096C32.4498 12.559 29.1927 14.6812 29.2749 17.1821C29.3243 21.0499 29.8054 25.1393 32.0192 28.4088C33.5026 30.7095 35.7782 32.2605 38.0781 33.6692C40.9986 35.7107 44.2091 36.5475 47.1666 33.8758C48.5832 32.7039 50.3438 31.8641 51.1714 30.1188C51.46 29.3171 52.2151 28.9662 52.8359 28.4453C53.982 27.4746 54.3565 25.9619 55.2177 24.7854C57.6009 21.8445 59.3653 16.6827 55.892 13.9138L55.8287 13.8663ZM51.3967 24.9041C49.4001 27.3634 46.7313 29.2017 44.4066 31.3249C43.9807 31.7156 43.5076 31.9798 42.9007 31.9634C41.6348 32.0569 40.8808 31.0172 39.8311 30.5697C38.0283 29.9121 36.9384 28.5085 35.8884 27.0259C34.4349 25.2546 33.6412 23.1441 32.9585 21.0298C32.2972 19.6108 32.6806 17.8176 33.5419 16.6096C33.7652 16.3016 34.0518 16.053 34.4015 15.8953C37.5877 14.6857 38.8524 17.1245 40.1449 19.5436C40.8586 20.7335 42.0183 22.5875 43.6003 21.7673C44.1528 21.4874 44.5832 20.9466 44.9421 20.4452C46.0461 19.0517 46.8061 17.3537 48.1671 16.2251C49.3477 15.5823 51.8411 15.0515 52.9518 16.1983C53.3428 16.6728 53.574 17.4631 53.7265 18.0954C54.3011 20.4545 52.8713 23.0527 51.4445 24.8369L51.3967 24.8922L51.3967 24.9041Z" fill="#A0325A"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN / MOBILE BOTTOM: MARQUEES ── */}
          
          {/* DESKTOP (≥1024px): VERTICAL MARQUEES */}
          <div className="hidden lg:block relative w-[45%] h-[800px] overflow-hidden rounded-[1.25em] z-10">
            {/* Top & Bottom Fade Overlays */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#f0ebe6] via-[#f0ebe6]/90 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f0ebe6] via-[#f0ebe6]/80 to-transparent z-20 pointer-events-none"></div>
            
            <div className="flex flex-row justify-center gap-6 h-full pt-10">
              {/* COLUMN 1: Moves UP */}
              <div className="w-[220px] overflow-hidden relative">
                <div ref={marquee1Ref} className="flex flex-col gap-6 items-center w-full">
                  {[...COL_1_LOGOS, ...COL_1_LOGOS].map((logo, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className={`flex-shrink-0 w-full aspect-square rounded-2xl flex items-center justify-center p-6 shadow-sm transition-transform hover:scale-105 ${logo.bg}`}
                    >
                      <img src={logo.src} alt={logo.alt} className="w-[70%] h-[70%] object-contain pointer-events-none filter drop-shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2: Moves DOWN */}
              <div className="w-[220px] overflow-hidden relative">
                <div ref={marquee2Ref} className="flex flex-col gap-6 items-center w-full relative">
                  {[...COL_2_LOGOS, ...COL_2_LOGOS].map((logo, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className={`flex-shrink-0 w-full aspect-square rounded-2xl flex items-center justify-center p-6 shadow-sm transition-transform hover:scale-105 ${logo.bg}`}
                    >
                      <img src={logo.src} alt={logo.alt} className="w-[70%] h-[70%] object-contain pointer-events-none filter drop-shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE (<1024px): 2 HORIZONTAL MARQUEES */}
          {/* Increased mt-12 sm:mt-16 to give spacing below the arrow */}
          <div className="block lg:hidden relative w-full overflow-hidden mt-1 sm:mt-1 flex flex-col gap-4 sm:gap-6 py-4">
            {/* Left & Right Fade Overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#f0ebe6] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#f0ebe6] to-transparent z-20 pointer-events-none"></div>
            
            {/* Row 1: Moves Left */}
            <div className="flex flex-row items-center w-max overflow-visible relative pl-10">
              <div ref={marqueeMobileRef} className="flex flex-row gap-4 sm:gap-6 items-center">
                {[...COL_1_LOGOS, ...COL_1_LOGOS, ...COL_1_LOGOS].map((logo, idx) => (
                  <div
                    key={`mob1-${idx}`}
                    className={`flex-shrink-0 w-[140px] sm:w-[180px] aspect-square rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-sm ${logo.bg}`}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-[70%] h-[70%] object-contain pointer-events-none filter drop-shadow-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Moves Right */}
            <div className="flex flex-row items-center w-max overflow-visible relative pl-10">
              <div ref={marqueeMobile2Ref} className="flex flex-row gap-4 sm:gap-6 items-center">
                {[...COL_2_LOGOS, ...COL_2_LOGOS, ...COL_2_LOGOS].map((logo, idx) => (
                  <div
                    key={`mob2-${idx}`}
                    className={`flex-shrink-0 w-[140px] sm:w-[180px] aspect-square rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-sm ${logo.bg}`}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-[70%] h-[70%] object-contain pointer-events-none filter drop-shadow-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}