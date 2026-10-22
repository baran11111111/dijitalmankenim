interface SimplePageProps {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

export function SimplePage({ eyebrow, title, children }: SimplePageProps) {
  return (
    <div className="bg-paper px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-wine">{eyebrow}</p>
        <h1 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-7xl">{title}</h1>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-stone [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_strong]:text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}
