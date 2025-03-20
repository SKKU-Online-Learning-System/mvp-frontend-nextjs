export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-0 mt-4 flex w-[10rem] flex-col gap-5 max-sm:w-[8rem]">
      {children}
    </div>
  );
}
