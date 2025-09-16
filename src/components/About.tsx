import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';
import { useTheme } from '../hooks';

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'about-us' : 'nosotros';

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
    <section id={sectionId} className={cn(
      'scroll-target', // CSS-first scroll compensation
      'relative py-20 sm:py-24 lg:py-32',
      'bg-background dark:bg-background-dark',
      isLightMode ? 'light-enhanced-bg' : '',
      className
    )}>
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h2 className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
            "text-text-primary dark:text-text-primary-dark",
            isLightMode ? "light-title-shadow" : ""
          )}>
            {title}
          </h2>
          <div className="mx-auto mb-8 h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_2px_rgba(66,165,245,0.15)]"></div>
          <p className={cn(
            "text-lg sm:text-xl text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-3xl mx-auto",
            isLightMode ? "light-subtitle-shadow" : ""
          )}>
            {content}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Mission & Vision */}
          <div className="space-y-8">
            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Card variant="elevated" hover className="relative bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{missionTitle}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed text-base">
                    {missionText}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Card variant="elevated" hover className="relative bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">V</span>
                    </div>
                    <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{visionTitle}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed text-base">
                    {visionText}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Values & Visual Element */}
          <div className="space-y-8">
            {/* Values Card */}
            <Card variant="elevated" hover className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">★</span>
                  </div>
                  <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{valuesTitle}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {list.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-xl border border-border/50 dark:border-border-dark/50 bg-background/40 dark:bg-white/5 hover:bg-background/60 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(74,119,41,0.5)] flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-text-primary dark:text-text-primary-dark text-sm mb-1">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
