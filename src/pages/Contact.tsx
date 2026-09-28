import { useState, type FormEvent } from "react";
import { contact, links, stayConnected } from "../data/content";
import { PageHero } from "../components/PageHero";
import { FloatingField } from "../components/FloatingField";
import { MagneticButton } from "../components/MagneticButton";
import { StayConnected } from "../components/StayConnected";
import { usePageMeta } from "../hooks/usePageMeta";

// Web3Forms delivers submissions straight to allforsteamorg@gmail.com. This
// key only identifies which inbox to deliver to — it's meant to ship in
// public frontend code, not a secret.
const WEB3FORMS_ACCESS_KEY = "da618c89-7b99-4d68-a3dc-c82e12a822bb";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  usePageMeta("Contact | All For STEAM", `${contact.body} ${contact.subheading}`);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Message from ${form.name || "the All For STEAM website"}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
              <p
                className={`text-xs ${
                  status === "success"
                    ? "text-teal-300"
                    : status === "error"
                      ? "text-red-400"
                      : "text-mist-500"
                }`}
              >
                {status === "success"
                  ? "Message sent — we'll get back to you soon."
                  : status === "error"
                    ? `Something went wrong. Please email us directly at ${links.email}.`
                    : "We typically respond within a few days."}
              </p>
              <MagneticButton type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Submit"} <span aria-hidden="true">→</span>
              </MagneticButton>
            </div>
          </form>
        </div>
      </section>

      <StayConnected />
    </>
  );
}
