'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function SupportForm() {
  const t = useTranslations('support.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    plan: 'starter',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', plan: 'starter' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section background="muted" className="pt-20">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label={t('email')}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('phone')}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-4">{t('plan')}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'starter', name: 'Starter', price: '$497/month' },
                    { value: 'growth', name: 'Growth', price: '$597/month' },
                    { value: 'enterprise', name: 'Enterprise Pro', price: '$1,290/month' },
                  ].map((plan) => (
                    <label
                      key={plan.value}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-lg glass cursor-pointer transition-all duration-300 ${
                        formData.plan === plan.value
                          ? 'ring-2 ring-primary bg-primary/10'
                          : 'hover:ring-1 hover:ring-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan.value}
                        checked={formData.plan === plan.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary mb-2">
                        {formData.plan === plan.value && (
                          <Check className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <span className="font-semibold text-center">{plan.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">{plan.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label={t('subject')}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <Textarea
                label={t('message')}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />

              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                  {t('success')}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                  {t('error')}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={status === 'loading'}
              >
                {t('submit')}
              </Button>
            </form>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
