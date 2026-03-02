import { PricingHero } from '@/components/sections/PricingHero';
import { PricingCards } from '@/components/sections/PricingCards';
import { PricingFAQ } from '@/components/sections/PricingFAQ';
import { CTASection } from '@/components/sections/CTASection';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <PricingHero />
      <PricingCards locale={locale} />
      <PricingFAQ />
      <CTASection locale={locale} />
    </>
  );
}
