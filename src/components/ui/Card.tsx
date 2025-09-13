import React from 'react';
import { cn } from '../../lib/design-system';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      clickable = false,
      children,
      ...props
    },
    ref
  ) => {
  const baseClasses = 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl transition-all duration-300';
    
    const variantClasses = {
      default: 'shadow-card',
      elevated: 'shadow-elevated',
      outlined: 'shadow-none border-2',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveClasses = clickable
      ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      : '';

    const hoverClasses = hover
      ? 'hover:shadow-card-hover hover:-translate-y-1'
      : '';

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          interactiveClasses,
          hoverClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Componentes relacionados con Card
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-start justify-between mb-4', className)}
        ref={ref}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="ml-4 flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('text-text-secondary dark:text-text-secondary-dark', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end' | 'between';
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = 'end', ...props }, ref) => {
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        className={cn(
          'flex items-center gap-3 mt-4 pt-4 border-t border-border',
          justifyClasses[justify],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card };
