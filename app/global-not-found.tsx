import BaseLayout from '@/components/BaseLayout';
import NotFoundPage from '@/components/NotFoundPage';
import { routing } from '@/i18n/routing';
import './styles.css';

// 全局 404：不经过根 layout，需自行引入样式与完整文档结构（由 BaseLayout 提供）
export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
