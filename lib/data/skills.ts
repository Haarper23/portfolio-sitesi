import type { SkillGroup } from "@/types";

/* Curated, not exhaustive — only the technologies that best represent the
   actual projects on this site. Redundant or implied entries (SQL under
   PostgreSQL, auth under JWT/RBAC, GitHub under Git, etc.) are left out on
   purpose: this reads like a deliberate engineer's stack, not a checklist. */
export const skillGroups: SkillGroup[] = [
  {
    domain: "Languages",
    accentColor: "crimson",
    skills: ["C#", "C++", "Java", "Python"],
  },
  {
    domain: "Game Development",
    accentColor: "violet",
    skills: [
      "Unity",
      "Unreal Engine",
      "Gameplay Programming",
      "Enemy AI",
      "Procedural Generation",
    ],
  },
  {
    domain: "Backend",
    accentColor: "indigo",
    skills: ["Spring Boot", "REST APIs", "JWT / RBAC", "PostgreSQL"],
  },
  {
    domain: "Frontend",
    accentColor: "electric",
    skills: ["React", "Angular", "Three.js / React Three Fiber", "WebGL"],
  },
  {
    domain: "AI",
    accentColor: "blue",
    skills: [
      "LLM Integration",
      "Voice Interfaces",
      "Intelligent Agents",
      "Workflow Automation",
    ],
  },
  {
    domain: "Developer Tools",
    accentColor: "orange",
    skills: ["Git", "Docker", "Maven", "Postman", "IntelliJ IDEA", "VS Code"],
  },
];
