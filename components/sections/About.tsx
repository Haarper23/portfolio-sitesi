"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VisualAssetSlot from "@/components/background/VisualAssetSlot";
import { aboutBackground } from "@/lib/config/assets";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="grain-overlay relative py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "#0c0c12" }}
    >
      {/* Background image layer (hero-bg-2.png) */}
      <VisualAssetSlot config={aboutBackground} />

      {/* Right-side gradient — keeps Quick Profile card legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, rgba(8,8,18,0.72) 0%, rgba(8,8,18,0.28) 52%, transparent 100%)",
        }}
      />

      {/* Subtle indigo glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "40vw", height: "50vh",
          background: "radial-gradient(ellipse at 80% 20%, rgba(79,70,229,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — text */}
          <div>
            <p className="about-reveal font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-6">
              001 / About
            </p>

            <h2
              className="about-reveal font-display text-parchment mb-8"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Engineer by study.
              <br />
              <span style={{ color: "rgba(245,240,232,0.3)" }}>Builder by nature.</span>
            </h2>

            <div
              className="about-reveal space-y-5 leading-relaxed mb-10"
              style={{ color: "rgba(245,240,232,0.52)", fontSize: "1.025rem" }}
            >
              <p>
                I am a computer engineer based in Turkey with a broad technical foundation
                spanning game development, full-stack engineering, mobile and desktop software,
                and intelligent AI systems.
              </p>
              <p>
                My focus is on building software that is purposeful and well-crafted — from
                the procedural logic of a roguelike dungeon to the data layer of a production
                web platform. I care about how things work at every level of the stack.
              </p>
              <p>
                I am actively looking for international opportunities where I can contribute
                to ambitious teams building products that matter.
              </p>
            </div>

            {/* Domain pills */}
            <div className="about-reveal flex flex-wrap gap-2">
              {[
                { label: "Game Development", cls: "text-crimson border-crimson/20 bg-crimson/5" },
                { label: "Full-Stack Web",   cls: "text-indigo border-indigo/20 bg-indigo/5" },
                { label: "AI Systems",       cls: "text-electric border-electric/20 bg-electric/5" },
                { label: "App Development",  cls: "text-violet border-violet/20 bg-violet/5" },
              ].map(({ label, cls }) => (
                <span
                  key={label}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border ${cls}`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Stats strip */}
            <div
              className="about-reveal grid grid-cols-3 gap-6 mt-10 pt-8 border-t"
              style={{ borderColor: "rgba(245,240,232,0.06)" }}
            >
              {[
                { value: "6+",  label: "Years coding"      },
                { value: "30+", label: "Projects built"    },
                { value: "4",   label: "Core disciplines"  },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="font-display text-parchment font-bold"
                    style={{ fontSize: "2rem", letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {value}
                  </div>
                  <div
                    className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1.5"
                    style={{ color: "rgba(245,240,232,0.32)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — quick facts */}
          <div className="about-reveal lg:pt-16">
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "#1c1c28",
                borderColor: "rgba(245,240,232,0.07)",
              }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8"
                style={{ color: "rgba(245,240,232,0.28)" }}
              >
                Quick Profile
              </p>

              {[
                { label: "Degree",        value: "Computer Engineering (B.Sc.)" },
                { label: "Location",      value: "Turkey" },
                { label: "Languages",     value: "Turkish (native), English (professional)" },
                { label: "Primary Stack", value: "C++, C#, Python, TypeScript" },
                { label: "Status",        value: "Open to relocation + remote" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 border-b last:border-b-0"
                  style={{ borderColor: "rgba(245,240,232,0.06)" }}
                >
                  <span
                    className="font-mono text-xs uppercase tracking-wider w-32 shrink-0"
                    style={{ color: "rgba(245,240,232,0.28)" }}
                  >
                    {label}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(245,240,232,0.68)" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
