import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { Card, CardContent } from './ui';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';

interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'contact' : 'contacto';

  const title = t('contact.title');
  const intro = t('contact.intro', { defaultValue: t('contact.description') });

  // Datos de contacto específicos
  const contactData = [
    {
      type: 'email',
      value: 'contacto@atlasaisa.com.py',
      icon: '📨',
      label: t('contact.labels.email_principal')
    },
    {
      type: 'email', 
      value: 'giufonbo@gmail.com',
      icon: '📩',
      label: t('contact.labels.email_alternativo')
    },
    {
      type: 'phone',
      value: '+595 (971) 734136',
      icon: '📞',
      label: t('contact.labels.telefono')
    }
  ];

  return (
    <section id={sectionId} className={cn(
      'scroll-target', // CSS-first scroll compensation
      // Añadimos padding inferior para que las cards no se corten al final
      'relative pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24',
      'bg-background dark:bg-background-dark',
      className
    )}>
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
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

        {/* Sección de contacto rediseñada */}
        <div className="mt-12">
          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Columna izquierda - Información de contacto */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  {t('contact.sections.contact_info')}
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-primary/60 mx-auto lg:mx-0 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {contactData.map((contact, idx) => (
                  <Card key={idx} variant="elevated" hover className="group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Icono */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-3xl">{contact.icon}</span>
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <div className="mb-2">
                            <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                              {contact.label}
                            </span>
                          </div>
                          <a
                            href={contact.type === 'email' ? `mailto:${contact.value}` : `tel:${contact.value.replace(/\s+/g, '')}`}
                            className="text-base font-semibold text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent-dark transition-colors duration-200 break-all"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Columna derecha - Mensaje de contacto */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  {t('contact.sections.how_help')}
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-accent to-accent/60 mx-auto lg:mx-0 rounded-full"></div>
              </div>
              
              <Card variant="elevated" className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 dark:border-primary-dark/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">💬</span>
                      </div>
                      <h4 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-3">
                        {t('contact.help_card.title')}
                      </h4>
                      <p className="text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-6">
                        {t('contact.help_card.description')}
                      </p>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="mailto:contacto@atlasaisa.com.py"
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white !text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                      >
                        <span className="!text-white">✉️</span>
                        <span className="text-base font-semibold !text-white">{t('contact.help_card.send_email')}</span>
                      </a>
                      <a
                        href="tel:+595971734136"
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-white !text-white rounded-lg hover:bg-accent/90 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                      >
                        <span className="!text-white">📞</span>
                        <span className="text-base font-semibold !text-white">{t('contact.help_card.call_now')}</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
