"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

    const centerX = 70;
    const centerY = 80;

    const generated: Particle[] = Array.from({ length: 15 }, (_, i) => {
      const angle = seededRandom() * Math.PI * 2;
      const dist = 10 + seededRandom() * 35;
      return {
        id: i,
        cx: centerX + Math.cos(angle) * dist,
        cy: centerY + Math.sin(angle) * dist,
        r: 3,
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
        viewBox="0 0 400 160"
        className="w-full h-full"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 160"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* ZONE A: Chaos cluster */}
      <g>
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#1a1917"
            animate={{
              cx: [p.cx, p.cx + 6, p.cx - 6, p.cx + 4, p.cx],
              cy: [p.cy, p.cy - 6, p.cy + 6, p.cy - 4, p.cy],
              opacity: [0.7, 1, 0.6, 0.9, 0.7],
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
        <text
          x="70"
          y="135"
          fill="#1a1917"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
        >
          [unstructured data]
        </text>
      </g>

      {/* ZONE B: Convergence flow line */}
      <g>
        <motion.path
          d="M 120 80 C 160 80, 200 80, 240 80"
          stroke="#1a1917"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="6 4"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 115 70 C 155 72, 200 76, 240 80"
          stroke="#1a1917"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="4 4"
          opacity={0.5}
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 3.5, delay: 0.3, repeat: Infinity, ease: "linear" }}
        />
      </g>

      {/* ZONE C: Checkpoint marker */}
      <g>
        <line x1="255" y1="70" x2="255" y2="90" stroke="#1a1917" strokeWidth="1.5" />
        <line x1="245" y1="80" x2="265" y2="80" stroke="#1a1917" strokeWidth="1.5" />
        <text
          x="255"
          y="60"
          fill="#1a1917"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
        >
          [governed routing]
        </text>
      </g>

      {/* ZONE D: Certainty endpoint */}
      <g>
        <line x1="270" y1="80" x2="340" y2="80" stroke="#2d6a4f" strokeWidth="2" />
        <motion.circle
          cy={80}
          r="2.5"
          fill="#4ade80"
          animate={{ cx: [275, 340] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.3,
          }}
        />
        <circle cx="350" cy="80" r="6" fill="#2d6a4f" />
        <text
          x="350"
          y="108"
          fill="#2d6a4f"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
        >
          [certainty]
        </text>
      </g>
    </svg>
  );
}
