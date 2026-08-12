import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mission, links } from "../data/content";
import { PageHero } from "../components/PageHero";
import { MagneticButton } from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Mission() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
      gsap.fromTo(
        "[data-mission-photo]",
        { opacity: 0, y: 40, rotate: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero title={mission.title} body={mission.body} />

      <section ref={rootRef} className="relative pb-28 pt-8 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            {mission.paragraphs.map((p, i) => (
              <p key={i} data-reveal className="text-balance text-lg leading-relaxed text-mist-300">
                {p}
              </p>
            ))}
            <div data-reveal className="pt-4">
              <MagneticButton href={links.joinForm} variant="solid">
                Join Us Today <span aria-hidden="true">→</span>
              </MagneticButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div
              data-mission-photo
              className="relative aspect-[8/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/40"
            >
              <img
                src={mission.image}
                alt="A student learning with All For STEAM"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-teal-500/10 blur-[100px]" />
          </div>
        </div>
      </section>
    </>
  );
}
