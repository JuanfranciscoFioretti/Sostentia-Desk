export const locales = ['en', 'es', 'da'] as const;
export const defaultLocale = 'en' as const;
export const timeZone = 'UTC' as const;

export type Locale = (typeof locales)[number];
