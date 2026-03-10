'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
              S
            </span>
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-6 pt-2 space-y-2 px-4 sm:px-6 lg:px-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 px-4 pt-4 border-t border-border">
            <LanguageSelector />
          </div>
          <div className="flex flex-col gap-2 px-4 pt-2">
            {/* <Button
              variant="ghost"
              size="md"
              className="w-full"
              asChild
            >
              <Link href={`/${locale}/login`}>{t('login')}</Link>
            </Button> */}
            <Button
              variant="primary"
              size="md"
              className="w-full"
              asChild
            >
              <Link href={`/${locale}/support`}>{t('getStarted')}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
