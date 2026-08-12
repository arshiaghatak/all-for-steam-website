import { useState, type FormEvent } from "react";
import { contact, links, stayConnected } from "../data/content";
import { PageHero } from "../components/PageHero";
import { FloatingField } from "../components/FloatingField";
import { MagneticButton } from "../components/MagneticButton";
import { StayConnected } from "../components/StayConnected";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name || "the All For STEAM website"}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHero title={contact.heading} body={contact.body} />

      <section className="relative pb-28 pt-8 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                Email us directly
              </p>
              <a
                href={`mailto:${links.email}`}
                className="mt-3 block break-words font-display text-2xl font-bold text-mist-50 transition-colors hover:text-teal-300"
              >
                {links.email}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-mist-400">
                {contact.subheading}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                Follow along
              </p>
              <div className="mt-3 space-y-3">
                {stayConnected.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-display text-lg font-bold text-mist-50 transition-colors hover:text-teal-300"
                  >
                    {s.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FloatingField
                label="Name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <FloatingField
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <FloatingField
              as="textarea"
              label="Message"
              required
              className="mt-5"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-mist-500">
                Opens your email client with this pre-filled.
              </p>
              <MagneticButton type="submit">
                Submit <span aria-hidden="true">→</span>
              </MagneticButton>
            </div>
          </form>
        </div>
      </section>

      <StayConnected />
    </>
  );
}
