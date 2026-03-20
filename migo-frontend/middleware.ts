import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'kz', 'kg', 'uz', 'tj'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/django-admin') ||
    pathname.startsWith('/_next')
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|admin|django-admin).*)',
  ],
};
