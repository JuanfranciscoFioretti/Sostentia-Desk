import { FeaturesHero } from '@/components/sections/FeaturesHero';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTASection } from '@/components/sections/CTASection';

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <FeaturesHero />
      <FeaturesList />
      <CTASection locale={locale} />
    </>
  );
}
