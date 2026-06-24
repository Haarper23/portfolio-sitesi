import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionLabel({ children, className, dark }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-mono font-medium uppercase tracking-widest",
        dark ? "text-inverse/40" : "text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
