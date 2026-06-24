"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TAGS = ["Python", "Machine Learning", "Voice Recognition", "Context Awareness", "Desktop"];

const BAR_HEIGHTS = [22, 36, 52, 44, 60, 70, 54, 66, 48, 38, 56, 42, 62, 50, 34];

export default function FeaturedProject() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fp-reveal", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1,
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
      id="featured"
      className="grain-overlay relative py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "#0f0f1c" }}
    >
      {/* Electric glow accent */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: 0, top: "30%",
          width: "35vw", height: "40vh",
          background: "radial-gradient(ellipse at 80% 50%, rgba(108,180,252,0.09) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <p className="fp-reveal font-mono text-xs tracking-[0.2em] uppercase text-electric mb-14">
          003 / Featured Project
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — content */}
          <div>
            <p
              className="fp-reveal font-mono text-[11px] tracking-[0.15em] uppercase mb-4"
              style={{ color: "rgba(240,234,216,0.38)" }}
            >
              AI · Desktop Application
            </p>
            <h2
              className="fp-reveal font-display text-parchment mb-6"
              style={{
                fontSize: "clamp(1.9rem, 3.5vw, 3.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Context-Aware
              <br />
              Media Assistant
            </h2>
            <p
              className="fp-reveal leading-relaxed mb-6"
              style={{ color: "rgba(240,234,216,0.72)", fontSize: "1.025rem" }}
            >
              An intelligent desktop assistant that reads real-time behavioral signals — active
              applications, time of day, focus state — and uses them to deliver personalized
              music and film recommendations through natural voice commands.
            </p>
            <p
              className="fp-reveal leading-relaxed mb-8"
              style={{ color: "rgba(240,234,216,0.58)", fontSize: "0.95rem" }}
            >
              The system builds a running behavioral context model, updating recommendations
              as the user&apos;s environment and activity evolve throughout the day.
            </p>

            {/* Tags */}
            <div className="fp-reveal flex flex-wrap gap-2 mb-8">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-mono border"
                  style={{
                    color: "rgba(108,180,252,0.8)",
                    borderColor: "rgba(108,180,252,0.22)",
                    backgroundColor: "rgba(108,180,252,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key capabilities */}
            <div className="fp-reveal space-y-3">
              {[
                "Real-time desktop activity monitoring",
                "Behavioral context inference engine",
                "Voice command interface",
                "Adaptive music + film recommendation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "#6cb4fc" }}
                  />
                  <span className="text-sm" style={{ color: "rgba(240,234,216,0.72)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visualization */}
          <div className="fp-reveal">
            <div
              className="relative rounded-2xl overflow-hidden p-6"
              style={{
                backgroundColor: "#22223a",
                border: "1px solid rgba(108,180,252,0.16)",
                boxShadow: "0 0 48px rgba(108,180,252,0.06)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-crimson/70" />
                <div className="w-2 h-2 rounded-full bg-electric/40" />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(240,234,216,0.16)" }} />
                <span
                  className="ml-2 text-[10px] font-mono tracking-widest uppercase"
                  style={{ color: "rgba(240,234,216,0.25)" }}
                >
                  context-monitor.py
                </span>
              </div>

              {/* Voice waveform */}
              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(108,180,252,0.58)" }}>
                  Voice Input
                </p>
                <div className="flex items-center gap-1 h-16">
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 6 || i === 8 || i === 10
                          ? "rgba(108,180,252,0.85)"
                          : "rgba(108,180,252,0.25)",
                        animation: `wave ${0.8 + i * 0.07}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Context signals */}
              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(240,234,216,0.32)" }}>
                  Behavioral Context
                </p>
                <div className="space-y-2">
                  {[
                    { key: "Active App",  value: "Code Editor",   strength: 85, color: "rgba(108,180,252,0.75)" },
                    { key: "Focus State", value: "Deep Work",     strength: 72, color: "rgba(139,68,237,0.75)"  },
                    { key: "Time Signal", value: "Late Evening",  strength: 60, color: "rgba(212,32,64,0.65)"   },
                    { key: "Session",     value: "4h 12m active", strength: 90, color: "rgba(108,180,252,0.55)" },
                  ].map(({ key, value, strength, color }) => (
                    <div key={key} className="flex items-center gap-3">
                      <span
                        className="text-[11px] font-mono w-24 shrink-0"
                        style={{ color: "rgba(240,234,216,0.42)" }}
                      >
                        {key}
                      </span>
                      <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: "rgba(240,234,216,0.07)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${strength}%`, backgroundColor: color }}
                        />
                      </div>
                      <span className="text-[11px] font-mono w-24 text-right" style={{ color: "rgba(240,234,216,0.55)" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(240,234,216,0.32)" }}>
                  Recommendations
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "Music", suggestion: "Lo-fi / Focus", color: "rgba(108,180,252,0.14)", border: "rgba(108,180,252,0.28)" },
                    { type: "Film",  suggestion: "Sci-Fi / Noir", color: "rgba(139,68,237,0.12)",  border: "rgba(139,68,237,0.28)" },
                  ].map(({ type, suggestion, color, border }) => (
                    <div
                      key={type}
                      className="rounded-xl p-3"
                      style={{ backgroundColor: color, border: `1px solid ${border}` }}
                    >
                      <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(240,234,216,0.42)" }}>
                        {type}
                      </p>
                      <p className="text-xs font-medium" style={{ color: "rgba(240,234,216,0.82)" }}>
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.5); }
          to   { transform: scaleY(1);   }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation:"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
