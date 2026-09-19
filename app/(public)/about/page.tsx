import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们'
};

// 公共页面：直接访问 /about，不会重定向到 /zh/about
export default function AboutPage() {
  return (
    <main className="container mx-auto flex grow flex-col px-4 py-16">
      <h1 className="text-3xl font-semibold">关于我们</h1>
      <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-300">
        这是一个公共页面，访问路径为{' '}
        <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">/about</code>
        ，不会自动重定向到带语言前缀的路径。
      </p>
    </main>
  );
}
