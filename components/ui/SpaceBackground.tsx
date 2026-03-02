'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpaceBackgroundProps {
  className?: string;
  animated?: boolean;
}

export function SpaceBackground({ className, animated = true }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !canvasRef.current) return;

    const updateGradient = () => {
      if (canvasRef.current) {
        const time = Date.now() / 1000;
        const hue1 = (time * 10) % 360;
        const hue2 = ((time * 10) + 120) % 360;
        const hue3 = ((time * 10) + 240) % 360;

        canvasRef.current.style.background = `
          radial-gradient(circle at 20% 50%, hsla(${hue1}, 70%, 60%, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, hsla(${hue2}, 70%, 60%, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, hsla(${hue3}, 70%, 60%, 0.3) 0%, transparent 50%)
        `;
      }
    };

    const interval = setInterval(updateGradient, 100);
    updateGradient();

    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div
      ref={canvasRef}
      className={cn(
        'absolute inset-0 -z-10 transition-all duration-1000',
        className
      )}
      style={{
        background: `
          radial-gradient(circle at 20% 50%, hsla(270, 70%, 60%, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, hsla(210, 70%, 60%, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, hsla(180, 70%, 60%, 0.3) 0%, transparent 50%)
        `,
      }}
    />
  );
}
