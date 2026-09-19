'use client';

import clsx from 'clsx';
import { useTheme } from '@/components/ThemeProvider';
import { ChangeEvent, useEffect, useState } from 'react';

type ThemeOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: ThemeOption[];
};

export default function ThemeSwitcherSelect({ label, options }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后再渲染，避免 hydration 不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setTheme(event.target.value);
  }

  if (!mounted) {
    return (
      <label className="relative text-gray-500 opacity-0 dark:text-gray-400">
        <p className="sr-only">{label}</p>
        <select
          className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
          disabled
        >
          <option />
        </select>
      </label>
    );
  }

  return (
    <label className={clsx('relative text-gray-500 dark:text-gray-400')}>
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        onChange={onSelectChange}
        value={theme}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
