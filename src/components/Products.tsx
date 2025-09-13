import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';

interface ProductsProps {
  className?: string;
}

export function Products({ className }: ProductsProps) {
  const { t, i18n } = useTranslation();

  const title = t('products.title', { defaultValue: t('products_section.title', { defaultValue: 'Productos' }) });
  const intro = t('products.intro', { defaultValue: '' });
  type ProductItem = { name: string; description?: string };
  const rawList = i18n.getResource(i18n.language, 'translation', 'products.products_list');
  const list: ProductItem[] = Array.isArray(rawList) ? (rawList as ProductItem[]) : [];
  const availability = t('products.availability_note', { defaultValue: '' });

  return (
    <section id="productos" className={cn(
      'relative py-16 sm:py-20 lg:py-24',
      'bg-background dark:bg-background-dark',
      'scroll-mt-24 sm:scroll-mt-28',
      className
    )}>
      {/* Decorativo sutil superior */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-16 right-0 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
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

        {/* Grid de productos */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {list.map((item, idx) => (
            <Card key={idx} variant="elevated" hover>
              <CardHeader title={item.name} />
              <CardContent>
                <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {availability && (
          <div className="mt-8 p-4 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
              {availability}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
