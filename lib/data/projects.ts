import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "cyber-roguelike",
    title: "Cyber Roguelike Action Game",
    description:
      "A fully playable roguelike featuring procedurally generated dungeons, reactive enemy AI, and a fluid combat system — built from scratch in Unity.",
    tags: ["Unity", "C#", "Procedural Generation", "Enemy AI", "Game Design", "Gameplay Systems"],
    category: "game",
    size: "large",
    accentColor: "crimson",
    featured: true,
  },
  {
    id: "unreal-prototype",
    title: "Unreal Engine Gameplay Prototype",
    description:
      "First-person gameplay prototype exploring environmental storytelling and movement mechanics inside Unreal Engine — implemented in Blueprints and C++.",
    tags: ["Unreal Engine", "C++", "Blueprints", "Gameplay Mechanics", "3D Environments"],
    category: "game",
    size: "medium",
    accentColor: "violet",
    featured: true,
  },
  {
    id: "ai-media-assistant",
    title: "Context-Aware Media Assistant",
    description:
      "Desktop AI assistant that reads real-time behavioral context — active apps, focus state, time of day — and delivers adaptive music and film recommendations via voice.",
    tags: ["Python", "Machine Learning", "Voice Recognition", "Context Awareness", "Desktop"],
    category: "ai",
    size: "medium",
    accentColor: "electric",
    featured: true,
  },
  {
    id: "community-hub",
    title: "Community Hub Mobile App",
    description:
      "Android community app with user-focused flows — post discovery, group interaction, and profile management — backed by REST API integration and local SQLite storage.",
    tags: ["Java", "Android", "REST API", "SQLite", "Mobile UI"],
    category: "app",
    size: "small",
    accentColor: "indigo",
  },
  {
    id: "spring-boot-system",
    title: "Spring Boot Backend System",
    description:
      "Layered REST API backend in Java and Spring Boot — clean separation of concerns, SQL data persistence, and conventional endpoint design.",
    tags: ["Java", "Spring Boot", "REST API", "SQL", "Backend Architecture"],
    category: "fullstack",
    size: "small",
    accentColor: "orange",
  },
  {
    id: "desktop-app",
    title: "Desktop Application",
    description:
      "Cross-platform desktop app with a native-feeling UI — local data management, system tray integration, and persistent user configuration.",
    tags: ["C#", ".NET", "Desktop UI", "Local Storage", "System Integration"],
    category: "app",
    size: "small",
    accentColor: "blue",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
