"use client";

import { motion } from "framer-motion";

export default function EntropyGraph() {
  // State 0: Chaotic scattered data points and lines
  const chaosPath =
    "M 50 120 L 80 90 M 120 140 L 150 110 M 200 130 L 220 100 M 280 125 L 310 95 M 360 135 L 390 105 M 100 60 L 130 80 M 250 70 L 270 90 M 180 150 L 200 130 M 320 160 L 340 140 M 70 100 L 90 120 M 410 120 L 430 100";

  // State 1: Jagged waveform attempting octahedral facets (complex frequency with angular hints)
  const waveformPath =
    "M 40 150 L 80 120 L 120 140 L 160 100 L 200 130 L 240 90 L 280 120 L 320 100 L 360 130 L 400 110 L 440 140";

  // State 2: Circle path (will contain the octahedron)
  const circlePath =
    "M 280 150 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0";

  // Animation sequence: Chaos (2s) → Waveform (2s) → Circle (3s)
  const pathVariants = {
    animate: {
      d: [chaosPath, chaosPath, waveformPath, waveformPath, circlePath],
      stroke: ["#1a1917", "#1a1917", "#1a1917", "#1a1917", "#2d6a4f"],
      strokeWidth: [1, 1, 2, 2, 3],
      opacity: [0.8, 0.8, 0.9, 0.9, 1],
      transition: {
        duration: 7,
        times: [0, 0.28, 0.29, 0.57, 0.58],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Chaos particles (scattered dots)
  const chaosParticles = [
    { cx: 60, cy: 110 },
    { cx: 140, cy: 125 },
    { cx: 210, cy: 115 },
    { cx: 295, cy: 110 },
    { cx: 375, cy: 120 },
    { cx: 110, cy: 70 },
    { cx: 260, cy: 75 },
    { cx: 190, cy: 145 },
    { cx: 330, cy: 155 },
    { cx: 85, cy: 105 },
  ];

  const particleVariants = {
    animate: {
      opacity: [1, 1, 0, 0, 0],
      scale: [1, 1, 0, 0, 0],
      transition: {
        duration: 7,
        times: [0, 0.28, 0.29, 0.57, 0.58],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Ramiel Octahedron (appears in final state)
  const octahedronVariants = {
    animate: {
      opacity: [0, 0, 0, 0, 1],
      scale: [0.5, 0.5, 0.5, 0.5, 1],
      transition: {
        duration: 7,
        times: [0, 0.28, 0.29, 0.57, 0.58],
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  // Final label text
  const labelVariants = {
    animate: {
      opacity: [0, 0, 0, 0, 1],
      x: [0, 0, 0, 0, 0],
      transition: {
        duration: 7,
        times: [0, 0.28, 0.29, 0.57, 0.58],
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  // Output line (horizontal line to label)
  const outputLineVariants = {
    animate: {
      pathLength: [0, 0, 0, 0, 1],
      opacity: [0, 0, 0, 0, 1],
      transition: {
        duration: 7,
        times: [0, 0.28, 0.29, 0.57, 0.58],
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f8f6f1] p-8">
      <div className="relative w-full max-w-2xl">
        <svg
          viewBox="0 0 500 200"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* State Labels (top) */}
          <text
            x="40"
            y="30"
            className="font-mono text-[8px] uppercase tracking-wider fill-[#706c67]"
          >
            Clinical Noise
          </text>
          <text
            x="380"
            y="30"
            className="font-mono text-[8px] uppercase tracking-wider fill-[#706c67]"
          >
            Total Tactical Certainty
          </text>

          {/* Chaos Particles */}
          {chaosParticles.map((particle, i) => (
            <motion.circle
              key={i}
              cx={particle.cx}
              cy={particle.cy}
              r="2"
              fill="#1a1917"
              variants={particleVariants}
              animate="animate"
            />
          ))}

          {/* Main Morphing Path */}
          <motion.path
            d={chaosPath}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            animate="animate"
          />

          {/* Ramiel Octahedron (Blue Faceted Diamond) */}
          <motion.g
            variants={octahedronVariants}
            animate="animate"
            style={{ transformOrigin: "280px 150px" }}
          >
            {/* Octahedron Structure - Double Pyramid */}
            {/* Top pyramid */}
            <path
              d="M 280 130 L 265 150 L 280 155 Z"
              fill="#4A90E2"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.8"
            />
            <path
              d="M 280 130 L 280 155 L 295 150 Z"
              fill="#6BA3E8"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.9"
            />
            <path
              d="M 280 130 L 295 150 L 265 150 Z"
              fill="#8AB8ED"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Bottom pyramid */}
            <path
              d="M 280 170 L 265 150 L 280 155 Z"
              fill="#3A7BC8"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.8"
            />
            <path
              d="M 280 170 L 280 155 L 295 150 Z"
              fill="#5A95D8"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.9"
            />
            {/* Center facets */}
            <path
              d="M 265 150 L 280 155 L 295 150 Z"
              fill="#7AAEE5"
              stroke="#2E5F8A"
              strokeWidth="0.5"
              opacity="0.95"
            />
            {/* Highlight facets for depth */}
            <path
              d="M 275 145 L 280 150 L 285 145"
              fill="none"
              stroke="#B8D9F5"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </motion.g>

          {/* Output Line (from circle to label) */}
          <motion.line
            x1="310"
            y1="150"
            x2="360"
            y2="150"
            stroke="#2d6a4f"
            strokeWidth="1.5"
            variants={outputLineVariants}
            animate="animate"
          />

          {/* Final Label */}
          <motion.g variants={labelVariants} animate="animate">
            <text
              x="370"
              y="145"
              className="font-mono text-[9px] uppercase tracking-wider fill-[#2d6a4f] font-bold"
            >
              ROUTE: ROUTINE CARE
            </text>
            <text
              x="370"
              y="158"
              className="font-mono text-[10px] fill-[#2d6a4f] font-bold"
            >
              [●]
            </text>
          </motion.g>

          {/* Subtle Grid Background */}
          <defs>
            <pattern
              id="entropy-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(26, 25, 23, 0.03)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="500" height="200" fill="url(#entropy-grid)" />
        </svg>

        {/* Bottom Technical Metadata */}
        <div className="mt-6 flex justify-between items-center px-4">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#706c67]">
              Processing Model
            </p>
            <p className="font-mono text-xs text-[#1a1917] font-semibold">
              Neural Governance v2.4
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#706c67]">
              State Transition
            </p>
            <p className="font-mono text-xs text-[#1a1917] font-semibold">
              Chaos → Waveform → Certainty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
