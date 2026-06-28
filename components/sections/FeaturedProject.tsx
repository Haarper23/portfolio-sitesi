"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VisualAssetSlot from "@/components/background/VisualAssetSlot";
import { aiBackground } from "@/lib/config/assets";

gsap.registerPlugin(ScrollTrigger);

const TAGS = ["Python", "Voice Interface", "Local Automation", "LLM Integration", "Desktop"];

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
      {/* Background image layer */}
      <VisualAssetSlot config={aiBackground} />

      {/* Left-side text readability gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,15,28,0.55) 0%, rgba(15,15,28,0.22) 50%, transparent 100%)",
        }}
      />

      {/* Electric glow accent */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: 0, top: "30%",
          width: "35vw", height: "40vh",
          background: "radial-gradient(ellipse at 80% 50%, rgba(108,180,252,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="fp-reveal flex items-center gap-4 mb-14">
          <p className="label-mono text-electric">003 / Featured Project</p>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#f0a830" }} />
            <span style={{ color: "rgba(240,168,48,0.92)" }}>In Development</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — content */}
          <div>
            <p
              className="fp-reveal font-mono text-[11px] tracking-[0.15em] uppercase mb-4"
              style={{ color: "rgba(240,234,216,0.42)" }}
            >
              AI · Desktop Productivity Platform
            </p>
            <h2
              className="fp-reveal font-display text-parchment mb-3"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
              }}
            >
              Toji Assistant
            </h2>
            <p
              className="fp-reveal font-mono text-xs mb-6"
              style={{ color: "rgba(108,180,252,0.85)" }}
            >
              Personal AI desktop assistant
            </p>
            <p
              className="fp-reveal prose-body mb-6"
              style={{ color: "rgba(240,234,216,0.78)", fontSize: "1.03rem" }}
            >
              An intelligent desktop platform that lives on your machine and acts on it.
              Toji takes natural voice commands, interacts directly with the local
              system, manages media and files, assists with coding, and automates
              everyday workflows — with conversation memory that carries context
              from one session to the next.
            </p>
            <p
              className="fp-reveal prose-body mb-8"
              style={{ color: "rgba(240,234,216,0.6)", fontSize: "0.95rem" }}
            >
              Built to be a genuine productivity layer over the desktop — not a chat window.
              It is aware of what you are working on and turns intent into action on the machine.
            </p>

            {/* Tags */}
            <div className="fp-reveal flex flex-wrap gap-2 mb-8">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-mono"
                  style={{
                    color: "rgba(108,180,252,0.85)",
                    border: "1px solid rgba(108,180,252,0.22)",
                    backgroundColor: "rgba(108,180,252,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key capabilities */}
            <div className="fp-reveal grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {[
                "Natural voice commands",
                "Direct local PC interaction",
                "Media management & playback control",
                "Coding assistance & file awareness",
                "Conversation memory across sessions",
                "Workflow automation",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "#6cb4fc" }}
                  />
                  <span className="text-sm" style={{ color: "rgba(240,234,216,0.74)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Meta row */}
            <div className="fp-reveal flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px]" style={{ color: "rgba(240,234,216,0.42)" }}>
              <span>Role · Solo Developer</span>
              <span style={{ color: "rgba(240,234,216,0.2)" }}>|</span>
              <span>Stack · Python · LLM APIs · System Automation</span>
            </div>
          </div>

          {/* Right — assistant console visualization */}
          <div className="fp-reveal">
            <div
              className="relative rounded-2xl overflow-hidden p-6"
              style={{
                backgroundColor: "#1a1a2c",
                border: "1px solid rgba(108,180,252,0.16)",
                boxShadow: "0 0 40px rgba(108,180,252,0.05)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-crimson/70" />
                <div className="w-2 h-2 rounded-full bg-electric/40" />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(240,234,216,0.16)" }} />
                <span
                  className="ml-2 text-[10px] font-mono tracking-widest uppercase"
                  style={{ color: "rgba(240,234,216,0.28)" }}
                >
                  toji · assistant
                </span>
              </div>

              {/* Voice command line */}
              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(108,180,252,0.6)" }}>
                  Voice Command
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 h-10 flex-1">
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
                <p className="text-xs font-mono" style={{ color: "rgba(240,234,216,0.6)" }}>
                  &ldquo;Toji, open my project and play focus music.&rdquo;
                </p>
              </div>

              {/* Resolved intent / actions */}
              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(240,234,216,0.34)" }}>
                  Actions
                </p>
                <div className="space-y-2">
                  {[
                    { action: "Launch IDE", target: "blood-protocol", state: "done", color: "rgba(86,192,141,0.9)" },
                    { action: "Resolve workspace", target: "~/dev/unity", state: "done", color: "rgba(86,192,141,0.9)" },
                    { action: "Start playback", target: "Focus · Lo-fi", state: "running", color: "rgba(108,180,252,0.9)" },
                    { action: "Recall context", target: "last session", state: "done", color: "rgba(86,192,141,0.9)" },
                  ].map(({ action, target, state, color }) => (
                    <div key={action} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-[12px] font-mono w-32 shrink-0" style={{ color: "rgba(240,234,216,0.7)" }}>
                        {action}
                      </span>
                      <span className="flex-1 text-[11px] font-mono truncate" style={{ color: "rgba(240,234,216,0.4)" }}>
                        {target}
                      </span>
                      <span className="text-[10px] font-mono uppercase" style={{ color }}>
                        {state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Context awareness */}
              <div>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(240,234,216,0.34)" }}>
                  Context
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "Active App", value: "Unity Editor", color: "rgba(108,180,252,0.12)", border: "rgba(108,180,252,0.28)" },
                    { type: "Memory", value: "12 facts retained", color: "rgba(139,68,237,0.1)", border: "rgba(139,68,237,0.28)" },
                  ].map(({ type, value, color, border }) => (
                    <div
                      key={type}
                      className="rounded-xl p-3"
                      style={{ backgroundColor: color, border: `1px solid ${border}` }}
                    >
                      <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(240,234,216,0.45)" }}>
                        {type}
                      </p>
                      <p className="text-xs font-medium" style={{ color: "rgba(240,234,216,0.85)" }}>
                        {value}
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
