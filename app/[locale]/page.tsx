'use client';

import { use } from 'react';
import { Hero2 } from '@/components/sections/Hero2';
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
      <Hero2 locale={locale} />
      <FeaturesPreview />
      <CTASection locale={locale} />
    </>
  );
}
