import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale; // 从请求中提取到的语言环境标识符
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (
      await (locale === 'zh'
        ? // When using Turbopack, this will enable HMR for `zh`
          import('../messages/zh.json')
        : import(`../messages/${locale}.json`))
    ).default
  };
});
