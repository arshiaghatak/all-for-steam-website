import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { programs, whatWeDo } from "../data/content";
import { PageHero } from "../components/PageHero";

gsap.registerPlugin(ScrollTrigger);

export function WhatWeDo() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-card]"),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero title={whatWeDo.title} body={whatWeDo.body} />

      <section className="relative pb-28 pt-8 sm:pt-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2">
            {programs.map((program, i) => (
              <div
                key={program.title}
                data-card
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-all duration-500 hover:border-teal-400/30 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/0 blur-3xl transition-all duration-700 group-hover:bg-teal-400/20" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent bg-[linear-gradient(120deg,transparent,rgba(45,212,191,0.35),transparent)] bg-[length:200%_100%] bg-[position:200%_0] opacity-0 transition-[opacity,background-position] duration-700 group-hover:opacity-100 group-hover:bg-[position:-100%_0]" />

                <div className="relative flex items-center justify-between">
                  <span className="font-display text-4xl font-bold text-mist-500/30">
                    0{i + 1}
                  </span>
                  <span className="rounded-full border border-teal-400/25 bg-teal-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-300">
                    {program.tag}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-2xl font-bold text-mist-50">
                  {program.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-mist-300">
                  {program.description}
                </p>

                <div className="relative mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
