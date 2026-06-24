"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function BentoProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-header", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bento-header", start: "top 85%", once: true },
      });
      gsap.from(".bento-card", {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bento-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="grain-overlay py-32 md:py-44"
      style={{ backgroundColor: "#141420" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">

        {/* Header */}
        <div className="bento-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-crimson mb-5">
              004 / Selected Work
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
              Projects that
              <br />
              <span style={{ color: "rgba(245,240,232,0.3)" }}>ship and scale.</span>
            </h2>
          </div>
          <p
            className="text-base max-w-xs leading-relaxed"
            style={{ color: "rgba(245,240,232,0.42)" }}
          >
            A selection of work across game development, web engineering, and AI.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={[
                "bento-card",
                project.size === "large"
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                  : "col-span-1",
              ].join(" ")}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
