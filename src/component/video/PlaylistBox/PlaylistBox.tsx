import styles from "./PlaylistBox.module.css";

export function PlaylistBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${styles.scrollbar} mr-12 flex h-[80vh] w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-green-900 px-5 pb-5`}
    >
      <p className="sticky top-0 z-10 bg-green-900 pt-5 text-[1.7rem] font-semibold text-white">
        재생 목록
      </p>
      {children}
    </div>
  );
}
