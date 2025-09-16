/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        // Paleta de colores semántica para ATLAS Agro con escala completa
        primary: {
          50: '#f0f9f0',
          100: '#d9f2d9',
          200: '#b3e5b3',
          300: '#8dd88d',
          400: '#66BB6A',
          500: '#4A7729', // Verde principal
          600: '#3d6322',
          700: '#305019',
          800: '#223c12',
          900: '#15280b',
          DEFAULT: '#4A7729',
          dark: '#66BB6A',
        },
        accent: {
          50: '#e8f4fd',
          100: '#bee6fb',
          200: '#7dd3f6',
          300: '#42A5F5',
          400: '#1e88e5',
          500: '#002F6C', // Azul principal
          600: '#002557',
          700: '#001b41',
          800: '#00122b',
          900: '#000914',
          DEFAULT: '#002F6C',
          dark: '#42A5F5',
        },
        background: {
          DEFAULT: '#F3F4F6', // Gris más definido
          dark: '#111827',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB', // Superficie alternativa más suave
          dark: '#1F2937',
        },
        'text-primary': {
          DEFAULT: '#111827', // Negro más fuerte
          dark: '#F9FAFB',
        },
        'text-secondary': {
          DEFAULT: '#374151', // Gris más oscuro
          dark: '#9CA3AF',
        },
        border: {
          DEFAULT: '#D1D5DB', // Borde más visible
          light: '#E5E7EB', // Borde suave como opción
          dark: '#374151',
        },
        // Grises adicionales para mejor jerarquía visual
        neutral: {
          25: '#FDFDFD',  // Blanco cálido sutil
          75: '#F6F7F8',  // Gris ultra claro  
          150: '#EAECEF', // Intermedio claro
          250: '#DDE1E6', // Intermedio medio
          350: '#BFC4CC', // Intermedio para separadores
          450: '#8B92A5', // Gris medio
          550: '#5A6570', // Intermedio oscuro
          650: '#3F4651', // Intermedio muy oscuro
        },
        
        // Estados semánticos
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        // Tamaños específicos para mobile-first
        'hero-mobile': ['2rem', { lineHeight: '2.5rem' }],      // 32px
        'hero-tablet': ['3rem', { lineHeight: '3.5rem' }],      // 48px
        'hero-desktop': ['4rem', { lineHeight: '4.5rem' }],     // 64px
        'section-mobile': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        'section-tablet': ['2rem', { lineHeight: '2.5rem' }],   // 32px
        'section-desktop': ['2.5rem', { lineHeight: '3rem' }],  // 40px
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
        // Espaciado específico para mobile-first
        'mobile-padding': '1rem',      // 16px - padding móvil
        'tablet-padding': '1.5rem',    // 24px - padding tablet
        'desktop-padding': '2rem',     // 32px - padding desktop
        'mobile-section': '3rem',      // 48px - sección móvil
        'tablet-section': '4rem',      // 64px - sección tablet
        'desktop-section': '6rem',     // 96px - sección desktop
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        // Sombras específicas del sistema de diseño
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
