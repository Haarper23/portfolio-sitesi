"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
{
num: "01",
title: "Understand the problem first",
body: "Every strong solution starts with a clear model of the problem — not just the requirements, but the constraints, the context, and what success actually looks like.",
accent: "#c41e3a",
},
{
num: "02",
title: "Build the right layer of abstraction",
body: "The gap between fragile code and maintainable code is usually one good abstraction. I invest time in finding the right seams before committing to a structure.",
accent: "#4f46e5",
},
{
num: "03",
title: "Make it work, then make it right",
body: "Shipping a working thing is always the first goal. Refactor into clarity and performance once the behavior is proven — not before.",
accent: "#7c3aed",
},
{
num: "04",
title: "Breadth without losing depth",
body: "Spanning multiple disciplines means staying curious — but also going deep enough to be reliable. I pursue breadth as a feature, not a shortcut.",
accent: "#60a5fa",
},
];

export default function Approach() {
const containerRef = useRef<HTMLElement>(null);

useGSAP(
() => {
gsap.from(".approach-reveal", {
opacity: 0,
y: 30,
duration: 0.7,
stagger: 0.12,
ease: "power3.out",
scrollTrigger: {
trigger: containerRef.current,
start: "top 75%",
},
});

  gsap.fromTo(
    ".approach-video",
    {
      scale: 1.06,
      yPercent: -2,
    },
    {
      scale: 1.12,
      yPercent: 2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
},
{ scope: containerRef }

);

return (
<section
ref={containerRef}
id="approach"
className="relative isolate overflow-hidden py-32 md"
style={{ backgroundColor: "#0c0c12" }}
>
<div className="absolute inset-0 -z-30 overflow-hidden" aria-hidden="true" >
<video className="approach-video h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" >
<source src="/videos/page-009-background.mp4" type="video/mp4" />
</video>
</div>

  <div
    className="pointer-events-none absolute inset-0 -z-20"
    style={{
      backgroundColor: "rgba(6, 6, 12, 0.48)",
    }}
    aria-hidden="true"
  />

  <div
    className="pointer-events-none absolute inset-0 -z-10"
    style={{
      background:
        "linear-gradient(90deg, rgba(7,7,14,0.9) 0%, rgba(7,7,14,0.68) 48%, rgba(7,7,14,0.38) 100%)",
    }}
    aria-hidden="true"
  />

  <div
    className="pointer-events-none absolute inset-0 -z-10"
    style={{
      background:
        "linear-gradient(180deg, rgba(5,5,10,0.72) 0%, transparent 25%, transparent 72%, rgba(5,5,10,0.82) 100%)",
    }}
    aria-hidden="true"
  />

  <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 xl:px-20">
    <div className="mb-16 md:mb-20">
      <p
        className="approach-reveal mb-5 select-none font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "#c41e3a" }}
      >
        009 / Development Approach
      </p>

      <h2
        className="approach-reveal max-w-xl font-display text-parchment"
        style={{
          fontSize: "clamp(2rem, 4vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        How I think
        <br />

        <span style={{ color: "rgba(245,240,232,0.58)" }}>
          about building.
        </span>
      </h2>
    </div>

    <div
      className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 md:grid-cols-2"
      style={{
        backgroundColor: "rgba(245,240,232,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      {PRINCIPLES.map(({ num, title, body, accent }) => (
        <div
          key={num}
          className="approach-reveal group p-8 transition-colors duration-300 md:p-10"
          style={{
            backgroundColor: "rgba(12,12,18,0.82)",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor =
              "rgba(20,20,32,0.9)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor =
              "rgba(12,12,18,0.82)";
          }}
        >
          <span
            className="mb-5 block font-mono text-xs"
            style={{
              color: accent,
              opacity: 1,
            }}
          >
            {num}
          </span>

          <h3
            className="mb-4 font-display text-xl text-parchment"
            style={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-relaxed"
            style={{
              color: "rgba(245,240,232,0.72)",
            }}
          >
            {body}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

);
}