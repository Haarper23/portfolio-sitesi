"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Spec {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  accent: string;
  accentRgb: string;
  visual: React.ReactNode;
}

function DungeonMapVisual() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true" className="w-full h-full">
      <rect width="240" height="140" fill="none" />
      {/* Grid */}
      {[20,40,60,80,100,120,140,160,180,200,220].map(x => (
        <line key={`vg${x}`} x1={x} y1="0" x2={x} y2="140" stroke="rgba(196,30,58,0.1)" strokeWidth="0.5" />
      ))}
      {[20,40,60,80,100,120].map(y => (
        <line key={`hg${y}`} x1="0" y1={y} x2="240" y2={y} stroke="rgba(196,30,58,0.1)" strokeWidth="0.5" />
      ))}
      {/* Rooms */}
      <rect x="20"  y="20"  width="60" height="40" fill="rgba(196,30,58,0.12)" stroke="rgba(196,30,58,0.5)" strokeWidth="1" />
      <rect x="160" y="20"  width="55" height="45" fill="rgba(196,30,58,0.08)" stroke="rgba(196,30,58,0.4)" strokeWidth="1" />
      <rect x="20"  y="90"  width="50" height="35" fill="rgba(196,30,58,0.08)" stroke="rgba(196,30,58,0.4)" strokeWidth="1" />
      <rect x="165" y="88"  width="55" height="36" fill="rgba(196,30,58,0.08)" stroke="rgba(196,30,58,0.35)" strokeWidth="1" />
      {/* Central room */}
      <rect x="96"  y="52"  width="48" height="36" fill="rgba(196,30,58,0.18)" stroke="rgba(196,30,58,0.7)" strokeWidth="1" />
      {/* Corridors */}
      <rect x="80"  y="37"  width="16" height="6"  fill="rgba(196,30,58,0.12)" stroke="none" />
      <rect x="160" y="63"  width="16" height="6"  fill="rgba(196,30,58,0.12)" stroke="none" />
      <rect x="120" y="88"  width="6"  height="16" fill="rgba(196,30,58,0.12)" stroke="none" />
      <rect x="64"  y="88"  width="6"  height="16" fill="rgba(196,30,58,0.12)" stroke="none" />
      {/* Player dot */}
      <circle cx="120" cy="70" r="4" fill="#c41e3a" opacity="0.9" />
      <circle cx="120" cy="70" r="7" fill="none" stroke="#c41e3a" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DeviceStackVisual() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true" className="w-full h-full">
      {/* Desktop frame */}
      <rect x="15"  y="20"  width="210" height="90" rx="4" fill="rgba(79,70,229,0.06)" stroke="rgba(79,70,229,0.4)" strokeWidth="1" />
      <rect x="15"  y="20"  width="210" height="12" rx="4" fill="rgba(79,70,229,0.12)" stroke="rgba(79,70,229,0.4)" strokeWidth="1" />
      <circle cx="25" cy="26" r="2.5" fill="rgba(245,240,232,0.2)" />
      <circle cx="33" cy="26" r="2.5" fill="rgba(245,240,232,0.2)" />
      <circle cx="41" cy="26" r="2.5" fill="rgba(245,240,232,0.2)" />
      {/* Content bars inside desktop */}
      <rect x="28" y="44" width="60" height="5"  rx="2" fill="rgba(79,70,229,0.35)" />
      <rect x="28" y="55" width="95" height="3"  rx="1.5" fill="rgba(245,240,232,0.1)" />
      <rect x="28" y="62" width="75" height="3"  rx="1.5" fill="rgba(245,240,232,0.08)" />
      <rect x="28" y="69" width="85" height="3"  rx="1.5" fill="rgba(245,240,232,0.08)" />
      {/* Tablet frame */}
      <rect x="145" y="36" width="50" height="65" rx="4" fill="rgba(79,70,229,0.05)" stroke="rgba(79,70,229,0.35)" strokeWidth="0.8" />
      <rect x="155" y="44" width="30" height="4"  rx="1.5" fill="rgba(79,70,229,0.3)" />
      <rect x="155" y="52" width="22" height="2.5" rx="1" fill="rgba(245,240,232,0.08)" />
      <rect x="155" y="58" width="26" height="2.5" rx="1" fill="rgba(245,240,232,0.06)" />
      {/* Mobile frame */}
      <rect x="200" y="50" width="28" height="50" rx="4" fill="rgba(79,70,229,0.05)" stroke="rgba(79,70,229,0.3)" strokeWidth="0.8" />
      <circle cx="214" cy="57" r="2"  fill="rgba(79,70,229,0.3)" />
      <rect x="206" y="63" width="16" height="2.5" rx="1" fill="rgba(79,70,229,0.25)" />
      <rect x="206" y="69" width="12" height="2.5" rx="1" fill="rgba(245,240,232,0.07)" />
      {/* Stand */}
      <rect x="95"  y="110" width="50" height="5"  fill="rgba(79,70,229,0.2)" />
      <rect x="80"  y="115" width="80" height="3"  rx="1" fill="rgba(79,70,229,0.15)" />
    </svg>
  );
}

