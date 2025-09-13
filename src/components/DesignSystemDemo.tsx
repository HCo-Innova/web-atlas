import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Products } from './Products';
import { Process } from './Process';
import { Quality } from './Quality';
import { Contact } from './Contact';
import { ScrollIndicator } from './ScrollIndicator';

export function DesignSystemDemo() {
  return (
  <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      {/* Header principal */}
      <Header />

    {/* Indicador de scroll global (visible excepto en Contacto) */}
    <ScrollIndicator />

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

      {/* Contenido real arriba: Hero, About, Products, Process, Quality, Contact */}
    </div>
  );
}
