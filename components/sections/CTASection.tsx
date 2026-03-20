'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { GradientBlob } from '@/components/ui/GradientBlob';

interface CTASectionProps {
  locale: string;
}

export function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('ctaSection');

  return (
    <section className="relative py-24 pt-20 overflow-hidden">
      <GradientBlob color="purple" size="lg" className="top-0 right-0" delay={0} />
      <GradientBlob color="cyan" size="md" className="bottom-0 left-0" delay={2} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="group"
              asChild
            >
              <Link href={`/${locale}/support`}>
                {t('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="hover:bg-primary/20 hover:text-primary transition-colors"
              asChild
            >
              <Link href={`/${locale}/features`}>
                {t('learnMore')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
