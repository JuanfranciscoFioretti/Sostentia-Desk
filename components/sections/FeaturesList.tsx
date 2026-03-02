'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, RefreshCw, Users, BarChart, Shield } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const iconMap = {
  smartphone: Smartphone,
  monitor: Monitor,
  'refresh-cw': RefreshCw,
  users: Users,
  'bar-chart': BarChart,
  shield: Shield,
};

export function FeaturesList() {
  const t = useTranslations('features');
  const features = t.raw('list') as Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
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
                    {['Fast performance', 'Easy to use', 'Reliable & secure'].map(
                      (item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Image Placeholder */}
                <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                  <div className="relative glass-strong rounded-3xl p-8 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      {Icon && <Icon className="h-32 w-32 mx-auto mb-4 text-primary/30" />}
                      <p className="text-sm text-muted-foreground">
                        Feature visualization here
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
