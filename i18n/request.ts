import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locale as localeParam } from 'next/root-params';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: localeOverride }) => {
  // 显式 locale（如 Server Action）优先；否则从 `[locale]` 根段读取
  let locale = localeOverride;

  if (!locale) {
    const paramValue = await localeParam();

    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else if (paramValue == null) {
      // 非 `[locale]` 路由（如 public 页面）回退默认语言
      locale = routing.defaultLocale;
    } else {
      notFound();
    }
  }
  return {
    locale,
    messages: (
      await (locale === 'zh'
        ? // When using Turbopack, this will enable HMR for `zh`
          import('../messages/zh.json')
        : import(`../messages/${locale}.json`))
    ).default,
  };
});
