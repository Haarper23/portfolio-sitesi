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
        scrollTrigger: {
          trigger: ".bento-header",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".bento-card", {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
          once: true,
        },
      });

      gsap.fromTo(
        ".projects-background-video",
        {
          scale: 1.04,
          yPercent: -2,
        },
        {
          scale: 1.1,
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="grain-overlay relative isolate overflow-hidden py-32 md:py-44"
      style={{ backgroundColor: "#141420" }}
    >
      {/* Video background */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 overflow-hidden"
        aria-hidden="true"
      >
        <video
          className="projects-background-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/page-004-background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* General dark overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundColor: "rgba(7, 7, 14, 0.58)",
        }}
        aria-hidden="true"
      />

      {/* Readability gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,16,0.82) 0%, rgba(10,10,20,0.6) 36%, rgba(8,8,16,0.72) 72%, rgba(6,6,14,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Colored atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(196,30,58,0.16), transparent 34%), radial-gradient(circle at 82% 20%, rgba(79,70,229,0.14), transparent 36%), radial-gradient(circle at 72% 80%, rgba(124,58,237,0.1), transparent 34%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 xl:px-20">
        {/* Header */}
        <div className="bento-header mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 label-mono text-crimson">
              004 / Selected Work
            </p>

            <h2
              className="font-display text-parchment"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              Real products,
              <br />

              <span style={{ color: "rgba(245,240,232,0.5)" }}>
                built end to end.
              </span>
            </h2>
          </div>

          <p
            className="max-w-xs prose-body"
            style={{ color: "rgba(245,240,232,0.7)" }}
          >
            Games, backends, applications and the web — each shipped solo, with the
            systems and trade-offs that came with it.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="bento-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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