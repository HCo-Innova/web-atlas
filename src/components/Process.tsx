import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';

interface ProcessProps {
  className?: string;
}

export function Process({ className }: ProcessProps) {
  const { t, i18n } = useTranslation();

  const title = t('process.title');
  const intro = t('process.intro', { defaultValue: '' });
  const centersTitle = t('process.production_centers.title');
  const centers = (i18n.getResource(i18n.language, 'translation', 'process.production_centers.locations') as string[]) || [];
  const facilitiesTitle = t('process.facilities.title');
  const collectionName = t('process.facilities.collection_center.name', { defaultValue: '' });
  const collectionLocation = t('process.facilities.collection_center.location', { defaultValue: '' });
  const processingName = t('process.facilities.processing_center.name', { defaultValue: '' });
  const processingLocation = t('process.facilities.processing_center.location', { defaultValue: '' });

  return (
    <section id="proceso" className={cn(
      'relative py-16 sm:py-20 lg:py-24',
      'bg-surface dark:bg-surface-dark',
      'scroll-mt-24 sm:scroll-mt-28',
      className
    )}>
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark">
            {title}
          </h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          {intro && (
            <p className="mt-6 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Centros de Producción */}
          <Card variant="elevated" hover className="lg:col-span-2">
            <CardHeader title={centersTitle} />
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {centers.map((name, idx) => (
                  <li key={idx} className="p-3 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5">
                    <span className="font-medium text-text-primary dark:text-text-primary-dark">{name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Acopio y Procesamiento */}
          <Card variant="elevated" hover className="lg:col-span-1">
            <CardHeader title={facilitiesTitle} />
            <CardContent className="space-y-4">
              {collectionName && (
                <div className="p-3 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5">
                  <p className="font-semibold text-text-primary dark:text-text-primary-dark">{collectionName}</p>
                  {collectionLocation && (
                    <p className="text-sm mt-1 text-text-secondary dark:text-text-secondary-dark leading-relaxed">{collectionLocation}</p>
                  )}
                </div>
              )}
              {processingName && (
                <div className="p-3 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5">
                  <p className="font-semibold text-text-primary dark:text-text-primary-dark">{processingName}</p>
                  {processingLocation && (
                    <p className="text-sm mt-1 text-text-secondary dark:text-text-secondary-dark leading-relaxed">{processingLocation}</p>
                  )}
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
