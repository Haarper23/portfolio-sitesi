"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project, AccentColor } from "@/types";
import { cn } from "@/lib/utils";

const sizeClasses: Record<NonNullable<Project["size"]>, string> = {
  large:  "col-span-2 row-span-2 min-h-[360px]",
  medium: "col-span-1 row-span-1 min-h-[220px]",
  small:  "col-span-1 row-span-1 min-h-[200px]",
};

const glowMap: Record<AccentColor, string> = {
  crimson:  "hover:glow-crimson hover:border-crimson/25",
  indigo:   "hover:glow-indigo hover:border-indigo/25",
  violet:   "hover:glow-violet hover:border-violet/25",
  electric: "hover:glow-electric hover:border-electric/25",
  blue:     "hover:glow-blue hover:border-blue/25",
  orange:   "hover:glow-orange hover:border-orange/25",
};

const accentText: Record<AccentColor, string> = {
  crimson:  "#EBA3AD",
  indigo:   "#B6B5F7",
  violet:   "#C0A6F4",
  electric: "#9CCDFC",
  blue:     "#93B9FA",
  orange:   "#F7B281",
};

const accentLine: Record<AccentColor, string> = {
  crimson:  "bg-gradient-to-r from-transparent via-crimson to-transparent",
  indigo:   "bg-gradient-to-r from-transparent via-indigo to-transparent",
  violet:   "bg-gradient-to-r from-transparent via-violet to-transparent",
  electric: "bg-gradient-to-r from-transparent via-electric to-transparent",
  blue:     "bg-gradient-to-r from-transparent via-blue to-transparent",
  orange:   "bg-gradient-to-r from-transparent via-orange to-transparent",
};

function categoryLabel(cat: Project["category"]): string {
  switch (cat) {
    case "game":      return "Game Dev";
    case "ai":        return "AI / ML";
    case "fullstack": return "Backend";
    case "app":       return "App Dev";
    default:          return "Web";
  }
}

const statusStyle: Record<Project["status"], { dot: string; text: string }> = {
  "In Development": { dot: "#f0a830", text: "rgba(240,168,48,0.92)" },
  "Completed":      { dot: "#56c08d", text: "rgba(86,192,141,0.92)" },
  "Maintained":     { dot: "#6cb4fc", text: "rgba(108,180,252,0.92)" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const size   = project.size ?? "small";
  const accent = project.accentColor ?? "indigo";
  const isLarge = size === "large";
  const status = statusStyle[project.status];
  const links  = project.links ?? {};

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border flex flex-col h-full",
        "transition-colors duration-300 overflow-hidden",
        isLarge ? "p-7 md:p-8" : "p-6",
        sizeClasses[size],
        glowMap[accent]
      )}
      style={{
        backgroundColor: "#16161f",
        borderColor: "rgba(245,240,232,0.08)",
      }}
    >
      {/* Accent top hairline */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-90 transition-opacity duration-300",
          accentLine[accent]
        )}
      />

      {/* ── Header: category + status ───────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <span
          className="label-mono"
          style={{ color: accentText[accent] }}
        >
          {categoryLabel(project.category)}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: status.dot }}
          />
          <span style={{ color: status.text }}>{project.status}</span>
        </span>
      </div>

      {/* ── Title + kind ────────────────────────────────────────── */}
      <h3
        className={cn(
          "font-display font-bold text-parchment tracking-tight leading-tight",
          isLarge ? "text-3xl md:text-[2.6rem]" : "text-xl"
        )}
      >
        {project.title}
      </h3>
      <p
        className="font-mono text-xs mt-1.5 mb-4"
        style={{ color: accentText[accent], opacity: 0.85 }}
      >
        {project.kind}
      </p>

      {/* ── Description ──────────────────────────────────────────── */}
      <p
        className={cn(
          "leading-relaxed",
          isLarge ? "text-[0.95rem] max-w-lg" : "text-sm",
          !isLarge && "line-clamp-3"
        )}
        style={{ color: "rgba(245,240,232,0.62)" }}
      >
        {project.description}
      </p>

      {/* ── Key features (large cards) ──────────────────────────── */}
      {isLarge && project.features && (
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {project.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-[0.82rem] leading-snug"
              style={{ color: "rgba(245,240,232,0.66)" }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: accentText[accent] }}
              />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* spacer pushes the footer to the bottom for consistent rhythm */}
      <div className="flex-1" />

      {/* ── Tech chips ──────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 mt-6">
        {project.tags.slice(0, isLarge ? 6 : 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-[11px] font-mono"
            style={{
              color: "rgba(245,240,232,0.55)",
              border: "1px solid rgba(245,240,232,0.10)",
              backgroundColor: "rgba(245,240,232,0.03)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Footer: role + actions ──────────────────────────────── */}
      <div
        className="mt-5 pt-4 flex items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(245,240,232,0.07)" }}
      >
        <span
          className="font-mono text-[11px] tracking-wide"
          style={{ color: "rgba(245,240,232,0.40)" }}
        >
          {project.role}
        </span>

        <div className="flex items-center gap-2">
          {links.demo && (
            <a
              href={links.demo}
              target={links.demo.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors"
              style={{
                color: "rgba(245,240,232,0.85)",
                border: "1px solid rgba(245,240,232,0.16)",
                backgroundColor: "rgba(245,240,232,0.05)",
              }}
            >
              Live Demo
              <ArrowUpRight size={11} />
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors hover:text-parchment"
              style={{
                color: "rgba(245,240,232,0.6)",
                border: "1px solid rgba(245,240,232,0.12)",
              }}
            >
              <Code2 size={11} />
              GitHub
            </a>
          )}
          {links.caseStudy === "soon" ? (
            <span
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-mono"
              style={{ color: "rgba(245,240,232,0.3)", border: "1px dashed rgba(245,240,232,0.12)" }}
            >
              Case study soon
            </span>
          ) : links.caseStudy ? (
            <a
              href={links.caseStudy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors"
              style={{ color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.12)" }}
            >
              Case Study
              <ArrowUpRight size={11} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
