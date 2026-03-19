import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'kz', 'kg', 'uz', 'tj'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Исключаем системные файлы, api и админку
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next')
  ) {
    return;
  }

  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Перенаправляем на дефолтную локаль
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Пропускаем все пути, кроме тех, что должны быть локализованы
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|admin).*)',
  ],
};
