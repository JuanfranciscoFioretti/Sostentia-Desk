'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { registerSchema, type RegisterFormData } from '@/lib/validations/register';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface RegistrationFormProps {
  locale: string;
}

export function RegistrationForm({ locale }: RegistrationFormProps) {
  const t = useTranslations('register.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const useCaseOptions = [
    { value: 'projectManagement', label: t('useCaseOptions.projectManagement') },
    { value: 'customerService', label: t('useCaseOptions.customerService') },
    { value: 'sales', label: t('useCaseOptions.sales') },
    { value: 'operations', label: t('useCaseOptions.operations') },
    { value: 'other', label: t('useCaseOptions.other') },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t('firstName')}
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label={t('lastName')}
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        {/* Email */}
        <Input
          label={t('email')}
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        {/* Company */}
        <Input
          label={t('company')}
          {...register('company')}
          error={errors.company?.message}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t('password')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label={t('confirmPassword')}
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Phone (Optional) */}
        <Input
          label={t('phone')}
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />

        {/* Use Case */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-foreground">
            {t('useCase')}
          </label>
          <select
            {...register('useCase')}
            className="flex h-11 w-full rounded-lg glass px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <option value="">Select...</option>
            {useCaseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.useCase && (
            <p className="mt-1 text-sm text-red-500">{errors.useCase.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('terms')}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <label className="text-sm text-muted-foreground">
            {t('terms')}
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500">{errors.terms.message}</p>
        )}

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
          >
            {t('success')}
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
          >
            {t('error')}
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={status === 'loading'}
        >
          {status === 'loading' ? t('submitting') : t('submit')}
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          {t('haveAccount')}{' '}
          <Link
            href={`/${locale}/login`}
            className="text-primary hover:underline font-medium"
          >
            {t('login')}
          </Link>
        </p>
      </form>
    </Card>
  );
}
