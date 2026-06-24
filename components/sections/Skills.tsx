"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/lib/data/skills";
import type { AccentColor } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const accentTag: Record<AccentColor, string> = {
  crimson:  "border-crimson/35 text-crimson bg-crimson/5 hover:border-crimson/60 hover:bg-crimson/12",
  indigo:   "border-indigo/35 text-indigo bg-indigo/5 hover:border-indigo/60 hover:bg-indigo/12",
  violet:   "border-violet/35 text-violet bg-violet/5 hover:border-violet/60 hover:bg-violet/12",
  electric: "border-electric/30 text-electric bg-electric/4 hover:border-electric/55 hover:bg-electric/10",
  blue:     "border-blue/30 text-blue bg-blue/4 hover:border-blue/55 hover:bg-blue/10",
  orange:   "border-orange/30 text-orange bg-orange/4 hover:border-orange/55 hover:bg-orange/10",
};

const accentDot: Record<AccentColor, string> = {
  crimson:  "bg-crimson",
  indigo:   "bg-indigo",
  violet:   "bg-violet",
  electric: "bg-electric",
  blue:     "bg-blue",
  orange:   "bg-orange",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skills-header", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-header", start: "top 85%", once: true },
      });
      gsap.from(".skills-group", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-groups", start: "top 80%", once: true },
      });
      ScrollTrigger.batch(".skill-tag", {
        onEnter: (els) => {
          gsap.from(els, {
            opacity: 0,
            y: 12,
            scale: 0.88,
            duration: 0.3,
            stagger: 0.03,
            ease: "power2.out",
          });
        },
        once: true,
        start: "top 90%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="grain-overlay py-32 md:py-44"
      style={{ backgroundColor: "#0c0c12" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">

        {/* Header */}
        <div className="skills-header mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
            008 / Skills
          </p>
          <h2
            className="font-display text-parchment"
            style={{
              fontSize: "clamp(2rem, 4vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Tools of the trade.
          </h2>
        </div>

        {/* Groups */}
        <div className="skills-groups grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {skillGroups.map((group) => (
            <div key={group.domain} className="skills-group">
              {/* Group header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentDot[group.accentColor]}`} />
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: "rgba(245,240,232,0.65)" }}
                >
                  {group.domain}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-tag px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 cursor-default ${accentTag[group.accentColor]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
