'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Linkedin, Instagram, Globe } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const productLinks = [
    { name: t('product.links.features'), href: `/${locale}/features` },
    { name: t('product.links.pricing'), href: `/${locale}/pricing` },
    { name: t('product.links.security'), href: `/${locale}/security` },
    { name: t('product.links.roadmap'), href: `/${locale}/roadmap` },
    { name: t('product.links.changelog'), href: `/${locale}/changelog` },
  ];

  const companyLinks = [
    { name: t('company.links.about'), href: `/${locale}/about` },
    { name: t('company.links.careers'), href: `/${locale}/careers` },
    { name: t('company.links.blog'), href: `/${locale}/blog` },
    { name: t('company.links.press'), href: `/${locale}/press` },
    { name: t('company.links.contact'), href: `/${locale}/support` },
  ];

  const resourceLinks = [
    { name: t('resources.links.documentation'), href: `/${locale}/docs` },
    { name: t('resources.links.api'), href: `/${locale}/api` },
    { name: t('resources.links.support'), href: `/${locale}/support` },
    { name: t('resources.links.community'), href: `/${locale}/community` },
    { name: t('resources.links.status'), href: `/${locale}/status` },
  ];

  const legalLinks = [
    { name: t('legal.links.privacy'), href: `/${locale}/privacy` },
    { name: t('legal.links.terms'), href: `/${locale}/terms` },
    { name: t('legal.links.cookies'), href: `/${locale}/cookies` },
    { name: t('legal.links.licenses'), href: `/${locale}/licenses` },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/sostentia/posts/?feedView=all', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/sostentia/', label: 'Instagram' },
    { icon: Globe, href: 'https://sostentia.com/', label: 'Website' },
  ];

  return (
    <footer className="border-t border-border glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link
              href="https://sostentia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 group mb-4"
            >
              <div 
                className="flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-300"
                style={{
                  background: theme === 'dark'
                    ? 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.2) 70%, transparent 100%)'
                    : 'radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.5) 70%, transparent 100%)'
                }}
              >
                <Image
                  src="/S-white.png"
                  alt="Sostentia Desk Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                Sostentia Desk
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              {t('tagline')}
            </p>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">{t('newsletter.title')}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t('newsletter.description')}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2" suppressHydrationWarning>
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-9 text-sm"
                  suppressHydrationWarning
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  suppressHydrationWarning
                >
                  {t('newsletter.button')}
                </Button>
              </form>
              {status === 'success' && (
                <p className="text-xs text-primary mt-2">{t('newsletter.success')}</p>
              )}
            </div>
          </div>

          {/* Product Links - Características, precios, seguridad y roadmap del producto
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('product.title')}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}

          {/* Company Links - Información sobre la empresa, equipo y blog
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('company.title')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}

          {/* Resources Links - Documentación, API, soporte y comunidad
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('resources.title')}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}

          {/* Legal Links - Privacidad, términos de servicio, cookies y licencias
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('legal.title')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026{' '}
            <a
              href="https://sostentia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Sostentia Desk
            </a>
            {locale === 'es' ? '. Todos los derechos reservados.' : '. All rights reserved.'}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:bg-primary/10 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
