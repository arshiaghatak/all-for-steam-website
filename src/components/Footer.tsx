import { Link } from "react-router-dom";
import { nav, links, site, footer } from "../data/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60vw] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src="/brand/logo.png" alt={site.name} className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-500">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">
              Navigate
            </h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-mist-300 transition-colors hover:text-teal-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="text-sm text-mist-300 transition-colors hover:text-teal-300"
                >
                  {links.email}
                </a>
              </li>
              <li>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mist-300 transition-colors hover:text-teal-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mist-300 transition-colors hover:text-teal-300"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-mist-500 sm:flex-row">
          <p>{footer.copyright}</p>
          <p className="font-display tracking-wide text-mist-500">
            Made by students, for students.
          </p>
        </div>
      </div>
    </footer>
  );
}
