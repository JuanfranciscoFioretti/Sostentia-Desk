'use client';

import { type ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: any;
}

// Placeholder ThemeProvider (next-themes removed due to build issues)
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <>{children}</>;
}
