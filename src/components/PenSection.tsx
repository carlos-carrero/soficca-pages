"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";
const DISPLAY = "var(--font-space-grotesk)";
const INK = "var(--ink)";

const INPUT_CHIPS = [
  "ORAL FINASTERIDE · 1MG",
  "TOPICAL MINOXIDIL · 5%",
  "PREFERENCE · ORAL",
  "FOLLOW-UP · 90 DAYS",
];

const GOVERNED_CHIP = "ROUTE → ORAL MONOTHERAPY";

interface ChipScatter {
  x: number;
  y: number;
  rotation: number;
}

function generateScatter(count: number): ChipScatter[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 180,
    y: (Math.random() - 0.5) * 80,
    rotation: (Math.random() - 0.5) * 35,
  }));
}

type AnimPhase = "idle" | "scattered" | "settling" | "settled";

export default function PenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<AnimPhase>("settled");
  const [scatter, setScatter] = useState<ChipScatter[]>(() =>
    Array.from({ length: 5 }, () => ({ x: 0, y: 0, rotation: 0 }))
  );

  const isInViewRef = useRef(false);
  const lastScrollYOnExit = useRef(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setIsMounted(true);
    lastScrollYOnExit.current = window.scrollY;
  }, []);

  const playSequence = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    const newScatter = generateScatter(5);
    setScatter(newScatter);
    setPhase("scattered");

    const t1 = setTimeout(() => setPhase("settling"), 800);
    const t2 = setTimeout(() => setPhase("settled"), 1600);
    timerRefs.current = [t1, t2];
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInViewRef.current;
        isInViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !wasInView) {
          const currentY = window.scrollY;
          const isDownward = currentY > lastScrollYOnExit.current;
          if (isDownward) {
            playSequence();
          }
        } else if (!entry.isIntersecting && wasInView) {
          lastScrollYOnExit.current = window.scrollY;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timerRefs.current.forEach(clearTimeout);
    };
  }, [isMounted, playSequence]);

  const isScattered = phase === "scattered";
  const isSettled = phase === "settling" || phase === "settled";
  const showLines = isSettled && phase === "settled";

  return (
    <section ref={sectionRef} className="w-full bg-[var(--warm-white)] py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* LEFT COLUMN — text content */}
        <div>
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] mb-5"
            style={{ fontFamily: MONO }}
          >
            First Product Workflow
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ fontFamily: DISPLAY, color: INK }}
          >
            Pen is the first market-facing workflow powered by Soficca.
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ fontFamily: SANS, color: "var(--ink-secondary)" }}
          >
            Pen is the first product surface built on Soficca. It turns clinical
            intake into governed next-step decisions: structured, traceable, and
            reusable across every future review.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ fontFamily: SANS, color: "var(--ink-secondary)" }}
          >
            Building Pen made the infrastructure visible. Every decision route,
            safety condition, and follow-up trigger that Soficca governs was
            shaped by the demands of a real clinical workflow running in
            production.
          </p>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ fontFamily: SANS, color: "var(--ink-secondary)" }}
          >
            Pen inherits{" "}
            <span className="font-medium" style={{ color: INK }}>structured decision history</span>,{" "}
            <span className="font-medium" style={{ color: INK }}>compounding safety logic</span>,{" "}
            <span className="font-medium" style={{ color: INK }}>longitudinal decision context</span>,
            and a{" "}
            <span className="font-medium" style={{ color: INK }}>reusable decision layer</span>{" "}
            directly from Soficca's engine. Nothing here was built specifically
            for Pen.
          </p>
          <a
            href="https://pen.soficca.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center text-[10px] uppercase tracking-[0.15em] font-medium border-b pb-1 transition-colors"
            style={{
              fontFamily: MONO,
              color: INK,
              borderColor: "var(--rule)",
            }}
          >
            Explore Pen →
          </a>
        </div>

        {/* RIGHT COLUMN — chip animation with connectors */}
        <div className="relative" style={{ padding: "70px 40px" }}>
          {/* Connector lines SVG — visible only when settled */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: showLines ? 1 : 0,
              transition: "opacity 400ms ease 200ms",
            }}
            aria-hidden="true"
          >
            {/* Lines from each input chip position to the governed chip
                Input chips: ~centered in top area, governed chip: centered below
                Using percentage-based coordinates for responsive behavior */}
            <line x1="30%" y1="35%" x2="50%" y2="72%" stroke="var(--ink)" strokeWidth="1" />
            <line x1="70%" y1="35%" x2="50%" y2="72%" stroke="var(--ink)" strokeWidth="1" />
            <line x1="30%" y1="52%" x2="50%" y2="72%" stroke="var(--ink)" strokeWidth="1" />
            <line x1="70%" y1="52%" x2="50%" y2="72%" stroke="var(--ink)" strokeWidth="1" />
          </svg>

          {/* Input chips cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {INPUT_CHIPS.map((text, i) => {
              const s = scatter[i];
              return (
                <div
                  key={text}
                  className="relative flex-shrink-0"
                  style={{
                    transform: isScattered
                      ? `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`
                      : "translate(0, 0) rotate(0deg)",
                    transition: isSettled
                      ? `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`
                      : "none",
                  }}
                >
                  <span
                    className="inline-flex items-center px-3 py-1.5 rounded-[5px] text-[10px] tracking-[0.04em] whitespace-nowrap"
                    style={{
                      fontFamily: MONO,
                      backgroundColor: "var(--paper)",
                      color: INK,
                      border: `1px solid ${INK}`,
                    }}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Governed chip — inverted */}
          <div className="flex justify-center">
            <div
              className="relative flex-shrink-0"
              style={{
                transform: isScattered
                  ? `translate(${scatter[4].x}px, ${scatter[4].y}px) rotate(${scatter[4].rotation}deg)`
                  : "translate(0, 0) rotate(0deg)",
                transition: isSettled
                  ? `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 320ms`
                  : "none",
              }}
            >
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-[5px] text-[10px] tracking-[0.04em] whitespace-nowrap"
                style={{
                  fontFamily: MONO,
                  backgroundColor: INK,
                  color: "var(--paper)",
                  border: `1px solid ${INK}`,
                }}
              >
                {GOVERNED_CHIP}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
