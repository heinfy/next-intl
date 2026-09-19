import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en', 'de'],
  defaultLocale: 'zh',
  pathnames: {
    '/': '/',
    '/pathnames': {
      zh: '/路径名称',
      en: '/pathnames',
      de: '/pfadnamen'
    }
  }
});

// 从 routing 派生 next-intl 类型安全的 locales 和 defaultLocale
export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale: Locale = routing.defaultLocale;
