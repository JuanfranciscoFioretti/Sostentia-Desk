'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface LayoutClientProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export function LayoutClient({ children, locale, messages }: LayoutClientProps) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <div className="relative w-full flex flex-col">
          <Header locale={locale} />
          <main className="w-full flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
