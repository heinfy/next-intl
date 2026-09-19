type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ExternalLink({ description, href, title }: Props) {
  return (
    <a
      className="inline-block rounded-md border border-gray-300 bg-white/60 p-8 transition-colors hover:border-gray-500 dark:border-gray-700 dark:bg-transparent dark:hover:border-gray-400"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <p className="text-xl font-semibold text-gray-900 dark:text-white">
        {title} <span className="ml-2 inline-block">→</span>
      </p>
      <p className="mt-2 max-w-[250px] text-gray-600 dark:text-gray-400">{description}</p>
    </a>
  );
}
