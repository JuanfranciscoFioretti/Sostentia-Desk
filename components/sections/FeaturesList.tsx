'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Smartphone, Monitor, RefreshCw, Users, BarChart, Shield, Gift, MessageCircle, Eye, Calendar, Megaphone, Palette } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { MobileFrame } from '@/components/ui/MobileFrame';
import Image from 'next/image';

const iconMap = {
  smartphone: Smartphone,
  monitor: Monitor,
  'refresh-cw': RefreshCw,
  users: Users,
  'bar-chart': BarChart,
  shield: Shield,
  gift: Gift,
  'message-circle': MessageCircle,
  eye: Eye,
  calendar: Calendar,
  megaphone: Megaphone,
  palette: Palette,
};

type ImageConfig =
  | { type: 'desktop'; src: string; alt: string; width: number; height: number }
  | { type: 'mobile'; src: string; alt: string; objectPosition?: string };

const imageConfigs: Record<number, ImageConfig> = {
  0:  { type: 'desktop', src: '/images/screenshots/Web-App-Vieww (1).webp',  alt: 'Web app access screenshot',            width: 950, height: 695 },
  1:  { type: 'mobile',  src: '/images/screenshots/App-Screen-1.webp',        alt: 'App screenshot' },
  2:  { type: 'desktop', src: '/images/screenshots/Screenshot11.webp',        alt: 'Web dashboard screenshot',             width: 900, height: 500 },
  3:  { type: 'mobile',  src: '/images/screenshots/App-Screen-2-Dark.webp',   alt: 'Loyalty Program screenshot',           objectPosition: 'center 8px' },
  4:  { type: 'desktop', src: '/images/screenshots/orders2.webp',             alt: 'Orders screen screenshot',             width: 900, height: 500 },
  5:  { type: 'desktop', src: '/images/screenshots/users2.webp',              alt: 'Users screen screenshot',              width: 900, height: 500 },
  6:  { type: 'mobile',  src: '/images/screenshots/high-contrast.webp',       alt: 'Accessibility high-contrast screenshot' },
  7:  { type: 'desktop', src: '/images/screenshots/Stats-Screen.webp',        alt: 'Stats screen screenshot',              width: 900, height: 500 },
  8:  { type: 'desktop', src: '/images/screenshots/Real-Time-Chat.webp',      alt: 'Real-time chat screenshot',            width: 900, height: 500 },
  9:  { type: 'desktop', src: '/images/screenshots/Booking-View.webp',        alt: 'Smart Booking System screenshot',      width: 900, height: 500 },
  10: { type: 'desktop', src: '/images/screenshots/Theme-Config.webp',        alt: 'Website Theme Editor screenshot',      width: 900, height: 500 },
};

export function FeaturesList() {
  const t = useTranslations('features');
  const features = t.raw('list') as Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    items?: string[];
  }>;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedIndex(null);
    };
    if (expandedIndex !== null) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [expandedIndex]);

  const expandedConfig = expandedIndex !== null ? imageConfigs[expandedIndex] : null;

  return (
    <>
      <Section className="pt-20">
        <Container>
          <div className="space-y-32">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              const isEven = index % 2 === 0;
              const imgConfig = imageConfigs[index];

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        {Icon && <Icon className="h-7 w-7 text-primary" />}
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.items && feature.items.length > 0 && (
                        <>
                          {feature.items.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Image */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    {imgConfig ? (
                      imgConfig.type === 'desktop' ? (
                        <div className="flex items-center justify-center">
                          <div
                            className="relative border-4 border-neutral-600 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                            style={{ width: '100%', maxWidth: '900px' }}
                            onClick={() => setExpandedIndex(index)}
                          >
                            <Image
                              src={imgConfig.src}
                              alt={imgConfig.alt}
                              width={imgConfig.width}
                              height={imgConfig.height}
                              className="object-cover w-full h-full"
                              style={{ display: 'block' }}
                              priority
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center cursor-pointer"
                          onClick={() => setExpandedIndex(index)}
                        >
                          <div className="transition-transform duration-200 hover:scale-[1.02]">
                            <MobileFrame>
                              <Image
                                src={imgConfig.src}
                                alt={imgConfig.alt}
                                fill
                                className="object-cover"
                                style={imgConfig.objectPosition ? { objectPosition: imgConfig.objectPosition } : undefined}
                                priority
                              />
                            </MobileFrame>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="relative glass-strong rounded-3xl p-8 aspect-square flex items-center justify-center">
                        <div className="text-center">
                          {Icon && <Icon className="h-32 w-32 mx-auto mb-4 text-primary/30" />}
                          <p className="text-sm text-muted-foreground">
                            Feature visualization here
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Expanded image overlay */}
      <AnimatePresence>
        {expandedIndex !== null && expandedConfig && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {expandedConfig.type === 'desktop' ? (
                <div
                  className="relative border-4 border-neutral-600 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ width: 'min(85vw, 1200px)' }}
                >
                  <Image
                    src={expandedConfig.src}
                    alt={expandedConfig.alt}
                    width={expandedConfig.width}
                    height={expandedConfig.height}
                    className="object-cover w-full h-full"
                    style={{ display: 'block' }}
                    priority
                  />
                </div>
              ) : (
                <MobileFrame className="w-85! h-175!">
                  <Image
                    src={expandedConfig.src}
                    alt={expandedConfig.alt}
                    fill
                    className="object-cover"
                    style={expandedConfig.objectPosition ? { objectPosition: expandedConfig.objectPosition } : undefined}
                    priority
                  />
                </MobileFrame>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
