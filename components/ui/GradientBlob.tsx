'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientBlobProps {
  className?: string;
  color?: 'purple' | 'blue' | 'cyan' | 'pink' | 'green';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

export function GradientBlob({
  className,
  color = 'purple',
  size = 'md',
  delay = 0,
}: GradientBlobProps) {
  const colors = {
    purple: 'from-purple-500/30 to-pink-500/30',
    blue: 'from-blue-500/30 to-cyan-500/30',
    cyan: 'from-cyan-500/30 to-teal-500/30',
    pink: 'from-pink-500/30 to-rose-500/30',
    green: 'from-primary/20 to-green-700/20',
  };

  const sizes = {
    sm: 'h-32 w-32',
    md: 'h-64 w-64',
    lg: 'h-96 w-96',
    xl: 'h-[32rem] w-[32rem]',
  };

  return (
    <motion.div
      className={cn(
        'absolute rounded-full blur-3xl',
        `bg-gradient-to-br ${colors[color]}`,
        sizes[size],
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 30, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
      }}
    />
  );
}
