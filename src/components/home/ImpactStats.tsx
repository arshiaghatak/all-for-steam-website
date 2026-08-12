import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, impact } from "../../data/content";
import { AnimatedCounter } from "../AnimatedCounter";
import { SectionHeading } from "../SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function ImpactStats() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-card]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-y border-white/[0.06] bg-ink-850 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(45,212,191,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading kicker={impact.kicker} title={impact.title} body={impact.body} />

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-card
              className="group relative flex flex-col items-center justify-center gap-2 bg-ink-900 px-6 py-12 text-center transition-colors duration-300 hover:bg-ink-800"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.12),transparent_70%)]" />
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="relative font-display text-5xl font-bold leading-[1.25] text-gradient [font-variant-numeric:lining-nums] sm:text-6xl"
              />
              <p className="relative mt-1 text-sm font-semibold text-mist-50">{stat.label}</p>
              <p className="relative text-xs text-mist-500">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
