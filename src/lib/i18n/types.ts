export interface Dictionary {
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    status: string;
    role: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string[];
    facts: {
      label: string;
      value: string;
    }[];
  };
  projects: {
    eyebrow: string;
    heading: string;
    filterAll: string;
    featuredLabel: string;
    statusLabels: {
      live: string;
      inProgress: string;
    };
    items: {
      id: string;
      title: string;
      category: string;
      description: string;
      image: string;
      gallery: string[];
      tags: string[];
      status: "completed" | "in-progress" | "live";
      featured?: boolean;
      githubUrl?: string;
      liveUrl?: string;
    }[];
  };
  skills: {
    eyebrow: string;
    heading: string;
    groups: {
      category: string;
      items: string[];
    }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    links: {
      label: string;
      href: string;
    }[];
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}
