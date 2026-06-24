"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import VisualAssetSlot from "@/components/background/VisualAssetSlot";
import AtmosphericOverlay from "@/components/background/AtmosphericOverlay";
import ParallaxLayer from "@/components/background/ParallaxLayer";
import { heroBackground, katana } from "@/lib/config/assets";

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

  /* ── Mouse parallax — skip on touch and reduced-motion devices ── */
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch       = window.matchMedia("(hover: none)").matches;
    if (reducedMotion || isTouch || !monLayerRef.current) return;

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
      {/* ── Layer 1: Cinematic background (driven by asset config) ── */}
      <VisualAssetSlot config={heroBackground} priority />

      {/* ── Layer 1b: Text-side gradient (strengthens headline contrast) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(105deg, rgba(6,6,16,0.55) 0%, rgba(6,6,16,0.28) 45%, rgba(6,6,16,0.05) 72%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Layer 2: Editorial grid ─────────────────────────────── */}
      <div className="editorial-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Layer 3: Atmospheric mist ───────────────────────────── */}
      <AtmosphericOverlay />

      {/* ── Layer 4: Parallax decorative (mon circles + hairlines) */}
      <ParallaxLayer layerRef={monLayerRef} />

      {/* ── Layer 5: KatanaScene (right side, 3D canvas) ────────── */}
      <div
        className="absolute top-0 bottom-0 right-0 pointer-events-none hidden md:block"
        style={{ width: "52vw", zIndex: 5 }}
        aria-hidden="true"
      >
        <KatanaSceneDynamic mouseRef={mouseRef} useGltf={katana.enabled} />
      </div>

      {/* ── Layer 6: Content ────────────────────────────────────── */}
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
          I&apos;m a Computer Engineer building atmospheric game systems,
          practical applications, and intelligent software. My work spans Unity
          and Unreal Engine development, mobile and desktop applications,
          full-stack systems, and AI-driven tools.
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
        <div className="hero-cta flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            style={{
              backgroundColor: "#d42040",
              color: "#f0ead8",
              boxShadow: "0 0 28px rgba(212,32,64,0.4)",
            }}
          >
            Explore My Work
          </a>
          <a
            href="https://github.com/berkeedeveci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              color: "rgba(240,234,216,0.78)",
              border: "1px solid rgba(240,234,216,0.18)",
              backgroundColor: "rgba(240,234,216,0.04)",
            }}
          >
            View GitHub
          </a>
          <a
            href="/Berke-Emre-Deveci-CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              color: "rgba(240,234,216,0.78)",
              border: "1px solid rgba(240,234,216,0.18)",
              backgroundColor: "rgba(240,234,216,0.04)",
            }}
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              color: "rgba(240,234,216,0.55)",
              border: "1px solid rgba(240,234,216,0.1)",
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
