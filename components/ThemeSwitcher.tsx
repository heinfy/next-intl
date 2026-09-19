'use client';

import { useTranslations } from 'next-intl';
import ThemeSwitcherSelect from './ThemeSwitcherSelect';

export default function ThemeSwitcher() {
  const t = useTranslations('ThemeSwitcher');

  return (
    <ThemeSwitcherSelect
      label={t('label')}
      options={[
        { value: 'light', label: t('light') },
        { value: 'dark', label: t('dark') },
        { value: 'system', label: t('system') }
      ]}
    />
  );
}
