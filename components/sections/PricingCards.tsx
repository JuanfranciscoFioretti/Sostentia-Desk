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
        <div className="flex flex-col items-center justify-center gap-6 mb-16">
          <div className="flex items-center justify-center gap-0 bg-muted rounded-2xl p-1.5 border-2 border-muted-foreground/30">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                !isAnnual
                  ? 'glass text-foreground shadow-lg hover:shadow-xl'
                  : 'text-foreground/60 hover:text-foreground bg-muted/60 hover:bg-muted/40'
              }`}
              aria-pressed={!isAnnual}
              aria-label="Select monthly pricing"
            >
              {t('toggle.monthly')}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                isAnnual
                  ? 'glass text-foreground shadow-lg hover:shadow-xl'
                  : 'text-foreground/60 hover:text-foreground bg-muted/60 hover:bg-muted/40'
              }`}
              aria-pressed={isAnnual}
              aria-label="Select annual pricing"
            >
              {t('toggle.annually')}
            </button>
          </div>
          {isAnnual && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge variant="success" className="px-4 py-1.5">
                {t('toggle.save')}
              </Badge>
            </motion.div>
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
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
                  className={`w-full ${plan.popular ? 'border-2 border-primary' : ''}`}
                  asChild
                >
                  <Link href={`/${locale}/support`}>
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
