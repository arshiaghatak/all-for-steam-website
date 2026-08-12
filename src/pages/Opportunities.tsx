import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  opportunities,
  opportunityGallery,
  tutorBanner,
  talkToMeBanner,
  tutoringRequestBanner,
  type Opportunity,
} from "../data/opportunities";
import { PageHero } from "../components/PageHero";
import { MagneticButton } from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function groupByYear(items: Opportunity[]) {
  const byYear = new Map<string, Opportunity[]>();
  for (const item of items) {
    if (!byYear.has(item.year)) byYear.set(item.year, []);
    byYear.get(item.year)!.push(item);
  }
  return [...byYear.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}

interface InfoBannerData {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
}

function InfoBanner({ data, className = "" }: { data: InfoBannerData; className?: string }) {
  return (
    <div
      data-card
      className={`group relative overflow-hidden rounded-3xl border border-teal-400/30 bg-gradient-to-r from-teal-400/[0.08] via-ink-800 to-ink-800 ${className}`}
    >
      <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-teal-400/20 blur-[100px]" />
      <div className="relative flex flex-col items-center gap-6 px-8 py-10 text-center sm:flex-row sm:justify-between sm:px-12 sm:text-left">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
            {data.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-mist-50 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-balance text-sm leading-relaxed text-mist-300 sm:mx-0">
            {data.body}
          </p>
        </div>
        <div className="shrink-0">
          <MagneticButton href={data.cta.href} variant="solid">
            {data.cta.label} <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

function SpecialBadge({ special }: { special: string }) {
  return (
    <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-aqua-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-aqua-400">
      <span className="h-1 w-1 rounded-full bg-aqua-400" />
      {special}
    </span>
  );
}

function categoryLabel(item: Opportunity) {
  return item.subject ? `${item.subject} Workshop` : item.category;
}

function IndiaBadge() {
  return (
    <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
      <span className="h-1 w-1 rounded-full bg-orange-400" />
      India Chapter
    </span>
  );
}

// Tailwind needs literal class names to generate them, so map session count
// to a static column class rather than interpolating a number — this keeps
// a 3-day intensive from leaving two empty slots in a 5-column grid.
const SESSION_GRID_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

function CampCard({ item }: { item: Opportunity }) {
  const sessionCols =
    (item.sessions && SESSION_GRID_COLS[item.sessions.length]) ?? "sm:grid-cols-2 lg:grid-cols-5";
  return (
    <div
      data-card
      className="group relative col-span-full overflow-hidden rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-400/[0.08] via-ink-800 to-ink-900 p-6 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/15 blur-[110px]" />
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {item.special && <SpecialBadge special={item.special} />}
          {item.indiaChapter && <IndiaBadge />}
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mist-300">
          {categoryLabel(item)}
        </span>
      </div>
      <h3 className="relative mt-2 font-display text-3xl font-bold leading-snug text-mist-50 sm:text-4xl">
        {item.name}
      </h3>
      <p className="relative mt-2 text-sm font-medium text-teal-300">{item.date}</p>
      {item.description && (
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-mist-300">{item.description}</p>
      )}

      {item.sessions && (
        <div className={`relative mt-8 grid gap-4 ${sessionCols}`}>
          {item.sessions.map((session) => (
            <div key={session.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-display text-base font-bold text-teal-300">{session.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{session.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OpportunityCard({ item }: { item: Opportunity }) {
  const isOpen = item.status === "open";
  return (
    <div
      data-card
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen
          ? "border-teal-400/30 bg-gradient-to-b from-teal-400/[0.06] to-transparent hover:border-teal-400/60"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <div className="relative flex h-full flex-col p-6">
        {isOpen && (
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        )}
        <div className="relative flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mist-300">
            {categoryLabel(item)}
          </span>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              isOpen ? "bg-teal-400/15 text-teal-300" : "bg-white/[0.06] text-mist-500"
            }`}
          >
            {isOpen ? "Open" : "Completed"}
          </span>
        </div>

        {(item.special || item.indiaChapter) && (
          <div className="relative mt-3 flex flex-wrap gap-2">
            {item.special && <SpecialBadge special={item.special} />}
            {item.indiaChapter && <IndiaBadge />}
          </div>
        )}

        <h3 className="relative mt-3 font-display text-xl font-bold leading-snug text-mist-50">
          {item.name}
        </h3>
        <p className="relative mt-2 text-sm text-mist-400">{item.date}</p>
        {item.description && (
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-mist-400">{item.description}</p>
        )}

        {isOpen && item.href && (
          <div className="relative mt-6">
            <MagneticButton href={item.href} variant="solid" className="!px-5 !py-2.5 !text-xs w-full">
              Apply now <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        )}
      </div>
    </div>
  );
}

export function Opportunities() {
  const listRef = useRef<HTMLDivElement>(null);
  const grouped = useMemo(() => groupByYear(opportunities), []);

  useEffect(() => {
    const el = listRef.current;
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
        title="Opportunities"
        body="Tutoring applications, live workshops, and everything in between, organized so you always know what's open now and what we've run before."
      />

      <section className="relative pb-28 pt-8 sm:pt-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mb-16 grid gap-6 lg:grid-cols-2">
            <InfoBanner data={tutorBanner} />
            <InfoBanner data={talkToMeBanner} />
            <InfoBanner data={tutoringRequestBanner} className="lg:col-span-2" />
          </div>

          <div ref={listRef} className="space-y-16">
            {grouped.map(([year, items]) => (
              <div key={year}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-3xl font-bold text-mist-50">{year}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  <span className="text-xs font-medium uppercase tracking-wider text-mist-500">
                    {items.length} {items.length === 1 ? "workshop" : "workshops"}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) =>
                    item.sessions ? (
                      <CampCard key={item.name + item.date} item={item} />
                    ) : (
                      <OpportunityCard key={item.name + item.date} item={item} />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-16 text-center text-sm text-mist-500">
            More workshops are added regularly. Check back soon.
          </p>

          <div className="mt-24">
            <h2 className="mb-6 text-center font-display text-3xl font-bold text-mist-50">
              Photo Gallery
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {opportunityGallery.map((src) => (
                <div
                  key={src}
                  data-card
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={src}
                    alt="All For STEAM tutors and students on a live session"
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
