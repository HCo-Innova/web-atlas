import { useTheme } from '../../hooks';
import { cn } from '../../lib/design-system';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        sizeClasses[size],
        'relative rounded-lg',
        'bg-surface border border-border',
        'hover:bg-surface/80',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'transition-all duration-200',
        'group',
        className
      )}
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {/* Icono del sol (modo claro) */}
      <svg
        className={cn(
          iconSizes[size],
          'absolute inset-0 m-auto',
          'text-yellow-500',
          'transition-all duration-300',
          theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-180 scale-75'
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* Icono de la luna (modo oscuro) */}
      <svg
        className={cn(
          iconSizes[size],
          'absolute inset-0 m-auto',
          'text-blue-400',
          'transition-all duration-300',
          theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-180 scale-75'
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Efecto de hover */}
      <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
}

// Componente alternativo con solo iconos
export function ThemeToggleIcon({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg',
        'text-text-primary dark:text-text-primary-dark',
        'hover:text-primary dark:hover:text-primary-dark',
        'hover:bg-surface/60 dark:hover:bg-surface-dark/60',
        'focus:outline-none focus:ring-0 focus:ring-offset-0',
        'active:outline-none active:ring-0 active:ring-offset-0',
        'transition-all duration-200',
        'font-bold',
        'outline-none shadow-none', // Reemplazo de los estilos inline
        className
      )}
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        // Icono de luna para cambiar a oscuro
        <svg
          className="w-4 h-4 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Icono de sol para cambiar a claro
        <svg
          className="w-4 h-4 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}
