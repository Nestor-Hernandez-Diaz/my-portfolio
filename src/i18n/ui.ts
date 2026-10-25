// Textos de interfaz por idioma. Español vive en "/" e inglés en "/en/".
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Texto que cambia según idioma dentro de los arrays de datos de cada componente
export type Localized = Record<Lang, string>;

export const ui = {
  es: {
    'meta.title': 'Nestor Hernández Díaz — Estudiante de Ingeniería de Sistemas e Informática',
    'meta.description':
      'Portafolio de Nestor Hernández Díaz, estudiante de IX ciclo de Ingeniería de Sistemas e Informática en la UNSM (Tarapoto, Perú). Proyectos de software, IoT y análisis de datos.',

    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contáctame',
    'nav.openMenu': 'Abrir menú',
    'nav.homeLabel': 'Inicio — Nestor Hernández Díaz',
    'lang.switchLabel': 'Switch to English',

    'hero.badge': 'Disponible para proyectos — 2026',
    'hero.bio':
      'Estudiante de IX ciclo de Ingeniería de Sistemas e Informática en la Universidad Nacional de San Martín. Me interesan el desarrollo de software, las bases de datos y el análisis de datos. Hoy hago mis prácticas en Grupo Cobys, creando herramientas de calidad de datos para revistas científicas.',
    'hero.ctaProjects': 'Ver Proyectos',
    'hero.ctaCv': 'Descargar CV',
    'hero.cvLabel': 'Descargar CV de Nestor Hernández Díaz',
    'hero.photoAlt': 'Nestor Hernández Díaz, estudiante de Ingeniería de Sistemas e Informática',
    'hero.chipEduLabel': 'Formación',
    'hero.chipEdu': 'Ing. de Sistemas e Informática',

    'about.eyebrow': 'Sobre mí',
    'about.title': 'Expertise & Stack Tecnológico',

    'projects.eyebrow': 'Proyectos',
    'projects.title': 'Ingeniería & Diseño',
    'projects.viewAll': 'Ver todos los proyectos',
    'projects.site': 'Ver sitio',
    'projects.repo': 'Ver repositorio',

    'contact.eyebrow': 'Contacto',
    'contact.title1': 'Construyamos algo',
    'contact.title2': 'extraordinario.',
    'contact.lead':
      'Disponible para proyectos freelance, prácticas y oportunidades laborales. Si tienes un desafío interesante, hablemos.',
    'contact.name': 'Nombre',
    'contact.namePh': 'Tu nombre completo',
    'contact.email': 'Email',
    'contact.emailPh': 'tu@correo.com',
    'contact.subject': 'Asunto',
    'contact.subjectPh': '¿En qué te puedo ayudar?',
    'contact.message': 'Mensaje',
    'contact.messagePh': 'Cuéntame sobre tu proyecto, idea o consulta...',
    'contact.submit': 'Iniciar Conversación',
    'contact.sending': 'Enviando...',
    'contact.success': '✓ Mensaje enviado exitosamente. ¡Te contactaré pronto!',
    'contact.error': '✕ Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.',

    'footer.rights': 'Todos los derechos reservados.',
    'footer.built': 'Construido con',
  },
  en: {
    'meta.title': 'Nestor Hernández Díaz — Systems and Computer Engineering Student',
    'meta.description':
      'Portfolio of Nestor Hernández Díaz, a ninth-semester Systems and Computer Engineering student at UNSM (Tarapoto, Peru). Software, IoT and data analysis projects.',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact me',
    'nav.openMenu': 'Open menu',
    'nav.homeLabel': 'Home — Nestor Hernández Díaz',
    'lang.switchLabel': 'Cambiar a Español',

    'hero.badge': 'Open to projects — 2026',
    'hero.bio':
      'Ninth-semester Systems and Computer Engineering student at Universidad Nacional de San Martín. I am interested in software development, databases and data analysis. I am currently an intern at Grupo Cobys, building data quality tools for scientific journals.',
    'hero.ctaProjects': 'View Projects',
    'hero.ctaCv': 'Download CV',
    'hero.cvLabel': 'Download Nestor Hernández Díaz’s CV',
    'hero.photoAlt': 'Nestor Hernández Díaz, Systems and Computer Engineering student',
    'hero.chipEduLabel': 'Education',
    'hero.chipEdu': 'Systems and Computer Engineering',

    'about.eyebrow': 'About me',
    'about.title': 'Expertise & Tech Stack',

    'projects.eyebrow': 'Projects',
    'projects.title': 'Engineering & Design',
    'projects.viewAll': 'See all projects',
    'projects.site': 'Visit site',
    'projects.repo': 'View repository',

    'contact.eyebrow': 'Contact',
    'contact.title1': 'Let’s build something',
    'contact.title2': 'extraordinary.',
    'contact.lead':
      'Open to freelance projects, internships and job opportunities. If you have an interesting challenge, let’s talk.',
    'contact.name': 'Name',
    'contact.namePh': 'Your full name',
    'contact.email': 'Email',
    'contact.emailPh': 'you@email.com',
    'contact.subject': 'Subject',
    'contact.subjectPh': 'How can I help you?',
    'contact.message': 'Message',
    'contact.messagePh': 'Tell me about your project, idea or question...',
    'contact.submit': 'Start a Conversation',
    'contact.sending': 'Sending...',
    'contact.success': '✓ Message sent successfully. I’ll get back to you soon!',
    'contact.error': '✕ Something went wrong sending your message. Please try again.',

    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

// Ruta raíz de cada idioma: "/" para español, "/en/" para inglés
export function homePath(lang: Lang) {
  return lang === defaultLang ? '/' : `/${lang}/`;
}
