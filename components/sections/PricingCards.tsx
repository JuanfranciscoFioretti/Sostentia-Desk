'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

interface PricingCardsProps {
  locale: string;
}

export function PricingCards({ locale }: PricingCardsProps) {
  const t = useTranslations('pricing');
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = t.raw('plans') as Array<{
    id: string;
    name: string;
    description: string;
    price: { monthly: number | string; annually: number | string };
    features: string[];
    cta: string;
    popular: boolean;
  }>;

  return (
    <Section className="pt-20">
      <Container>
        {/* Pricing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm font-medium transition-colors ${
              !isAnnual ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('toggle.monthly')}
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full glass transition-colors"
            aria-label="Toggle pricing"
          >
            <motion.div
              className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary"
              animate={{
                x: isAnnual ? 28 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${
              isAnnual ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('toggle.annually')}
          </span>
          {isAnnual && (
            <Badge variant="success" className="ml-2">
              {t('toggle.save')}
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={plan.popular ? 'lg:scale-105' : ''}
            >
              <Card
                className={`h-full flex flex-col relative ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
                hover={false}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" className="px-4 py-1.5">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    {typeof plan.price.monthly === 'number' ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold">
                            ${isAnnual ? plan.price.annually : plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground">
                            /{isAnnual ? 'year' : 'month'}
                          </span>
                        </div>
                        {isAnnual && typeof plan.price.annually === 'number' && (
                          <p className="text-sm text-muted-foreground mt-1">
                            ${(plan.price.annually / 12).toFixed(2)}/month billed
                            annually
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold">{plan.price.monthly}</div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link
                    href={
                      plan.id === 'enterprise'
                        ? `/${locale}/support`
                        : `/${locale}/register`
                    }
                  >
                    {plan.cta}
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
