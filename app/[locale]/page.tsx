import PageLayout from '@/components/PageLayout';
import { getTranslations } from 'next-intl/server';

export default async function IndexPage() {
  const t = await getTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
      <p className='max-w-[590px]'>
        {t.rich('description', {
          code: chunks => <code className='font-mono text-gray-800 dark:text-white'>{chunks}</code>,
        })}
      </p>
    </PageLayout>
  );
}
