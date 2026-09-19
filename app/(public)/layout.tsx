import ThemeProvider from '@/components/ThemeProvider';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
};

// 公共页面独立布局，不依赖 [locale] 与 next-intl
export default function PublicLayout({ children }: Props) {
  return (
    <html
      className="h-full"
      lang="zh"
      suppressHydrationWarning
    >
      <body
        className={clsx(
          inter.className,
          'flex h-full flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
