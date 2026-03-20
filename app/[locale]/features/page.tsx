'use client';

import { use } from 'react';
import { FeaturesHero } from '@/components/sections/FeaturesHero';
import { FeaturesList } from '@/components/sections/FeaturesList';

export default function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <>
      <FeaturesHero />
      <FeaturesList />
    </>
  );
}
