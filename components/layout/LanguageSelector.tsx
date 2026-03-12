'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleLocaleChange = (newLocale: string) => {
    // If we're on a blog post page, go to the blog page instead of trying to use the same slug
    if (pathname.includes('/blog/')) {
      router.push('/blog', { locale: newLocale });
    } else {
      router.push(pathname, { locale: newLocale });
    }
    setIsOpen(false);
  };

  const languages = {
    en: { name: 'English', flag: 'ENG' },
    es: { name: 'Español', flag: '🇪🇸' },
    da: { name: 'Dansk', flag: '🇩🇰' },
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className={locale === 'en' ? 'text-[10px] font-bold leading-none' : 'text-sm'}>
          {languages[locale as keyof typeof languages].flag}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              right: `${menuPosition.right}px`,
            }}
            className="w-48 glass rounded-2xl shadow-xl z-50 overflow-hidden border border-border/50"
          >
            <div className="py-2">
              {locales.map((loc, index) => (
                <motion.button
                  key={loc}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                    locale === loc
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  <span className={loc === 'en' ? 'text-[10px] font-bold leading-none' : 'text-sm'}>{languages[loc].flag}</span>
                  <span className="flex-1 text-left">{languages[loc].name}</span>
                  {locale === loc && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

