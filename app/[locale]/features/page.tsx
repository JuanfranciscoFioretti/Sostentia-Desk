'use client';

import { FeaturesHero } from '@/components/sections/FeaturesHero';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTASection } from '@/components/sections/CTASection';

export default function FeaturesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <>
      <FeaturesHero />
      <FeaturesList />
      <CTASection locale={locale} />
    </>
  );
}
