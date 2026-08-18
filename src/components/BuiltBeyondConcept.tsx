"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";

const LOG_ENTRIES = [
  {
    exhibit: "EXHIBIT 01: TECHNICAL PILOT",
    badge: "✓ VERIFIED",
    title: "Cardio Pilot",
    body: "Live clinical routing for cardiology workflows. 12 golden cases validated, governed decision routes active, traceable outputs in production.",
  },
  {
    exhibit: "EXHIBIT 02: CORE ENGINE",
    badge: "ACTIVE",
    title: "Soficca Core Engine",
    body: "The governed decision layer that evaluates structured inputs against safety rules, routing criteria, and workflow logic to produce traceable next-step outputs.",
  },
  {
    exhibit: "EXHIBIT 03: MARKET WORKFLOW",
    badge: "LIVE",
    title: "Pen Workflow",
    body: "End-to-end workflow integration built on top of the core engine. Structured data entry, governed processing, and auditable output delivery.",
  },
  {
    exhibit: "EXHIBIT 04: REVIEW LAYER",
    badge: "DOCUMENTED",
    title: "Reviewer Layer",
    body: "Controlled physician review workflows where clinicians validate AI-structured outputs before they enter the governed decision layer.",
  },
];

function Badge({ text }: { text: string }) {
  return (
    <span
      className="inline-block text-[9px] tracking-[0.05em] px-2 py-[2px] rounded-sm whitespace-nowrap"
      style={{
        fontFamily: MONO,
        color: "var(--accent)",
        border: "1px solid var(--accent)",
      }}
    >
      [{text}]
    </span>
  );
}

export default function BuiltBeyondConcept() {
  return (
    <section className="w-full bg-[var(--paper)] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] mb-5"
            style={{ fontFamily: MONO }}
          >
            Execution
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] leading-tight mb-5"
            style={{ fontFamily: DISPLAY }}
          >
            Built beyond concept
          </h2>
          <p
            className="text-base text-[var(--ink-secondary)] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            Soficca is not a static concept. It is a working system with live infrastructure, validated clinical workflows, and governed logic in production today.
          </p>
        </div>

        {/* Carlos Pérez — Exhibit 00 */}
        <div
          className="mb-12 pl-5 border-l-[3px]"
          style={{ borderColor: "var(--accent)" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
            <span
              className="text-[9px] uppercase tracking-[0.15em] text-[var(--muted)]"
              style={{ fontFamily: MONO }}
            >
              Exhibit 00: External Validation
            </span>
            <Badge text="✓ VERIFIED" />
          </div>
          <h3
            className="text-lg md:text-xl font-semibold text-[var(--ink)] mb-1"
            style={{ fontFamily: DISPLAY }}
          >
            Carlos Pérez
          </h3>
          <p
            className="text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-3"
            style={{ fontFamily: MONO }}
          >
            Clinical Audit & Regulatory Advisor
          </p>
          <p
            className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-2xl"
            style={{ fontFamily: SANS }}
          >
            Physician with regulatory and clinical audit expertise advising on Soficca's governance layer, decision traceability, and compliance alignment for clinical deployment.
          </p>
        </div>

        {/* Divider before log entries */}
        <div className="h-px w-full" style={{ backgroundColor: "var(--rule)" }} />

        {/* Log entries */}
        {LOG_ENTRIES.map((entry, i) => (
          <div key={entry.title}>
            <div className="py-8 md:py-10">
              {/* Exhibit label + badge */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                <span
                  className="text-[9px] uppercase tracking-[0.15em] text-[var(--muted)]"
                  style={{ fontFamily: MONO }}
                >
                  {entry.exhibit}
                </span>
                <Badge text={entry.badge} />
              </div>
              {/* Title */}
              <h3
                className="text-lg md:text-xl font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: DISPLAY }}
              >
                {entry.title}
              </h3>
              {/* Body */}
              <p
                className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-3xl"
                style={{ fontFamily: SANS }}
              >
                {entry.body}
              </p>
            </div>
            {/* Divider between rows, not below last */}
            {i < LOG_ENTRIES.length - 1 && (
              <div className="h-px w-full" style={{ backgroundColor: "var(--rule)" }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
