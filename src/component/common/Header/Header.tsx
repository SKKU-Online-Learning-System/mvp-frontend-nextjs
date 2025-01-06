export function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row items-end justify-between px-12 py-8">
        {children}
      </div>
    </>
  );
}
