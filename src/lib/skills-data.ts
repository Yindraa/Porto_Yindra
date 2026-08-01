// Skill names and logos don't change with language, so they live here
// instead of the i18n dictionaries. Only the category *labels* (in
// src/lib/i18n) are translated.

export type SkillCategoryKey =
  | "frontend"
  | "mobileDesktop"
  | "backend"
  | "database"
  | "design"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategoryKey;
  logo: string;
}

export const skillCategoryOrder: SkillCategoryKey[] = [
  "frontend",
  "mobileDesktop",
  "backend",
  "database",
  "design",
  "tools",
];

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js", category: "frontend", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "React", category: "frontend", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  {
    name: "Tailwind CSS",
    category: "frontend",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "TypeScript",
    category: "frontend",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  { name: "Framer Motion", category: "frontend", logo: "https://cdn.simpleicons.org/framer/0055FF" },

  // Mobile & Desktop
  { name: "Flutter", category: "mobileDesktop", logo: "https://cdn.simpleicons.org/flutter/02569B" },
  {
    name: "Electron",
    category: "mobileDesktop",
    logo: "https://cdn.simpleicons.org/electron/47848F",
  },
  {
    name: "React Native",
    category: "mobileDesktop",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
  },

  // Backend
  { name: "Node.js", category: "backend", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },

  // Database
  { name: "Prisma", category: "database", logo: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Supabase", category: "database", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  {
    name: "PostgreSQL",
    category: "database",
    logo: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  { name: "MySQL", category: "database", logo: "https://cdn.simpleicons.org/mysql/4479A1" },

  // Design
  { name: "Figma", category: "design", logo: "https://cdn.simpleicons.org/figma/F24E1E" },

  // Tools
  { name: "Git", category: "tools", logo: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Postman", category: "tools", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
  {
    name: "VS Code",
    category: "tools",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
  },
];
