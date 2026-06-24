"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Deterministic particle positions — no Math.random() in component body */
const PARTICLES = [
  { cx: 85,  cy: 95,  r: 1.5, opacity: 0.28, color: "#6cb4fc" },
  { cx: 248, cy: 142, r: 1.0, opacity: 0.20, color: "#8b44ed" },
  { cx: 62,  cy: 212, r: 1.8, opacity: 0.16, color: "#6cb4fc" },
  { cx: 272, cy: 270, r: 1.2, opacity: 0.24, color: "#d42040" },
  { cx: 50,  cy: 342, r: 1.0, opacity: 0.16, color: "#6cb4fc" },
  { cx: 280, cy: 396, r: 1.5, opacity: 0.20, color: "#8b44ed" },
  { cx: 96,  cy: 432, r: 1.0, opacity: 0.13, color: "#6cb4fc" },
  { cx: 254, cy: 486, r: 1.8, opacity: 0.16, color: "#d42040" },
  { cx: 116, cy: 546, r: 1.2, opacity: 0.13, color: "#8b44ed" },
  { cx: 228, cy: 592, r: 1.0, opacity: 0.15, color: "#6cb4fc" },
  { cx: 143, cy: 166, r: 0.8, opacity: 0.18, color: "#d42040" },
  { cx: 197, cy: 322, r: 0.8, opacity: 0.13, color: "#6cb4fc" },
];

const TRAITS: [string, string][] = [
  ["Precision engineering over brute force",              "#d42040"],
  ["Gameplay systems designed for responsiveness",        "#8b44ed"],
  ["Controlled, purposeful motion in every interaction",  "#6cb4fc"],
  ["Technical craftsmanship at every layer of the stack", "#5854f0"],
];

