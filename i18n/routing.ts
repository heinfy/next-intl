import { defineRouting } from 'next-intl/routing';

export const locales = ['zh', 'en', 'de'];

const pathnames = {
  [locales[0]]: '/路径名称',
  [locales[1]]: '/pathnames',
  [locales[2]]: '/pfadnamen'
};

export const routing = defineRouting({
  locales: locales,
  defaultLocale: locales[0],
  pathnames: {
    '/': '/',
    '/pathnames': pathnames
  }
});
