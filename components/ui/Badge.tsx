import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary/20 text-primary',
      secondary: 'bg-secondary/20 text-foreground',
      success: 'bg-green-500/20 text-green-600 dark:text-green-400',
      warning: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
      danger: 'bg-red-500/20 text-red-600 dark:text-red-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
