import type { Dictionary } from "./types";

export const id: Dictionary = {
  nav: {
    about: "Tentang",
    projects: "Proyek",
    skills: "Keahlian",
    contact: "Kontak",
  },
  hero: {
    status: "Terbuka untuk kerja sama",
    role: "Full-Stack Developer",
    subtitle:
      "Saya membangun pengalaman web dan mobile yang cepat dan berfokus pada performa, menggunakan Next.js dan Flutter.",
    ctaPrimary: "Lihat Proyek",
    ctaSecondary: "Hubungi Saya",
  },
  about: {
    eyebrow: "Tentang",
    heading: "Perkenalan singkat dan jujur.",
    body: "Bio placeholder — dua atau tiga kalimat tentang latar belakangmu, fokusmu sebagai engineer, dan jenis masalah yang senang kamu selesaikan. Buat tetap sederhana dan spesifik, bukan daftar kata kunci.",
  },
  projects: {
    eyebrow: "Proyek",
    heading: "Karya pilihan.",
    items: [
      {
        title: "Proyek Satu",
        description:
          "Deskripsi singkat dan konkret tentang masalah yang diselesaikan proyek ini serta dampaknya.",
        tags: ["TypeScript", "Next.js", "PostgreSQL"],
        href: "#",
      },
      {
        title: "Proyek Dua",
        description:
          "Deskripsi singkat dan konkret tentang masalah yang diselesaikan proyek ini serta dampaknya.",
        tags: ["React", "Node.js", "Redis"],
        href: "#",
      },
      {
        title: "Proyek Tiga",
        description:
          "Deskripsi singkat dan konkret tentang masalah yang diselesaikan proyek ini serta dampaknya.",
        tags: ["Go", "gRPC", "Kubernetes"],
        href: "#",
      },
    ],
  },
  skills: {
    eyebrow: "Keahlian",
    heading: "Perkakas keahlian.",
    groups: [
      { category: "Bahasa Pemrograman", items: ["TypeScript", "JavaScript", "Python", "Go"] },
      { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "REST / gRPC"] },
      { category: "Perkakas", items: ["Docker", "CI/CD", "Git", "Testing"] },
    ],
  },
  contact: {
    eyebrow: "Kontak",
    heading: "Mari membangun sesuatu yang berarti.",
    body: "Placeholder — kalimat singkat mengundang orang untuk menghubungi, beserta kanal yang kamu utamakan.",
    links: [
      { label: "Email", href: "mailto:madenarayindra23@gmail.com" },
      { label: "GitHub", href: "https://github.com/Yindraa" },
      { label: "LinkedIn", href: "https://linkedin.com/in/made-narayindra-10aa24244" },
    ],
  },
  footer: {
    builtWith: "Dibuat dengan Next.js & Framer Motion.",
    rights: "Seluruh hak cipta dilindungi.",
  },
};
