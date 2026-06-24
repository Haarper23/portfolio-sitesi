"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseScene = dynamic(() => import("@/components/three/ShowcaseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: "#c41e3a", animation: "pulse 2s infinite" }}
      />
    </div>
  ),
});

export default function ThreeDShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".showcase-text", {
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
      className="grain-overlay py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#050508" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* Text */}
          <div className="lg:pr-16">
            <p className="showcase-text font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
              005 / Interactive 3D
            </p>
            <h2
              className="showcase-text font-display text-parchment mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Spatial engineering.
              <br />
              <span style={{ color: "rgba(245,240,232,0.3)" }}>Visual depth.</span>
            </h2>
            <p
              className="showcase-text leading-relaxed max-w-md mb-8"
              style={{ color: "rgba(245,240,232,0.48)", fontSize: "1.025rem" }}
            >
              From HLSL shader graphs in Unity to interactive WebGL in the browser —
              spatial thinking informs every system I design. Drag the scene to explore.
            </p>
            <ul className="space-y-3">
              {[
                "Unity & HLSL shader programming",
                "React Three Fiber & Three.js",
                "Real-time graphics & performance optimization",
                "Procedural geometry & particle systems",
              ].map((item) => (
                <li
                  key={item}
                  className="showcase-text flex items-center gap-3 text-sm"
                  style={{ color: "rgba(245,240,232,0.38)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "#c41e3a" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3D canvas */}
          <div
            className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(245,240,232,0.07)" }}
          >
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, #050508 100%)",
              }}
            />
            <ShowcaseScene />
          </div>
        </div>
      </div>
    </section>
  );
}
