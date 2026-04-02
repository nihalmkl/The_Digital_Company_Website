"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAppSelector } from "@/redux/store";

const SmoothScroll = ({
  children,
}: {
  children: React.ReactNode;
  scrollEnabled?: boolean;
}) => {
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const rafHandleRef = useRef<number | null>(null);
  const { scrollEnabled } = useAppSelector((state) => state.scroll);

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis();
      const raf = (time: number) => {
        if (scrollEnabled) lenisRef.current?.raf(time);
        rafHandleRef.current = requestAnimationFrame(raf);
      };
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = undefined;
      }
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
        rafHandleRef.current = null;
      }
    };
  }, [scrollEnabled]);

  // Pause/resume on scrollEnabled change
  useEffect(() => {
    if (lenisRef.current) {
      if (!scrollEnabled) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [scrollEnabled]);

  return <>{children}</>;
};

export default SmoothScroll;
