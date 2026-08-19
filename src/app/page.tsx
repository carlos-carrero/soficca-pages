"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import EntropyToCertaintyGraph from "@/components/EntropyToCertaintyGraph";
import ClinicalPipelineGraph from "@/components/ClinicalPipelineGraph";
import GovernedDecisions from "@/components/GovernedDecisions";
import HowSoficcaWorks from "@/components/HowSoficcaWorks";
import OurRoadmap from "@/components/OurRoadmap";
import BuiltBeyondConcept from "@/components/BuiltBeyondConcept";
import CostOfFragmentation from "@/components/CostOfFragmentation";
import PenSection from "@/components/PenSection";
import Footer from "@/components/Footer";
import { useSectionScrollProgress } from "@/lib/useSectionScrollProgress";

export default function Home() {
  const pilotSectionRef = useRef<HTMLElement>(null);
  const pilotProgress = useSectionScrollProgress(pilotSectionRef);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f6f1]">
      {/* HERO — sized to its own content only. No min-h-screen: the section
          should end right after the body paragraph / diagram row, not be
          forced to fill the viewport. */}
      <section className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto px-6 lg:px-8">
          {/* LEFT COLUMN: TYPOGRAPHY & CONTENT */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span
              className="font-mono text-xs text-gray-500 tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Clinical Decision Infrastructure
            </span>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Building the decision layer{" "}
              <br className="hidden md:block" />
              for <span className="text-[#2D6A4F]">healthcare</span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 max-w-xl"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Soficca turns messy clinical narratives into structured signals, governed routes, and audit-ready reports, using AI for signal extraction and deterministic rules for clinical routing.
            </p>

            <p
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              The Cardio Pilot is live. The infrastructure is real.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://cardio.pilot.soficca.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium px-5 py-3 rounded-full transition-colors"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  backgroundColor: "var(--ink)",
                  color: "var(--paper)",
                }}
              >
                View Cardio Pilot →
              </a>
              <a
                href="https://pen.soficca.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium border-b pb-1 transition-colors"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  color: "var(--ink)",
                  borderColor: "var(--rule)",
                }}
              >
                Explore Pen, first workflow
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: SVG ANIMATION */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full aspect-[91/25] flex items-center justify-center overflow-visible">
              <EntropyToCertaintyGraph />
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Hairline Divider */}
      <div className="w-full px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full h-px border-t border-gray-200/80"></div>
      </div>

      {/* LIVE INFRASTRUCTURE — relationship diagram */}
      <section className="w-full py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
          <div className="pt-2">
            <p
              className="text-[9px] uppercase tracking-[0.25em] text-[#706c67]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Live Infrastructure
            </p>
          </div>

          <div className="relative">
            {/* DESKTOP DIAGRAM — unchanged */}
            {(() => {
              const NODE_GAP = 16;

              const hub = { cx: 100, cy: 70, r: 5 };
              const golden = { cx: 290, cy: 35, r: 3.5 };
              const governed = { cx: 290, cy: 105, r: 3.5 };
              const pen = { cx: 100, cy: 170, r: 3.5 };

              const norm = (dx: number, dy: number) => {
                const len = Math.sqrt(dx * dx + dy * dy);
                return { x: dx / len, y: dy / len };
              };

              // Hub → Golden Cases
              const d1 = norm(golden.cx - hub.cx, golden.cy - hub.cy);
              const l1start = { x: hub.cx + d1.x * (hub.r + NODE_GAP), y: hub.cy + d1.y * (hub.r + NODE_GAP) };
              const l1end = { x: golden.cx - d1.x * (golden.r + NODE_GAP), y: golden.cy - d1.y * (golden.r + NODE_GAP) };

              // Hub → Governed Routes
              const d2 = norm(governed.cx - hub.cx, governed.cy - hub.cy);
              const l2start = { x: hub.cx + d2.x * (hub.r + NODE_GAP), y: hub.cy + d2.y * (hub.r + NODE_GAP) };
              const l2end = { x: governed.cx - d2.x * (governed.r + NODE_GAP), y: governed.cy - d2.y * (governed.r + NODE_GAP) };

              // Hub → Pen Workflow
              const d3 = norm(pen.cx - hub.cx, pen.cy - hub.cy);
              const l3start = { x: hub.cx + d3.x * (hub.r + NODE_GAP), y: hub.cy + d3.y * (hub.r + NODE_GAP) };
              const l3end = { x: pen.cx - d3.x * (pen.r + NODE_GAP), y: pen.cy - d3.y * (pen.r + NODE_GAP) };

              // Labels: nodeEdge (far side) + direction * NODE_GAP
              const hubLabel = { x: hub.cx, y: hub.cy - hub.r - NODE_GAP };
              const goldenLabel = { x: golden.cx + d1.x * (golden.r + NODE_GAP), y: golden.cy + d1.y * (golden.r + NODE_GAP) };
              const governedLabel = { x: governed.cx + d2.x * (governed.r + NODE_GAP), y: governed.cy + d2.y * (governed.r + NODE_GAP) };
              const penLabel = { x: pen.cx, y: pen.cy + pen.r + NODE_GAP };

              // "built on top of": NODE_GAP horizontal clearance from vertical line
              const connectorLabel = { x: 100 + NODE_GAP, y: (l3start.y + l3end.y) / 2 };

              return (
                <svg viewBox="0 0 420 200" className="hidden lg:block w-full h-auto" aria-hidden="true">
                  {/* Lines — NODE_GAP clearance from both node edges */}
                  <line x1={l1start.x.toFixed(1)} y1={l1start.y.toFixed(1)} x2={l1end.x.toFixed(1)} y2={l1end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />
                  <line x1={l2start.x.toFixed(1)} y1={l2start.y.toFixed(1)} x2={l2end.x.toFixed(1)} y2={l2end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />
                  <line x1={l3start.x.toFixed(1)} y1={l3start.y.toFixed(1)} x2={l3end.x.toFixed(1)} y2={l3end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />

                  {/* Hub node: Live Cardio Pilot — heartbeat */}
                  <foreignObject x={hub.cx - 25} y={hub.cy - 25} width="50" height="50" style={{ overflow: "visible" }}>
                    <div className="heartbeat-container">
                      <span className="heartbeat-ring" />
                      <span className="heartbeat-dot" />
                    </div>
                  </foreignObject>

                  {/* Branch nodes */}
                  <circle cx={golden.cx} cy={golden.cy} r={golden.r} fill="none" stroke="#1a1917" strokeWidth="1" />
                  <circle cx={governed.cx} cy={governed.cy} r={governed.r} fill="none" stroke="#1a1917" strokeWidth="1" />
                  <circle cx={pen.cx} cy={pen.cy} r={pen.r} fill="none" stroke="#1a1917" strokeWidth="1" />

                  {/* Hub label */}
                  <text x={hubLabel.x} y={hubLabel.y.toFixed(1)} fill="#1a1917" fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                    Live Cardio Pilot
                  </text>

                  {/* Golden Cases */}
                  <text x={goldenLabel.x.toFixed(1)} y={goldenLabel.y.toFixed(1)} fill="#1a1917" fontSize="14" fontFamily="'JetBrains Mono', monospace" style={{ fontVariantNumeric: "tabular-nums" }}>
                    12/12
                  </text>
                  <text x={goldenLabel.x.toFixed(1)} y={(goldenLabel.y + 13).toFixed(1)} fill="#706c67" fontSize="9" fontFamily="'JetBrains Mono', monospace">
                    Golden Cases
                  </text>

                  {/* Governed Routes */}
                  <text x={governedLabel.x.toFixed(1)} y={governedLabel.y.toFixed(1)} fill="#1a1917" fontSize="14" fontFamily="'JetBrains Mono', monospace" style={{ fontVariantNumeric: "tabular-nums" }}>
                    5
                  </text>
                  <text x={governedLabel.x.toFixed(1)} y={(governedLabel.y + 13).toFixed(1)} fill="#706c67" fontSize="9" fontFamily="'JetBrains Mono', monospace">
                    Governed Routes
                  </text>

                  {/* Pen Workflow */}
                  <text x={penLabel.x} y={penLabel.y.toFixed(1)} fill="#1a1917" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                    Pen Workflow
                  </text>

                  {/* Connector label — NODE_GAP clearance from vertical line */}
                  <text x={connectorLabel.x} y={connectorLabel.y.toFixed(1)} fill="#706c67" fontSize="7.5" fontFamily="'JetBrains Mono', monospace">
                    built on top of
                  </text>
                </svg>
              );
            })()}

            {/* MOBILE DIAGRAM — vertical column layout */}
            {(() => {
              const NODE_GAP = 16;

              const hub = { cx: 140, cy: 65, r: 5 };
              const golden = { cx: 140, cy: 125, r: 3.5 };
              const governed = { cx: 140, cy: 185, r: 3.5 };
              const pen = { cx: 140, cy: 255, r: 3.5 };

              const hubLabel = { x: hub.cx, y: 20 };
              const goldenLabelX = golden.cx + golden.r + NODE_GAP;
              const governedLabelX = governed.cx + governed.r + NODE_GAP;
              const penLabel = { x: pen.cx, y: pen.cy + pen.r + NODE_GAP };

              const l1start = { x: hub.cx, y: hub.cy + hub.r + NODE_GAP };
              const l1end = { x: golden.cx, y: golden.cy - golden.r - NODE_GAP };

              const l2start = { x: golden.cx, y: golden.cy + golden.r + NODE_GAP };
              const l2end = { x: governed.cx, y: governed.cy - governed.r - NODE_GAP };

              const l3start = { x: governed.cx, y: governed.cy + governed.r + NODE_GAP };
              const l3end = { x: pen.cx, y: pen.cy - pen.r - NODE_GAP };

              const connectorLabel = { x: pen.cx + NODE_GAP, y: (l3start.y + l3end.y) / 2 };

              return (
                <svg viewBox="0 0 280 290" className="block lg:hidden w-full h-auto" aria-hidden="true">
                  {/* Vertical connector lines */}
                  <line x1={l1start.x} y1={l1start.y.toFixed(1)} x2={l1end.x} y2={l1end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />
                  <line x1={l2start.x} y1={l2start.y.toFixed(1)} x2={l2end.x} y2={l2end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />
                  <line x1={l3start.x} y1={l3start.y.toFixed(1)} x2={l3end.x} y2={l3end.y.toFixed(1)} stroke="#1a1917" strokeWidth="1" />

                  {/* Hub node: Live Cardio Pilot — heartbeat */}
                  <foreignObject x={hub.cx - 25} y={hub.cy - 25} width="50" height="50" style={{ overflow: "visible" }}>
                    <div className="heartbeat-container">
                      <span className="heartbeat-ring" />
                      <span className="heartbeat-dot" />
                    </div>
                  </foreignObject>

                  {/* Branch nodes */}
                  <circle cx={golden.cx} cy={golden.cy} r={golden.r} fill="none" stroke="#1a1917" strokeWidth="1" />
                  <circle cx={governed.cx} cy={governed.cy} r={governed.r} fill="none" stroke="#1a1917" strokeWidth="1" />
                  <circle cx={pen.cx} cy={pen.cy} r={pen.r} fill="none" stroke="#1a1917" strokeWidth="1" />

                  {/* Hub label */}
                  <text x={hubLabel.x} y={hubLabel.y} fill="#1a1917" fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                    Live Cardio Pilot
                  </text>

                  {/* Golden Cases — multi-line text */}
                  <text x={goldenLabelX.toFixed(1)} y={(golden.cy - 8).toFixed(1)} fill="#1a1917" fontSize="11" fontFamily="'JetBrains Mono', monospace" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <tspan x={goldenLabelX.toFixed(1)} dy="0">12/12 ·</tspan>
                    <tspan x={goldenLabelX.toFixed(1)} dy="13" fill="#706c67">Golden Cases</tspan>
                  </text>

                  {/* Governed Routes — multi-line text */}
                  <text x={governedLabelX.toFixed(1)} y={(governed.cy - 8).toFixed(1)} fill="#1a1917" fontSize="11" fontFamily="'JetBrains Mono', monospace" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <tspan x={governedLabelX.toFixed(1)} dy="0">5 ·</tspan>
                    <tspan x={governedLabelX.toFixed(1)} dy="13" fill="#706c67">Governed Routes</tspan>
                  </text>

                  {/* Pen Workflow */}
                  <text x={penLabel.x} y={penLabel.y.toFixed(1)} fill="#1a1917" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                    Pen Workflow
                  </text>

                  {/* Connector label */}
                  <text x={connectorLabel.x} y={connectorLabel.y.toFixed(1)} fill="#706c67" fontSize="7.5" fontFamily="'JetBrains Mono', monospace">
                    built on top of
                  </text>
                </svg>
              );
            })()}

            {/* Vertical rule descending to section bottom */}
            <div className="hidden lg:block absolute left-[23.8%] top-full w-px h-16 bg-[#ddd8d0]" />
          </div>
        </div>
      </section>
      {/* LIVE PILOT — full-bleed clinical pipeline graph */}
      <section ref={pilotSectionRef} className="w-full">
        <ClinicalPipelineGraph />
      </section>
      {/* GOVERNED DECISIONS — typography-only editorial section */}
      <GovernedDecisions />

      {/* Architectural Hairline Divider */}
      <div className="w-full px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full h-px border-t border-gray-200/80"></div>
      </div>

      {/* HOW SOFICCA WORKS — AI moment + governed chain */}
      <HowSoficcaWorks />
      {/* OUR ROADMAP — decreasing certainty timeline */}
      <OurRoadmap />
      {/* BUILT BEYOND CONCEPT — execution evidence log */}
      <BuiltBeyondConcept />

      {/* Architectural Hairline Divider */}
      <div className="w-full px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full h-px border-t border-gray-200/80"></div>
      </div>

      {/* PEN — first product workflow */}
      <PenSection />
      {/* COST OF FRAGMENTATION — why this layer matters */}
      <CostOfFragmentation />
      {/* FOOTER */}
      <Footer />
      {/* Phase 1 debug readout — temporarily commented out for ContactModal testing */}
      {/* <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1.5 rounded font-mono text-xs">
        PROGRESS: {pilotProgress.toFixed(2)}
      </div> */}
    </main>
    </>
  );
}
