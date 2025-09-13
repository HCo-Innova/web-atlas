## **ATLAS Agro - Sistema de Diseño v1.0**

### **0. Filosofía**

Este documento define la base visual y funcional para la nueva presencia digital de ATLAS Agro Industrial. No es una réplica del material existente, sino una evolución hacia una **experiencia de usuario moderna, limpia y de alto rendimiento**.

El sistema está diseñado para ser flexible y escalable, con dos temas visuales (Claro y Oscuro) como pilar fundamental. Cada decisión busca optimizar la legibilidad, la accesibilidad y la velocidad, alineándose con las mejores prácticas de la industria para una SPA de primer nivel.

-----

### **1. Fundamentos del Diseño (Foundations)**

Los pilares visuales que garantizan una identidad de marca coherente y profesional.

#### **1.1. Logo**

El logo es un pilar de la identidad visual. Se utilizará estratégicamente para anclar la marca, no para dictar cada elemento del diseño.

  * **Uso:** Siempre sobre fondos que aseguren su legibilidad, tanto en modo claro como oscuro.
  * **Espacio de Seguridad:** Mantener un espacio libre equivalente al 50% de la altura de la "A" del logo para asegurar su impacto visual.
  * **A Evitar:** No debe ser alterado, distorsionado o recoloreado.

-----

#### **1.2. Paleta de Colores (Light & Dark Themes)**

Definimos los colores de forma semántica para facilitar la implementación de los temas. El sistema alternará entre `light` (default) y `dark`.

| Token Semántico     | Rol                                             | Modo Claro (`light`) | Modo Oscuro (`dark`)  |
| ------------------- | ----------------------------------------------- | -------------------- | --------------------- |
| `primary`           | Acciones principales, acentos de marca          | `#4A7729` (Verde)     | `#66BB6A` (Verde claro) |
| `accent`            | Acentos secundarios, links activos              | `#002F6C` (Azul)      | `#42A5F5` (Azul claro)  |
| `background`        | Fondo principal de la aplicación                | `#F9FAFB` (Gris claro) | `#111827` (Gris oscuro) |
| `surface`           | Fondo de elementos elevados (tarjetas, modales) | `#FFFFFF` (Blanco)     | `#1F2937` (Gris medio)  |
| `text-primary`      | Texto principal y encabezados                   | `#1A1A1A` (Negro suave) | `#F9FAFB` (Gris claro) |
| `text-secondary`    | Texto secundario, descripciones                 | `#4B5563` (Gris)      | `#9CA3AF` (Gris)       |
| `border`            | Bordes, divisores                               | `#E5E7EB` (Gris)      | `#374151` (Gris)       |

**Implementación en `tailwind.config.js`:**

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Habilitar estrategia de clase para theming
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A7729',
          dark: '#66BB6A',
        },
        accent: {
          DEFAULT: '#002F6C',
          dark: '#42A5F5',
        },
        background: {
          DEFAULT: '#F9FAFB',
          dark: '#111827',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937',
        },
        'text-primary': {
          DEFAULT: '#1A1A1A',
          dark: '#F9FAFB',
        },
        'text-secondary': {
          DEFAULT: '#4B5563',
          dark: '#9CA3AF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
      },
    },
  },
  // ...
};
```

*Nota: Esta configuración es un ejemplo. En la práctica, se usarán las clases `dark:*` de Tailwind, ej: `bg-background dark:bg-background-dark`.*

-----

#### **1.3. Tipografía**

Moderna, legible y versátil.

  * **Encabezados (Headings):** **Montserrat** (Pesos: 700, 600)
  * **Cuerpo de Texto (Body):** **Inter** (Pesos: 400)

Se implementará una escala tipográfica fluida (responsive) para una adaptación perfecta a cualquier tamaño de pantalla. El contraste del texto siempre deberá cumplir con los estándares de accesibilidad WCAG AA, usando los tokens `text-primary` y `text-secondary`.

-----

### **2. Layout y Espaciado (Layout & Spacing)**

La estructura se basará en una **rejilla (grid) de 12 columnas** y una escala de espaciado consistente (múltiplos de 4px). El **espacio en blanco generoso** es un principio clave para lograr un diseño limpio, enfocado y fácil de navegar.

-----

### **3. Componentes (Core UI Kit)**

Componentes de React construidos con TypeScript, Tailwind CSS y Headless UI para garantizar accesibilidad y personalización. Todos los componentes deben ser compatibles con ambos temas.

#### **3.1. Botón (`<Button>`)**

  * **Estilos:** `Primary` (fondo `bg-primary`), `Secondary` (borde `border-primary`), `Text`.
  * **Estados:** Deberá tener estilos definidos para `hover`, `focus` y `disabled`. El estado `focus` debe ser claramente visible por accesibilidad.

-----

#### **3.2. Tarjeta (`<Card>`)**

  * **Uso:** Para presentar contenido de forma aislada, como productos, valores o miembros del equipo.
  * **Estilo:** Utilizará `bg-surface` para el fondo, `border` para el borde, y sombras sutiles para crear una sensación de elevación sobre el `bg-background`.

-----

#### **3.3. Elementos Gráficos**

Para añadir un carácter único y moderno, se podrán incorporar formas geométricas sutiles o patrones de fondo de bajo contraste. Estos elementos deben ser discretos y no deben competir con el contenido. *Ejemplo: Un patrón de puntos finos en una sección Hero o líneas de contorno sutiles como divisores.*

-----

#### **3.4. Navegación (`<Navbar>` & `<Footer>`)**

  * **Navbar:** "Sticky", limpia y responsiva. Contendrá el logo, la navegación principal y el interruptor de tema (Claro/Oscuro).
  * **Footer:** Debe ser funcional, con información de contacto, enlaces de navegación y créditos.

-----

### **4. Estructura de la Página (SPA Content Flow)**

[cite\_start]El contenido del PDF inspira la arquitectura de la información[cite: 8, 30, 44, 79, 89]:

1.  **Hero:** Declaración de valor impactante.
2.  [cite\_start]**Sobre Nosotros:** Resumen de la misión, visión y valores corporativos[cite: 9, 12, 16].
3.  [cite\_start]**Productos:** Sección visualmente atractiva para la chía y el sésamo, enfocada en la calidad (orgánico/convencional)[cite: 29, 31, 32].
4.  [cite\_start]**Proceso y Operaciones:** Un recorrido desde los centros de producción hasta el procesamiento, destacando la calidad y la tecnología involucrada[cite: 35, 45, 48].
5.  [cite\_start]**Calidad y Certificaciones:** Resaltar el compromiso con la calidad a través de análisis, certificaciones y procesos como la ozonización[cite: 90, 91, 95, 97].
6.  **Contacto:** Un formulario claro y directo o información de contacto.

-----

### **5. Notas Clave para Implementación**

  * **Implementación de Theming:**

      * Usar la estrategia `darkMode: 'class'` en Tailwind.
      * Crear un `ThemeContext` en React para gestionar el estado del tema (`'light'` o `'dark'`).
      * Un componente de interruptor (toggle) se encargará de cambiar este estado y añadir/quitar la clase `dark` del elemento `<html>`.

  * **Internacionalización (i18n):** Usar `react-i18next` para gestionar las traducciones (ES/EN), cargando los archivos JSON correspondientes según el idioma seleccionado.

  * **Optimización:**

      * Implementar "lazy loading" para imágenes y componentes que no sean visibles en la carga inicial.
      * Utilizar `vite-plugin-compression2` para servir assets comprimidos (Brotli/Gzip).
      * Analizar el bundle final con `rollup-plugin-visualizer` para mantener un tamaño reducido.