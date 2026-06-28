"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VisualAssetSlot from "@/components/background/VisualAssetSlot";
import { katanaShowcaseBackground } from "@/lib/config/assets";

gsap.registerPlugin(ScrollTrigger);

/* Loaded client-side only — same pattern as 005 ShowcaseScene */
const KatanaInteractiveScene = dynamic(
  () => import("@/components/three/KatanaInteractiveScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#d42040", animation: "pulse 2s infinite" }}
        />
      </div>
    ),
  }
);

const TRAITS: [string, string][] = [
  ["Unity & HLSL shader programming",                 "#d42040"],
  ["React Three Fiber & Three.js — this live scene",  "#8b44ed"],
  ["Real-time rendering & performance budgeting",     "#6cb4fc"],
  ["Procedural geometry & particle systems",          "#5854f0"],
];

export default function KatanaShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ks-text", {
        opacity: 0,
        x: -40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="katana-showcase"
      className="grain-overlay py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "#070512" }}
    >
      {/* ── Atmospheric background image ── */}
      <VisualAssetSlot config={katanaShowcaseBackground} />

      {/* ── Content (sits above background) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20" style={{ position: "relative" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* ── Text ─────────────────────────────────────────────── */}
          <div className="lg:pr-16">
            <p className="ks-text label-mono text-crimson mb-5">
              005 / Real-Time Graphics
            </p>
            <h2
              className="ks-text font-display text-parchment mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
            >
              Graphics, down
              <br />
              <span style={{ color: "rgba(245,240,232,0.42)" }}>to the shader.</span>
            </h2>
            <p
              className="ks-text prose-body max-w-md mb-8"
              style={{ color: "rgba(245,240,232,0.62)", fontSize: "1.02rem" }}
            >
              Real-time graphics run through everything I build — from HLSL shaders in
              Unity to interactive WebGL in the browser. The blade beside you is rendered
              live with React Three Fiber: procedural geometry, custom materials, and
              motion driven entirely in code. Drag it to explore.
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
              Drag to rotate · Procedural 3D geometry
            </div>
          </div>

          {/* ── Framed 3D canvas — mirrors 005 layout exactly ─── */}
          <div
            className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(245,240,232,0.07)" }}
          >
            {/* Inner vignette — darkens canvas edges so katana reads clearly */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 38%, rgba(7,5,18,0.72) 100%)",
              }}
            />
            <KatanaInteractiveScene />
          </div>

        </div>
      </div>
    </section>
  );
}
