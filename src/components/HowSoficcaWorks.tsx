"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";

const GOVERNED_ITEMS = [
  {
    title: "Governed logic",
    body: "Rules, routing criteria, and safety conditions evaluate what should happen next.",
  },
  {
    title: "Traceable output",
    body: "Each decision is produced as a legible next-step output with clear logic behind it.",
  },
  {
    title: "Longitudinal context",
    body: "Follow-up data carries forward so future reviews and actions improve over time.",
  },
];

export default function HowSoficcaWorks() {
  return (
    <section className="w-full bg-[var(--paper)] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
        {/* LEFT COLUMN — editorial text */}
        <div className="flex flex-col gap-5">
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]"
            style={{ fontFamily: MONO }}
          >
            How Soficca Works
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            From inputs to governed decisions
          </h2>
          <p
            className="text-lg text-[var(--ink-secondary)] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            <span className="font-bold" style={{ color: "var(--accent)" }}>AI</span>{" "}
            structures the signals. Governed logic determines the next step.
          </p>
          <p
            className="text-base text-[var(--ink-secondary)] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            Soficca is designed to turn structured inputs into governed next-step decisions. Patient signals, safety rules, workflow logic, and follow-up data are evaluated together so each output is actionable, traceable, and consistent over time.
          </p>
        </div>

        {/* RIGHT COLUMN — AI moment + governed chain */}
        <div className="flex flex-col">
          {/* PART 1 — The AI moment */}
          <div className="flex items-baseline gap-4 md:gap-5">
            <span
              className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-bold leading-none select-none"
              style={{ fontFamily: DISPLAY, color: "var(--accent)" }}
            >
              AI
            </span>
            <span
              className="text-[1.1rem] md:text-[1.4rem] lg:text-[1.7rem] leading-snug"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: "var(--ink)" }}
            >
              structures the
              <br />
              raw signal.
            </span>
          </div>

          {/* Deliberate vertical gap */}
          <div className="h-[70px] md:h-[90px] lg:h-[110px]" />

          {/* PART 2 — The governed chain */}
          <div className="flex flex-col">
            {/* Connector phrase */}
            <p
              className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] mb-6"
              style={{ fontFamily: MONO }}
            >
              Then governed, deterministically:
            </p>

            {/* Connected items */}
            <div className="relative pl-[18px]">
              {/* Continuous vertical line */}
              <div
                className="absolute left-[5px] top-[5px] bottom-[5px] w-px"
                style={{ backgroundColor: "var(--ink)", opacity: 0.7 }}
              />

              {GOVERNED_ITEMS.map((item, i) => (
                <div key={item.title}>
                  {/* Divider between items (not above first or below last) */}
                  {i > 0 && (
                    <div
                      className="ml-4 h-px"
                      style={{ backgroundColor: "var(--rule)" }}
                    />
                  )}
                  <div className="relative py-5 pl-4">
                    {/* Circular marker */}
                    <div
                      className="absolute left-[-18px] top-[24px] w-[11px] h-[11px] rounded-full"
                      style={{
                        backgroundColor: "var(--paper)",
                        border: "1.5px solid var(--ink)",
                      }}
                    />
                    <h3
                      className="text-[1.15rem] font-semibold text-[var(--ink)] mb-1"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm text-[var(--muted)] leading-relaxed"
                      style={{ fontFamily: SANS }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
