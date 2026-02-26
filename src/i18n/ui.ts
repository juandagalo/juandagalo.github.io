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
    "projects.title": "Projects",
    "projects.viewAll": "View all projects",
    "blog.title": "Blog",
    "blog.readMore": "Read more",
    "about.title": "About",
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
    "projects.title": "Proyectos",
    "projects.viewAll": "Ver todos los proyectos",
    "blog.title": "Blog",
    "blog.readMore": "Leer más",
    "about.title": "Sobre mí",
    "footer.rights": "Todos los derechos reservados.",
    "lang.switch": "English",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
