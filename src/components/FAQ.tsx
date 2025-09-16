import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';
import { Card, CardContent } from './ui';

interface FAQProps {
  className?: string;
}

type FAQQuestion = {
  id: number;
  question: string;
  answer: string;
};

export function FAQ({ className }: FAQProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'faq' : 'preguntas-frecuentes';

  const title = t('faq.title');
  const rawQuestions = i18n.getResource(i18n.language, 'translation', 'faq.questions');
  const questions: FAQQuestion[] = Array.isArray(rawQuestions) ? (rawQuestions as FAQQuestion[]) : [];

  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section
      id={sectionId}
      className={cn(
        'scroll-target',
        'relative py-8 sm:py-10 lg:py-12',
        'bg-background dark:bg-background-dark',
        className
      )}
    >
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-20 left-1/3 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 bg-[radial-gradient(circle,rgba(74,119,41,0.6),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <h2 className={cn(
            "text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark",
            isLightMode ? "light-title-shadow" : ""
          )}>
            {title}
          </h2>
          <div className="mt-1 h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          <p className={cn(
            "mt-2 text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-prose",
            isLightMode ? "light-subtitle-shadow" : ""
          )}>
            {t('faq.subtitle', { defaultValue: 'Encuentra respuestas a las preguntas más comunes sobre nuestros productos, servicios y procesos.' })}
          </p>
        </div>

        {/* Acordeón de preguntas */}
        <div className="mt-6">
          <div className="space-y-1">
            {questions.map((item, index) => {
              const isOpen = openItems.has(item.id);
              
              return (
                <Card
                  key={item.id}
                  variant="default"
                  padding="none"
                  className={cn(
                    "transition-all duration-300 overflow-hidden border border-border dark:border-border-dark",
                    isOpen 
                      ? "ring-1 ring-primary/30 shadow-sm" 
                      : "hover:shadow-sm"
                  )}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-inset rounded-lg transition-all duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} pregunta: ${item.question}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* Número de pregunta */}
                        <div className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                          isOpen
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary"
                        )}>
                          {index + 1}
                        </div>
                        
                        {/* Pregunta */}
                        <h3 className="text-sm font-medium text-text-primary dark:text-text-primary-dark leading-tight pr-4">
                          {item.question}
                        </h3>
                      </div>
                      
                      {/* Icono de expansión */}
                      <div className={cn(
                        "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200",
                        isOpen
                          ? "bg-primary text-white rotate-180"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      )}>
                        <svg
                          className="w-2.5 h-2.5 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Respuesta */}
                  <div
                    id={`faq-answer-${item.id}`}
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <CardContent className="px-3 pb-3 pt-0">
                      <div className="pl-7">
                        <div className="h-px bg-gradient-to-r from-primary/20 to-transparent mb-2"></div>
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-6 text-center">
          <Card variant="default" padding="sm" className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-lg mx-auto">
            <CardContent className="p-2">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">❓</span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark mb-1">
                {t('faq.cta.title', { defaultValue: '¿No encontraste tu respuesta?' })}
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-3">
                {t('faq.cta.description', { defaultValue: 'Si tienes alguna pregunta específica que no está en nuestra lista, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.' })}
              </p>
              <a
                href="mailto:contacto@atlasaisa.com.py"
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-primary text-white !text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium text-xs shadow-sm hover:shadow-md"
              >
                <span className="!text-white">✉️</span>
                <span className="text-xs font-medium !text-white">{t('faq.cta.button', { defaultValue: 'Contactar Ahora' })}</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
