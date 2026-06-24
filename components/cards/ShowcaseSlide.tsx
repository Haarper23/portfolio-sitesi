import { ArrowUpRight } from "lucide-react";
import type { Project, AccentColor } from "@/types";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const accentGradient: Record<AccentColor, string> = {
  crimson:  "from-crimson/8 to-transparent",
  indigo:   "from-indigo/8 to-transparent",
  violet:   "from-violet/8 to-transparent",
  electric: "from-electric/8 to-transparent",
  blue:     "from-blue/8 to-transparent",
  orange:   "from-orange/8 to-transparent",
};

const glowColor: Record<AccentColor, string> = {
  crimson:  "#c41e3a",
  indigo:   "#4f46e5",
  violet:   "#7c3aed",
  electric: "#60a5fa",
  blue:     "#60a5fa",
  orange:   "#f97316",
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

export default function ShowcaseSlide({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = project.accentColor ?? "indigo";
  const num    = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "relative flex-shrink-0 w-[90vw] lg:w-[52vw] xl:w-[42vw] h-full",
        "flex flex-col justify-between p-8 lg:p-12",
        "bg-gradient-to-br",
        accentGradient[accent]
      )}
      style={{ borderRight: "1px solid rgba(245,240,232,0.06)" }}
    >
      {/* Number + category */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-4xl font-bold select-none"
          style={{ color: "rgba(245,240,232,0.08)" }}
        >
          {num}
        </span>
        <Badge color={accent}>
          {categoryLabel(project.category)}
        </Badge>
      </div>

      {/* Content */}
      <div>
        <h3
          className="font-display text-parchment tracking-tight leading-tight mb-5"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {project.title}
        </h3>
        <p
          className="leading-relaxed max-w-md mb-7"
          style={{ color: "rgba(245,240,232,0.45)", fontSize: "0.95rem" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                color: "rgba(245,240,232,0.38)",
                borderColor: "rgba(245,240,232,0.1)",
                backgroundColor: "rgba(245,240,232,0.04)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
            style={{ color: "rgba(245,240,232,0.6)" }}
          >
            View Project
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        )}
      </div>

      {/* Decorative glow */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor[accent]} 0%, transparent 70%)`,
          opacity: 0.1,
        }}
      />
    </article>
  );
}
