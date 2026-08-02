export interface Dictionary {
  nav: {
    about: string;
    services: string;
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
  stats: {
    projectsLabel: string;
    skillsLabel: string;
    certificatesLabel: string;
    experienceLabel: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string[];
    facts: {
      label: string;
      value: string;
    }[];
    timelineLabel: string;
    timeline: {
      id: string;
      role: string;
      company: string;
      duration: string;
      description: string[];
      skillTags: string[];
      /** Distinguishes the education entry so it can get its own icon
       * instead of the work-experience briefcase. Defaults to work. */
      type?: "work" | "education";
    }[];
  };
  services: {
    eyebrow: string;
    heading: string;
    items: {
      title: string;
      desc: string;
      relatedSkills: string[];
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
      /** Language-independent category key, used for filter matching/keying instead of the translated label. */
      categoryKey: string;
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
    categoryLabels: {
      frontend: string;
      mobileDesktop: string;
      backend: string;
      database: string;
      design: string;
      tools: string;
    };
    certificatesLabel: string;
    certificates: {
      title: string;
      issuer: string;
      date: string;
      credentialUrl: string;
    }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    localTimeLabel: string;
    orDivider: string;
    downloadCv: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorBody: string;
    };
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
