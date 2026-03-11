'use client';

import { use } from 'react';
import { SupportHero } from '@/components/sections/SupportHero';
import { SupportForm } from '@/components/sections/SupportForm';

export default function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  
  return (
    <>
      <SupportHero />
      <SupportForm />
    </>
  );
}
