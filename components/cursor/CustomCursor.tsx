"use client";

import { useEffect, useRef } from "react";

/* ── Trail particle config ─────────────────────────────────────────
   Three elements at different lerp speeds create spatial lag.
   Index 0 is closest to the cursor (fastest), index 2 is farthest.
   All lag behind the native pointer — nothing sits on top of it.    */
const TRAIL = [
  { lerp: 0.12, size: 16, opacity: 0.28 },
  { lerp: 0.07, size: 24, opacity: 0.16 },
  { lerp: 0.04, size: 34, opacity: 0.08 },
] as const;

const N = TRAIL.length;

export default function CustomCursor() {
  const elsRef = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null) as null[]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    /* Disable on touch devices and reduced-motion */
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = elsRef.current;
    const target = { x: -300, y: -300 };
    /* Per-particle positions — initialized far off-screen */
    const pos = TRAIL.map(() => ({ x: -300, y: -300 }));
    let hasFirstMove = false;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      if (!hasFirstMove) {
        hasFirstMove = true;
        /* Snap all to cursor on first move so particles don't fly in */
        for (let i = 0; i < N; i++) {
          pos[i].x = e.clientX;
          pos[i].y = e.clientY;
        }
        /* Fade particles in */
        for (let i = 0; i < N; i++) {
          const el = els[i];
          if (el) el.style.opacity = String(TRAIL[i].opacity);
        }
      }
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      for (let i = 0; i < N; i++) {
        const { lerp: speed, size } = TRAIL[i];
        pos[i].x = lerp(pos[i].x, target.x, speed);
        pos[i].y = lerp(pos[i].y, target.y, speed);
        const el = els[i];
        if (el) {
          el.style.transform = `translate(${pos[i].x - size / 2}px, ${pos[i].y - size / 2}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {TRAIL.map(({ size }, i) => (
        <div
          key={i}
          ref={(el) => {
            elsRef.current[i] = el;
          }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: size,
            height: size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,32,64,0.88) 0%, rgba(212,32,64,0.28) 44%, transparent 72%)",
            mixBlendMode: "screen",
            pointerEvents: "none",
            zIndex: 9990,
            opacity: 0,
            transition: "opacity 0.4s",
            willChange: "transform",
          }}
        />
      ))}
    </>
  );
}
