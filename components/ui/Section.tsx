import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'default' | 'muted' | 'gradient';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, background = 'default', children, ...props }, ref) => {
    const backgrounds = {
      default: 'bg-background',
      muted: 'bg-muted/30',
      gradient: 'bg-gradient-to-br from-space-purple/10 via-space-blue/10 to-space-cyan/10',
    };

    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-24 lg:py-32', backgrounds[background], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