function NodeGraphVisual() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true" className="w-full h-full">
      {/* Connection lines */}
      <line x1="120" y1="70" x2="40"  y2="35"  stroke="rgba(96,165,250,0.3)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="120" y1="70" x2="200" y2="35"  stroke="rgba(96,165,250,0.3)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="120" y1="70" x2="40"  y2="105" stroke="rgba(96,165,250,0.25)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="120" y1="70" x2="200" y2="105" stroke="rgba(96,165,250,0.25)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="40"  y1="35" x2="200" y2="35"  stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" strokeDasharray="3 4" />
      <line x1="40"  y1="105" x2="200" y2="105" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" strokeDasharray="3 4" />
      {/* Center node */}
      <circle cx="120" cy="70" r="16" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.6)" strokeWidth="1" />
      <circle cx="120" cy="70" r="8"  fill="rgba(96,165,250,0.25)" />
      <text x="120" y="74" textAnchor="middle" fill="rgba(96,165,250,0.8)" fontSize="7" fontFamily="monospace">API</text>
      {/* Outer nodes */}
      {[
        { cx: 40,  cy: 35,  label: "DB" },
        { cx: 200, cy: 35,  label: "UI" },
        { cx: 40,  cy: 105, label: "Auth" },
        { cx: 200, cy: 105, label: "CDN" },
      ].map(({ cx, cy, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="14" fill="rgba(96,165,250,0.07)" stroke="rgba(96,165,250,0.4)" strokeWidth="0.8" />
          <text x={cx} y={cy + 3} textAnchor="middle" fill="rgba(96,165,250,0.7)" fontSize="7" fontFamily="monospace">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function WaveformVisual() {
  const heights = [18, 32, 48, 38, 52, 62, 44, 58, 40, 30, 48, 36, 54, 42, 28];
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true" className="w-full h-full">
      {/* Waveform bars */}
      {heights.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 14}
          y={(140 - h) / 2}
          width={8}
          height={h}
          rx={3}
          fill={i === 6 || i === 8 ? "rgba(124,58,237,0.8)" : "rgba(124,58,237,0.3)"}
        />
      ))}
      {/* Connecting line (inference) */}
      <line x1="120" y1="100" x2="170" y2="115" stroke="rgba(124,58,237,0.4)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="120" y1="100" x2="170" y2="85"  stroke="rgba(124,58,237,0.4)" strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Output nodes */}
      <circle cx="185" cy="85"  r="12" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.5)" strokeWidth="0.8" />
      <circle cx="185" cy="115" r="12" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.5)" strokeWidth="0.8" />
      <text x="185" y="88"  textAnchor="middle" fill="rgba(124,58,237,0.75)" fontSize="7" fontFamily="monospace">ML</text>
      <text x="185" y="118" textAnchor="middle" fill="rgba(124,58,237,0.75)" fontSize="7" fontFamily="monospace">AI</text>
    </svg>
  );
}

const SPECS: Spec[] = [
  {
    id: "game",
    title: "Gameplay Engineering",
    subtitle: "Game Development",
    description: "Building complete games — from the procedural dungeon generator to the combat loop, enemy AI, and progression hooks that make players stay.",
    skills: ["Unity", "Unreal Engine", "C#", "C++", "Procedural Generation", "Enemy AI"],
    accent: "#c41e3a",
    accentRgb: "196,30,58",
    visual: <DungeonMapVisual />,
  },
  {
    id: "app",
    title: "Application Development",
    subtitle: "App Development",
    description: "Designing and shipping mobile and desktop applications with clean architecture, smooth UX, and reliable data flows across platforms.",
    skills: ["Java", "C#", "Mobile UI", "Desktop Apps", "API Integration"],
    accent: "#4f46e5",
    accentRgb: "79,70,229",
    visual: <DeviceStackVisual />,
  },
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    subtitle: "Full-Stack Web",
    description: "End-to-end web platforms: responsive frontends, backend APIs, database design, authentication — production-oriented from day one.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs", "Auth"],
    accent: "#60a5fa",
    accentRgb: "96,165,250",
    visual: <NodeGraphVisual />,
  },
  {
    id: "ai",
    title: "AI Systems",
    subtitle: "Artificial Intelligence",
    description: "Building intelligent software that adapts — recommendation engines, context-aware systems, and voice-driven interfaces that understand user intent.",
    skills: ["Python", "Machine Learning", "Context Awareness", "Voice Recognition"],
    accent: "#7c3aed",
    accentRgb: "124,58,237",
    visual: <WaveformVisual />,
  },
];

export default function Specializations() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".spec-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="specializations"
      className="py-32 md:py-44"
      style={{ backgroundColor: "#141420" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
            002 / Specializations
          </p>
          <h2
            className="font-display text-parchment max-w-2xl"
            style={{
              fontSize: "clamp(2rem, 4vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Four disciplines.
            <br />
            <span style={{ color: "rgba(245,240,232,0.35)" }}>One engineer.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SPECS.map((spec) => (
            <article
              key={spec.id}
              className="spec-card group rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "#1c1c28",
                borderColor: "rgba(245,240,232,0.07)",
              }}
            >
              {/* Visual area */}
              <div
                className="relative h-44 overflow-hidden"
                style={{ borderBottom: "1px solid rgba(245,240,232,0.06)" }}
              >
                <div
                  className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, rgba(${spec.accentRgb},0.08) 0%, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 p-4">
                  {spec.visual}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <p
                  className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: spec.accent, opacity: 0.85 }}
                >
                  {spec.subtitle}
                </p>
                <h3
                  className="font-display text-parchment text-xl mb-3"
                  style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {spec.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(245,240,232,0.45)" }}
                >
                  {spec.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {spec.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono border"
                      style={{
                        color: "rgba(245,240,232,0.4)",
                        borderColor: "rgba(245,240,232,0.07)",
                        backgroundColor: "rgba(245,240,232,0.03)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
