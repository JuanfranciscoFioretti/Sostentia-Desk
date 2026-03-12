'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, RefreshCw, Users, BarChart, Shield, Gift, MessageCircle, Eye } from 'lucide-react';
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

  return (
    <Section className="pt-20">
      <Container>
        <div className="space-y-32">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

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

                {/* Image or MobileFrame for first feature */}
                <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                  {index === 0 ? (
                    <div className="flex items-center justify-center">
                      <MobileFrame>
                        <Image
                          src="/images/screenshots/App-Screen-1.webp"
                          alt="App screenshot"
                          fill
                          className="object-cover"
                          priority
                        />
                      </MobileFrame>
                    </div>
                  ) : index === 1 ? (
                    <div className="flex items-center justify-center">
                      <div className="relative border-4 border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden" style={{ width: '100%', maxWidth: '900px' }}>
                        <Image
                          src="/images/screenshots/Screenshot11.webp"
                          alt="Web dashboard screenshot"
                          width={900}
                          height={500}
                          className="object-cover w-full h-full"
                          style={{ display: 'block' }}
                          priority
                        />
                      </div>
                    </div>
                  ) : index === 2 ? (
                    <div className="flex items-center justify-center">
                      <MobileFrame>
                        <Image
                          src="/images/screenshots/App-Screen-2-Dark.webp"
                          alt="Loyalty Program screenshot"
                          fill
                          className="object-cover mt-2"
                          priority
                        />
                      </MobileFrame>
                    </div>
                  ) : index === 3 ? (
                    <div className="flex items-center justify-center">
                      <div className="relative border-4 border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden" style={{ width: '100%', maxWidth: '900px' }}>
                        <Image
                          src="/images/screenshots/orders2.webp"
                          alt="Orders screen screenshot"
                          width={900}
                          height={500}
                          className="object-cover w-full h-full"
                          style={{ display: 'block' }}
                          priority
                        />
                      </div>
                    </div>
                  ) : index === 4 ? (
                    <div className="flex items-center justify-center">
                      <div className="relative border-4 border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden" style={{ width: '100%', maxWidth: '900px' }}>
                        <Image
                          src="/images/screenshots/users2.webp"
                          alt="Users screen screenshot"
                          width={900}
                          height={500}
                          className="object-cover w-full h-full"
                          style={{ display: 'block' }}
                          priority
                        />
                      </div>
                    </div>
                  ) : index === 5 ? (
                    <div className="flex items-center justify-center">
                      <MobileFrame>
                        <Image
                          src="/images/screenshots/high-contrast.webp"
                          alt="Accessibility high-contrast screenshot"
                          fill
                          className="object-cover"
                          priority
                        />
                      </MobileFrame>
                    </div>
                  ) : index === 6 ? (
                    <div className="flex items-center justify-center">
                      <div className="relative border-4 border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden" style={{ width: '100%', maxWidth: '900px' }}>
                        <Image
                          src="/images/screenshots/Stats-Screen.webp"
                          alt="Stats screen screenshot"
                          width={900}
                          height={500}
                          className="object-cover w-full h-full"
                          style={{ display: 'block' }}
                          priority
                        />
                      </div>
                    </div>
                  ) : index === 7 ? (
                    <div className="flex items-center justify-center">
                      <div className="relative border-4 border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden" style={{ width: '100%', maxWidth: '900px' }}>
                        <Image
                          src="/images/screenshots/Real-Time-Chat.webp"
                          alt="Real-time chat screenshot"
                          width={900}
                          height={500}
                          className="object-cover w-full h-full"
                          style={{ display: 'block' }}
                          priority
                        />
                      </div>
                    </div>
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
  );
}
