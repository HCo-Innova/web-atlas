import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui';
import { cn } from '../lib/design-system';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';
import ChiaImage from '../assets/Chia.png';
import SesamoImage from '../assets/Sesamo.jpg';

interface ProductsProps {
  className?: string;
}

export function Products({ className }: ProductsProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
  const sectionId = currentLanguage === 'en' ? 'products' : 'productos';

  const title = t('products.title', { defaultValue: t('products_section.title', { defaultValue: 'Productos' }) });
  const intro = t('products.intro', { defaultValue: '' });
  type ProductItem = { name: string; description?: string };
  const rawList = i18n.getResource(i18n.language, 'translation', 'products.products_list');
  const list: ProductItem[] = Array.isArray(rawList) ? (rawList as ProductItem[]) : [];
  const availability = t('products.availability_note', { defaultValue: '' });

  // Mapeo de imágenes por producto
  const productImages = {
    'Chía': ChiaImage,
    'Chia': ChiaImage,
    'Sésamo': SesamoImage,
    'Sesame': SesamoImage
  };

  return (
    <section id={sectionId} className={cn(
      'scroll-target', // CSS-first scroll compensation
      'relative py-16 sm:py-20 lg:py-24',
      'bg-background dark:bg-background-dark',
      className
    )}>
      {/* Decorativo sutil superior */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-16 right-0 w-72 h-72 bg-[radial-gradient(circle,rgba(0,47,108,0.6),transparent_70%)] rounded-full"></div>
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

        {/* Grid de productos */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {list.map((item, idx) => {
            const productImage = productImages[item.name as keyof typeof productImages];
            
            return (
              <Card key={idx} variant="elevated" hover className="overflow-hidden">
                {/* Imagen del producto */}
                {productImage && (
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={productImage}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Overlay sutil en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                
                {/* Contenido de la tarjeta */}
                <CardHeader title={item.name} />
                <CardContent>
                  <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {availability && (
          <div className="mt-8 p-4 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <p className={cn(
              "text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark",
              isLightMode ? "light-subtitle-shadow" : ""
            )}>
              {availability}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
