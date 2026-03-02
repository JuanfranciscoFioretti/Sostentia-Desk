import { AboutHero } from '@/components/sections/AboutHero';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { CTASection } from '@/components/sections/CTASection';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <AboutHero />
      <ValuesSection />
      <CTASection locale={locale} />
    </>
  );
}
