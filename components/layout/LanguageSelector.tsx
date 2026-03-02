'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useState } from 'react';

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
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">
          {languages[locale as keyof typeof languages].flag}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-background border border-border rounded-lg shadow-lg z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${
                locale === loc ? 'text-primary font-medium' : 'text-foreground'
              }`}
            >
              <span className="text-lg">{languages[loc].flag}</span>
              <span>{languages[loc].name}</span>
              {locale === loc && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
