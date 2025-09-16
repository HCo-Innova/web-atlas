/**
 * ATLAS Agro - Configuración de Seguridad y Performance v2.0
 * Headers de seguridad, CSP, y optimizaciones para producción
 */

// Tipos para configuraciones
interface CSPDirectives {
  'default-src': string[];
  'script-src': string[];
  'style-src': string[];
  'font-src': string[];
  'img-src': string[];
  'connect-src': string[];
  'frame-src': string[];
  'object-src': string[];
  'base-uri'?: string[];
  'form-action'?: string[];
  'frame-ancestors'?: string[];
  'upgrade-insecure-requests'?: boolean;
}

/**
 * Content Security Policy (CSP) robusto
 * Previene XSS, clickjacking y otros ataques
 */
const cspConfig = {
  // CSP principal para producción
  production: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "https://fonts.googleapis.com",
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com",
      "https://cdn.jsdelivr.net",
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net",
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com",
      "data:",
    ],
    'img-src': [
      "'self'",
      "data:",
      "blob:",
      "https:",
    ],
    'connect-src': [
      "'self'",
      "https://api.atlasagro.com",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
    ],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': true,
  } as CSPDirectives,
  
  // CSP para desarrollo (más permisivo)
  development: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://fonts.googleapis.com",
      "http://localhost:*",
      "ws://localhost:*",
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com",
      "data:",
    ],
    'img-src': [
      "'self'",
      "data:",
      "blob:",
      "https:",
      "http://localhost:*",
    ],
    'connect-src': [
      "'self'",
      "https:",
      "http://localhost:*",
      "ws://localhost:*",
      "wss://localhost:*",
    ],
    'frame-src': ["'self'", "http://localhost:*"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': false,
  } as CSPDirectives,
};

/**
 * Security Headers para máxima protección
 */
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy-Report-Only': false,
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', '),
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

/**
 * Configuración de Cache optimizada
 */
const cacheConfig = {
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Expires': new Date(Date.now() + 31536000000).toUTCString(),
  },
  html: {
    'Cache-Control': 'public, max-age=600, must-revalidate',
    'ETag': true,
  },
  api: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  serviceWorker: {
    'Cache-Control': 'public, max-age=86400',
  }
};

/**
 * Configuración de compresión
 */
const compressionConfig = {
  brotli: {
    enabled: true,
    quality: 6,
    types: [
      'text/html',
      'text/css',
      'text/javascript',
      'application/javascript',
      'application/json',
      'text/xml',
      'application/xml',
      'image/svg+xml',
    ]
  },
  gzip: {
    enabled: true,
    level: 6,
    types: [
      'text/html',
      'text/css',
      'text/javascript',
      'application/javascript',
      'application/json',
      'text/xml',
      'application/xml',
      'image/svg+xml',
    ]
  }
};

/**
 * Configuración de Rate Limiting
 */
const rateLimitConfig = {
  general: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP',
    standardHeaders: true,
    legacyHeaders: false,
  },
  forms: {
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many form submissions',
  },
  api: {
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'API rate limit exceeded',
  }
};

/**
 * Configuración de CORS
 */
const corsConfig = {
  origin: [
    'https://atlasagro.com',
    'https://www.atlasagro.com',
    'https://staging.atlasagro.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  credentials: true,
  maxAge: 86400,
};

/**
 * Configuración de PWA
 */
const pwaConfig = {
  manifest: {
    name: 'ATLAS Agro Industrial',
    short_name: 'ATLAS Agro',
    description: 'Producción, Procesamiento y Comercialización de Semillas y Granos',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAFB',
    theme_color: '#4A7729',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['business', 'agriculture'],
    lang: 'es',
    scope: '/',
    orientation: 'portrait-primary',
  },
  
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }
        }
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }
        }
      }
    ]
  }
};

/**
 * Configuración de monitoreo y analytics
 */
const monitoringConfig = {
  performance: {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    ttfb: 600,
  },
  errorTracking: {
    enabled: true,
    sampleRate: 1.0,
    environment: 'production',
    release: '1.0.0',
  },
  analytics: {
    gtag: '',
    consentMode: true,
  }
};

/**
 * Configuración de bundle optimization
 */
const bundleConfig = {
  chunks: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      priority: 10,
    },
    common: {
      name: 'common',
      minChunks: 2,
      chunks: 'all',
      priority: 5,
      enforce: true,
    },
    react: {
      test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      name: 'react',
      chunks: 'all',
      priority: 20,
    }
  },
  optimization: {
    minimize: true,
    sideEffects: false,
    usedExports: true,
    providedExports: true,
    concatenateModules: true,
  },
  assets: {
    images: {
      quality: 85,
      progressive: true,
      optimizationLevel: 7,
    },
    fonts: {
      preload: ['Montserrat', 'Inter'],
      display: 'swap',
    }
  }
};

/**
 * Utilidad para generar CSP string
 */
export function generateCSP(config: CSPDirectives): string {
  return Object.entries(config)
    .map(([directive, values]) => {
      if (typeof values === 'boolean') {
        return values ? directive : '';
      }
      return `${directive} ${Array.isArray(values) ? values.join(' ') : values}`;
    })
    .filter(Boolean)
    .join('; ');
}

/**
 * Utilidad para generar headers de seguridad
 */
export function generateSecurityHeaders(environment: 'development' | 'production') {
  const csp = generateCSP(environment === 'production' ? cspConfig.production : cspConfig.development);
  
  return {
    ...securityHeaders,
    'Content-Security-Policy': csp,
  };
}

// Exportaciones principales
export {
  cspConfig,
  securityHeaders,
  cacheConfig,
  compressionConfig,
  rateLimitConfig,
  corsConfig,
  pwaConfig,
  monitoringConfig,
  bundleConfig,
};