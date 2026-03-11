'use client';

import { use } from 'react';
import { Hero } from '@/components/sections/Hero';
import { FeaturesPreview } from '@/components/sections/FeaturesPreview';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  
  return (
    <>
      <Hero locale={locale} />
      <FeaturesPreview />
      <CTASection locale={locale} />
    </>
  );
}
