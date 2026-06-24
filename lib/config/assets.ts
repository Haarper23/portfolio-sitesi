import type { VisualAssetConfig } from "@/types";

export interface KatanaConfig {
/** Set to true only after placing public/models/katana.glb */
enabled: boolean;
modelPath: string;
}

/**

* Hero section background — red-moon / Japanese shrine / cyberpunk dusk.
  */
  export const heroBackground: VisualAssetConfig = {
  mode: "image",
  image: "/images/backgrounds/hero-bg-1.png",
  videoWebm: "/videos/hero-red-shrine.webm",
  videoMp4: "/videos/hero-red-shrine.mp4",
  poster: "/images/backgrounds/hero-bg-1.png",
  fallbackGradient:
  "linear-gradient(180deg, #0a0508 0%, #12051a 35%, #0d0615 65%, #060610 100%)",
  overlayOpacity: 0.48,
  };

/**

* Game development section background — shrine distortion.
  */
export const gameBackground: VisualAssetConfig = {
  mode: "image",
  image: "/images/backgrounds/project-bg-1.png",
  videoWebm: "/videos/game-shrine-distortion.webm",
  videoMp4: "/videos/game-shrine-distortion.mp4",
  poster: "/images/backgrounds/project-bg-1.png",
  fallbackGradient:
    "linear-gradient(160deg, #0a0205 0%, #150308 45%, #0d0a0c 100%)",
  overlayOpacity: 0.52,
};

/**

* AI / Media Assistant section background — blue energy abstraction.
  */
  export const aiBackground: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/media-assistant-blue-energy.webm",
  videoMp4: "/videos/media-assistant-blue-energy.mp4",
  poster: "/images/media-assistant-blue-energy.webp",
  fallbackGradient:
  "linear-gradient(135deg, #050508 0%, #060a18 50%, #07081c 100%)",
  overlayOpacity: 0.6,
  };

/**

* Katana Showcase section background.
  */
  export const katanaShowcaseBackground: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/katana-loop.webm",
  videoMp4: "/videos/katana-loop.mp4",
  poster: "/images/katana-distortion.webp",
  image: "/images/katana-fallback.webp",
  fallbackGradient:
  "linear-gradient(180deg, #050508 0%, #09061a 48%, #050508 100%)",
  overlayOpacity: 0.65,
  };

/**

* Katana 3D model config.
* Set enabled to true after placing public/models/katana.glb.
  */
  export const katana: KatanaConfig = {
  enabled: false,
  modelPath: "/models/katana.glb",
  };

/**

* Ronin / secondary cinematic section.
  */
  export const roninSection: VisualAssetConfig = {
  mode: "abstract",
  videoWebm: "/videos/ronin-section.webm",
  videoMp4: "/videos/ronin-section.mp4",
  poster: "/images/ronin-section-poster.webp",
  fallbackGradient:
  "linear-gradient(135deg, #050508 0%, #0f0821 100%)",
  overlayOpacity: 0.55,
  };
