"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navLogoRef = useRef<HTMLDivElement>(null);
  const navCentreRef = useRef<HTMLDivElement>(null);
  const navIconRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItemsRef = useRef<(HTMLDivElement | HTMLButtonElement | null)[]>([]);
  const whatsAppDropdownRef = useRef<HTMLDivElement>(null);
  const truusCursorRef = useRef<HTMLDivElement>(null);
  const shakeTl = useRef<gsap.core.Timeline | null>(null);

  // 2. INTERSECTION OBSERVER FOR HIGH PERFORMANCE SCROLL DETECTION
  useEffect(() => {
    // Select all sections that have our custom data attribute
    const sections = document.querySelectorAll("[data-header-theme]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section hits the top part of the viewport (where the header is)
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-header-theme");
            setIsDarkMode(theme === "dark");
          }
        });
      },
      {
        // This margin creates a trigger line roughly where your header sits (~80px from top)
        // Adjust "-80px" if your header is taller or shorter.
        rootMargin: "-80px 0px -90% 0px", 
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Your existing GSAP initial setup code...
    gsap.set(dropdownRef.current, { autoAlpha: 0, y: -10, scale: 0.98 });
    gsap.set(whatsAppDropdownRef.current, { autoAlpha: 0, y: -10, scale: 0.9, transformOrigin: "top right" });
    gsap.set(truusCursorRef.current, { autoAlpha: 0, scale: 0.8 });
    
    const navItems = [navLogoRef.current, navCentreRef.current, navIconRef.current];
    gsap.set(navItems, { y: -70, opacity: 0 });

    const runEntry = () => {
      gsap.to(navItems, { y: 0, opacity: 1, duration: 0.85, stagger: 0.13, ease: "power4.out" });
    };

    window.addEventListener("introComplete", runEntry);
    const fallback = setTimeout(runEntry, 3200);
    return () => {
      window.removeEventListener("introComplete", runEntry);
      clearTimeout(fallback);
    };
  }, []);

  // ── Work Logo Hover Logic ──
  const handleLogoHover = () => {
    gsap.to(blobRef.current, { scale: 1.15, rotation: 180, duration: 0.4, ease: "back.out(2)" });
    gsap.to(dropdownRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", overwrite: true });
    gsap.fromTo(dropdownItemsRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.1, overwrite: true });
  };
  
  const handleLogoLeave = () => {
    gsap.to(blobRef.current, { scale: 1, rotation: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(dropdownRef.current, { autoAlpha: 0, y: -10, scale: 0.98, duration: 0.3, ease: "power2.in", overwrite: true });
  };

  // ── WhatsApp Hover Logic ──
  const handleWhatsAppHover = () => {
    gsap.to(whatsAppDropdownRef.current, { 
      autoAlpha: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.4, 
      ease: "back.out(1.5)", 
      overwrite: true 
    });
  };

  const handleWhatsAppLeave = () => {
    gsap.to(whatsAppDropdownRef.current, { 
      autoAlpha: 0, 
      y: -10, 
      scale: 0.9, 
      duration: 0.3, 
      ease: "power2.in", 
      overwrite: true 
    });
  };

  // ── Centre Logo Hover Logic ──
  const handleTruusEnter = () => {
    gsap.to(truusCursorRef.current, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" });
    if (!shakeTl.current && navCentreRef.current) {
      shakeTl.current = gsap.timeline({ repeat: -1 });
      shakeTl.current
        .to(navCentreRef.current, { x: -2, y: 1, rotation: -2, duration: 0.06, ease: "none" })
        .to(navCentreRef.current, { x: 2, y: -1, rotation: 1, duration: 0.06, ease: "none" })
        .to(navCentreRef.current, { x: -1, y: 2, rotation: 2, duration: 0.06, ease: "none" })
        .to(navCentreRef.current, { x: 2, y: -2, rotation: -1, duration: 0.06, ease: "none" })
        .to(navCentreRef.current, { x: 0, y: 0, rotation: 0, duration: 0.06, ease: "none" });
    } else if (shakeTl.current) {
      shakeTl.current.play();
    }
  };

  const handleTruusMove = (e: React.MouseEvent) => {
    gsap.to(truusCursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.05, ease: "power2.out", overwrite: "auto" });
  };

  const handleTruusLeave = () => {
    gsap.to(truusCursorRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.2 });
    if (shakeTl.current) shakeTl.current.pause();
    gsap.to(navCentreRef.current, { x: 0, y: 0, rotation: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <>
      {/* CUSTOM TRUUS TOOLTIP CURSOR */}
      <div ref={truusCursorRef} className="fixed top-0 left-0 pointer-events-none z-[110] flex flex-col items-center">
        <div className="absolute bottom-full left-3 mb-1 bg-[#FFB1FF] text-black text-[13px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">to home</div>
        
        <Image 
  src="/assets/icons/cursorpointer.svg" 
  alt="Cursor pointer" 
  width={24} 
  height={24} 
  className="object-contain" 
/>
      </div>

      {/* GLOBAL FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-10 py-8 z-[100] flex justify-between items-center pointer-events-none">
        
        {/* LEFT LOGO WRAPPER */}
        <div ref={navLogoRef} className="relative pointer-events-auto cursor-pointer" onMouseEnter={handleLogoHover} onMouseLeave={handleLogoLeave}>
          
          {/* Dropdown Menu (Normal Colors) */}
          <div ref={dropdownRef} className="absolute top-[-1rem] left-[-1.5rem] w-[320px] bg-[#EBE8E2] rounded-[1.5rem] p-5 pt-[4.5rem] shadow-2xl z-40 origin-top cursor-auto">
            <div className="flex flex-col gap-5">
              {[
                { tag: "thsais", tagColor: "bg-[#EDA7AF] text-black", title: "skibidi school", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&h=150&fit=crop" },
                { tag: "douwe egberts", tagColor: "bg-[#B7546D] text-black", title: "feestje bouwe?\napp douwe", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&h=150&fit=crop" },
                { tag: "hema", tagColor: "bg-[#ECA7FF] text-black", title: "skibidi school", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&h=150&fit=crop" }
              ].map((item, index) => (
                <div key={index} ref={el => { if (el) dropdownItemsRef.current[index] = el; }} className="flex items-center gap-4 group/item cursor-pointer">
                  <img src={item.img} alt={item.title} className="w-16 h-16 rounded-[0.8rem] object-cover" />
                  <div className="flex flex-col items-start gap-1">
                    <span className={`px-3 py-0.5 rounded-full text-sm font-semibold tracking-tight ${item.tagColor}`}>{item.tag}</span>
                    <h3 className="font-bold text-black text-[15px] leading-[1.1] whitespace-pre-line group-hover/item:text-gray-600 transition-colors">{item.title}</h3>
                  </div>
                </div>
              ))}
              <button ref={el => { if (el) dropdownItemsRef.current[2] = el; }} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg mt-2 hover:bg-zinc-800 transition-colors cursor-pointer">All our work</button>
            </div>
          </div>

          {/* SVG Blob + Text */}
          <div className="flex items-center relative z-50">
            <div ref={blobRef} className="absolute -left-[1.2rem] top-1/2 -translate-y-1/2 text-[#F25C3B] z-0 pointer-events-none" style={{ width: "65px", height: "65px", transformOrigin: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 52 48" fill="currentColor">
                <path d="M51.9374 7.15723C51.4261 6.40359 50.38 7.32816 49.7458 7.55542C48.6021 7.9944 47.2965 8.46446 46.2388 8.97919C45.7938 9.20257 45.4737 9.40458 44.9214 9.60853C43.7798 9.97564 42.4703 10.0475 41.233 10.3175C40.5733 10.4476 40.0308 10.739 39.4199 10.8614C38.9457 10.9682 38.4422 10.9604 37.9601 11.0032C37.1737 11.1022 36.5043 11.2052 35.7412 11.178C35.144 11.1955 34.4571 11.1877 33.8404 11.0945C33.3134 11.0304 32.7358 11.1003 32.2264 11.0711C30.7959 10.9255 29.4864 10.7973 28.1886 10.0961C27.326 9.66291 26.5571 8.96365 25.7491 8.46446C24.7538 7.79239 24.0942 6.90084 23.4131 5.95101C22.689 4.95651 21.9923 3.83575 21.4166 2.76938C21.1024 2.24882 20.9307 1.68747 20.7394 1.12418C20.6125 0.809514 20.5891 0.467654 20.4271 0.275357C20.1734 -0.0470787 19.6192 -0.122832 19.3635 0.246222C19.1606 0.535637 19.102 0.898864 18.983 1.28151C18.7839 2.05264 18.6219 2.70917 18.4814 3.49001C18.4034 4.06495 18.3721 4.61465 18.2004 5.15658C17.7828 6.21906 17.7125 7.40974 17.3027 8.43144C17.1387 8.94423 16.7406 9.85521 16.4928 10.4768C16.1122 11.3761 15.9463 12.392 15.5423 13.2816C15.2652 13.874 15.1481 14.2411 14.8768 14.7714C14.4416 15.6513 13.8698 16.4263 13.3878 17.3237C13.0209 18.0404 12.5271 18.5804 12.1329 19.2952C11.93 19.6507 11.7524 20.0547 11.4889 20.346C10.7785 21.123 9.9452 21.9252 9.18993 22.6517C8.63373 23.1897 8.14779 23.9142 7.49011 24.3066C6.59824 24.8038 5.9386 25.6818 4.92183 25.9537C4.08655 26.3305 2.99366 26.2198 2.13692 26.4412C1.7466 26.6549 1.42654 26.82 0.938646 26.9754C0.636151 27.0628 0.331705 27.1444 0.146304 27.3678C-0.0644664 27.595 -0.0508039 27.9777 0.208756 28.1661C0.493687 28.4031 1.05769 28.339 1.48899 28.2652C2.27743 28.1913 2.97024 28.2244 3.79967 28.1603C4.42807 28.1525 5.05649 28.3137 5.67319 28.3526C7.13687 28.4322 8.56933 29.248 9.49633 30.3396C10.0603 31.1438 10.7434 31.9906 11.202 32.8822C11.5631 33.7874 12.01 34.6478 12.2422 35.5977C12.3554 36.6543 12.4491 37.711 12.5115 38.7657C12.531 39.6437 12.4803 40.4808 12.4745 41.3879C12.5623 42.6272 12.613 43.7771 12.2344 45.0027C12.1251 45.5699 11.9124 46.1662 11.8324 46.7178C11.7797 47.1665 12.0373 47.489 12.3417 47.7706C13.3527 48.532 13.6278 47.1976 14.2543 46.677C14.5704 46.3818 15.0505 46.0982 15.3823 45.7913C15.9248 45.2902 16.4303 44.7968 17.0568 44.3947C17.8101 43.9247 18.456 43.3983 19.225 42.936C19.8397 42.6136 20.3764 42.3882 20.9111 42.1357C21.8284 41.755 22.6812 41.3627 23.6492 41.0208C24.2171 40.8207 24.8514 40.6615 25.3783 40.3856C25.6886 40.2205 25.9013 40.0787 26.2136 39.9797C26.5883 39.8554 27.0176 39.8379 27.4138 39.7408C28.0032 39.5757 28.6374 39.5543 29.26 39.496C30.1851 39.3659 30.9813 39.2319 31.881 39.1076C32.7084 38.9696 33.5515 39.0629 34.381 39.0104C35.1811 38.9541 35.9871 39.0396 36.7424 39.1522C37.4254 39.2183 38.1397 39.2455 38.8208 39.4164C39.5331 39.5776 40.185 39.5796 40.8485 39.7058C41.5276 39.8495 42.1034 39.9855 42.8293 40.172C43.731 40.3992 44.6111 40.7702 45.5108 40.9742C46.2212 41.0849 46.8711 41.4811 47.5951 41.7822C48.4987 42.0813 49.9077 43.4022 50.8152 42.9379C51.1919 42.5631 50.3488 41.8308 50.1673 41.5045C50.0092 41.2889 49.8336 41.0422 49.6365 40.881C49.1544 40.5177 48.6665 40.1409 48.3465 39.6242C47.841 38.8725 47.3336 38.0995 46.8672 37.307C46.6291 36.8893 46.3246 36.6096 46.0456 36.1066C45.8075 35.6656 45.5655 35.1276 45.3488 34.6517C44.777 33.4824 44.5448 32.5423 44.2852 31.3671C44.1213 30.9534 43.9749 30.495 43.8266 30.0716C43.6646 29.5743 43.6783 29.0499 43.6119 28.5021C43.5358 27.494 43.407 26.4529 43.4402 25.4972C43.4382 24.3299 43.8539 23.1139 43.9749 21.9582C44.256 20.7054 44.7712 19.6604 45.2474 18.4192C45.667 17.4635 45.9148 16.4574 46.4671 15.5503C46.6974 15.1482 46.9589 14.7403 47.1033 14.3169C47.1306 14.2353 47.1287 14.2411 47.1423 14.2023C47.1736 14.1051 47.2029 14.008 47.2263 13.909C47.3395 13.3088 47.7161 12.7591 48.1299 12.3104C48.5729 11.817 48.8324 11.2848 49.2754 10.7487C49.6462 10.3058 49.9936 9.8455 50.3703 9.38709C50.9479 8.67424 52.2809 8.27022 51.9471 7.18637L51.9374 7.16695V7.15723Z" />
              </svg>
            </div>
            <span className={`${isDarkMode ? "text-black" : "text-white"} font-black text-4xl tracking-tighter leading-none relative z-10 pl-1 transition-colors duration-300`}>
              work
            </span>
          </div>
        </div>

        <div 
          ref={navCentreRef} 
          onMouseEnter={handleTruusEnter} 
          onMouseMove={handleTruusMove} 
          onMouseLeave={handleTruusLeave}
          className="mix-blend-difference pointer-events-auto cursor-none origin-center"
        >
          <Image
           src="/assets/icons/digitallogo.svg"
  alt="logo"
  width={95}
  height={30}
  className="object-contain"
  
          />
        </div>

        {/* RIGHT ICON & DROPDOWN WRAPPER */}
        <div 
          ref={navIconRef} 
          className="relative pointer-events-auto cursor-pointer"
          onMouseEnter={handleWhatsAppHover} 
          onMouseLeave={handleWhatsAppLeave}
        >
          
          {/* WhatsApp Dropdown Card */}
          <div 
            ref={whatsAppDropdownRef} 
            className="absolute top-[-2em] right-[-1em] mt-4 w-[20em] h-[25em] bg-[#F0EBE6] rounded-[1em] py-6  shadow-xl z-40 cursor-auto flex flex-col items-center text-center"
          >
            {/* QR Code Placeholder Image */}
            <div className="bg-white p-2 rounded-xl mb-4 w-40 h-40 flex items-center justify-center border border-gray-200 shadow-sm">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/" 
                alt="WhatsApp QR Code" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <h3 className="font-black text-2xl tracking-tight text-black mb-2">whatsapp us</h3>
            
            <p className="text-gray-700 text-[15px] font-medium leading-tight mb-5 px-2">
              Scan the QR code to chat with us via your smartphone.
            </p>
            
            <a 
              href="https://web.whatsapp.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-black border-b-2 border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Chat via desktop
            </a>
          </div>

          {/* WhatsApp SVG Icon */}
          {/* Note: Removed mix-blend-difference and applied #25D366 directly to match standard WhatsApp color */}
          <button className={`${isDarkMode ? "text-black" : "text-white"} hover:text-[#25D366] hover:scale-110 transition-all duration-300 flex items-center justify-center relative z-50`}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
               <path d="M12.01 2.005a9.99 9.99 0 0 0-8.5 15.26L2 22l4.88-1.46a9.988 9.988 0 0 0 14.12-11.51 9.987 9.987 0 0 0-8.99-7.025Zm4.8 13.56c-.22.62-1.28 1.18-1.78 1.25-.43.06-1 .13-3.21-.79-2.67-1.11-4.38-3.85-4.51-4.03-.14-.18-1.08-1.44-1.08-2.75 0-1.3.68-1.95.93-2.22.25-.28.54-.34.72-.34.18 0 .36 0 .52.01.19.01.42-.07.64.48.23.57.75 1.83.82 1.98.07.15.11.32.02.5-.09.18-.14.29-.28.45-.14.16-.3.34-.42.48-.14.15-.29.32-.12.61.16.29.72 1.21 1.55 1.95.12.11.25.21.37.31.57.48 1.14.73 1.44.88.3.15.47.13.65-.08.18-.21.77-.9 1.01-1.2.24-.3.48-.25.75-.15.27.1 1.73.82 2.03.96.3.15.5.22.57.34.07.12.07.7-.15 1.32Z" />
            </svg>
          </button>

        </div>

      </header>
    </>
  );
}