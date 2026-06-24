"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShowcaseSlide from "@/components/cards/ShowcaseSlide";
import { projects } from "@/lib/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track   = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        });

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="grain-overlay overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#141420" }}
    >
      {/* Fixed header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 xl:px-20 pt-12 pb-6 flex items-end justify-between"
        style={{ borderBottom: "1px solid rgba(245,240,232,0.06)" }}
      >
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-2">
            007 / Case Studies
          </p>
          <p
            className="text-sm font-mono"
            style={{ color: "rgba(245,240,232,0.25)" }}
          >
            {projects.length} projects · scroll to explore
          </p>
        </div>
        <h2
          className="font-display text-parchment text-2xl md:text-3xl tracking-tight hidden md:block"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          All Work
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="horizontal-track h-full pt-28"
        style={{ willChange: "transform" }}
      >
        {/* Intro slide */}
        <div
          className="flex-shrink-0 w-[30vw] lg:w-[22vw] h-full flex flex-col justify-end pb-20 px-10 lg:px-16"
          style={{ borderRight: "1px solid rgba(245,240,232,0.05)" }}
        >
          <span
            className="font-display font-extrabold leading-none select-none block"
            style={{ fontSize: "8vw", color: "rgba(245,240,232,0.03)" }}
          >
            WORK
          </span>
        </div>

        {/* All project slides */}
        {projects.map((project, i) => (
          <ShowcaseSlide key={project.id} project={project} index={i} />
        ))}

        {/* End slide */}
        <div
          className="flex-shrink-0 w-[25vw] lg:w-[18vw] h-full flex flex-col items-start justify-end pb-20 px-10"
          style={{ borderRight: "1px solid rgba(245,240,232,0.05)" }}
        >
          <a
            href="#skills"
            className="text-sm font-mono transition-colors"
            style={{ color: "rgba(245,240,232,0.3)" }}
          >
            Continue ↓
          </a>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "rgba(245,240,232,0.06)" }}
      >
        <div
          ref={progressRef}
          className="h-full transition-none"
          style={{ width: "0%", backgroundColor: "#c41e3a" }}
        />
      </div>

      {/* Mobile fallback — vertical stack */}
      <div className="lg:hidden absolute inset-0 pt-28 pb-4 overflow-y-auto px-6">
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "#1c1c28",
                borderColor: "rgba(245,240,232,0.07)",
              }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2"
                style={{ color: "rgba(245,240,232,0.3)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display text-parchment font-bold mb-2"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-3 line-clamp-3"
                style={{ color: "rgba(245,240,232,0.42)" }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono border"
                    style={{
                      color: "rgba(245,240,232,0.35)",
                      borderColor: "rgba(245,240,232,0.08)",
                      backgroundColor: "rgba(245,240,232,0.025)",
                    }}
                  >
                    {tag}
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
