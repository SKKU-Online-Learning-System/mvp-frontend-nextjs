export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-0 mt-4 flex w-64 flex-col gap-5">{children}</div>
  );
}
