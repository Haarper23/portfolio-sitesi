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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="approach"
      className="py-32 md:py-44"
      style={{ backgroundColor: "#0c0c12" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="approach-reveal font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
            007 / Development Approach
          </p>
          <h2
            className="approach-reveal font-display text-parchment max-w-xl"
            style={{
              fontSize: "clamp(2rem, 4vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            How I think
            <br />
            <span style={{ color: "rgba(245,240,232,0.3)" }}>about building.</span>
          </h2>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(245,240,232,0.06)" }}>
          {PRINCIPLES.map(({ num, title, body, accent }) => (
            <div
              key={num}
              className="approach-reveal group p-8 md:p-10 transition-colors duration-300"
              style={{ backgroundColor: "#0c0c12" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#141420"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#0c0c12"; }}
            >
              <span
                className="font-mono text-xs mb-5 block"
                style={{ color: accent, opacity: 0.7 }}
              >
                {num}
              </span>
              <h3
                className="font-display text-parchment text-xl mb-4"
                style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(245,240,232,0.45)" }}
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
