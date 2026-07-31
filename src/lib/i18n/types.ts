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
    body: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    items: {
      title: string;
      description: string;
      tags: string[];
      href: string;
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
