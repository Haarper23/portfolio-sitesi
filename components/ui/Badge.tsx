import { cn } from "@/lib/utils";
import type { AccentColor } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "glow";
  color?: AccentColor | "neutral";
  className?: string;
}

const colorMap: Record<AccentColor | "neutral", { default: string; glow: string }> = {
  crimson:  { default: "bg-crimson/10 text-crimson border-crimson/25",     glow: "bg-crimson/10 text-crimson border-crimson/25 glow-crimson" },
  indigo:   { default: "bg-indigo/10 text-indigo border-indigo/25",        glow: "bg-indigo/10 text-indigo border-indigo/25 glow-indigo" },
  violet:   { default: "bg-violet/10 text-violet border-violet/25",        glow: "bg-violet/10 text-violet border-violet/25 glow-violet" },
  electric: { default: "bg-electric/10 text-electric border-electric/25",  glow: "bg-electric/10 text-electric border-electric/25 glow-electric" },
  blue:     { default: "bg-blue/10 text-blue border-blue/20",              glow: "bg-blue/10 text-blue border-blue/20 glow-blue" },
  orange:   { default: "bg-orange/10 text-orange border-orange/20",        glow: "bg-orange/10 text-orange border-orange/20 glow-orange" },
  neutral:  { default: "bg-parchment/5 text-mist border-border",           glow: "bg-parchment/5 text-mist border-border" },
};

export default function Badge({
  children,
  variant = "default",
  color = "neutral",
  className,
}: BadgeProps) {
  const colors = colorMap[color];
  const colorClass = variant === "glow" ? colors.glow : colors.default;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
}
