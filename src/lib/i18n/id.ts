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
    heading: "Membangun solusi yang utuh.",
    body: [
      "Halo! Saya lulusan baru sekaligus Software Engineer yang sangat antusias dengan dunia full-stack development. Bagi saya, membangun perangkat lunak bukan sekadar merangkai baris kode, melainkan tentang menciptakan solusi utuh - mulai dari desain UI/UX yang intuitif, antarmuka yang responsif, hingga arsitektur backend dan database yang andal.",
      "Untuk tugas akhir, saya membangun **Eco-Quest** - aplikasi mobile berbasis gamifikasi dan lokasi yang mendorong partisipasi remaja di Kota Manado melaporkan sampah liar lewat foto berkoordinat GPS dan misi pembersihan komunitas. Saya juga pernah memimpin pengembangan platform profil desa untuk program digitalisasi **Desa Leilem**, membangun antarmuka chatbot AI interaktif untuk **SPARK** di ajang Techofest, serta menyelesaikan magang profesional di **Bank SulutGo** dengan merancang sistem presensi dan pelaporan berbasis web.",
      "Di luar itu, saya senang mengeksplorasi pengembangan mobile dengan **Flutter**, dan selalu menjadikan performa serta arsitektur yang bersih sebagai fokus utama dalam setiap yang saya bangun - dari baris kode pertama sampai deploy terakhir.",
    ],
    facts: [
      { label: "Lokasi", value: "Manado, Sulawesi Utara" },
      { label: "Fokus", value: "Web, mobile & desktop" },
      { label: "Saat ini", value: "Lulusan Baru & Software Engineer" },
    ],
  },
  projects: {
    eyebrow: "Proyek",
    heading: "Karya pilihan.",
    filterAll: "Semua",
    featuredLabel: "Proyek Unggulan",
    statusLabels: {
      live: "Live",
      inProgress: "Dalam Pengerjaan",
    },
    items: [
      {
        id: "eco-quest",
        title: "Eco-Quest",
        category: "Aplikasi Mobile",
        image: "/proyek/p6-1.jpeg",
        gallery: ["/proyek/p6-2.jpeg", "/proyek/p6-3.jpeg"],
        description:
          "Aplikasi mobile berbasis gamifikasi dan lokasi untuk pelaporan sampah liar di Manado. Menggabungkan laporan berkoordinat GPS, misi pembersihan komunitas, dan pohon virtual yang tumbuh seiring kontribusi nyata.",
        tags: ["Flutter", "Next.js", "Supabase", "PostgreSQL", "Google Maps API"],
        status: "live",
        featured: true,
        githubUrl: "https://github.com/Yindraa/TA_Eco-Quest.git",
      },
      {
        id: "minutscape",
        title: "MINUTscape",
        category: "Aplikasi Web",
        image: "/proyek/p5-1.jpeg",
        gallery: ["/proyek/p5-2.jpeg", "/proyek/p5-3.jpeg"],
        description:
          "Platform pariwisata digital komprehensif untuk eksplorasi dan pemesanan destinasi di Minahasa Utara. Dilengkapi sistem reservasi end-to-end, pelaporan fasilitas lingkungan, serta dashboard admin real-time.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        status: "live",
        githubUrl: "https://github.com/Yindraa/Wisata_Minut.git",
        liveUrl: "https://wisata-minut.vercel.app/",
      },
      {
        id: "desa-leilem",
        title: "Profil Desa Leilem",
        category: "Aplikasi Web",
        image: "/about/leilem-1.jpeg",
        gallery: ["/about/leilem-1.jpeg", "/about/leilem-2.jpeg"],
        description:
          "Website profil desa digital untuk mempromosikan potensi pariwisata dan katalog produk UMKM lokal, dibangun sebagai bagian dari program digitalisasi desa.",
        tags: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
        status: "live",
        githubUrl: "https://github.com/Yindraa/website_kkt.git",
        liveUrl: "https://website-desa-leilem.vercel.app/",
      },
      {
        id: "spark",
        title: "SPARK AI Platform",
        category: "Platform AI",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
        ],
        description:
          "Platform AI Generatif edukatif yang dikembangkan untuk event Techofest. Memiliki fitur chatbot cerdas interaktif dan antarmuka modern yang responsif.",
        tags: ["Next.js", "OpenAI API", "Tailwind", "React"],
        status: "completed",
        githubUrl: "https://github.com/UNSRAT-IT-Community/front-end-spark-2024.git",
      },
      {
        id: "jte-management",
        title: "Sistem Manajemen JTE",
        category: "Aplikasi Web",
        image: "/about/jte-4.jpeg",
        gallery: ["/proyek/p2-1.jpeg", "/proyek/p2-2.jpeg", "/proyek/p2-3.jpeg"],
        description:
          "Sistem informasi akademik untuk penjadwalan dan peminjaman ruang kelas. Dilengkapi fitur multi-role, validasi jadwal bentrok, dan sistem rating.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Role-Based Auth"],
        status: "completed",
        githubUrl: "https://github.com/rafalino26/framework-project.git",
      },
      {
        id: "restomanager",
        title: "RestoManager Desktop",
        category: "Aplikasi Desktop",
        image: "/about/jte-1.jpeg",
        gallery: ["/about/jte-2.jpeg", "/about/jte-3.jpeg"],
        description:
          "Aplikasi kasir dan manajemen restoran berbasis desktop. Mendukung 3 role (Admin, Chef, Pelayan) untuk sinkronisasi pesanan dari dapur hingga pembayaran.",
        tags: ["Electron", "React", "Node.js", "MySQL"],
        status: "completed",
        githubUrl: "https://github.com/Yindraa/FE_Projek-Desktop.git",
      },
    ],
  },
  skills: {
    eyebrow: "Keahlian",
    heading: "Perkakas keahlian.",
    groups: [
      {
        category: "Bahasa Pemrograman",
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
      { category: "Perkakas", items: ["Docker", "CI/CD", "Git", "Testing"] },
    ],
  },
  contact: {
    eyebrow: "Kontak",
    heading: "Mari membangun sesuatu yang berarti.",
    body: "Placeholder - kalimat singkat mengundang orang untuk menghubungi, beserta kanal yang kamu utamakan.",
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
    builtWith: "Dibuat dengan Next.js & Framer Motion.",
    rights: "Seluruh hak cipta dilindungi.",
  },
};
