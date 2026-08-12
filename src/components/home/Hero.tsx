import { useEffect, useRef, Suspense, lazy } from "react";
import gsap from "gsap";
import { hero } from "../../data/content";
import { MagneticButton } from "../MagneticButton";
import { useIsDesktop, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { AuroraBackground } from "../AuroraBackground";

// Three.js + react-three-fiber are heavy — only pull them into the bundle
// when a desktop viewport actually needs the WebGL background.
const ParticleField = lazy(() =>
  import("../ParticleField").then((m) => ({ default: m.ParticleField }))
);

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const words = hero.headline.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero-word]",
        { opacity: 0, y: 60, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.09 }
      )
        .fromTo(
          "[data-hero-tagline]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      {isDesktop && !reducedMotion ? (
        <Suspense fallback={<AuroraBackground />}>
          <ParticleField />
        </Suspense>
      ) : (
        <AuroraBackground />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center sm:px-8">
        <h1 className="font-display text-6xl font-semibold leading-[1.05] tracking-tight text-mist-50 sm:text-7xl md:text-8xl [perspective:1000px]">
          {words.map((word, i) => (
            <span key={i} data-hero-word className="mx-2 inline-block text-gradient sm:mx-3">
              {word}
            </span>
          ))}
        </h1>

        <p
          data-hero-tagline
          className="mt-6 max-w-xl font-display text-lg font-medium tracking-wide text-mist-300 sm:text-xl"
        >
          {hero.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <div data-hero-cta>
            <MagneticButton href={hero.primaryCta.href} variant="solid">
              {hero.primaryCta.label} <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
          <div data-hero-cta>
            <MagneticButton href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
