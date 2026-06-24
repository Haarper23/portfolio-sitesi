import type { VisualAssetConfig } from "@/types";

export interface KatanaConfig {
  /** Set to true only after placing public/models/katana.glb */
  enabled: boolean;
  modelPath: string;
}

/**
 * Hero section background.
 * Change mode to "video" after placing:
 *   public/videos/samurai-hero.webm
 *   public/videos/samurai-hero.mp4
 *   public/images/samurai-hero-poster.webp
 */
export const heroBackground: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/samurai-hero.webm",
  videoMp4:  "/videos/samurai-hero.mp4",
  poster:    "/images/samurai-hero-poster.webp",
  fallbackGradient: "linear-gradient(135deg,#060610 0%,#0f0f22 45%,#140924 100%)",
  overlayOpacity: 0.6,
};

/**
 * Katana 3D model config.
 * Set enabled to true after placing public/models/katana.glb.
 */
export const katana: KatanaConfig = {
  enabled:   false,
  modelPath: "/models/katana.glb",
};

/**
 * Ronin / secondary cinematic section (future use).
 * Change mode to "video" after placing:
 *   public/videos/ronin-section.webm
 *   public/videos/ronin-section.mp4
 *   public/images/ronin-section-poster.webp
 */
export const roninSection: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/ronin-section.webm",
  videoMp4:  "/videos/ronin-section.mp4",
  poster:    "/images/ronin-section-poster.webp",
  fallbackGradient: "linear-gradient(135deg,#050508 0%,#0f0821 100%)",
  overlayOpacity: 0.55,
};
