import type { VisualAssetConfig } from "@/types";

export interface KatanaConfig {
  /** Set to true only after placing public/models/katana.glb */
  enabled: boolean;
  modelPath: string;
}

/* ─────────────────────────────────────────────────────────────────
   HERO
   Confirmed: public/images/backgrounds/hero-bg-1.png
   ───────────────────────────────────────────────────────────────── */
export const heroBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/hero-bg-1.png",
  poster:    "/images/backgrounds/hero-bg-1.png",
  videoWebm: "/videos/hero-red-shrine.webm",
  videoMp4:  "/videos/hero-red-shrine.mp4",
  fallbackGradient:
    "linear-gradient(180deg, #0a0508 0%, #12051a 35%, #0d0615 65%, #060610 100%)",
  overlayOpacity:  0.52,
  objectPosition:  "center 30%",
  slowMotion:      true,
};

/* ─────────────────────────────────────────────────────────────────
   GAME DEVELOPMENT (Specializations card)
   Confirmed: public/images/backgrounds/project-bg-1.png
   ───────────────────────────────────────────────────────────────── */
export const gameBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/project-bg-1.png",
  poster:    "/images/backgrounds/project-bg-1.png",
  videoWebm: "/videos/game-shrine-distortion.webm",
  videoMp4:  "/videos/game-shrine-distortion.mp4",
  fallbackGradient:
    "linear-gradient(160deg, #0a0205 0%, #150308 45%, #0d0a0c 100%)",
  overlayOpacity:  0.60,
  objectPosition:  "center center",
  slowMotion:      false,
};

/* ─────────────────────────────────────────────────────────────────
   AI / CONTEXT-AWARE MEDIA ASSISTANT (FeaturedProject section)
   Confirmed: public/images/backgrounds/project-bg-2.png
   ───────────────────────────────────────────────────────────────── */
export const aiBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/project-bg-2.png",
  poster:    "/images/backgrounds/project-bg-2.png",
  videoWebm: "/videos/media-assistant-blue-energy.webm",
  videoMp4:  "/videos/media-assistant-blue-energy.mp4",
  fallbackGradient:
    "linear-gradient(135deg, #050508 0%, #060a18 50%, #07081c 100%)",
  overlayOpacity:  0.68,
  objectPosition:  "center center",
  slowMotion:      false,
};

/* ─────────────────────────────────────────────────────────────────
   KATANA SHOWCASE (atmospheric layer behind SVG blade)
   Confirmed: public/images/backgrounds/katana-bg-1.png
   ───────────────────────────────────────────────────────────────── */
export const katanaShowcaseBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/katana-bg-1.png",
  poster:    "/images/backgrounds/katana-bg-1.png",
  videoWebm: "/videos/katana-loop.webm",
  videoMp4:  "/videos/katana-loop.mp4",
  fallbackGradient:
    "linear-gradient(180deg, #050508 0%, #09061a 48%, #050508 100%)",
  overlayOpacity:  0.70,
  objectPosition:  "center center",
  slowMotion:      false,
};

/* ─────────────────────────────────────────────────────────────────
   KATANA 3D MODEL
   Set enabled: true after placing public/models/katana.glb
   ───────────────────────────────────────────────────────────────── */
export const katana: KatanaConfig = {
  enabled:   false,
  modelPath: "/models/katana.glb",
};

/* ─────────────────────────────────────────────────────────────────
   ABOUT
   Confirmed: public/images/backgrounds/hero-bg-2.png
   Quieter landscape with fog — high overlayOpacity protects text
   ───────────────────────────────────────────────────────────────── */
export const aboutBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/hero-bg-2.png",
  poster:    "/images/backgrounds/hero-bg-2.png",
  fallbackGradient:
    "linear-gradient(180deg, #080812 0%, #0c0c18 50%, #0a0a14 100%)",
  overlayOpacity:  0.62,
  objectPosition:  "center center",
  slowMotion:      true,
};

/* ─────────────────────────────────────────────────────────────────
   CONTACT
   Confirmed: public/images/backgrounds/project-bg-3.png
   Very dark overlay — email remains the visual centrepiece
   ───────────────────────────────────────────────────────────────── */
export const contactBackground: VisualAssetConfig = {
  mode: "image",
  image:     "/images/backgrounds/project-bg-3.png",
  poster:    "/images/backgrounds/project-bg-3.png",
  fallbackGradient:
    "linear-gradient(180deg, #141420 0%, #0f0f1c 100%)",
  overlayOpacity:  0.82,
  objectPosition:  "center center",
  slowMotion:      false,
};

/* ─────────────────────────────────────────────────────────────────
   SECONDARY / FUTURE
   ───────────────────────────────────────────────────────────────── */
export const roninSection: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/ronin-section.webm",
  videoMp4:  "/videos/ronin-section.mp4",
  poster:    "/images/ronin-section-poster.webp",
  fallbackGradient:
    "linear-gradient(135deg, #050508 0%, #0f0821 100%)",
  overlayOpacity: 0.55,
};
