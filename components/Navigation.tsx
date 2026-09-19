import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <div className="border-b border-gray-200 bg-white dark:border-transparent dark:bg-slate-850">
      <nav className="container flex justify-between p-2 text-gray-800 dark:text-white">
        <div>
          <NavigationLink href='/'>{t('home')}</NavigationLink>
          <NavigationLink href='/pathnames'>{t('pathnames')}</NavigationLink>
        </div>
        <div className="flex items-center">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
