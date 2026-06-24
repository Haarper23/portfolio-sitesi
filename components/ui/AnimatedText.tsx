"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const AnimatedText = forwardRef<HTMLElement, AnimatedTextProps>(
  ({ text, className, wordClassName, as: Tag = "div" }, ref) => {
    const words = text.split(" ");

    return (
      // @ts-expect-error — polymorphic ref
      <Tag ref={ref} className={cn("overflow-hidden", className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className={cn("word inline-block", wordClassName)}
              data-word={word}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </Tag>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
