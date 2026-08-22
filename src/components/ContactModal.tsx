"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/lib/LenisContext";

const MONO = "var(--font-jetbrains-mono)";
const SANS = "var(--font-plus-jakarta-sans)";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  // Handle client-side mounting for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Focus trap, escape key handler, and Lenis scroll management
  useEffect(() => {
    if (!isOpen) return;

    // Stop Lenis smooth scrolling when modal opens
    if (lenis) {
      lenis.stop();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    // Focus first input when modal opens
    firstInputRef.current?.focus();

    // Trap focus within modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";

      // Restart Lenis smooth scrolling when modal closes
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, onClose, lenis]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard against double-submission race condition
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        // Auto-close after 2.5 seconds
        setTimeout(() => {
          onClose();
          // Reset states after modal closes
          setTimeout(() => {
            setIsSuccess(false);
            setIsSubmitting(false);
          }, 300);
        }, 2500);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError("Something went wrong — try emailing hello@soficca.com directly instead.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !isMounted) return null;

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(26, 25, 23, 0.4)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="bg-[var(--paper)] w-full max-w-md rounded-lg shadow-2xl relative"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-[var(--accent)]">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold text-[var(--ink)] mb-3"
                style={{ fontFamily: SANS }}
              >
                Message sent
              </h3>
              <p
                className="text-sm text-[var(--ink-secondary)]"
                style={{ fontFamily: SANS }}
              >
                We'll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-2xl font-bold text-[var(--ink)] mb-2"
                style={{ fontFamily: SANS }}
              >
                Get in touch
              </h2>
              <p
                className="text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-8"
                style={{ fontFamily: MONO }}
              >
                Contact Soficca
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-2"
                    style={{ fontFamily: MONO }}
                  >
                    Name
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--rule)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                    style={{ fontFamily: SANS }}
                  />
                </div>

                {/* Organization field */}
                <div>
                  <label
                    htmlFor="organization"
                    className="block text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-2"
                    style={{ fontFamily: MONO }}
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--rule)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                    style={{ fontFamily: SANS }}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-2"
                    style={{ fontFamily: MONO }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--rule)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                    style={{ fontFamily: SANS }}
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[9px] uppercase tracking-[0.15em] text-[var(--muted)] mb-2"
                    style={{ fontFamily: MONO }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--rule)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
                    style={{ fontFamily: SANS }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div
                    className="text-xs text-red-600 leading-relaxed"
                    style={{ fontFamily: SANS }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center text-sm font-medium px-5 py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: MONO,
                    backgroundColor: "var(--ink)",
                    color: "var(--paper)",
                  }}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
