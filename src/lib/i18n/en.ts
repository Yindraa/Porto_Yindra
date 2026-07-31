import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    status: "Available for work",
    role: "Full-Stack Developer",
    subtitle:
      "I build fast, performance-focused web and mobile experiences with Next.js and Flutter.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Get in Touch",
  },
  about: {
    eyebrow: "About",
    heading: "A short, honest introduction.",
    body: "Placeholder bio — two or three sentences about your background, what you focus on as an engineer, and the kind of problems you enjoy solving. Keep it understated and specific rather than a list of buzzwords.",
  },
  projects: {
    eyebrow: "Projects",
    heading: "Selected work.",
    items: [
      {
        title: "Project One",
        description:
          "A short, concrete description of the problem this project solved and the impact it had.",
        tags: ["TypeScript", "Next.js", "PostgreSQL"],
        href: "#",
      },
      {
        title: "Project Two",
        description:
          "A short, concrete description of the problem this project solved and the impact it had.",
        tags: ["React", "Node.js", "Redis"],
        href: "#",
      },
      {
        title: "Project Three",
        description:
          "A short, concrete description of the problem this project solved and the impact it had.",
        tags: ["Go", "gRPC", "Kubernetes"],
        href: "#",
      },
    ],
  },
  skills: {
    eyebrow: "Skills",
    heading: "Tools of the craft.",
    groups: [
      { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go"] },
      { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "REST / gRPC"] },
      { category: "Tooling", items: ["Docker", "CI/CD", "Git", "Testing"] },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something worth using.",
    body: "Placeholder — a short line inviting people to reach out, plus your preferred channel.",
    links: [
      { label: "Email", href: "mailto:madenarayindra23@gmail.com" },
      { label: "GitHub", href: "https://github.com/Yindraa" },
      { label: "LinkedIn", href: "https://linkedin.com/in/made-narayindra-10aa24244" },
    ],
  },
  footer: {
    builtWith: "Built with Next.js & Framer Motion.",
    rights: "All rights reserved.",
  },
};
