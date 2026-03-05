import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LayoutClient } from '@/app/[locale]/LayoutClient';
import './globals.css';
import { Hero } from '@/components/sections/Hero';
import { FeaturesPreview } from '@/components/sections/FeaturesPreview';
import { CTASection } from '@/components/sections/CTASection';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Sostentia Desk - Business Management Platform",
  description: "The all-in-one platform that combines a powerful mobile app and comprehensive web dashboard to streamline your business operations.",
};

export default async function RootPage() {
  const locale = 'en';
  const messages = (await import('@/i18n/locales/en.json')).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutClient locale={locale} messages={messages}>
          <Hero locale={locale} />
          <FeaturesPreview />
          <CTASection locale={locale} />
        </LayoutClient>
      </body>
    </html>
  );
}
