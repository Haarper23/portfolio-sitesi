import type { Project } from "@/types";

const GITHUB = "https://github.com/Haarper23";

/* ── Selected Work ───────────────────────────────────────────────────
   The Toji Assistant deep-dive lives in the dedicated Featured section,
   so it is intentionally not repeated here — every project appears once. */
export const projects: Project[] = [
  {
    id: "blood-protocol",
    title: "Blood Protocol",
    kind: "Unity Roguelite",
    description:
      "A dark, combat-driven roguelite built in Unity. Each run assembles a new dungeon from hand-authored rooms, then layers enemy AI, weighty melee combat, and meta-progression on top — a complete gameplay loop engineered from the ground up.",
    role: "Solo Developer",
    status: "In Development",
    tags: ["Unity", "C#", "Procedural Generation", "Enemy AI", "Gameplay Systems"],
    features: [
      "Procedural dungeon generation from authored room sets",
      "Enemy AI with behaviour trees & aggro states",
      "Responsive real-time melee combat",
      "Run-based progression & persistent meta-upgrades",
      "Multi-phase boss encounters",
      "Save / load and run-state persistence",
    ],
    category: "game",
    size: "large",
    accentColor: "crimson",
    featured: true,
    links: { github: GITHUB, caseStudy: "soon" },
  },
  {
    id: "cra-minidesk",
    title: "CRA MiniDesk",
    kind: "Computer Repair & Service Management",
    description:
      "A service management application built for computer repair businesses to manage customers, repair orders, devices, technicians, pricing, and service workflows from a single platform.",
    role: "Solo Developer",
    status: "In Development",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API", "Desktop UI"],
    features: [
      "Customer management",
      "Device repair tracking",
      "Repair status workflow",
      "Technician management",
      "Pricing & payment records",
      "Secure backend architecture",
      "Dashboard & reporting",
    ],
    category: "fullstack",
    size: "medium",
    accentColor: "indigo",
    featured: true,
    links: { github: GITHUB, caseStudy: "soon" },
  },
  {
    id: "unreal-prototype",
    title: "Unreal Gameplay Prototype",
    kind: "Unreal Engine · C++",
    description:
      "A gameplay-focused Unreal Engine prototype exploring character movement, AI behaviour, and environment interaction across a hybrid C++ and Blueprint architecture.",
    role: "Solo Developer",
    status: "In Development",
    tags: ["Unreal Engine", "C++", "Blueprints", "Gameplay Systems"],
    features: [
      "Character movement & traversal systems",
      "AI behaviour and perception",
      "Interactable environment objects",
      "C++ core with Blueprint-exposed tuning",
    ],
    category: "game",
    size: "medium",
    accentColor: "violet",
    featured: true,
    links: { github: GITHUB, caseStudy: "soon" },
  },
  {
    id: "community-hub",
    title: "Community Hub Mobile",
    kind: "Android · Java",
    description:
      "A native Android community app with structured navigation flows, API-backed content, and a maintainable, layered mobile architecture.",
    role: "Solo Developer",
    status: "In Development",
    tags: ["Java", "Android", "REST", "SQLite"],
    features: [
      "Authenticated user sessions",
      "API-driven content feeds",
      "Local persistence with SQLite",
    ],
    category: "app",
    size: "small",
    accentColor: "blue",
    featured: true,
    links: { github: GITHUB },
  },
  {
    id: "desktop-suite",
    title: "Desktop Productivity Suite",
    kind: "C# · .NET",
    description:
      "A cross-platform desktop application with a native-feeling interface, persistent local configuration, and structured system integration in C# and .NET.",
    role: "Solo Developer",
    status: "In Development",
    tags: ["C#", ".NET", "Desktop UI", "Local Storage"],
    features: [
      "Native-feeling desktop interface",
      "Persistent user configuration",
      "OS-level system integration",
    ],
    category: "app",
    size: "small",
    accentColor: "orange",
    featured: true,
    links: { github: GITHUB },
  },
  {
    id: "webgl-portfolio",
    title: "WebGL Portfolio Experience",
    kind: "Next.js · WebGL",
    description:
      "This site — an interactive WebGL portfolio built on Next.js and React Three Fiber, with a real-time 3D scene, scroll-driven choreography, and a hand-tuned cinematic visual system.",
    role: "Solo Developer",
    status: "Completed",
    tags: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "Three.js"],
    features: [
      "Real-time WebGL scene (React Three Fiber)",
      "Scroll-driven animation choreography",
      "Performance-conscious asset loading",
    ],
    category: "web",
    size: "small",
    accentColor: "electric",
    featured: true,
    links: { demo: "/", github: GITHUB },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
