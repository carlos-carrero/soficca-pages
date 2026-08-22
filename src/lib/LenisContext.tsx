"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

type ScrollPayload = { scroll: number; limit: number; progress: number };
type ScrollListener = (payload: ScrollPayload) => void;

interface LenisContextValue {
  subscribe: (fn: ScrollListener) => () => void;
  lenis: Lenis | null;
}

const Ctx = createContext<LenisContextValue | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const listenersRef = useRef<Set<ScrollListener>>(new Set());

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { scroll: number; limit: number; progress: number }) => {
      const payload: ScrollPayload = { scroll: e.scroll, limit: e.limit, progress: e.progress };
      listenersRef.current.forEach((fn) => fn(payload));
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const [value] = useState<LenisContextValue>(() => ({
    subscribe: (fn: ScrollListener) => {
      listenersRef.current.add(fn);
      return () => { listenersRef.current.delete(fn); };
    },
    get lenis() {
      return lenisRef.current;
    },
  }));

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLenisScroll(fn: ScrollListener) {
  const ctx = useContext(Ctx);
  useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe(fn);
  }, [ctx, fn]);
}

export function useLenis() {
  const ctx = useContext(Ctx);
  return ctx?.lenis || null;
}
