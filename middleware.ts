import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, timeZone } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  timeZone
});

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\..*|images).*)',
  ],
};
