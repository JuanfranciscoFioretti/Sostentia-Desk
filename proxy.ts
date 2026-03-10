import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Inline to avoid Edge Runtime import resolution issues
const LOCALES = ['en', 'es'];
const DEFAULT_LOCALE = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect / to /en, /about to /en/about — no trailing slash
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${cleanPath}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
