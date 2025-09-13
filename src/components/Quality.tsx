import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';

interface QualityProps {
  className?: string;
}

export function Quality({ className }: QualityProps) {
  const { t, i18n } = useTranslation();

  const title = t('quality.title');
  const intro = t('quality.intro', {
    defaultValue: t('quality.description'),
  });

  type QualityPoint = { name: string; description?: string };
  const rawPoints = i18n.getResource(i18n.language, 'translation', 'quality.quality_points');
  const points: QualityPoint[] = Array.isArray(rawPoints) ? (rawPoints as QualityPoint[]) : [];

  return (
    <section
      id="calidad"
      className={cn(
        'relative py-16 sm:py-20 lg:py-24',
        'bg-background dark:bg-background-dark',
        'scroll-mt-24 sm:scroll-mt-28',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark">
            {title}
          </h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_2px_rgba(66,165,245,0.15)]"></div>
          <p className="mt-6 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose">
            {intro}
          </p>
        </div>

        {/* Puntos de calidad */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {points.map((p, idx) => (
            <Card key={idx} variant="elevated" hover>
              <CardHeader title={p.name} />
              <CardContent>
                <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                  {p.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Quality;
