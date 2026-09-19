// 不参与 i18n 路由的公共页面路径（访问时不加语言前缀、不重定向）
export const publicPaths = ['about'] as const;

export type PublicPath = (typeof publicPaths)[number];
