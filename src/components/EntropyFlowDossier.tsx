"use client";

import { motion } from "framer-motion";

const DUR = 7;
const T0 = 2 / DUR;
const T1 = 4 / DUR;

// --- SVG Paths for 3 states (same command structure for smooth morphing) ---

// State 0: Chaotic tangled clinical data lines
const chaos1 =
  "M 60 140 C 75 95 110 180 130 120 C 150 60 95 155 170 130 C 195 115 140 75 210 100 C 240 110 180 160 250 140 C 270 130 220 85 280 110 C 300 125 260 165 320 130 C 340 105 290 70 350 95 C 365 105 330 145 380 120 C 395 100 360 160 410 135 C 425 115 390 80 440 110";
const chaos2 =
  "M 80 100 C 100 130 65 75 120 85 C 145 90 110 140 160 115 C 185 100 150 155 200 125 C 230 105 195 80 260 95 C 285 105 250 145 300 120 C 325 100 295 75 340 105 C 360 120 335 150 380 130 C 400 115 370 85 420 100 C 435 110 410 140 450 125 C 455 120 445 95 460 110";
const chaos3 =
  "M 70 160 C 90 135 55 110 115 145 C 140 155 105 100 165 125 C 190 135 155 170 215 150 C 240 140 205 110 270 130 C 295 140 265 160 310 145 C 330 135 305 115 350 140 C 370 150 345 120 390 145 C 405 150 380 170 420 155 C 435 145 415 130 445 140 C 450 145 440 155 460 150";

// State 1: Condensed spheroidal knot (tight tangle converging center)
const knot1 =
  "M 230 120 C 240 100 260 145 265 115 C 270 95 245 135 275 120 C 285 112 255 105 280 115 C 290 110 265 130 285 120 C 295 115 270 108 290 125 C 300 130 280 140 295 130 C 300 125 285 115 305 125 C 312 130 295 135 308 125 C 313 120 300 112 315 120 C 318 125 308 130 325 125";
const knot2 =
  "M 235 130 C 245 140 255 115 262 135 C 268 145 248 120 272 130 C 278 125 258 140 280 133 C 287 130 268 143 286 135 C 292 132 273 126 290 137 C 297 140 280 145 296 138 C 300 134 285 128 305 135 C 310 138 295 142 309 135 C 313 132 301 127 315 133 C 318 137 309 140 322 135";
const knot3 =
  "M 238 125 C 247 112 253 135 260 118 C 266 108 249 128 270 120 C 276 115 258 110 278 122 C 284 127 268 137 286 125 C 291 121 275 115 289 123 C 295 127 279 133 298 125 C 303 121 287 116 307 124 C 311 127 297 132 310 125 C 314 121 303 116 317 123 C 320 127 311 132 325 125";

// State 2: Perfect geometric octahedron (angular precision)
const octa1 =
  "M 270 80 C 270 80 240 130 240 130 C 240 130 270 180 270 180 C 270 180 300 130 300 130 C 300 130 270 80 270 80 C 270 80 240 130 240 130 C 240 130 300 130 300 130 C 300 130 270 80 270 80 C 270 80 270 180 270 180 C 270 180 300 130 300 130 C 300 130 240 130 240 130";
const octa2 =
  "M 270 85 C 270 85 245 130 245 130 C 245 130 270 175 270 175 C 270 175 295 130 295 130 C 295 130 270 85 270 85 C 270 85 245 130 245 130 C 245 130 295 130 295 130 C 295 130 270 85 270 85 C 270 85 270 175 270 175 C 270 175 295 130 295 130 C 295 130 245 130 245 130";
const octa3 =
  "M 270 90 C 270 90 250 130 250 130 C 250 130 270 170 270 170 C 270 170 290 130 290 130 C 290 130 270 90 270 90 C 270 90 250 130 250 130 C 250 130 290 130 290 130 C 290 130 270 90 270 90 C 270 90 270 170 270 170 C 270 170 290 130 290 130 C 290 130 250 130 250 130";

const textFragments = [
  { text: "dx: idiopathic", x: 55, y: 78 },
  { text: "PRN q4h", x: 370, y: 72 },
  { text: "hx: unremarkable", x: 90, y: 185 },
  { text: "r/o ACS", x: 400, y: 170 },
  { text: "BMP pndg", x: 200, y: 68 },
  { text: "pt c/o SOB", x: 430, y: 108 },
];

