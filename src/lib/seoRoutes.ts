/**
 * Configuración de rutas SEO profesionales multiidioma
 * Siguiendo mejores prácticas de la industria
 */

export interface RouteConfig {
  id: string;
  es: string;
  en: string;
  sectionId: {
    es: string;
    en: string;
  }; // IDs de sección DOM bilingües para SEO
  seoTitle: {
    es: string;
    en: string;
  };
  seoDescription: {
    es: string;
    en: string;
  };
}

/**
 * Rutas SEO-friendly por idioma
 * URLs completamente traducidas según mejores prácticas
 */
export const SEO_ROUTES: Record<string, RouteConfig> = {
  home: {
    id: 'home',
    es: '/',
    en: '/',
    sectionId: {
      es: 'inicio',
      en: 'home'
    },
    seoTitle: {
      es: 'ATLAS Agro Industrial - Semillas y Granos de Calidad',
      en: 'ATLAS Agro Industrial - Quality Seeds and Grains'
    },
    seoDescription: {
      es: 'Producción, procesamiento y comercialización de semillas y granos. Chía y sésamo orgánico de alta calidad.',
      en: 'Production, processing and marketing of seeds and grains. High quality organic chia and sesame.'
    }
  },
  about: {
    id: 'about',
    es: '/nosotros',
    en: '/about-us',
    sectionId: {
      es: 'nosotros',
      en: 'about-us'
    },
    seoTitle: {
      es: 'Nosotros - ATLAS Agro Industrial',
      en: 'About Us - ATLAS Agro Industrial'
    },
    seoDescription: {
      es: 'Conoce nuestra misión, visión y valores. Líderes en producción y comercialización de semillas.',
      en: 'Learn about our mission, vision and values. Leaders in seed production and marketing.'
    }
  },
  products: {
    id: 'products',
    es: '/productos',
    en: '/products',
    sectionId: {
      es: 'productos',
      en: 'products'
    },
    seoTitle: {
      es: 'Productos - Chía y Sésamo Orgánico | ATLAS Agro',
      en: 'Products - Organic Chia and Sesame | ATLAS Agro'
    },
    seoDescription: {
      es: 'Chía y sésamo orgánico y convencional de la más alta calidad. Certificaciones internacionales.',
      en: 'Highest quality organic and conventional chia and sesame. International certifications.'
    }
  },
  process: {
    id: 'process',
    es: '/proceso',
    en: '/process',
    sectionId: {
      es: 'proceso',
      en: 'process'
    },
    seoTitle: {
      es: 'Proceso y Operaciones - ATLAS Agro Industrial',
      en: 'Process and Operations - ATLAS Agro Industrial'
    },
    seoDescription: {
      es: 'Conoce nuestro proceso de producción y centros de acopio en Paraguay.',
      en: 'Learn about our production process and collection centers in Paraguay.'
    }
  },
  quality: {
    id: 'quality',
    es: '/calidad',
    en: '/quality',
    sectionId: {
      es: 'calidad',
      en: 'quality'
    },
    seoTitle: {
      es: 'Calidad y Certificaciones - ATLAS Agro Industrial',
      en: 'Quality and Certifications - ATLAS Agro Industrial'
    },
    seoDescription: {
      es: 'Certificaciones orgánicas, HACCP e ISO. Análisis en laboratorios europeos.',
      en: 'Organic, HACCP and ISO certifications. Analysis in European laboratories.'
    }
  },
  contact: {
    id: 'contact',
    es: '/contacto',
    en: '/contact',
    sectionId: {
      es: 'contacto',
      en: 'contact'
    },
    seoTitle: {
      es: 'Contacto - ATLAS Agro Industrial',
      en: 'Contact - ATLAS Agro Industrial'
    },
    seoDescription: {
      es: 'Contáctanos para más información sobre nuestros productos y servicios.',
      en: 'Contact us for more information about our products and services.'
    }
  }
};

/**
 * Mapeo inverso: de URL a ID de ruta
 */
export const URL_TO_ROUTE: Record<string, string> = {};

// Construir mapeo inverso
Object.entries(SEO_ROUTES).forEach(([routeId, config]) => {
  URL_TO_ROUTE[config.es] = routeId;
  URL_TO_ROUTE[config.en] = routeId;
});

/**
 * Utilidades para manejo de rutas SEO
 */
export const routeUtils = {
  /**
   * Obtiene la configuración de ruta por ID
   */
  getRoute: (routeId: string): RouteConfig | undefined => {
    return SEO_ROUTES[routeId];
  },

  /**
   * Obtiene la URL para un idioma específico
   */
  getLocalizedPath: (routeId: string, language: 'es' | 'en'): string => {
    const route = SEO_ROUTES[routeId];
    return route ? route[language] : '/';
  },

  /**
   * Obtiene el ID de ruta desde una URL
   */
  getRouteIdFromPath: (path: string): string => {
    // Remover idioma del path
    const cleanPath = path.replace(/^\/(es|en)/, '') || '/';
    return URL_TO_ROUTE[cleanPath] || 'home';
  },

  /**
   * Construye URL completa con idioma
   */
  buildURL: (routeId: string, language: 'es' | 'en'): string => {
    const route = SEO_ROUTES[routeId];
    if (!route) return `/${language}`;
    
    const localPath = route[language];
    return localPath === '/' ? `/${language}` : `/${language}${localPath}`;
  },

  /**
   * Obtiene el ID de sección DOM para scroll según idioma
   */
  getSectionId: (routeId: string, language: 'es' | 'en' = 'es'): string => {
    const route = SEO_ROUTES[routeId];
    return route ? route.sectionId[language] : (language === 'en' ? 'home' : 'inicio');
  },

  /**
   * Obtiene metadatos SEO para una ruta
   */
  getSEOMetadata: (routeId: string, language: 'es' | 'en') => {
    const route = SEO_ROUTES[routeId];
    if (!route) return null;

    return {
      title: route.seoTitle[language],
      description: route.seoDescription[language]
    };
  }
};