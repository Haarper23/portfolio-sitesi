export type AccentColor = "crimson" | "indigo" | "violet" | "electric" | "blue" | "orange";

export type AssetMode = "abstract" | "image" | "video" | "model";

export interface VisualAssetConfig {
  mode: AssetMode;
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;
  image?: string;
  modelPath?: string;
  fallbackGradient?: string;
  overlayOpacity?: number;
  /** CSS object-position for image/video mode (e.g. "center 30%") */
  objectPosition?: string;
  /** Enable slow scale/drift CSS animation on the image layer */
  slowMotion?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "game" | "web" | "ai" | "app" | "fullstack";
  size?: "large" | "medium" | "small";
  accentColor?: AccentColor;
  featured?: boolean;
  href?: string;
  image?: string;
  video?: string;
  poster?: string;
  modelPath?: string;
}

export interface SkillGroup {
  domain: string;
  accentColor: AccentColor;
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Specialization {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  accentColor: "crimson" | "indigo" | "violet" | "electric";
}
