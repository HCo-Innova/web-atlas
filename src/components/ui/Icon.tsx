import { cn } from '../../lib/design-system';
import { ICONS, type IconName } from '../../lib/constants';

export interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  strokeWidth?: number;
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

export function Icon({ name, size = 'md', className, strokeWidth = 2 }: IconProps) {
  const iconConfig = ICONS[name];
  
  return (
    <svg
      className={cn(iconSizes[size], className)}
      fill="none"
      stroke="currentColor"
      viewBox={iconConfig.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d={iconConfig.path}
      />
    </svg>
  );
}
