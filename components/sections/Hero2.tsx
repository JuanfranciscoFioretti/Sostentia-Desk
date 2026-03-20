'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SpaceBackground } from '@/components/ui/SpaceBackground';
import { GradientBlob } from '@/components/ui/GradientBlob';
import { Modal } from '@/components/ui/Modal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

interface Hero2Props {
  locale: string;
}

export function Hero2({ locale }: Hero2Props) {
  const t = useTranslations('hero');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden pt-48 md:pt-32 lg:pt-40 pb-32 md:pb-40">
      <SpaceBackground animated />
      <GradientBlob color="purple" size="xl" className="top-10 left-10" delay={0} />
      <GradientBlob color="blue" size="lg" className="bottom-20 right-10" delay={2} />
      <GradientBlob color="green" size="md" className="top-1/2 right-1/4" delay={4} />

      <Container className="relative z-10 w-full xl:ml-20 2xl:ml-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0fr] gap-12 lg:gap-8 items-center lg:items-start min-h-[85vh] md:min-h-[90vh] lg:min-h-[100vh] lg:pt-12 xl:pl-6">
          {/* Left Content - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center flex flex-col justify-center max-w-full md:max-w-2xl lg:text-left lg:max-w-lg lg:pr-8 mx-auto lg:mx-0 px-4 md:px-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 w-fit mx-auto lg:mx-0"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New: Real-time Collaboration</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {t('title')}{' '}
              <span className="bg-gradient-to-r from-primary via-green-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {t('titleHighlight')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
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
                <Link href={`/${locale}/support`}>
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="group"
                onClick={() => setIsVideoOpen(true)}
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
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
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

          {/* Mobile/Tablet Images - Visible only on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block lg:hidden w-full md:w-[95%] h-[400px] md:h-[500px] mx-auto"
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Image (Secondary) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                className="absolute left-0 top-[62%] -translate-y-1/2 z-0 w-[65%]"
              >
                <div className="relative w-full aspect-[16/10]">
                  <img
                    src="/images/screenshots/Products-light(1).webp"
                    alt="Light Dashboard Background Layer"
                    className="w-full h-full object-cover rounded-[14px] shadow-[0_20px_30px_4px_rgba(0,0,0,0.04)]"
                  />
                </div>
              </motion.div>

              {/* Foreground Image (Primary) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[80%]"
              >
                <div className="relative w-full aspect-[16/10]">
                  <img
                    src="/images/screenshots/Screenshot1.webp"
                    alt="Sostentia Desk Dashboard - Main"
                    className="w-full h-full object-cover rounded-[14px] shadow-[0_30px_80px_-8px_rgba(0,0,0,0.4)] border border-white/5"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Desktop Images - Visible only on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block absolute -right-[8%] top-0 w-[60%] md:w-[55%] lg:w-[65%] h-full z-5"
      >
        {/* Images Container - Position relative for layered composition */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Background Image (Secondary) - Positioned left and back */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 top-[62%] -translate-y-1/2 z-0
              w-[65%] md:w-[70%] lg:w-[92%]"
          >
            <div className="relative w-full aspect-[16/10]">
              <img
                src="/images/screenshots/Products-light(1).webp"
                alt="Light Dashboard Background Layer"
                className="w-full h-full object-cover 
                  rounded-[14px] md:rounded-[18px]
                  shadow-[0_20px_30px_4px_rgba(0,0,0,0.04)] 
                  md:shadow-[0_25px_40px_4px_rgba(0,0,0,0.05)]"
              />
            </div>
          </motion.div>

          {/* Foreground Image (Primary) - Positioned right and front */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
              w-[80%] md:w-[85%] lg:w-[85%]"
          >
            <div className="relative w-full aspect-[16/10]">
              <img
                src="/images/screenshots/Screenshot1.webp"
                alt="Sostentia Desk Dashboard - Main"
                className="w-full h-full object-cover
                  rounded-[14px] md:rounded-[18px]
                  shadow-[0_30px_80px_-8px_rgba(0,0,0,0.4)]
                  md:shadow-[0_45px_120px_-8px_rgba(0,0,0,0.5)]
                  border border-white/5 md:border-white/10"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Modal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)}>
        <VideoPlayer
          url="https://www.youtube.com/watch?v=gCPJxtBkqas"
          controls={true}
          autoplay={true}
        />
      </Modal>
    </section>
  );
}
