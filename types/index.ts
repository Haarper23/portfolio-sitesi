export type AccentColor = "crimson" | "indigo" | "violet" | "electric" | "blue" | "orange";

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
