import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { publicPaths } from './i18n/publicPaths';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

function isPublicPath(pathname: string) {
  return publicPaths.some(
    (path) => pathname === `/${path}` || pathname.startsWith(`/${path}/`)
  );
}

export default function proxy(request: NextRequest) {
  // 公共页面不走 i18n 路由，避免重定向到 /zh/... 等语言路径
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
