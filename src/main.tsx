import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DesignSystemDemo } from './components/DesignSystemDemo';
import './lib/i18n'; // Inicializar i18n
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DesignSystemDemo />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
