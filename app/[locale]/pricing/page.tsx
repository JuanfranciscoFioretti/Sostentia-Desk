'use client';

import { PricingHero } from '@/components/sections/PricingHero';
import { PricingCards } from '@/components/sections/PricingCards';
import { PricingFAQ } from '@/components/sections/PricingFAQ';
import { CTASection } from '@/components/sections/CTASection';

export default function PricingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  
  return (
    <>
      <PricingHero />
      <PricingCards locale={locale} />
      <PricingFAQ />
      <CTASection locale={locale} />
    </>
  );
}
