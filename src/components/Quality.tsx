import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui';
import { cn } from '../lib/design-system';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';

interface QualityProps {
  className?: string;
}

export function Quality({ className }: QualityProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'quality' : 'calidad';

  const title = t('quality.title');
  const intro = t('quality.intro', {
    defaultValue: t('quality.description'),
  });

  type QualityPoint = { name: string; description?: string };
  const rawPoints = i18n.getResource(i18n.language, 'translation', 'quality.quality_points');
  const points: QualityPoint[] = Array.isArray(rawPoints) ? (rawPoints as QualityPoint[]) : [];

  // Mapeo de iconos y categorías para cada punto de calidad
  const getQualityIcon = (index: number) => {
    const icons = ['🔬', '⚡', '🏆', '🏭', '🌍'];
    return icons[index] || '✅';
  };


  return (
    <section
      id={sectionId}
      className={cn(
        'scroll-target', // CSS-first scroll compensation
        'relative py-16 sm:py-20 lg:py-24',
        'bg-background dark:bg-background-dark',
        className
      )}
    >
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-16 -left-10 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark",
            isLightMode ? "light-title-shadow" : ""
          )}>
            {title}
          </h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_2px_rgba(66,165,245,0.15)]"></div>
          <p className={cn(
            "mt-6 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose",
            isLightMode ? "light-subtitle-shadow" : ""
          )}>
            {intro}
          </p>
        </div>

        {/* Puntos de calidad - Layout mejorado */}
        <div className="mt-12">
          {/* Grid principal con layout 2-3 equilibrado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Columna izquierda - Análisis y Procesos */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  {t('quality.sections.analysis')}
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-primary/60 mx-auto lg:mx-0 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {points.slice(0, 2).map((p, idx) => (
                  <Card key={idx} variant="elevated" hover className="group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Icono temático */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-2xl">{getQualityIcon(idx)}</span>
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h4 className="text-base font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                            {p.name}
                          </h4>
                          <p className="text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Columna derecha - Certificaciones */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  {t('quality.sections.certifications')}
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-accent to-accent/60 mx-auto lg:mx-0 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {points.slice(2, 5).map((p, idx) => (
                  <Card key={idx + 2} variant="elevated" hover className="group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Icono temático */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-2xl">{getQualityIcon(idx + 2)}</span>
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h4 className="text-base font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                            {p.name}
                          </h4>
                          <p className="text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Elemento destacado - Compromiso de calidad */}
          <div className="mt-12">
            <Card variant="elevated" className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 dark:border-primary-dark/20">
              <CardContent className="p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">⭐</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-3">
                    {t('quality.commitment.title')}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                    {t('quality.commitment.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quality;
