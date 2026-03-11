'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, RefreshCw, Users, BarChart, Shield, Gift } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

const iconMap = {
  smartphone: Smartphone,
  monitor: Monitor,
  'refresh-cw': RefreshCw,
  users: Users,
  'bar-chart': BarChart,
  shield: Shield,
  gift: Gift,
};

export function FeaturesPreview() {
  const t = useTranslations('features');
  let features = t.raw('list') as Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  // Remove Real Time Chat Support only for home
  features = features.filter(f => f.id !== 'real-time-chat');

  return (
    <Section background="muted" className="pt-32 sm:pt-24 md:pt-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="primary" className="mb-4">
            {t('section.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('section.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('section.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
