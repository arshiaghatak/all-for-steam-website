import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { AuroraBackground } from "./AuroraBackground";
import { Starfield } from "./Starfield";

interface PageHeroProps {
  title: string;
  body?: ReactNode;
}

export function PageHero({ title, body }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-page-hero-item]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20">
      <AuroraBackground variant="subtle" />
      <Starfield />
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <h1
          data-page-hero-item
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-mist-50 sm:text-6xl md:text-7xl"
        >
          {title}
        </h1>
        {body && (
          <p data-page-hero-item className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-mist-300">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
