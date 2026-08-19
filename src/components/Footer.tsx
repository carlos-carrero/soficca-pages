"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-plus-jakarta-sans)";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[var(--paper)] pt-24 md:pt-36 pb-8 md:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Four columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* BRAND COLUMN */}
          <div className="flex flex-col space-y-4">
            <h2
              className="text-xl md:text-2xl font-extrabold text-[var(--ink)]"
              style={{ fontFamily: DISPLAY }}
            >
              Soficca
            </h2>
            <p
              className="text-sm text-[var(--ink-secondary)] leading-relaxed"
              style={{ fontFamily: SANS }}
            >
              The decision layer for healthcare.
            </p>
            <p
              className="text-xs text-[var(--muted)] leading-relaxed"
              style={{ fontFamily: SANS }}
            >
              Soficca supports decision review only. It does not diagnose,
              prescribe, or replace clinical judgment.
            </p>
          </div>

          {/* PRODUCT COLUMN */}
          <div className="flex flex-col space-y-4">
            <h3
              className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]"
              style={{ fontFamily: MONO }}
            >
              PRODUCT
            </h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="https://cardio.pilot.soficca.com/"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                Cardio Pilot
              </a>
              <a
                href="https://pen.soficca.com/"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                Pen
              </a>
            </nav>
          </div>

          {/* COMPANY COLUMN */}
          <div className="flex flex-col space-y-4">
            <h3
              className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]"
              style={{ fontFamily: MONO }}
            >
              COMPANY
            </h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="#roadmap"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                Roadmap
              </a>
              <a
                href="mailto:hello@soficca.com?subject=Inquiry%20%E2%80%94%20Soficca"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* CONTACT COLUMN */}
          <div className="flex flex-col space-y-4">
            <h3
              className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]"
              style={{ fontFamily: MONO }}
            >
              CONTACT
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:carlos@soficca.com"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                carlos@soficca.com
              </a>
              <a
                href="https://linkedin.com/company/soficca-health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: SANS }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="w-full h-px bg-[var(--rule)] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="text-xs text-[var(--muted)]"
            style={{ fontFamily: SANS }}
          >
            © 2026 Soficca
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"
            style={{ fontFamily: MONO }}
          >
            DETERMINISTIC · AUDITABLE · VERSIONABLE
          </p>
        </div>
      </div>
    </footer>
  );
}
