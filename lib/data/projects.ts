import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "cyber-roguelike",
    title: "Cyber Roguelike Action Game",
    description:
      "A dark, combat-focused roguelite featuring procedural encounters, enemy AI, progression systems, atmospheric environments, and responsive gameplay systems built in Unity.",
    tags: ["Unity", "C#", "Procedural Generation", "Enemy AI", "Combat Systems", "Roguelite Progression", "Gameplay Systems"],
    category: "game",
    size: "large",
    accentColor: "crimson",
    featured: true,
  },
  {
    id: "unreal-prototype",
    title: "Unreal Engine Gameplay Prototype",
    description:
      "A gameplay-focused Unreal Engine prototype exploring environment interaction, character systems, AI behavior, movement mechanics, and scalable Blueprint and C++ architecture.",
    tags: ["Unreal Engine", "C++", "Blueprints", "Gameplay Systems", "Environment Interaction", "AI Behavior"],
    category: "game",
    size: "medium",
    accentColor: "violet",
    featured: true,
  },
  {
    id: "ai-media-assistant",
    title: "Context-Aware Media Assistant",
    description:
      "An intelligent desktop assistant that analyzes real-time user activity, active applications, focus state, and behavioral context to deliver adaptive music and film recommendations through natural voice commands.",
    tags: ["Python", "Machine Learning", "Recommendation Systems", "Voice Recognition", "Context Awareness", "Desktop Application", "Real-Time Processing"],
    category: "ai",
    size: "medium",
    accentColor: "electric",
    featured: true,
  },
  {
    id: "community-hub",
    title: "Community Hub Mobile App",
    description:
      "A mobile community platform designed for clear, accessible interaction with shared content and community-oriented features — built on structured Android flows, API integration, and maintainable mobile architecture.",
    tags: ["Java", "Android", "Mobile Application", "API Integration", "UI Architecture", "Local Data", "Authentication"],
    category: "app",
    size: "small",
    accentColor: "indigo",
    featured: true,
  },
  {
    id: "spring-boot-system",
    title: "Spring Boot Backend System",
    description:
      "A layered Java backend built with Spring Boot — modular services, RESTful endpoints, request validation, exception handling, and persistent data management through controller-service-repository separation.",
    tags: ["Java", "Spring Boot", "REST API", "SQL", "Backend Development", "Database Integration", "Layered Architecture"],
    category: "fullstack",
    size: "small",
    accentColor: "orange",
    featured: true,
  },
  {
    id: "desktop-app",
    title: "Desktop Application",
    description:
      "A cross-platform desktop application with a native-feeling interface — local data management, persistent user configuration, system integration, and structured application architecture in C# and .NET.",
    tags: ["C#", ".NET", "Desktop UI", "Local Storage", "System Integration"],
    category: "app",
    size: "small",
    accentColor: "blue",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
