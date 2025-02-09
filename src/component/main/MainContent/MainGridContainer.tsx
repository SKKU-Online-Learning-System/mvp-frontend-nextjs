export function MainGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-[calc(100vw-20rem)] gap-6 pr-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-8">
      {children}
    </div>
  );
}
