export function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-10 flex flex-row items-end justify-between bg-white px-12 py-8">
        {children}
      </div>
    </>
  );
}
