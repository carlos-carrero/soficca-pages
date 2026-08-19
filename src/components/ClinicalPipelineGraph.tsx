"use client";

import { motion, type Variants } from "framer-motion";

const MONO = "'JetBrains Mono', monospace";
const SANS = "'Plus Jakarta Sans', sans-serif";

// ── Variant factories ────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0, borderRadius: "40px" },
  visible: {
    opacity: 1,
    borderRadius: "0px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      opacity: { duration: 0.25, ease: "linear" },
      staggerChildren: 0,
    },
  },
};

const pathVariants = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", bounce: 0, duration: 1.5, delay },
      opacity: { duration: 0.1, delay },
    },
  },
});

const fadeVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

const scaleVariants = (delay: number): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

// ── Static node shapes ───────────────────────────────────────────

function HexagonNode({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const outer = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
  const inner = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + (r * 0.4) * Math.cos(angle)},${cy + (r * 0.4) * Math.sin(angle)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={outer} fill="none" stroke="#9CA3AF" strokeWidth={2} />
      <polygon points={inner} fill="#9CA3AF" stroke="none" />
    </g>
  );
}

function DiamondNode({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
  const tick = 8;
  return (
    <g>
      <polygon points={pts} fill="none" stroke="#9CA3AF" strokeWidth={2} />
      <line x1={cx} y1={cy - r - tick} x2={cx} y2={cy - r - 1} stroke="#9CA3AF" strokeWidth={1.5} />
      <line x1={cx + r + 1} y1={cy} x2={cx + r + tick} y2={cy} stroke="#9CA3AF" strokeWidth={1.5} />
      <line x1={cx} y1={cy + r + 1} x2={cx} y2={cy + r + tick} stroke="#9CA3AF" strokeWidth={1.5} />
      <line x1={cx - r - tick} y1={cy} x2={cx - r - 1} y2={cy} stroke="#9CA3AF" strokeWidth={1.5} />
    </g>
  );
}

function OctagonNode({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const outer = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 8;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
  const inner = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 8;
    return `${cx + (r * 0.65) * Math.cos(angle)},${cy + (r * 0.65) * Math.sin(angle)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={outer} fill="none" stroke="#FFFFFF" strokeWidth={2.5} />
      <polygon points={inner} fill="none" stroke="#FFFFFF" strokeWidth={1} strokeDasharray="3 2" />
    </g>
  );
}

// ── Component ────────────────────────────────────────────────────

export default function ClinicalPipelineGraph() {
  return (
    <motion.div
      id="pilot"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className="bg-[#111111] text-white w-full min-h-[85vh] flex flex-col mx-auto"
    >
      {/* HEADER SECTION */}
      <div className="pt-16 px-8 md:px-20 text-center flex flex-col items-center z-10">
        <span
          className="text-gray-400 text-xs tracking-widest uppercase mb-4"
          style={{ fontFamily: MONO }}
        >
          Live Pilot
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          AI signal extraction with governed clinical routing
        </h2>
        <p
          className="text-gray-400 max-w-3xl text-sm md:text-base"
          style={{ fontFamily: SANS }}
        >
          Four sequential layers transform raw cardiology narrative into a validated decision report. Each annotation marks where that layer&apos;s output lands.
        </p>
      </div>

      {/* SVG SECTION */}
      <div className="w-full flex-grow relative flex items-center justify-center min-h-[500px] py-8 px-6">
          <motion.svg
            viewBox="0 0 1250 500"
            className="w-full h-[550px] md:h-[650px]"
            style={{
              fontFamily: MONO,
              maxWidth: '100%'
            }}
            preserveAspectRatio="xMidYMid meet"
            variants={{ hidden: {}, visible: {} }}
          >
          {/* ═══════════════════════════════════════════════════════════
              TACTICAL BACKGROUND GRID
              ═══════════════════════════════════════════════════════════ */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* ═══════════════════════════════════════════════════════════
              ORIGIN — RAW CLINICAL NOTE (X=50, Y=250)
              ═══════════════════════════════════════════════════════════ */}

          <motion.g variants={fadeVariants(0.1)}>
            <rect x={36} y={236} width={28} height={34} rx={3} fill="none" stroke="#9CA3AF" strokeWidth={1.5} />
            <line x1={42} y1={246} x2={58} y2={246} stroke="#6B7280" strokeWidth={1.2} />
            <line x1={42} y1={253} x2={58} y2={253} stroke="#6B7280" strokeWidth={1.2} />
            <line x1={42} y1={260} x2={54} y2={260} stroke="#6B7280" strokeWidth={1.2} />
          </motion.g>
          <motion.text
            x={50} y={210}
            fill="#FFFFFF" fontSize={14} fontWeight="600" textAnchor="middle"
            style={{ fontFamily: SANS }}
            variants={fadeVariants(0.15)}
          >
            Raw Note
          </motion.text>

          {/* Origin → Gate 1 trunk segment */}
          <motion.path
            d="M 68 250 L 202 250"
            stroke="#6B7280" strokeWidth={2.5} fill="none"
            variants={pathVariants(0.2)}
          />

          {/* ═══════════════════════════════════════════════════════════
              GATE 1 — AI SIGNAL EXTRACTION (X=230, Y=250)
              ═══════════════════════════════════════════════════════════ */}

          <HexagonNode cx={230} cy={250} r={26} />

          {/* Branch 1 (Up): chest_pain — path 230,250 → 230,160 → 260,160 */}
          <motion.path
            d="M 230 224 L 230 170 L 243 160 L 260 160"
            stroke="#6B7280" strokeWidth={2} fill="none"
            variants={pathVariants(0.5)}
          />
          <motion.g variants={fadeVariants(0.8)}>
            <text x={268} y={152} fill="#FFFFFF" fontSize={14} fontWeight="600" style={{ fontFamily: SANS }}>
              Chest Pain Detected
            </text>
            <text x={268} y={172} fill="#9CA3AF" fontSize={12} style={{ fontFamily: MONO }}>
              [chest_pain_present: true]
            </text>
          </motion.g>

          {/* Branch 2 (Straight): syncope — text ABOVE Y=250 */}
          <motion.path
            d="M 256 250 L 290 250"
            stroke="#6B7280" strokeWidth={2} fill="none"
            variants={pathVariants(0.6)}
          />
          <motion.g variants={fadeVariants(0.9)}>
            <text x={260} y={225} fill="#FFFFFF" fontSize={14} fontWeight="600" style={{ fontFamily: SANS }}>
              Loss of Consciousness
            </text>
            <text x={260} y={242} fill="#9CA3AF" fontSize={12} style={{ fontFamily: MONO }}>
              [syncope: true]
            </text>
          </motion.g>

          {/* Branch 3 (Down): pain_radiation — path 230,250 → 230,340 → 260,340 */}
          <motion.path
            d="M 230 276 L 230 330 L 243 340 L 260 340"
            stroke="#6B7280" strokeWidth={2} fill="none"
            variants={pathVariants(0.7)}
          />
          <motion.g variants={fadeVariants(1.0)}>
            <text x={268} y={335} fill="#FFFFFF" fontSize={14} fontWeight="600" style={{ fontFamily: SANS }}>
              Radiating Pain
            </text>
            <text x={268} y={355} fill="#9CA3AF" fontSize={12} style={{ fontFamily: MONO }}>
              {`[pain_radiation: "left_arm"]`}
            </text>
          </motion.g>

          {/* Gate 1 → Gate 2 trunk segment */}
          <motion.path
            d="M 256 250 L 452 250"
            stroke="#6B7280" strokeWidth={2.5} fill="none"
            variants={pathVariants(1.0)}
          />

          {/* ═══════════════════════════════════════════════════════════
              GATE 2 — DETERMINISTIC GOVERNANCE (X=480, Y=250)
              ═══════════════════════════════════════════════════════════ */}

          <DiamondNode cx={480} cy={250} r={24} />

          {/* Top text above diamond */}
          <motion.g variants={fadeVariants(1.3)}>
            <text x={460} y={190} fill="#FFFFFF" fontSize={14} fontWeight="600" style={{ fontFamily: SANS }}>
              Attempting Standard Protocol
            </text>
            <text x={460} y={210} fill="#9CA3AF" fontSize={12} style={{ fontFamily: MONO }}>
              RULE_ROUTINE_STABLE_COMPLETE_V1
            </text>
          </motion.g>

          {/* Branch down: 480,250 → 480,340 → 510,340 */}
          <motion.path
            d="M 480 274 L 480 330 L 493 340 L 510 340"
            stroke="#6B7280" strokeWidth={1.5} fill="none" strokeDasharray="5 4"
            variants={pathVariants(1.4)}
          />
          <motion.g variants={fadeVariants(1.6)}>
            <text x={518} y={335} fill="#9CA3AF" fontSize={14} fontWeight="600" style={{ fontFamily: SANS }}>
              Assigned: Routine Queue
            </text>
            <text x={518} y={355} fill="#6B7280" fontSize={12} style={{ fontFamily: MONO }}>
              {`preliminary_route: "PATH_ROUTINE"`}
            </text>
          </motion.g>
          <motion.text
            x={518} y={375} fill="#6B7280" fontSize={10}
            variants={fadeVariants(1.7)}
          >
            [overridden by safety layer]
          </motion.text>

          {/* Gate 2 → Gate 3 trunk segment */}
          <motion.path
            d="M 504 250 L 702 250"
            stroke="#6B7280" strokeWidth={2.5} fill="none"
            variants={pathVariants(1.5)}
          />

          {/* ═══════════════════════════════════════════════════════════
              GATE 3 — SAFETY OVERRIDE (X=730, Y=250)
              ═══════════════════════════════════════════════════════════ */}

          <OctagonNode cx={730} cy={250} r={27} />

          {/* Override vertical line: M 730 80 L 730 250 */}
          <motion.path
            d="M 730 80 L 730 250"
            stroke="#FFFFFF" strokeWidth={3.5} fill="none"
            variants={pathVariants(1.8)}
          />
          {/* T-Cap: M 720 248 L 740 248 */}
          <motion.path
            d="M 720 248 L 740 248"
            stroke="#FFFFFF" strokeWidth={4} fill="none"
            variants={pathVariants(1.85)}
          />

          {/* Bold warning above box */}
          <motion.text
            x={775} y={72}
            fill="#FFFFFF" fontSize={14} fontWeight="800"
            style={{ fontFamily: SANS }}
            variants={fadeVariants(1.9)}
          >
            CRITICAL RISK DETECTED
          </motion.text>

          {/* Alert panel dashed box: rect x=760 y=80 width=330 height=110 */}
          <motion.rect
            x={760} y={80}
            width={330} height={110}
            rx={3} ry={3}
            fill="none" stroke="#4B5563" strokeWidth={1.5} strokeDasharray="4 4"
            variants={fadeVariants(1.9)}
          />

          {/* Panel content — starting at x=775 */}
          <motion.text
            x={775} y={105}
            fill="#FFFFFF" fontSize={14} fontWeight="700"
            style={{ fontFamily: SANS }}
            variants={fadeVariants(2.0)}
          >
            Syncope + Chest Pain = High Risk
          </motion.text>
          <motion.text
            x={775} y={125}
            fill="#9CA3AF" fontSize={12}
            variants={fadeVariants(2.05)}
          >
            {`triggers: ["POLICY_SYNCOPAL_CHEST_PAIN_V1"]`}
          </motion.text>
          <motion.text
            x={775} y={145}
            fill="#FFFFFF" fontSize={14} fontWeight="600"
            style={{ fontFamily: SANS }}
            variants={fadeVariants(2.1)}
          >
            Override Escalation Active
          </motion.text>
          <motion.text
            x={775} y={160}
            fill="#9CA3AF" fontSize={12}
            variants={fadeVariants(2.15)}
          >
            action: OVERRIDE_ESCALATE
          </motion.text>

          {/* ═══════════════════════════════════════════════════════════
              GATE 4 — RESOLUTION (X=980, Y=250)
              ═══════════════════════════════════════════════════════════ */}

          {/* Gate 3 → Gate 4 green trunk segment */}
          <motion.path
            d="M 757 250 L 960 250"
            stroke="#10B981" strokeWidth={3.5} fill="none"
            variants={pathVariants(2.5)}
          />

          {/* Green endpoint with outer ring */}
          <motion.circle
            cx={980} cy={250} r={14}
            fill="none" stroke="#10B981" strokeWidth={2}
            variants={scaleVariants(3.1)}
          />
          <motion.circle
            cx={980} cy={250} r={7}
            fill="#10B981" stroke="none"
            variants={scaleVariants(3.2)}
          />

          {/* Final labels at X=1010 */}
          <motion.g variants={fadeVariants(3.3)}>
            <text x={1010} y={240} fill="#10B981" fontSize={16} fontWeight="700" style={{ fontFamily: SANS }}>
              EMERGENCY ESCALATION
            </text>
            <text x={1010} y={260} fill="#10B981" fontSize={16} fontWeight="700" style={{ fontFamily: SANS }}>
              LOCKED
            </text>
          </motion.g>
          <motion.text
            x={1010} y={280}
            fill="#9CA3AF" fontSize={12}
            variants={fadeVariants(3.4)}
          >
            {`final_route: "PATH_EMERGENCY_NOW"`}
          </motion.text>
          <motion.text
            x={1010} y={298}
            fill="#6B7280" fontSize={11}
            variants={fadeVariants(3.5)}
          >
            {`decision.status: "ESCALATED"`}
          </motion.text>

          {/* ═══════════════════════════════════════════════════════════
              BOTTOM GATE LABELS (Y=460) - horizontal row, evenly centered
              ═══════════════════════════════════════════════════════════ */}
          <motion.text
            x={230} y={460} fill="#D1D5DB" fontSize={12} fontWeight="700" textAnchor="middle" letterSpacing={1}
            variants={fadeVariants(0.4)}
          >
            GATE 1: AI SIGNAL EXTRACTION
          </motion.text>
          <motion.text
            x={480} y={460} fill="#D1D5DB" fontSize={12} fontWeight="700" textAnchor="middle" letterSpacing={1}
            variants={fadeVariants(1.2)}
          >
            GATE 2: DETERMINISTIC GOVERNANCE
          </motion.text>
          <motion.text
            x={730} y={460} fill="#FFFFFF" fontSize={12} fontWeight="800" textAnchor="middle" letterSpacing={1}
            variants={fadeVariants(1.8)}
          >
            GATE 3: SAFETY OVERRIDE
          </motion.text>
          <motion.text
            x={950} y={460} fill="#10B981" fontSize={12} fontWeight="700" textAnchor="middle" letterSpacing={1}
            variants={fadeVariants(2.7)}
          >
            GATE 4: RESOLUTION
          </motion.text>

          {/* ═══════════════════════════════════════════════════════════
              BOTTOM AXIS TICKS (cosmetic)
              ═══════════════════════════════════════════════════════════ */}
          {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200].map((x) => (
            <line
              key={x}
              x1={x} y1={478} x2={x} y2={485}
              stroke="#262626" strokeWidth={0.5}
            />
          ))}
          <line x1={50} y1={481} x2={1230} y2={481} stroke="#1f1f1f" strokeWidth={0.5} />
        </motion.svg>
      </div>

      {/* FOOTER SECTION */}
      <div className="pb-12 pt-8 text-center z-10">
        <a
          href="https://cardio.pilot.soficca.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm transition-colors px-5 py-3 rounded-full inline-block"
          style={{
            fontFamily: MONO,
            backgroundColor: "#f8f6f1",
            color: "#1a1917"
          }}
        >
          View Cardio Pilot →
        </a>
      </div>
    </motion.div>
  );
}
