'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

export function FeaturesHero() {
  const t = useTranslations('features.section');

  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="primary" className="mb-4">
            {t('badge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </Container>
    </section>
  );
}
