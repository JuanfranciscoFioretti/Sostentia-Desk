'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SpaceBackground } from '@/components/ui/SpaceBackground';
import { GradientBlob } from '@/components/ui/GradientBlob';

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      <SpaceBackground animated />
      <GradientBlob color="purple" size="xl" className="top-10 left-10" delay={0} />
      <GradientBlob color="blue" size="lg" className="bottom-20 right-10" delay={2} />
      <GradientBlob color="green" size="md" className="top-1/2 right-1/4" delay={4} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New: Real-time Collaboration</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}{' '}
              <span className="bg-gradient-to-r from-primary via-green-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {t('titleHighlight')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                variant="primary"
                size="lg"
                className="group"
                asChild
              >
                <Link href={`/${locale}/register`}>
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t('cta.secondary')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{t('stats.users')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-sm font-medium">{t('stats.rating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{t('stats.uptime')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative pb-16"
          >
            <div className="rounded-3xl shadow-2xl overflow-visible border border-white/10 p-6 bg-gradient-to-br from-white/5 to-transparent">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/screenshots/Screenshot1.png"
                  alt="Sostentia Desk Dashboard"
                  className="w-full h-auto block"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-12 -right-8 glass rounded-2xl p-4 shadow-xl z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-16 -left-8 glass rounded-2xl p-4 shadow-xl z-10"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