export default function KatanaShowcase() {
  const sectionRef    = useRef<HTMLElement>(null);
  const bladeEdgeRef  = useRef<SVGLineElement>(null);
  const bladeMuneRef  = useRef<SVGLineElement>(null);
  const bladeGroupRef = useRef<SVGGElement>(null);
  const visualRef     = useRef<HTMLDivElement>(null);

  /* ── Scroll-triggered reveal + floating ─────────────────────── */
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      /* Static composition: reveal everything at once, no motion */
      gsap.set([bladeEdgeRef.current, bladeMuneRef.current], { strokeDashoffset: 0 });
      gsap.set(".ks-glow, .ks-energy, .ks-particle", { opacity: 1 });
      gsap.from(".ks-text", {
        opacity: 0, duration: 0.45, stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      onComplete() {
        /* Gentle floating after reveal */
        if (bladeGroupRef.current) {
          gsap.to(bladeGroupRef.current, {
            y: -10, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1,
          });
        }
      },
    });

    tl
      .from(".ks-text", {
        opacity: 0, y: 26, duration: 0.8, stagger: 0.1, ease: "power3.out",
      })
      .to(bladeEdgeRef.current, {
        strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut",
      }, "-=0.35")
      .to(bladeMuneRef.current, {
        strokeDashoffset: 0, duration: 0.95, ease: "power2.out",
      }, "<0.15")
      .from(".ks-glow", {
        opacity: 0, duration: 0.9, stagger: 0.12, ease: "power2.out",
      }, "-=0.7")
      .from(".ks-energy", {
        opacity: 0, duration: 0.65, ease: "power3.out",
      }, "-=0.5")
      .from(".ks-particle", {
        opacity: 0, duration: 0.5, stagger: 0.04, ease: "power2.out",
      }, "-=0.45");

  }, { scope: sectionRef });

  /* ── Cursor parallax on the visual layer ────────────────────── */
  useEffect(() => {
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch  = window.matchMedia("(hover: none)").matches;
    if (noMotion || isTouch || !visualRef.current) return;

    const el = visualRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 2.2, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 2.2, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      xTo(nx * 9);
      yTo(ny * 6);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="katana-showcase"
      className="grain-overlay py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "#070512" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* ── Text ─────────────────────────────────────────────── */}
          <div className="lg:pr-16">
            <p className="ks-text font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
              006 / Katana Showcase
            </p>
            <h2
              className="ks-text font-display text-parchment mb-6"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Engineered
              <br />
              <span style={{ color: "rgba(245,240,232,0.32)" }}>like a blade.</span>
            </h2>
            <p
              className="ks-text leading-relaxed max-w-md mb-8"
              style={{ color: "rgba(245,240,232,0.52)", fontSize: "1.02rem" }}
            >
              A visual study connecting precision engineering, game-development
              systems, controlled motion, and cinematic interaction — discipline
              expressed as form.
            </p>

            <ul className="space-y-4 mb-10">
              {TRAITS.map(([text, color]) => (
                <li
                  key={text}
                  className="ks-text flex items-center gap-3 text-sm"
                  style={{ color: "rgba(245,240,232,0.44)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {text}
                </li>
              ))}
            </ul>

            <div
              className="ks-text inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono border"
              style={{
                color: "rgba(245,240,232,0.26)",
                borderColor: "rgba(245,240,232,0.07)",
                backgroundColor: "rgba(245,240,232,0.02)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "#d42040" }}
              />
              Abstract mode · 3D model ready when katana.glb is placed
            </div>
          </div>

          {/* ── Abstract blade visual ─────────────────────────────── */}
          <div
            ref={visualRef}
            className="relative h-[520px] lg:h-[640px] flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 340 620"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-xs mx-auto"
            >
              <defs>
                <radialGradient id="ks-violet-glow" cx="50%" cy="38%" r="55%">
                  <stop offset="0%" stopColor="#8b44ed" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#8b44ed" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ks-crimson-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d42040" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#d42040" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ks-blue-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6cb4fc" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#6cb4fc" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Mon circles — static background */}
              <circle cx="170" cy="310" r="240" stroke="#f0ead8" strokeWidth="0.5" opacity="0.036" />
              <circle cx="170" cy="310" r="190" stroke="#d42040" strokeWidth="0.4" opacity="0.046" />
              <circle cx="170" cy="310" r="142" stroke="#f0ead8" strokeWidth="0.3" opacity="0.024" />
              <line x1="170" y1="68"  x2="170" y2="552" stroke="#f0ead8" strokeWidth="0.22" opacity="0.030" />
              <line x1="28"  y1="310" x2="312" y2="310" stroke="#f0ead8" strokeWidth="0.22" opacity="0.030" />

              {/* Particles — static background */}
              {PARTICLES.map((p, i) => (
                <circle
                  key={i}
                  className="ks-particle"
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill={p.color}
                  opacity={p.opacity}
                />
              ))}

              {/* Floating blade group */}
              <g ref={bladeGroupRef}>
                {/* Blade-body violet glow */}
                <ellipse
                  className="ks-glow"
                  cx="170" cy="198" rx="44" ry="188"
                  fill="url(#ks-violet-glow)"
                />
                {/* Tip electric-blue glow */}
                <ellipse
                  className="ks-glow"
                  cx="170" cy="46" rx="22" ry="40"
                  fill="url(#ks-blue-glow)"
                />

                {/* Tsuba crimson energy */}
                <ellipse
                  className="ks-energy"
                  cx="170" cy="366" rx="94" ry="25"
                  fill="url(#ks-crimson-glow)"
                />
                <ellipse
                  className="ks-energy"
                  cx="170" cy="366" rx="50" ry="13"
                  fill="url(#ks-crimson-glow)"
                />

                {/* Blade body silhouette */}
                <polygon
                  points="170,26 177,356 174,368 170,376 166,368 163,356"
                  fill="rgba(175,210,240,0.044)"
                  stroke="rgba(175,210,240,0.15)"
                  strokeWidth="0.6"
                />

                {/* Edge (ha) — cutting edge, bright, animated */}
                <line
                  ref={bladeEdgeRef}
                  x1="172" y1="28" x2="175" y2="354"
                  stroke="rgba(240,252,255,0.80)"
                  strokeWidth="0.9"
                  style={{ strokeDasharray: 328, strokeDashoffset: 328 }}
                />

                {/* Mune — back of blade, subtle, animated */}
                <line
                  ref={bladeMuneRef}
                  x1="168" y1="28" x2="165" y2="354"
                  stroke="rgba(155,188,218,0.30)"
                  strokeWidth="0.5"
                  style={{ strokeDasharray: 328, strokeDashoffset: 328 }}
                />

                {/* Tsuba (guard disc) */}
                <ellipse
                  cx="170" cy="366" rx="36" ry="10"
                  fill="rgba(28,18,6,0.92)"
                  stroke="rgba(180,140,50,0.72)"
                  strokeWidth="1"
                />
                <ellipse
                  cx="170" cy="363" rx="36" ry="10"
                  fill="none"
                  stroke="rgba(210,170,68,0.20)"
                  strokeWidth="0.4"
                />

                {/* Handle */}
                <rect
                  x="163" y="376" width="14" height="178" rx="3.5"
                  fill="rgba(18,8,3,0.92)"
                  stroke="rgba(78,52,22,0.48)"
                  strokeWidth="0.7"
                />

                {/* Handle wraps */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="162" y1={391 + i * 28}
                    x2="178" y2={391 + i * 28}
                    stroke="rgba(88,62,26,0.55)"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Pommel */}
                <ellipse
                  cx="170" cy="558" rx="11" ry="6"
                  fill="rgba(108,82,32,0.85)"
                  stroke="rgba(175,138,48,0.55)"
                  strokeWidth="0.8"
                />
              </g>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
