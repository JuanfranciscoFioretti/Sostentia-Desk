import { SupportHero } from '@/components/sections/SupportHero';
import { SupportForm } from '@/components/sections/SupportForm';

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <SupportHero />
      <SupportForm />
    </>
  );
}
