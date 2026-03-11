
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, timeZone, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (await import(`./locales/${locale}.json`)) as any;

  return {
    locale,
    messages: messages.default ?? messages,
    timeZone,
  };
});
