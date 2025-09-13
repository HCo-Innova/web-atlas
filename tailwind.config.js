/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar estrategia de clase para theming
  theme: {
    // Breakpoints optimizados para mobile-first
    screens: {
      'xs': '375px',   // Móviles pequeños (iPhone SE, etc.)
      'sm': '640px',   // Móviles grandes (iPhone 12, etc.)
      'md': '768px',   // Tablets (iPad)
      'lg': '1024px',  // Laptops pequeños
      'xl': '1280px',  // Laptops grandes
      '2xl': '1536px', // Desktops
      '3xl': '1920px', // Pantallas grandes
    },
    extend: {
      colors: {
        // Paleta de colores semántica para ATLAS Agro
        primary: {
          DEFAULT: '#4A7729', // Verde principal
          dark: '#66BB6A',    // Verde claro para modo oscuro
        },
        accent: {
          DEFAULT: '#002F6C', // Azul principal
          dark: '#42A5F5',    // Azul claro para modo oscuro
        },
        background: {
          DEFAULT: '#F9FAFB', // Gris claro
          dark: '#111827',    // Gris oscuro
        },
        surface: {
          DEFAULT: '#FFFFFF', // Blanco
          dark: '#1F2937',    // Gris medio
        },
        'text-primary': {
          DEFAULT: '#1A1A1A', // Negro suave
          dark: '#F9FAFB',    // Gris claro
        },
        'text-secondary': {
          DEFAULT: '#4B5563', // Gris
          dark: '#9CA3AF',    // Gris
        },
        border: {
          DEFAULT: '#E5E7EB', // Gris claro
          dark: '#374151',    // Gris
        },
      },
      fontFamily: {
        // Fuentes del sistema de diseño
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Escala tipográfica fluida optimizada para mobile-first
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Tamaños específicos para mobile-first
        'hero-mobile': ['2rem', { lineHeight: '2.5rem' }],      // 32px
        'hero-tablet': ['3rem', { lineHeight: '3.5rem' }],      // 48px
        'hero-desktop': ['4rem', { lineHeight: '4.5rem' }],     // 64px
        'section-mobile': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        'section-tablet': ['2rem', { lineHeight: '2.5rem' }],   // 32px
        'section-desktop': ['2.5rem', { lineHeight: '3rem' }],  // 40px
      },
      spacing: {
        // Escala de espaciado consistente (múltiplos de 4px)
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Espaciado específico para mobile-first
        'mobile-padding': '1rem',      // 16px - padding móvil
        'tablet-padding': '1.5rem',    // 24px - padding tablet
        'desktop-padding': '2rem',     // 32px - padding desktop
        'mobile-section': '3rem',      // 48px - sección móvil
        'tablet-section': '4rem',      // 64px - sección tablet
        'desktop-section': '6rem',     // 96px - sección desktop
      },
      gridTemplateColumns: {
        // Grid de 12 columnas
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      boxShadow: {
        // Sombras sutiles para elevación
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
