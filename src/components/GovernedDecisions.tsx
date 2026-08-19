"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";

const ITEMS = [
  {
    num: "01",
    title: "Safer decisions",
    body: "Structured logic helps reduce avoidable variation in high-stakes next-step decisions.",
  },
  {
    num: "02",
    title: "Longitudinal decision context",
    body: "Each follow-up adds context that improves the next review, route, or action.",
  },
  {
    num: "03",
    title: "Traceable logic",
    body: "Every governed output can remain legible, reviewable, and consistent over time.",
  },
  {
    num: "04",
    title: "Reusable across workflows",
    body: "The same decision layer can support repeated care logic across multiple environments.",
  },
];

export default function GovernedDecisions() {
  return (
    <section className="w-full bg-[#f8f6f1] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
        {/* LEFT COLUMN — editorial text */}
        <div className="flex flex-col gap-5">
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-[#706c67]"
            style={{ fontFamily: MONO }}
          >
            From Fragmented Care
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1a1917] leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            Toward governed clinical decisions
          </h2>
          <p
            className="text-base text-[#3d3a36] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            The challenge is not a single clinical decision. It is the repeated failure of what happens next. Across intake, routing, medication, and follow-up, next-step decisions still live in fragmented workflows, disconnected tools, and manual judgment.
          </p>
          <p
            className="text-base text-[#3d3a36] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            Soficca exists to structure those recurring decisions into governed, traceable logic that can be reused across care workflows.
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-[#a09b94] pt-4"
            style={{ fontFamily: MONO }}
          >
            Governance · Traceability · Continuity · Reuse
          </p>
        </div>

        {/* RIGHT COLUMN — numbered vertical list */}
        <div className="flex flex-col">
          {ITEMS.map((item, i) => (
            <div key={item.num}>
              {i > 0 && <div className="w-full h-px bg-[#ddd8d0]" />}
              <div className="py-10 md:py-12 grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline">
                <span
                  className="text-[#c8c3bc] text-5xl md:text-6xl font-light leading-none select-none"
                  style={{ fontFamily: MONO }}
                >
                  {item.num}
                </span>
                <div className="flex flex-col gap-2 pt-1">
                  <h3
                    className="text-lg md:text-xl font-bold text-[#1a1917]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm md:text-base text-[#5c5955] leading-relaxed"
                    style={{ fontFamily: SANS }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
