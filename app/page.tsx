import { defaultLocale } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// 访问根路径 `/` 时，重定向到默认语言页面
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
