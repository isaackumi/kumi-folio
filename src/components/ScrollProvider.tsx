"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2.2,
      lerp: 0.08,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let debounce = 0;
    const syncScrollMetrics = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        debounce = 0;
        lenis.resize();
        ScrollTrigger.refresh();
      }, 120);
    };

    const syncScrollMetricsImmediate = () => {
      window.clearTimeout(debounce);
      debounce = 0;
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", syncScrollMetricsImmediate, { passive: true });
    const ro = new ResizeObserver(syncScrollMetrics);
    ro.observe(document.body);

    syncScrollMetricsImmediate();

    return () => {
      window.removeEventListener("resize", syncScrollMetricsImmediate);
      ro.disconnect();
      window.clearTimeout(debounce);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};
