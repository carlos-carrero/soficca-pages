"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";

const STATS = [
  {
    figure: "US$42B",
    marker: "¹",
    description:
      "Estimated annual global cost associated with medication errors.",
  },
  {
    figure: "24%",
    marker: "²",
    description:
      "Share of patients with chronic conditions reporting they have a care plan available to them.",
  },
];

const FOOTNOTES = [
  {
    marker: "¹",
    text: "WHO: Estimated annual global cost associated with medication errors, global.",
  },
  {
    marker: "²",
    text: "OECD PaRIS: Share of chronic-condition patients reporting availability of a coordinated care plan.",
  },
];

export default function CostOfFragmentation() {
  return (
    <section className="w-full bg-[#171613] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow + Headline */}
        <div className="max-w-3xl mb-20 md:mb-24">
          <p
            className="text-[9px] uppercase tracking-[0.25em] mb-5"
            style={{ fontFamily: MONO, color: "rgba(255,255,255,0.45)" }}
          >
            Why This Layer Matters
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: DISPLAY }}
          >
            The cost of fragmented decisions is already enormous.
          </h2>
          <p
            className="text-[9px] uppercase tracking-[0.15em]"
            style={{ fontFamily: MONO, color: "rgba(255,255,255,0.35)" }}
          >
            Cost → Continuity → Decision Layer
          </p>
        </div>

        {/* Part 1: connecting sentence */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl mb-20 md:mb-28"
          style={{ fontFamily: SANS, color: "rgba(255,255,255,0.6)" }}
        >
          Fragmented decisions still carry real system cost. Avoidable errors
          compound across every handoff that lacks a governed, traceable decision
          layer.
        </p>

        {/* Part 2 — oversized citation figures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20 md:mb-28">
          {STATS.map((stat) => (
            <div key={stat.marker} className="flex flex-col">
              <p
                className="text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-none tracking-tight text-white"
                style={{ fontFamily: DISPLAY }}
              >
                {stat.figure}
                <sup
                  className="text-[0.9rem] md:text-[1.1rem] font-normal align-super ml-1"
                  style={{
                    fontFamily: MONO,
                    color: "rgba(255,255,255,0.4)",
                    position: "relative",
                    top: "-0.6em",
                  }}
                >
                  {stat.marker}
                </sup>
              </p>
              <p
                className="text-sm leading-relaxed mt-5 max-w-sm"
                style={{ fontFamily: SANS, color: "rgba(255,255,255,0.5)" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Part 3 — footnote/bibliography block */}
        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          {FOOTNOTES.map((fn) => (
            <p
              key={fn.marker}
              className="text-[10px] md:text-[11px] leading-relaxed mb-2 last:mb-0"
              style={{ fontFamily: MONO, color: "rgba(255,255,255,0.32)" }}
            >
              <span className="inline-block w-3">{fn.marker}</span>
              {fn.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
