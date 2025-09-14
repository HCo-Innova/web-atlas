import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Products } from './Products';
import { Process } from './Process';
import { Quality } from './Quality';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ScrollIndicator } from './ScrollIndicator';

export function DesignSystemDemo() {
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

    {/* Contact Section */}
    <Contact />
  </main>

  {/* Footer - siempre al final */}
  <Footer />

    </div>
  );
}
