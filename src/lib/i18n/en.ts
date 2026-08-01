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
    heading: "Building complete solutions.",
    body: [
      "Hello! I'm a fresh graduate and Software Engineer highly enthusiastic about full-stack development. To me, building software isn't just writing lines of code - it's about creating complete solutions, from intuitive UI/UX and responsive interfaces to reliable backend and database architecture.",
      "For my thesis, I built **Eco-Quest** - a location-based, gamified mobile app that encourages youth in Manado to report illegal waste dumping through geotagged photos and community cleanup missions. I've also led the development of a village profile platform for **Desa Leilem**'s digitalization program, built an interactive AI chatbot interface for **SPARK** at Techofest, and completed a professional internship at **Bank SulutGo** designing a web-based attendance and reporting system.",
      "Outside of coursework, I like exploring mobile development with **Flutter**, and I keep performance and clean architecture at the center of everything I build - from the first line of code to the final deploy.",
    ],
    facts: [
      { label: "Location", value: "Manado, North Sulawesi" },
      { label: "Focus", value: "Web, mobile & desktop" },
      { label: "Currently", value: "Fresh Graduate & Software Engineer" },
    ],
  },
  projects: {
    eyebrow: "Projects",
    heading: "Selected work.",
    filterAll: "All",
    featuredLabel: "Featured Project",
    statusLabels: {
      live: "Live",
      inProgress: "In Progress",
    },
    items: [
      {
        id: "eco-quest",
        title: "Eco-Quest",
        category: "Mobile App",
        image: "/proyek/p6-1.jpeg",
        gallery: ["/proyek/p6-2.jpeg", "/proyek/p6-3.jpeg"],
        description:
          "A gamified, location-based mobile app for reporting illegal waste dumping in Manado. Combines GPS-tagged reports, community cleanup missions, and a virtual tree that grows with real-world contributions.",
        tags: [
          "Flutter",
          "Next.js",
          "Supabase",
          "PostgreSQL",
          "Google Maps API",
        ],
        status: "live",
        featured: true,
        githubUrl: "https://github.com/Yindraa/TA_Eco-Quest.git",
      },
      {
        id: "minutscape",
        title: "MINUTscape",
        category: "Web App",
        image: "/proyek/p5-1.jpeg",
        gallery: ["/proyek/p5-2.jpeg", "/proyek/p5-3.jpeg"],
        description:
          "A comprehensive digital tourism platform for exploring and booking destinations in North Minahasa. Features an end-to-end reservation system, environmental issue reporting, and a real-time admin dashboard.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        status: "live",
        githubUrl: "https://github.com/Yindraa/Wisata_Minut.git",
        liveUrl: "https://wisata-minut.vercel.app/",
      },
      {
        id: "desa-leilem",
        title: "Desa Leilem Profile",
        category: "Web App",
        image: "/about/leilem-1.jpeg",
        gallery: ["/about/leilem-1.jpeg", "/about/leilem-2.jpeg"],
        description:
          "A digital village profile website promoting tourism potential and local MSME product catalogs, built as part of a village digitalization program.",
        tags: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
        status: "live",
        githubUrl: "https://github.com/Yindraa/website_kkt.git",
        liveUrl: "https://website-desa-leilem.vercel.app/",
      },
      {
        id: "spark",
        title: "SPARK AI Platform",
        category: "AI Platform",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
        ],
        description:
          "An educational generative AI platform developed for Techofest. Features an interactive intelligent chatbot and a modern, responsive interface.",
        tags: ["Next.js", "OpenAI API", "Tailwind", "React"],
        status: "completed",
        githubUrl:
          "https://github.com/UNSRAT-IT-Community/front-end-spark-2024.git",
      },
      {
        id: "jte-management",
        title: "JTE Management System",
        category: "Web App",
        image: "/about/jte-4.jpeg",
        gallery: [
          "/proyek/p2-1.jpeg",
          "/proyek/p2-2.jpeg",
          "/proyek/p2-3.jpeg",
        ],
        description:
          "An academic information system for classroom scheduling and booking. Features multi-user roles, schedule conflict validation, and a rating system.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Role-Based Auth"],
        status: "completed",
        githubUrl: "https://github.com/rafalino26/framework-project.git",
      },
      {
        id: "restomanager",
        title: "RestoManager Desktop",
        category: "Desktop App",
        image: "/about/jte-1.jpeg",
        gallery: ["/about/jte-2.jpeg", "/about/jte-3.jpeg"],
        description:
          "A desktop-based cashier and restaurant management app. Supports 3 roles (Admin, Chef, Waiter) to synchronize orders from kitchen to payment.",
        tags: ["Electron", "React", "Node.js", "MySQL"],
        status: "completed",
        githubUrl: "https://github.com/Yindraa/FE_Projek-Desktop.git",
      },
    ],
  },
  skills: {
    eyebrow: "Skills",
    heading: "Tools of the craft.",
    groups: [
      {
        category: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "Go"],
      },
      {
        category: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Backend",
        items: ["Node.js", "PostgreSQL", "Redis", "REST / gRPC"],
      },
      { category: "Tooling", items: ["Docker", "CI/CD", "Git", "Testing"] },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something worth using.",
    body: "Placeholder - a short line inviting people to reach out, plus your preferred channel.",
    links: [
      { label: "Email", href: "mailto:madenarayindra23@gmail.com" },
      { label: "GitHub", href: "https://github.com/Yindraa" },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/made-narayindra-10aa24244",
      },
    ],
  },
  footer: {
    builtWith: "Built with Next.js & Framer Motion.",
    rights: "All rights reserved.",
  },
};
