'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('features'), href: `/${locale}/features` },
    { name: t('pricing'), href: `/${locale}/pricing` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('support'), href: `/${locale}/support` },
  ];

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full overflow-visible pt-4">
      <nav className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto rounded-2xl glass-strong shadow-lg overflow-visible">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center space-x-2 group"
        >
          <div 
            className="flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.2) 70%, transparent 100%)'
                : 'radial-gradient(circle, rgba(209,213,219,0.9) 0%, rgba(209,213,219,0.4) 70%, transparent 100%)'
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
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            Sostentia Desk
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            {/* <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={`/${locale}/login`}>{t('login')}</Link>
            </Button> */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </button>
            )}
            <Button
              variant="primary"
              size="sm"
              asChild
            >
              <Link href={`/${locale}/support`}>{t('getStarted')}</Link>
            </Button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300 md:hidden"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              suppressHydrationWarning
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop con blur */}
          <div
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menú fullscreen */}
          <div className="fixed inset-0 top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-40 md:hidden">
            {/* Botón para cerrar en la esquina superior derecha */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-8 w-8 text-primary" />
            </button>

            {/* Items del menú alineados verticalmente */}
            <div className="flex flex-col items-center justify-center gap-4 px-4 w-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group px-8 py-4 rounded-lg text-2xl font-semibold text-foreground transition-all duration-300 flex items-center gap-2"
                >
                  <span className="group-hover:-translate-x-3 transition-transform duration-300">
                    {item.name}
                  </span>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              ))}

              {/* Language Selector y Button alineados con los links */}
              <div className="flex flex-col items-center gap-6 mt-8">
                <LanguageSelector />
                <Button
                  variant="primary"
                  size="md"
                  asChild
                >
                  <Link href={`/${locale}/support`}>{t('getStarted')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
