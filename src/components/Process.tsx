import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';
import ParaguayMapLight from '../assets/Mapa-light.png';
import ParaguayMapDark from '../assets/Mapa-dark.png';

interface ProcessProps {
  className?: string;
}

export function Process({ className }: ProcessProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'process' : 'proceso';

  const title = t('process.title');
  const intro = t('process.intro', { defaultValue: '' });
  const centersTitle = t('process.production_centers.title');
  const facilitiesTitle = t('process.facilities.title');
  const collectionName = t('process.facilities.collection_center.name', { defaultValue: '' });
  const collectionLocation = t('process.facilities.collection_center.location', { defaultValue: '' });
  const processingName = t('process.facilities.processing_center.name', { defaultValue: '' });
  const processingLocation = t('process.facilities.processing_center.location', { defaultValue: '' });

  return (
    <section id={sectionId} className={cn(
      'scroll-target', // CSS-first scroll compensation
      'relative py-16 sm:py-20 lg:py-24',
      'bg-background dark:bg-background-dark',
      className
    )}>
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        <div className="max-w-3xl">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark",
            isLightMode ? "light-title-shadow" : ""
          )}>
            {title}
          </h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          {intro && (
            <p className={cn(
              "mt-6 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose",
              isLightMode ? "light-subtitle-shadow" : ""
            )}>
              {intro}
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa de Paraguay - Centros de Producción */}
          <Card variant="elevated" hover className="overflow-hidden">
            <CardHeader title={centersTitle} />
            <CardContent className="p-0">
              <div className="relative">
                {/* Mapa de Paraguay */}
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={theme === THEMES.dark ? ParaguayMapDark : ParaguayMapLight}
                    alt="Mapa de Paraguay - Centros de Producción"
                    className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
                  />
                  {/* Overlay sutil para destacar el mapa en hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Acopio y Procesamiento */}
          <Card variant="elevated" hover>
            <CardHeader title={facilitiesTitle} />
            <CardContent className="space-y-6">
              {collectionName && (
                <div className="p-4 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5 hover:bg-background/80 dark:hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary dark:text-text-primary-dark">{collectionName}</p>
                      {collectionLocation && (
                        <p className="text-sm mt-1 text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                          {collectionLocation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {processingName && (
                <div className="p-4 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5 hover:bg-background/80 dark:hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">P</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary dark:text-text-primary-dark">{processingName}</p>
                      {processingLocation && (
                        <p className="text-sm mt-1 text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                          {processingLocation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Process;
