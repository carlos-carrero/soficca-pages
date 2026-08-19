"use client";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";

const PHASES = [
  {
    status: "Live Now",
    title: "Live Pilot Infrastructure",
    body: "Real clinical workflows running on governed logic. Cardiology routing, golden-case validation, and traceable outputs: live in production today.",
    link: { label: "View Cardio Pilot →", href: "https://cardio.pilot.soficca.com/" },
    ruleStyle: "solid",
    opacity: 1,
    titleSize: "text-[1.5rem] md:text-[1.75rem]",
  },
  {
    status: "Building",
    title: "Controlled Physician Review",
    body: "Structured review workflows where physicians validate AI-structured outputs before they enter the decision layer.",
    link: null,
    ruleStyle: "dashed",
    opacity: 0.75,
    titleSize: "text-[1.25rem] md:text-[1.4rem]",
  },
  {
    status: "Expansion",
    title: "Workflow Expansion",
    body: "Beyond cardiology: applying the same governed infrastructure to additional clinical specialties and decision contexts.",
    link: null,
    ruleStyle: "dotted",
    opacity: 0.55,
    titleSize: "text-[1.1rem] md:text-[1.2rem]",
  },
];

export default function OurRoadmap() {
  return (
    <section className="w-full bg-[#171613] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-16 md:mb-20">
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            Our Roadmap
          </h2>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-[#706c67]"
            style={{ fontFamily: MONO }}
          >
            Current → Next → Later
          </p>
        </div>

        {/* Three columns of decreasing width */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_3.5fr_2.5fr] gap-8 md:gap-6">
          {PHASES.map((phase) => (
            <div key={phase.title} className="flex flex-col">
              {/* Top rule */}
              <div
                className="w-full h-0 mb-6"
                style={{
                  borderTop: `1px ${phase.ruleStyle} rgba(255,255,255,${phase.opacity * 0.6})`,
                }}
              />

              {/* Status badge */}
              <p
                className="text-[9px] uppercase tracking-[0.15em] mb-3"
                style={{
                  fontFamily: MONO,
                  color: `rgba(255,255,255,${phase.opacity * 0.7})`,
                }}
              >
                {phase.status}
              </p>

              {/* Title */}
              <h3
                className={`font-semibold leading-tight mb-3 ${phase.titleSize}`}
                style={{
                  fontFamily: DISPLAY,
                  color: `rgba(255,255,255,${phase.opacity})`,
                }}
              >
                {phase.title}
              </h3>

              {/* Body */}
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: SANS,
                  color: `rgba(255,255,255,${phase.opacity * 0.65})`,
                }}
              >
                {phase.body}
              </p>

              {/* Optional link */}
              {phase.link && (
                <a
                  href={phase.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-[11px] uppercase tracking-[0.1em] transition-colors"
                  style={{
                    fontFamily: MONO,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {phase.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
