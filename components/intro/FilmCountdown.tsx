"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

const NUMBERS = ["3", "2", "1"];
const STEP_MS = 550;

export default function FilmCountdown() {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);
  const [done, setDone]       = useState(false);

  const dismiss = useCallback(() => {
    setDone(true);
    try { sessionStorage.setItem("intro-v1", "1"); } catch {}
  }, []);

  useEffect(() => {
    const check = () => {
      try {
        if (!sessionStorage.getItem("intro-v1")) setVisible(true);
      } catch {
        setVisible(true);
      }
    };
    const id = setTimeout(check, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!visible || done) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    NUMBERS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS + 120));
    });

    timers.push(
      setTimeout(() => {
        setStep(NUMBERS.length); // flash frame
      }, NUMBERS.length * STEP_MS + 120)
    );

    timers.push(
      setTimeout(() => dismiss(), NUMBERS.length * STEP_MS + 480)
    );

    return () => timers.forEach(clearTimeout);
  }, [visible, done, dismiss]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss]);

  if (!visible) return null;

  const numLabel = step < NUMBERS.length ? NUMBERS[step] : null;
  const isFlash  = step === NUMBERS.length;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="film-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
          style={{ backgroundColor: "#050508" }}
          aria-modal
          role="dialog"
          aria-label="Introduction countdown"
        >
          {/* Film grain */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
              opacity: 0.045,
              mixBlendMode: "overlay",
            }}
          />

          {/* Corner crop marks */}
          {[
            "top-8 left-8 border-t-2 border-l-2",
            "top-8 right-8 border-t-2 border-r-2",
            "bottom-8 left-8 border-b-2 border-l-2",
            "bottom-8 right-8 border-b-2 border-r-2",
          ].map((cls) => (
            <div
              key={cls}
              aria-hidden="true"
              className={`absolute w-8 h-8 border-parchment/20 ${cls}`}
            />
          ))}

          {/* Film leader SVG circle */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ opacity: isFlash ? 0 : 1 }}
            transition={{ duration: 0.08 }}
          >
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              aria-hidden="true"
              className="absolute"
            >
              <circle cx="140" cy="140" r="130" fill="none" stroke="rgba(245,240,232,0.1)"  strokeWidth="1" />
              <circle cx="140" cy="140" r="118" fill="none" stroke="rgba(245,240,232,0.06)" strokeWidth="0.5" />
              <circle cx="140" cy="140" r="104" fill="none" stroke="rgba(196,30,58,0.3)"    strokeWidth="1" />
              <circle cx="140" cy="140" r="86"  fill="none" stroke="rgba(245,240,232,0.08)" strokeWidth="0.5" />
              <line x1="10" y1="140" x2="270" y2="140" stroke="rgba(245,240,232,0.07)" strokeWidth="0.5" />
              <line x1="140" y1="10" x2="140" y2="270" stroke="rgba(245,240,232,0.07)" strokeWidth="0.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const r = (deg * Math.PI) / 180;
                const x1 = 140 + Math.cos(r) * 100;
                const y1 = 140 + Math.sin(r) * 100;
                const x2 = 140 + Math.cos(r) * 128;
                const y2 = 140 + Math.sin(r) * 128;
                return (
                  <line
                    key={deg}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(245,240,232,0.15)"
                    strokeWidth="0.8"
                  />
                );
              })}
            </svg>

            {/* Number */}
            <AnimatePresence mode="wait">
              {numLabel && (
                <motion.span
                  key={numLabel}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1,  scale: 1 }}
                  exit={{   opacity: 0,  scale: 1.12, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative z-10 font-display text-parchment"
                  style={{ fontSize: "7rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}
                >
                  {numLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Flash overlay */}
          {isFlash && (
            <motion.div
              className="absolute inset-0 bg-parchment"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}

          {/* Skip button */}
          <button
            onClick={dismiss}
            className="absolute bottom-10 right-12 text-xs font-mono text-parchment/30 hover:text-parchment/60 transition-colors tracking-widest uppercase"
            aria-label="Skip intro"
          >
            Skip — Esc
          </button>

          {/* Frame number / technical text */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-12 font-mono text-parchment/15 text-xs tracking-widest"
          >
            BERK-A  {String(step + 1).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
