"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project, AccentColor } from "@/types";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const sizeClasses: Record<NonNullable<Project["size"]>, string> = {
  large:  "col-span-2 row-span-2 min-h-[360px]",
  medium: "col-span-1 row-span-1 min-h-[200px]",
  small:  "col-span-1 row-span-1 min-h-[170px]",
};

const glowMap: Record<AccentColor, string> = {
  crimson:  "hover:glow-crimson hover:border-crimson/30",
  indigo:   "hover:glow-indigo hover:border-indigo/30",
  violet:   "hover:glow-violet hover:border-violet/30",
  electric: "hover:glow-electric hover:border-electric/30",
  blue:     "hover:glow-blue hover:border-blue/30",
  orange:   "hover:glow-orange hover:border-orange/30",
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
    case "fullstack": return "Full-Stack";
    case "app":       return "App Dev";
    default:          return "Web";
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  const size   = project.size ?? "small";
  const accent = project.accentColor ?? "indigo";

  return (
    <motion.article
      whileHover={{ scale: 1.012, y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border flex flex-col justify-between",
        "transition-all duration-300 cursor-pointer overflow-hidden p-6",
        sizeClasses[size],
        glowMap[accent]
      )}
      style={{
        backgroundColor: "#1c1c28",
        borderColor: "rgba(245,240,232,0.08)",
      }}
    >
      {/* Accent top line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          accentLine[accent]
        )}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <Badge color={accent} className="text-xs">
            {categoryLabel(project.category)}
          </Badge>
          {project.href && (
            <motion.span
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{ color: "rgba(245,240,232,0.5)" }}
            >
              <ArrowUpRight size={16} />
            </motion.span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold text-parchment tracking-tight leading-tight mb-3",
            size === "large" ? "text-3xl md:text-4xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "leading-relaxed",
            size === "large" ? "text-base max-w-md" : "text-sm",
            size === "small" && "line-clamp-2"
          )}
          style={{ color: "rgba(245,240,232,0.42)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.slice(0, size === "large" ? 6 : 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs font-mono border"
            style={{
              color: "rgba(245,240,232,0.35)",
              borderColor: "rgba(245,240,232,0.07)",
              backgroundColor: "rgba(245,240,232,0.025)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
