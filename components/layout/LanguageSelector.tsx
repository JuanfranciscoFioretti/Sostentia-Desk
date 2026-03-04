'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';
import { Globe, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">
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
            className="absolute right-0 top-full mt-2 w-48 glass rounded-2xl shadow-xl z-50 overflow-hidden border border-border/50"
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
                  <span className="text-lg">{languages[loc].flag}</span>
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

