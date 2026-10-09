import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en', 'de'],
  defaultLocale: 'zh',
  // 默认语言不在 URL 中带前缀：`/` 即中文，`/en` 等仍带前缀
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/pathnames': {
      zh: '/路径名称',
      en: '/pathnames',
      de: '/pfadnamen',
    },
  },
});

// 从 routing 派生 next-intl 类型安全的 locales 和 defaultLocale
export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale: Locale = routing.defaultLocale;
