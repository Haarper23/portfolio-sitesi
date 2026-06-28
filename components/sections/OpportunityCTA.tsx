"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function OpportunityCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 30,
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
      id="opportunity"
      className="grain-overlay relative py-40 md:py-56 overflow-hidden"
      style={{ backgroundColor: "#050508" }}
    >
      {/* Large mon circle — background decoration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="absolute pointer-events-none"
        style={{
          right: "-12vw",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(400px, 50vw, 700px)",
          height: "auto",
          opacity: 0.03,
        }}
      >
        <circle cx="300" cy="300" r="290" fill="none" stroke="#f5f0e8" strokeWidth="1" />
        <circle cx="300" cy="300" r="255" fill="none" stroke="#c41e3a" strokeWidth="0.8" />
        <circle cx="300" cy="300" r="215" fill="none" stroke="#f5f0e8" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="170" fill="none" stroke="#f5f0e8" strokeWidth="0.4" />
        <circle cx="300" cy="300" r="120" fill="none" stroke="#c41e3a" strokeWidth="0.6" />
        <circle cx="300" cy="300" r="70"  fill="none" stroke="#f5f0e8" strokeWidth="0.4" />
        <line x1="10"  y1="300" x2="590" y2="300" stroke="#f5f0e8" strokeWidth="0.4" />
        <line x1="300" y1="10"  x2="300" y2="590" stroke="#f5f0e8" strokeWidth="0.4" />
      </svg>

      {/* Crimson glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: "-5%", top: "20%",
          width: "45vw", height: "60vh",
          background: "radial-gradient(ellipse at 20% 50%, rgba(196,30,58,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-20">

        <p className="cta-reveal label-mono text-crimson mb-8">
          International Opportunity
        </p>

        <h2
          className="cta-reveal font-display text-parchment mb-8 max-w-3xl"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
          }}
        >
          Looking for a team
          <br />
          <span style={{ color: "rgba(245,240,232,0.4)" }}>worth betting on.</span>
        </h2>

        <p
          className="cta-reveal text-lg leading-relaxed max-w-xl mb-12"
          style={{ color: "rgba(245,240,232,0.45)" }}
        >
          I am open to full-time roles, remote contracts, and relocation — across Europe,
          North America, and internationally. If you are building something ambitious,
          I would like to hear about it.
        </p>

        {/* Location signals */}
        <div className="cta-reveal flex flex-wrap gap-3 mb-12">
          {[
            "Europe",
            "North America",
            "Remote",
            "Willing to relocate",
          ].map((label) => (
            <span
              key={label}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono border"
              style={{
                color: "rgba(245,240,232,0.45)",
                borderColor: "rgba(245,240,232,0.1)",
                backgroundColor: "rgba(245,240,232,0.03)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="cta-reveal flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: "#c41e3a",
              color: "#f5f0e8",
              boxShadow: "0 0 30px rgba(196,30,58,0.3)",
            }}
          >
            Get in Touch
            <ArrowUpRight size={15} />
          </a>
          <a
            href="mailto:emrebkrdvc@gmail.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              color: "rgba(245,240,232,0.6)",
              border: "1px solid rgba(245,240,232,0.12)",
            }}
          >
            emrebkrdvc@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
