import { AboutHero } from '@/components/sections/AboutHero';
import { AboutStory } from '@/components/sections/AboutStory';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { CTASection } from '@/components/sections/CTASection';

export const dynamic = 'force-dynamic';

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return (
    <>
      <AboutHero />
      <AboutStory />
      <ValuesSection />
      <CTASection locale={locale} />
    </>
  );
}
