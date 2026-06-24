"use client";

import type { VisualAssetConfig } from "@/types";
import CinematicBackground from "./CinematicBackground";

interface VisualAssetSlotProps {
  config: VisualAssetConfig;
  grain?: boolean;
  vignette?: boolean;
  className?: string;
}

/**
 * Reads a VisualAssetConfig and renders the appropriate background layer.
 * Only passes video/poster paths to CinematicBackground when the mode
 * explicitly requests them — "abstract" and "model" never trigger media requests.
 */
export default function VisualAssetSlot({
  config,
  grain,
  vignette,
  className,
}: VisualAssetSlotProps) {
  const { mode, videoWebm, videoMp4, poster, image, fallbackGradient, overlayOpacity } = config;

  if (mode === "video") {
    return (
      <CinematicBackground
        videoWebm={videoWebm}
        videoMp4={videoMp4}
        poster={poster}
        fallbackGradient={fallbackGradient}
        overlayOpacity={overlayOpacity}
        grain={grain}
        vignette={vignette}
        className={className}
      />
    );
  }

  if (mode === "image") {
    return (
      <CinematicBackground
        poster={poster ?? image}
        fallbackGradient={fallbackGradient}
        overlayOpacity={overlayOpacity}
        grain={grain}
        vignette={vignette}
        className={className}
      />
    );
  }

  // "abstract" and "model": gradient only — no video/image network requests
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
