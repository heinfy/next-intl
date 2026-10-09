import PageLayout from '@/components/PageLayout';
import { getTranslations } from 'next-intl/server';

export default async function PathnamesPage() {
  const t = await getTranslations('PathnamesPage');

  return (
    <PageLayout title={t('title')}>
      <div className='max-w-[490px]'>
        {t.rich('description', {
          p: chunks => <p className='mt-4'>{chunks}</p>,
          code: chunks => <code className='font-mono text-gray-800 dark:text-white'>{chunks}</code>,
        })}
      </div>
    </PageLayout>
  );
}
