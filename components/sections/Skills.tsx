"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/lib/data/skills";
import type { AccentColor } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// Text colors: accent hue lightened with white (40% accent / 60% white) for WCAG AA on #0c0c12
const chipTextColor: Record<AccentColor, string> = {
  crimson:  "#EEAAB3",
  indigo:   "#BCBBF9",
  violet:   "#C4AAF6",
  electric: "#A0D0FD",
  blue:     "#99BDFB",
  orange:   "#FBB88A",
};

const chipBorderClass: Record<AccentColor, string> = {
  crimson:  "border-crimson/65  bg-crimson/12  hover:border-crimson/85  hover:bg-crimson/22",
  indigo:   "border-indigo/65   bg-indigo/12   hover:border-indigo/85   hover:bg-indigo/22",
  violet:   "border-violet/65   bg-violet/12   hover:border-violet/85   hover:bg-violet/22",
  electric: "border-electric/65 bg-electric/12 hover:border-electric/85 hover:bg-electric/22",
  blue:     "border-blue/65     bg-blue/12     hover:border-blue/85     hover:bg-blue/22",
  orange:   "border-orange/65   bg-orange/12   hover:border-orange/85   hover:bg-orange/22",
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
      // fromTo() guarantees opacity always ends at exactly 1.
      // clearProps:"all" removes GSAP inline styles so CSS stays in full control after animation.
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "all",
          scrollTrigger: { trigger: ".skills-header", start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".skills-group",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "all",
          scrollTrigger: { trigger: ".skills-groups", start: "top 80%", once: true },
        }
      );

      ScrollTrigger.batch(".skill-tag", {
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { opacity: 0, y: 12, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.03, ease: "power2.out", clearProps: "all" }
          );
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

              {/* Category heading — identical style across all groups */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentDot[group.accentColor]}`} />
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(245,240,232,0.90)" }}
                >
                  {group.domain}
                </span>
              </div>

              {/* Chips — every chip in a category receives the exact same class + color */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-tag px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-default ${chipBorderClass[group.accentColor]}`}
                    style={{ color: chipTextColor[group.accentColor] }}
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
