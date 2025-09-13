import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  const { t, i18n } = useTranslation();

  // Extraemos textos del JSON de i18n con claves nuevas provistas
  const title = t('about.title');
  const content = t('about.content');

  // Para misión/visión mantenemos compatibilidad: si no existe `text`, usamos `description`
  const missionTitle = t('about.mission.title');
  const missionText = t('about.mission.text', {
    defaultValue: t('about.mission.description')
  });

  const visionTitle = t('about.vision.title');
  const visionText = t('about.vision.text', {
    defaultValue: t('about.vision.description')
  });

  // Valores como lista (items). Si no existen items, caemos a claves antiguas
  const valuesTitle = t('about.values.title');
  type ValueItem = { name: string; description?: string };
  const rawValues = i18n.getResource(i18n.language, 'translation', 'about.values.items');
  const valuesItems: ValueItem[] = Array.isArray(rawValues)
    ? (rawValues as ValueItem[])
    : [];

  const fallbackValues: ValueItem[] = [
    { name: t('about.values.honesty', { defaultValue: 'Honestidad' }), description: '' },
    { name: t('about.values.commitment', { defaultValue: 'Compromiso' }), description: '' },
    { name: t('about.values.generosity', { defaultValue: 'Generosidad' }), description: '' },
    { name: t('about.values.innovation', { defaultValue: 'Innovación' }), description: '' },
  ];

  const list = valuesItems.length ? valuesItems : fallbackValues;

  return (
    <section id="nosotros" className={cn(
      'relative py-16 sm:py-20 lg:py-24',
      'bg-surface dark:bg-surface-dark',
      // Evita que el header fijo tape el título al navegar por ancla
      'scroll-mt-24 sm:scroll-mt-28',
      className
    )}>
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark">
            {title}
          </h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_2px_rgba(66,165,245,0.15)]"></div>
          <p className="mt-6 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose">
            {content}
          </p>
        </div>

        {/* Grid principal */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Misión */}
          <Card variant="elevated" hover className="lg:col-span-1">
            <CardHeader title={missionTitle} />
            <CardContent>
              <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">{missionText}</p>
            </CardContent>
          </Card>

          {/* Visión */}
          <Card variant="elevated" hover className="lg:col-span-1">
            <CardHeader title={visionTitle} />
            <CardContent>
              <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">{visionText}</p>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card variant="elevated" hover className="lg:col-span-1">
            <CardHeader title={valuesTitle} />
            <CardContent>
              <ul className="space-y-3">
                {list.map((item, idx) => (
                  <li
                    key={idx}
                    className="group p-4 rounded-lg border border-border dark:border-border-dark bg-background/60 dark:bg-white/5 hover:bg-background/80 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(74,119,41,0.5)]"></span>
                      <p className="font-semibold text-text-primary dark:text-text-primary-dark">{item.name}</p>
                    </div>
                    {item.description && (
                      <p className="text-sm mt-2 text-text-secondary dark:text-text-secondary-dark leading-relaxed">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default About;
