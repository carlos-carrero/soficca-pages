"use client";

import { useCallback, useRef, useState } from "react";
import { useLenisScroll } from "./LenisContext";

export function useSectionScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const prevRef = useRef(0);

  const handler = useCallback(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 = section top at 85% down viewport, 1 = section top at 25% down viewport
      const startThreshold = vh * 0.85;
      const endThreshold = vh * 0.25;
      const range = startThreshold - endThreshold;

      const raw = (startThreshold - rect.top) / range;
      const clamped = Math.min(1, Math.max(0, raw));

      if (Math.abs(clamped - prevRef.current) > 0.001) {
        prevRef.current = clamped;
        setProgress(clamped);
      }
    },
    [sectionRef]
  );

  useLenisScroll(handler);

  return progress;
}
