import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis drives scroll off its own tracked target position on every raf tick,
// so a plain `window.scrollTo(0, 0)` gets silently overridden a frame later
// (it snaps right back to wherever Lenis last had it). Route changes need to
// reset Lenis itself, so we stash the live instance here for ScrollManager
// to call `lenis.scrollTo(0, { immediate: true })` on.
let activeLenis: Lenis | null = null;

export function getLenis() {
  return activeLenis;
}

/**
 * Wires Lenis smooth scrolling into GSAP's ScrollTrigger ticker so every
 * scroll-driven animation in the app stays perfectly in sync with the
 * smoothed scroll position. Skips smoothing entirely for users who've
 * asked for reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      activeLenis = null;
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);
}
