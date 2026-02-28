export default function CategoryCard({ title, items }: { title: string; items: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-5 transition-colors hover:border-accent-300 dark:hover:border-accent-500/50">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{items}</p>
    </div>
  );
}
