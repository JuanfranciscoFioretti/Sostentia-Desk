import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Solo intercepta la raíz
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
  
  // Todo lo demás pasa normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
