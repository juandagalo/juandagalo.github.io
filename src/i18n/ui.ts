export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.about": "About",
    "hero.greeting": "Hi, I'm",
    "hero.name": "Juan David Galo",
    "hero.tagline": "Full-Stack Developer & Creative Technologist",
    "hero.cta.projects": "View my work",
    "hero.cta.contact": "Get in touch",
    "projects.title": "Projects",
    "projects.viewAll": "View all projects",
    "projects.label.featured": "Featured",
    "projects.badge.wip": "Work in Progress",
    "projects.badge.archived": "Archived",
    "blog.title": "Blog",
    "blog.readMore": "Read more",
    "blog.date": "Published on",
    "blog.tags": "Tags",
    "about.title": "About",
    "about.experience": "Experience",
    "about.skills": "Skills",
    "footer.builtWith": "Built with",
    "footer.sourceCode": "Source code",
    "footer.rights": "All rights reserved.",
    "lang.switch": "Español",
  },
  es: {
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.about": "Sobre mí",
    "hero.greeting": "Hola, soy",
    "hero.name": "Juan David Galo",
    "hero.tagline": "Desarrollador Full-Stack & Tecnólogo Creativo",
    "hero.cta.projects": "Ver mi trabajo",
    "hero.cta.contact": "Contáctame",
    "projects.title": "Proyectos",
    "projects.viewAll": "Ver todos los proyectos",
    "projects.label.featured": "Destacado",
    "projects.badge.wip": "En progreso",
    "projects.badge.archived": "Archivado",
    "blog.title": "Blog",
    "blog.readMore": "Leer más",
    "blog.date": "Publicado el",
    "blog.tags": "Etiquetas",
    "about.title": "Sobre mí",
    "about.experience": "Experiencia",
    "about.skills": "Habilidades",
    "footer.builtWith": "Hecho con",
    "footer.sourceCode": "Código fuente",
    "footer.rights": "Todos los derechos reservados.",
    "lang.switch": "English",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
