"use client";

import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

const DISPLAY = "var(--font-plus-jakarta-sans)";
const MONO = "var(--font-jetbrains-mono)";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition when scrolled past ~700px (roughly hero height)
      setIsScrolled(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(248, 246, 241, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Wordmark */}
        <a
          href="/"
          className="text-xl md:text-2xl font-extrabold text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
          style={{ fontFamily: DISPLAY }}
        >
          Soficca
        </a>

        {/* Right: Nav items */}
        <nav className="flex items-center gap-4 md:gap-6">
          {/* View Cardio Pilot */}
          <a
            href="https://cardio.pilot.soficca.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            style={{ fontFamily: MONO }}
          >
            <span className="hidden md:inline">View Cardio Pilot</span>
            <span className="md:hidden">Pilot</span>
          </a>

          {/* Contact */}
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            style={{ fontFamily: MONO }}
          >
            Contact
          </button>
        </nav>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  );
}
