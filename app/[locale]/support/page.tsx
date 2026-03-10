'use client';

import { SupportHero } from '@/components/sections/SupportHero';
import { SupportForm } from '@/components/sections/SupportForm';

export default function SupportPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return (
    <>
      <SupportHero />
      <SupportForm />
    </>
  );
}
