"use client";

import type { VisualAssetConfig } from "@/types";
import CinematicBackground from "./CinematicBackground";

interface VisualAssetSlotProps {
  config: VisualAssetConfig;
  grain?: boolean;
  vignette?: boolean;
  className?: string;
  /** Pass true for above-the-fold images to enable LCP priority loading */
  priority?: boolean;
}

/**
 * Reads a VisualAssetConfig and renders the appropriate background layer.
 * - "abstract" / "model" → gradient only, no network requests
 * - "image"              → Next.js <Image> with optional slow motion
 * - "video"              → <video> with poster fallback
 */
export default function VisualAssetSlot({
  config,
  grain,
  vignette,
  className,
  priority,
}: VisualAssetSlotProps) {
  const {
    mode,
    videoWebm,
    videoMp4,
    poster,
    image,
    fallbackGradient,
    overlayOpacity,
    objectPosition,
    slowMotion,
  } = config;

  if (mode === "video") {
    return (
      <CinematicBackground
        videoWebm={videoWebm}
        videoMp4={videoMp4}
        poster={poster}
        objectPosition={objectPosition}
        fallbackGradient={fallbackGradient}
        overlayOpacity={overlayOpacity}
        grain={grain}
        vignette={vignette}
        className={className}
        priority={priority}
      />
    );
  }

  if (mode === "image") {
    return (
      <CinematicBackground
        imageSrc={image ?? poster}
        objectPosition={objectPosition}
        slowMotion={slowMotion}
        priority={priority}
        fallbackGradient={fallbackGradient}
        overlayOpacity={overlayOpacity}
        grain={grain}
        vignette={vignette}
        className={className}
      />
    );
  }

  /* "abstract" and "model" — gradient only, zero network requests */
  return (
    <CinematicBackground
      fallbackGradient={fallbackGradient}
      overlayOpacity={overlayOpacity}
      grain={grain}
      vignette={vignette}
      className={className}
    />
  );
}
