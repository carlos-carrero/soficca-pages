"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import EntropyToCertaintyGraph from "@/components/EntropyToCertaintyGraph";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      {/* HERO — sized to its own content only. No min-h-screen: the section
          should end right after the body paragraph / diagram row, not be
          forced to fill the viewport. */}
      <section className="relative w-full pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6">
          <div className="flex flex-col space-y-6">
            <p
              className="text-[11px] uppercase tracking-[0.25em] text-[#706c67]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Clinical Decision Infrastructure
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-[#1a1917] leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              From Clinical Data Chaos
              <br />
              <span className="text-[#2d6a4f]">to Tacit Decision Certainty</span>
            </h1>
            <p
              className="text-base lg:text-lg text-[#3d3a36] leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Soficca transforms unstructured clinical narratives into governed,
              evidence-based decision routes — eliminating entropy at the point of care.
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#a09b94] pt-2"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Chaos → Waveform → Tactical Certainty
            </p>
          </div>

          <div className="w-full aspect-[5/2] flex items-center justify-center overflow-hidden">
            <EntropyToCertaintyGraph />
          </div>
        </div>
      </section>

      {/* STATE CARDS — its own section now, with its own top/bottom
          padding, no longer inheriting the hero's forced min-h-screen. */}
      <section className="w-full pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          <div className="border border-[#ddd8d0] rounded-sm p-4">
            <p
              className="text-[9px] uppercase tracking-wider text-[#706c67] mb-1"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              State 0: Chaos
            </p>
            <p
              className="text-xs text-[#3d3a36]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Scattered clinical data representing messy narratives
            </p>
          </div>
          <div className="border border-[#ddd8d0] rounded-sm p-4">
            <p
              className="text-[9px] uppercase tracking-wider text-[#706c67] mb-1"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              State 1: Processing
            </p>
            <p
              className="text-xs text-[#3d3a36]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Governed extraction achieving convergence
            </p>
          </div>
          <div className="border border-[#ddd8d0] rounded-sm p-4">
            <p
              className="text-[9px] uppercase tracking-wider text-[#706c67] mb-1"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              State 2: Certainty
            </p>
            <p
              className="text-xs text-[#3d3a36]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Validated route with semantic green resolution
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
