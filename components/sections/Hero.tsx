"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import CinematicBackground from "@/components/background/CinematicBackground";

const KatanaSceneDynamic = dynamic(
  () => import("@/components/three/KatanaScene"),
  { ssr: false, loading: () => null }
);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const monLayerRef  = useRef<HTMLDivElement>(null);
  const mouseRef     = useRef({ x: 0, y: 0 });

  /* ── Entrance animation ────────────────────────────────────── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge",  { opacity: 0, y: 16, duration: 0.6 })
        .from(".hero-line",   { y: "108%", duration: 0.95, stagger: 0.1 }, "-=0.2")
        .from(".hero-copy",   { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(".hero-status", { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, "-=0.5")
        .from(".hero-cta",    { opacity: 0, y: 14, duration: 0.5 }, "-=0.4")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef }
  );

  /* ── Mouse parallax — decorative layer only ────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !monLayerRef.current) return;

    const layer = monLayerRef.current;
    const xTo = gsap.quickTo(layer, "x", { duration: 1.8, ease: "power3" });
    const yTo = gsap.quickTo(layer, "y", { duration: 1.8, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      xTo(nx * 14);
      yTo(ny * 9);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="grain-overlay relative min-h-screen w-full overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: "#060610" }}
    >
      {/* ── Layer 1: Cinematic background (video → poster → gradient) ── */}
      <CinematicBackground
        videoWebm="/videos/samurai-hero.webm"
        videoMp4="/videos/samurai-hero.mp4"
        poster="/images/samurai-hero-poster.webp"
        overlayOpacity={0.6}
      />

      {/* ── Layer 2: Editorial grid ─────────────────────────────────── */}
      <div className="editorial-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Layer 3: Animated atmospheric mist ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="mist-layer absolute"
          style={{
            top: "-10%", left: "-5%",
            width: "60vw", height: "75vh",
            background: "radial-gradient(ellipse at 30% 30%, rgba(212,32,64,0.18) 0%, transparent 65%)",
            animation: "mist-drift-a 14s ease-in-out infinite",
          }}
        />
        <div
          className="mist-layer absolute"
          style={{
            bottom: "-15%", right: "-5%",
            width: "55vw", height: "70vh",
            background: "radial-gradient(ellipse at 70% 70%, rgba(88,84,240,0.15) 0%, transparent 65%)",
            animation: "mist-drift-b 18s ease-in-out infinite",
          }}
        />
        <div
          className="mist-layer absolute"
          style={{
            top: "20%", left: "35%",
            width: "40vw", height: "60vh",
            background: "radial-gradient(ellipse at 50% 50%, rgba(139,68,237,0.07) 0%, transparent 60%)",
            animation: "mist-drift-a 22s ease-in-out infinite",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* ── Layer 4: Parallax decorative (mon circles + hairlines) ─── */}
      <div
        ref={monLayerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 4 }}
      >
        {/* Japanese mon */}
        <svg
          viewBox="0 0 500 500"
          className="absolute pointer-events-none"
          style={{
            right: "-6vw", top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(300px, 40vw, 520px)",
            height: "auto",
            opacity: 0.07,
          }}
        >
          <circle cx="250" cy="250" r="238" fill="none" stroke="#f0ead8" strokeWidth="1" />
          <circle cx="250" cy="250" r="210" fill="none" stroke="#f0ead8" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#d42040" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="145" fill="none" stroke="#f0ead8" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="108" fill="none" stroke="#f0ead8" strokeWidth="0.4" />
          <circle cx="250" cy="250" r="68"  fill="none" stroke="#d42040" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="30"  fill="none" stroke="#f0ead8" strokeWidth="0.5" />
          <line x1="12"  y1="250" x2="488" y2="250" stroke="#f0ead8" strokeWidth="0.4" />
          <line x1="250" y1="12"  x2="250" y2="488" stroke="#f0ead8" strokeWidth="0.4" />
          <line x1="82"  y1="82"  x2="418" y2="418" stroke="#f0ead8" strokeWidth="0.25" />
          <line x1="418" y1="82"  x2="82"  y2="418" stroke="#f0ead8" strokeWidth="0.25" />
        </svg>

        {/* Diagonal katana hairlines */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ opacity: 0.08 }}
        >
          <line x1="0"  y1="100%" x2="38%" y2="0" stroke="#f0ead8" strokeWidth="0.5" />
          <line x1="2%" y1="100%" x2="40%" y2="0" stroke="#f0ead8" strokeWidth="0.25" />
        </svg>
      </div>

      {/* ── Layer 5: KatanaScene (right side, 3D canvas) ────────────── */}
      <div
        className="absolute top-0 bottom-0 right-0 pointer-events-none hidden md:block"
        style={{ width: "52vw", zIndex: 5 }}
        aria-hidden="true"
      >
        <KatanaSceneDynamic mouseRef={mouseRef} />
      </div>

      {/* ── Layer 6: Content ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-20 pt-40 pb-32">

        {/* Overline */}
        <div className="hero-badge mb-10">
          <span
            className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: "rgba(240,234,216,0.5)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#d42040", boxShadow: "0 0 6px rgba(212,32,64,0.9)" }}
            />
            Computer Engineer
            <span style={{ color: "rgba(240,234,216,0.22)" }}>{"///"}</span>
            Game Developer · Full-Stack Developer · AI Builder
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-parchment mb-8"
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 8.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
          }}
        >
          <span className="block overflow-hidden">
            <span className="hero-line block">From roguelike</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block" style={{ color: "rgba(240,234,216,0.45)" }}>
              worlds to
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">real-world</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block" style={{ color: "rgba(240,234,216,0.45)" }}>
              software.
            </span>
          </span>
        </h1>

        {/* Supporting copy */}
        <p
          className="hero-copy mb-10 max-w-xl leading-relaxed"
          style={{ color: "rgba(240,234,216,0.72)", fontSize: "1.05rem" }}
        >
          I design and build across the full spectrum — from gameplay systems and
          procedural worlds to full-stack platforms and intelligent AI tools.
        </p>

        {/* Status row */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { label: "Open to international opportunities", color: "#d42040" },
            { label: "Available for relocation",           color: "#5854f0" },
            { label: "Based in Turkey",                    color: "rgba(240,234,216,0.28)" },
            { label: "Remote-friendly",                    color: "rgba(240,234,216,0.28)" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="hero-status inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{
                color: "rgba(240,234,216,0.62)",
                borderColor: "rgba(240,234,216,0.1)",
                backgroundColor: "rgba(240,234,216,0.03)",
              }}
            >
              <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            style={{
              backgroundColor: "#d42040",
              color: "#f0ead8",
              boxShadow: "0 0 28px rgba(212,32,64,0.4)",
            }}
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              color: "rgba(240,234,216,0.72)",
              border: "1px solid rgba(240,234,216,0.15)",
            }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(240,234,216,0.28)", zIndex: 10 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>

      {/* Name watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-12 font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "rgba(240,234,216,0.12)", zIndex: 10 }}
      >
        Berke Emre Deveci
      </div>
    </section>
  );
}
