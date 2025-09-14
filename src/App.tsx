import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DesignSystemDemo } from './components/DesignSystemDemo';
import { routeUtils } from './lib/seoRoutes';

/**
 * Componente principal de la aplicación con manejo de rutas SEO
 */
function App() {
  return (
    <Routes>
      {/* Redireccionar root a español por defecto */}
      <Route path="/" element={<Navigate to="/es" replace />} />
      
      {/* Rutas con idioma */}
      <Route path="/:lang/*" element={<LanguageRoute />} />
      
      {/* Fallback para URLs no válidas */}
      <Route path="*" element={<Navigate to="/es" replace />} />
    </Routes>
  );
}

/**
 * Componente que maneja las rutas específicas de idioma
 */
function LanguageRoute() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  // Validar idioma
  const validLanguage = (lang === 'es' || lang === 'en') ? lang : 'es';
  
  useEffect(() => {
    // Cambiar idioma en i18n si es diferente
    if (i18n.language !== validLanguage) {
      i18n.changeLanguage(validLanguage);
    }
    
    // Redirigir si el idioma no es válido
    if (lang !== validLanguage) {
      navigate(`/${validLanguage}`, { replace: true });
    }
  }, [lang, validLanguage, i18n, navigate]);
  
  return (
    <Routes>
      {/* Ruta base del idioma - home */}
      <Route path="/" element={<PageWithSection routeId="home" />} />
      
      {/* Rutas específicas en español */}
      <Route path="/nosotros" element={<PageWithSection routeId="about" />} />
      <Route path="/productos" element={<PageWithSection routeId="products" />} />
      <Route path="/proceso" element={<PageWithSection routeId="process" />} />
      <Route path="/calidad" element={<PageWithSection routeId="quality" />} />
      <Route path="/contacto" element={<PageWithSection routeId="contact" />} />
      
      {/* Rutas específicas en inglés */}
      <Route path="/about-us" element={<PageWithSection routeId="about" />} />
      <Route path="/products" element={<PageWithSection routeId="products" />} />
      <Route path="/process" element={<PageWithSection routeId="process" />} />
      <Route path="/quality" element={<PageWithSection routeId="quality" />} />
      <Route path="/contact" element={<PageWithSection routeId="contact" />} />
      
      {/* Fallback para subrutas no válidas */}
      <Route path="*" element={<PageWithSection routeId="home" />} />
    </Routes>
  );
}

/**
 * Componente que renderiza la página y hace scroll a la sección correspondiente
 */
interface PageWithSectionProps {
  routeId: string;
}

function PageWithSection({ routeId }: PageWithSectionProps) {
  useEffect(() => {
    // Hacer scroll a la sección después de que el componente se monte
    const sectionId = routeUtils.getSectionId(routeId);
    
    // Usar setTimeout para asegurar que el DOM esté completamente renderizado
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [routeId]);
  
  return <DesignSystemDemo />;
}

export default App;