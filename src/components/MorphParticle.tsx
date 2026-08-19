"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";
// @ts-ignore
import { interpolate } from "flubber";

interface MorphParticleProps {
  cx: number;
  cy: number;
  duration: number;
  delay: number;
}

function circlePoints(cx: number, cy: number, r: number, sides = 12): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  return pts;
}

function sliverPoints(cx: number, cy: number, length = 20, height = 1.8, sides = 12): [number, number][] {
  const halfLen = length / 2;
  const halfH = height / 2;
  const pts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    pts.push([cx + Math.cos(angle) * halfLen, cy + Math.sin(angle) * halfH]);
  }
  return pts;
}

export default function MorphParticle({ cx, cy, duration, delay }: MorphParticleProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const fromPts = circlePoints(cx, cy, 3.5);
    const toPts = sliverPoints(cx, cy);
    const interpolator = interpolate(fromPts as any, toPts as any, { string: true });

    const unsubscribe = progress.on("change", (t) => {
      if (pathRef.current) {
        pathRef.current.setAttribute("d", interpolator(t));
        const opacity = t < 0.5 ? 1 : Math.max(0, 1 - (t - 0.5) * 2.5);
        pathRef.current.setAttribute("opacity", String(opacity));
      }
    });

    const controls = animate(progress, [0, 0, 1, 1, 0], {
      duration,
      delay,
      times: [0, 0.15, 0.35, 0.95, 1],
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [cx, cy, duration, delay, progress]);

  return <path ref={pathRef} fill="#1a1917" />;
}
