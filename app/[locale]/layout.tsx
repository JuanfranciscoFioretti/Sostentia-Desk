import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { locales } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import { LayoutClient } from './LayoutClient';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((l) => l === locale);
  if (!isValidLocale) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load messages dynamically
  let messages = {};
  try {
    const loadedMessages = (await import(`@/i18n/locales/${locale}.json`)).default;
    messages = loadedMessages || {};
  } catch (e) {
    console.error(`Failed to load messages for locale ${locale}:`, e);
    messages = {};
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutClient locale={locale} messages={messages}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
