import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    // 多根 layout 场景下用 global-not-found 替代 app/layout.tsx 透传
    globalNotFound: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
