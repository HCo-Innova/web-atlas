import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Products } from './Products';
import { Process } from './Process';
import { Quality } from './Quality';
import { FAQ } from './FAQ';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ScrollIndicator } from './ScrollIndicator';
import { useHeaderHeight } from '../hooks/useHeaderHeight';
import { useEffect } from 'react';

export function HomePage() {
  // Inicializa variable --scroll-padding-top basada en header real
  useHeaderHeight();
  
  // 📱 Inicialización móvil optimizada y mínima
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // Solo configurar propiedades esenciales
      document.documentElement.style.touchAction = 'auto';
      document.body.style.touchAction = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      
      // Pequeño desplazamiento para activar scroll en iOS
      setTimeout(() => {
        const currentScroll = window.scrollY;
        window.scrollTo(0, currentScroll + 1);
        window.scrollTo(0, currentScroll);
      }, 50);
    }
  }, []);
  return (
  <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300 flex flex-col">
      {/* Header principal */}
      <Header />

    {/* Indicador de scroll global (visible excepto en Contacto) */}
    <ScrollIndicator />

  {/* Main content */}
  <main className="flex-1">
    {/* Hero Section */}
    <Hero />

    {/* About Section */}
    <About />

    {/* Products Section */}
    <Products />

    {/* Process & Operations Section */}
    <Process />

    {/* Quality & Certifications Section */}
    <Quality />

    {/* FAQ Section */}
    <FAQ />

    {/* Contact Section */}
    <Contact />
  </main>

  {/* Footer - siempre al final */}
  <Footer />

    </div>
  );
}
