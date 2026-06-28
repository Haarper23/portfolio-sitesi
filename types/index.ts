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

export type ProjectStatus = "In Development" | "Completed" | "Maintained";

export interface ProjectLinks {
  demo?: string;
  github?: string;
  /** When "soon", renders a muted, non-interactive "Case study in progress" affordance */
  caseStudy?: string | "soon";
}

export interface Project {
  id: string;
  /** Product-style name, e.g. "Blood Protocol" */
  title: string;
  /** One-line classifier under the name, e.g. "Unity Roguelite" */
  kind: string;
  description: string;
  /** Headline technologies shown as chips */
  tags: string[];
  /** Notable systems / capabilities — bulleted on larger cards */
  features?: string[];
  role: string;
  status: ProjectStatus;
  category: "game" | "web" | "ai" | "app" | "fullstack";
  size?: "large" | "medium" | "small";
  accentColor?: AccentColor;
  featured?: boolean;
  links?: ProjectLinks;
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