function makePathVariant(c: string, k: string, o: string, strokeW: number, baseOpacity: number) {
  return {
    animate: {
      d: [c, c, k, k, o, o],
      stroke: ["#1a1917", "#1a1917", "#4b4a49", "#4b4a49", "#2d6a4f", "#2d6a4f"],
      strokeWidth: [strokeW, strokeW, strokeW * 1.2, strokeW * 1.2, strokeW * 1.5, strokeW * 1.5],
      opacity: [baseOpacity, baseOpacity, baseOpacity * 0.9, baseOpacity * 0.9, baseOpacity, baseOpacity],
      transition: {
        duration: DUR,
        times: [0, T0, T0 + 0.01, T1, T1 + 0.01, 1],
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };
}

export default function EntropyFlowDossier() {
  const p1 = makePathVariant(chaos1, knot1, octa1, 1, 1);
  const p2 = makePathVariant(chaos2, knot2, octa2, 0.75, 0.7);
  const p3 = makePathVariant(chaos3, knot3, octa3, 0.75, 0.5);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[560px]">
        {/* Dossier Header */}
        <div className="mb-4 flex items-baseline justify-between px-1">
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-[#706c67]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Entropy Flow Analysis
          </p>
          <p
            className="text-[9px] uppercase tracking-wider text-[#a09b94]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            SFC-DX-2024
          </p>
        </div>

        {/* SVG Canvas */}
        <svg
          viewBox="0 0 540 260"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle grid */}
          <defs>
            <pattern id="dossier-grid" width="27" height="26" patternUnits="userSpaceOnUse">
              <path d="M 27 0 L 0 0 0 26" fill="none" stroke="rgba(26,25,23,0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="540" height="260" fill="url(#dossier-grid)" />

          {/* Clinical text fragments */}
          {textFragments.map((frag, i) => (
            <motion.text
              key={i}
              x={frag.x}
              y={frag.y}
              fill="#4b4a49"
              className="text-[7px] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              animate={{
                opacity: [0.7, 0.7, 0.15, 0, 0, 0.7],
              }}
              transition={{
                duration: DUR,
                times: [0, T0 - 0.05, T0 + 0.1, T1, 1 - 0.01, 1],
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            >
              {frag.text}
            </motion.text>
          ))}

          {/* 3 morphing paths */}
          <motion.path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={p1}
            animate="animate"
          />
          <motion.path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={p2}
            animate="animate"
          />
          <motion.path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={p3}
            animate="animate"
          />

          {/* Enclosing circle — state 2 */}
          <motion.circle
            cx={270}
            cy={130}
            r={55}
            fill="none"
            stroke="#2d6a4f"
            strokeWidth="1.5"
            style={{ transformOrigin: "270px 130px" }}
            animate={{
              opacity: [0, 0, 0, 0, 1, 1],
              scale: [0.3, 0.3, 0.3, 0.3, 1, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1, T1 + 0.06, 1],
              repeat: Infinity,
              ease: "easeOut" as const,
            }}
          />

          {/* Output horizontal line — state 2 */}
          <motion.line
            x1="325"
            y1="130"
            x2="490"
            y2="130"
            stroke="#2d6a4f"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              pathLength: [0, 0, 0, 0, 1, 1],
              opacity: [0, 0, 0, 0, 1, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1 + 0.03, T1 + 0.18, 1],
              repeat: Infinity,
              ease: "easeOut" as const,
            }}
          />

          {/* Governed pulse dot */}
          <motion.circle
            cy={130}
            r={3.5}
            fill="#2d6a4f"
            animate={{
              cx: [325, 325, 325, 325, 325, 490],
              opacity: [0, 0, 0, 0, 1, 0],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1 + 0.15, T1 + 0.2, 1 - 0.05],
              repeat: Infinity,
              ease: "linear" as const,
            }}
          />

          {/* End indicator [●] */}
          <motion.text
            x={495}
            y={135}
            fill="#2d6a4f"
            className="text-[13px] font-bold"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            animate={{
              opacity: [0, 0, 0, 0, 1, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1 + 0.12, T1 + 0.2, 1],
              repeat: Infinity,
              ease: "easeOut" as const,
            }}
          >
            [●]
          </motion.text>

          {/* Route label */}
          <motion.text
            x={345}
            y={118}
            fill="#2d6a4f"
            className="text-[8px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            animate={{
              opacity: [0, 0, 0, 0, 1, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1 + 0.1, T1 + 0.2, 1],
              repeat: Infinity,
              ease: "easeOut" as const,
            }}
          >
            ROUTE: GOVERNED CARE
          </motion.text>

          {/* Bottom metadata — S0 */}
          <motion.g
            animate={{
              opacity: [1, 1, 0.2, 0, 0, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0 - 0.05, T0 + 0.05, T1, 1 - 0.01, 1],
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          >
            <text x="20" y="238" fill="#706c67" className="text-[7px] uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              S0: CAOS CLÍNICO
            </text>
            <text x="20" y="250" fill="#a09b94" className="text-[6px]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              entropy: MAX | structure: NULL
            </text>
          </motion.g>

          {/* Bottom metadata — S1 */}
          <motion.g
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
            }}
            transition={{
              duration: DUR,
              times: [0, T0 - 0.02, T0 + 0.05, T1 - 0.05, T1 + 0.02, 1],
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          >
            <text x="200" y="238" fill="#706c67" className="text-[7px] uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              S1: SINCRONIZACIÓN
            </text>
            <text x="200" y="250" fill="#a09b94" className="text-[6px]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              entropy: DECREASING | convergence: ACTIVE
            </text>
          </motion.g>

          {/* Bottom metadata — S2 */}
          <motion.g
            animate={{
              opacity: [0, 0, 0, 0, 1, 1],
            }}
            transition={{
              duration: DUR,
              times: [0, T0, T0 + 0.01, T1, T1 + 0.08, 1],
              repeat: Infinity,
              ease: "easeOut" as const,
            }}
          >
            <text x="380" y="238" fill="#2d6a4f" className="text-[7px] uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              S2: CERTEZA TÁCTICA
            </text>
            <text x="380" y="250" fill="#2d6a4f" className="text-[6px]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              entropy: 0 | route: VALIDATED
            </text>
          </motion.g>
        </svg>

        {/* Footer */}
        <div className="mt-4 flex items-baseline justify-between px-1 border-t border-[#e8e4de] pt-3">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#706c67]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            Governed Extraction Model
          </p>
          <p className="text-[9px] text-[#a09b94]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            Chaos → Synchronization → Certainty
          </p>
        </div>
      </div>
    </div>
  );
}
