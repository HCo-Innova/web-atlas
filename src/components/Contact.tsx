import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { Card, CardContent } from './ui';

interface ContactProps {
  className?: string;
}

type ContactDetail = {
  type: 'email' | 'phone' | string;
  value: string;
};

export function Contact({ className }: ContactProps) {
  const { t, i18n } = useTranslation();

  const title = t('contact.title');
  const intro = t('contact.intro', { defaultValue: t('contact.description') });
  const details = (i18n.getResource(i18n.language, 'translation', 'contact.contact_details') as ContactDetail[]) || [];

  const toHref = (d: ContactDetail) => {
    if (d.type === 'email') return `mailto:${d.value}`;
    if (d.type === 'phone') return `tel:${d.value.replace(/\s+/g, '')}`;
    return d.value;
  };

  const labelFor = (d: ContactDetail) => {
    if (d.type === 'email') return t('contact.email');
    if (d.type === 'phone') return t('contact.phone');
    return d.type;
  };

  return (
    <section id="contacto" className={cn(
      // Añadimos padding inferior para que las cards no se corten al final
      'relative pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24',
      'bg-surface dark:bg-surface-dark',
      'scroll-mt-24 sm:scroll-mt-28',
      className
    )}>
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
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

        {/* Detalles de contacto */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {details.map((d, idx) => (
            <Card key={idx} variant="elevated" hover>
              <CardContent>
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{labelFor(d)}</span>
                  <a
                    href={toHref(d)}
                    className="mt-1 text-lg font-medium text-primary hover:underline break-all"
                  >
                    {d.value}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
