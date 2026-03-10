'use client';

import { Container } from '@/components/ui/Container';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

export default function RegisterPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <section className="pt-40 pb-24">
      <Container size="lg">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Account</h1>
          <p className="text-lg text-muted-foreground">Start your 14-day free trial today. No credit card required.</p>
        </div>

        <RegistrationForm locale={locale} />
      </Container>
    </section>
  );
}
