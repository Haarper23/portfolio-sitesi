import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  color?: "blue" | "violet" | "orange";
  className?: string;
}

const colorMap = {
  blue: "text-blue",
  violet: "text-violet",
  orange: "text-orange",
};

export default function GlowText({ children, color = "blue", className }: GlowTextProps) {
  return (
    <span className={cn(colorMap[color], "relative", className)}>
      {children}
    </span>
  );
}
