'use client';

import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';

export default function NavigationLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'inline-block px-2 py-3 transition-colors',
        isActive
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      )}
      href={href}
      {...rest}
    />
  );
}
