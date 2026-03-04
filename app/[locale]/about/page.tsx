import { AboutHero } from '@/components/sections/AboutHero';
import { AboutStory } from '@/components/sections/AboutStory';
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
      <AboutStory />
      <ValuesSection />
      <CTASection locale={locale} />
    </>
  );
}
