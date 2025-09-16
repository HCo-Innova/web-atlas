import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { useEffect } from 'react';
import { useTheme } from '../hooks';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'home' : 'inicio';
  // Indicador se movió a componente global; mantenemos sólo un oyente ligero por si se requiere a futuro

  useEffect(() => {
    const onScroll = () => {
      // Conservamos la lógica para futuras animaciones internas si hiciera falta,
      // pero ya no renderizamos el indicador aquí.
      const scrolled = window.scrollY;
      const viewport = window.innerHeight;
      const doc = document.documentElement;
      const atBottom = scrolled + viewport >= (doc.scrollHeight - 8);
      const hideBecauseScrolled = scrolled > viewport * 0.25;
      void (atBottom || hideBecauseScrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id={sectionId} className={cn(
      'scroll-target', // CSS-first scroll compensation
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      // Compensar altura del header fijo
      'pt-16 md:pt-20',
      'bg-background dark:bg-background-dark',
      isLightMode ? 'light-enhanced-bg' : '',
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(74,119,41,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(0,47,108,0.1),transparent_70%)] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.1),transparent_70%)] rounded-full"></div>
      </div>

  {/* Content */}
  <div className="container-main relative z-10 pt-4 sm:pt-0">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className={cn(
              "block text-text-primary dark:text-text-primary-dark mb-4",
              isLightMode ? "light-title-shadow" : ""
            )}>
              {t('hero.title').split(':')[0]}
            </span>
            <span className="block text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero.title').split(':')[1]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={cn(
            "text-lg sm:text-xl lg:text-2xl text-text-secondary dark:text-text-secondary-dark max-w-3xl mx-auto leading-relaxed",
            isLightMode ? "light-subtitle-shadow" : ""
          )}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="pt-5 sm:pt-8">
            <a
              href="mailto:contacto@atlasaisa.com.py"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-white !text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md btn-responsive text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t('hero.cta_button')}
            </a>
          </div>

          {/* Stats or Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 sm:pt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-dark">
                15+
              </div>
              <div className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Años de Experiencia
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-dark">
                4
              </div>
              <div className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Centros de Producción
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-dark">
                100%
              </div>
              <div className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                Calidad Certificada
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador global movido a componente dedicado */}
    </section>
  );
}
