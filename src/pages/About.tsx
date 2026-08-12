import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team, links } from "../data/content";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { TeamCard } from "../components/TeamCard";
import { MagneticButton } from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const founder = team[0];

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-card]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero
        title="About Us"
        body="All For STEAM started as a handful of high schoolers who wanted STEM education to feel possible for every kid, everywhere."
      />

      <section className="relative py-8 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src={founder.photo}
              alt={founder.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="font-display text-lg font-bold text-mist-50">{founder.name}</p>
              <p className="text-xs uppercase tracking-wide text-teal-300">{founder.role}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Meet the Founder
            </p>
            {/* PLACEHOLDER — swap in Arshia's bio copy here whenever it's ready. */}
            <p className="mt-4 text-balance text-lg leading-relaxed text-mist-300">
              {founder.bio}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            kicker="Meet the Team"
            title="Fifteen students, one mission"
            body="Every tutor, lead, and advisor here is a high schooler donating their time to make STEAM education accessible. Hover a card to meet them."
          />

          <div
            ref={gridRef}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-28 pt-4">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-mist-50 sm:text-4xl">
            Want to join our team?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-mist-300">
            We're always looking for passionate high schoolers to tutor, teach workshops, and help run the org.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href={links.tutorApplication} variant="solid">
              Apply to Tutor <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
