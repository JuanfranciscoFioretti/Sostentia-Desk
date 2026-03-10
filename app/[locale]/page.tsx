'use client';

import { Hero } from '@/components/sections/Hero';
import { FeaturesPreview } from '@/components/sections/FeaturesPreview';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  
  return (
    <>
      <Hero locale={locale} />
      <FeaturesPreview />
      <CTASection locale={locale} />
    </>
  );
}
