"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MorphParticle from "./MorphParticle";

interface Particle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  duration: number;
  delay: number;
}

export default function EntropyToCertaintyGraph() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let random = 42;
    const seededRandom = () => {
      random = (random * 9301 + 49297) % 233280;
      return random / 233280;
    };

    const centerX = 100;
    const centerY = 125;

    const generated: Particle[] = Array.from({ length: 50 }, (_, i) => {
      const angle = seededRandom() * Math.PI * 2;
      const dist = seededRandom() * 70;
      return {
        id: i,
        cx: centerX + Math.cos(angle) * dist,
        cy: centerY + Math.sin(angle) * dist,
        r: 3.5,
        duration: 3 + seededRandom() * 3,
        delay: seededRandom() * 2,
      };
    });

    setParticles(generated);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <svg
        viewBox="-110 0 910 250"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      viewBox="-110 0 910 250"
      className="w-full h-full overflow-visible"
      aria-hidden="true"
    >
      {/* ===== ZONE 1: ENTROPY SWARM ===== */}
      <g>
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#1a1917"
            animate={{
              cx: [p.cx, p.cx + 10, p.cx - 10, p.cx + 8, p.cx],
              cy: [p.cy, p.cy - 10, p.cy + 10, p.cy - 8, p.cy],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}

        <text x="20" y="40" fill="#1a1917" fontSize="14" fontFamily="monospace">
          [unstructured]
        </text>
        <text x="140" y="30" fill="#1a1917" fontSize="14" fontFamily="monospace">
          [complex_text]
        </text>
        <text x="-100" y="160" fill="#1a1917" fontSize="14" fontFamily="monospace">
          [low_density]
        </text>
        <text x="30" y="230" fill="#1a1917" fontSize="14" fontFamily="monospace">
          [narrative]
        </text>
        <text x="160" y="240" fill="#1a1917" fontSize="14" fontFamily="monospace">
          [raw_data]
        </text>

        {/* MORPH PARTICLES — real shape transformation into Zone 2 lines */}
        <MorphParticle cx={150} cy={60}  duration={3} delay={0} />
        <MorphParticle cx={180} cy={90}  duration={3} delay={0.4} />
        <MorphParticle cx={200} cy={125} duration={3} delay={0.8} />
        <MorphParticle cx={180} cy={160} duration={3} delay={1.2} />
        <MorphParticle cx={150} cy={190} duration={3} delay={1.6} />
      </g>

      {/* ===== ZONE 2: CONTINUOUS FUNNEL ===== */}
      <g>
        <motion.path
          d="M 150 60 C 250 60, 350 105, 450 105"
          stroke="#1a1917"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 180 90 C 280 90, 350 125, 450 125"
          stroke="#1a1917"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 3, delay: 0.4, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="200"
          y1="125"
          x2="450"
          y2="125"
          stroke="#1a1917"
          strokeWidth="1.2"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 3, delay: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 180 160 C 280 160, 350 125, 450 125"
          stroke="#1a1917"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 150 190 C 250 190, 350 145, 450 145"
          stroke="#1a1917"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 3, delay: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </g>

      {/* ===== ZONE 3: DETERMINISTIC FILTER ===== */}
      <g>
        <line x1="450" y1="105" x2="580" y2="105" stroke="#1a1917" strokeWidth="1.2" />
        <line x1="450" y1="125" x2="580" y2="125" stroke="#1a1917" strokeWidth="1.2" />
        <line x1="450" y1="145" x2="580" y2="145" stroke="#1a1917" strokeWidth="1.2" />

        {/* Vertical background line at intersection */}
        <line x1="515" y1="95" x2="515" y2="155" stroke="#1a1917" strokeWidth="1.2" opacity="0.5" />

        {/* + symbol at X=515, Y=125 */}
        <line x1="510" y1="125" x2="520" y2="125" stroke="#1a1917" strokeWidth="1.8" />
        <line x1="515" y1="120" x2="515" y2="130" stroke="#1a1917" strokeWidth="1.8" />

        {/* Moved from y=160 (was colliding with Zone 4's [TACTICAL_ROUTE] at
            y=150, x-ranges 525-694 vs 666-770 overlapped). Now sits in its
            own band well below the vertical filter line (which ends at
            y=155), with 45+ units of clearance from the nearest Zone 4 label. */}
        <text x="515" y="205" fill="#1a1917" fontSize="12" fontFamily="monospace" textAnchor="middle">
          [DETERMINISTIC RULE LAYER]
        </text>
      </g>

      {/* ===== ZONE 4: CERTAINTY ===== */}
      <g>
        {/* Convergence: 3 → 1 */}
        <path d="M 580 105 C 600 105, 600 125, 620 125" stroke="#1a1917" strokeWidth="1.2" fill="none" />
        <line x1="580" y1="125" x2="620" y2="125" stroke="#1a1917" strokeWidth="1.2" />
        <path d="M 580 145 C 600 145, 600 125, 620 125" stroke="#1a1917" strokeWidth="1.2" fill="none" />

        {/* Tactical Route: semantic green */}
        <line x1="620" y1="125" x2="780" y2="125" stroke="#2d6a4f" strokeWidth="2" />

        {/* Certainty Point */}
        <circle cx="780" cy="125" r="4.5" fill="#2d6a4f" />

        {/* Pulsing green dot along the tactical route */}
        <motion.circle
          cy="125"
          r="3"
          fill="#4ade80"
          animate={{ cx: [620, 780] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.2,
          }}
        />

        {/* Green labels */}
        <text x="770" y="85" fill="#2d6a4f" fontSize="12" fontFamily="monospace" textAnchor="end">
          [VALIDATED SIGNAL]
        </text>
        <text x="770" y="165" fill="#2d6a4f" fontSize="12" fontFamily="monospace" textAnchor="end">
          [GOVERNED CLINICAL DECISION]
        </text>
        {/* x=790 with textAnchor start on an 800-wide viewBox left this
            label right at the edge, which is what was getting clipped off
            the right side. Shifted left and re-anchored so it reads inward
            instead of running off the canvas. */}
      </g>
    </svg>
  );
}
