"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const orbRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orb   = orbRef.current;
    const trail = trailRef.current;
    if (!orb || !trail) return;

    orb.style.opacity   = "1";
    trail.style.opacity = "1";

    const target = { x: -100, y: -100 };
    const curr   = { x: -100, y: -100 };
    const tr     = { x: -100, y: -100 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      curr.x = lerp(curr.x, target.x, 0.2);
      curr.y = lerp(curr.y, target.y, 0.2);
      tr.x   = lerp(tr.x, curr.x, 0.1);
      tr.y   = lerp(tr.y, curr.y, 0.1);
      orb.style.transform   = `translate(${curr.x - 7}px, ${curr.y - 7}px)`;
      trail.style.transform = `translate(${tr.x - 18}px, ${tr.y - 18}px)`;
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
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9990,
          opacity: 0,
          transition: "opacity 0.4s",
          willChange: "transform",
        }}
      />
      <div
        ref={orbRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 14, height: 14,
          borderRadius: "50%",
          background: "rgba(196,30,58,0.9)",
          boxShadow: "0 0 10px 2px rgba(196,30,58,0.55), 0 0 22px 4px rgba(79,70,229,0.25)",
          pointerEvents: "none",
          zIndex: 9991,
          opacity: 0,
          transition: "opacity 0.4s",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
