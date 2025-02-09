import Image from "next/image";
import search_button from "@/asset/search_button.svg";

export function SearchBar() {
  return (
    <div className="flex h-12 items-center rounded-xl border px-4">
      <input
        type="text"
        placeholder="명륜당에서 원하는 강의를 찾아보세요!"
        className="w-[40rem] flex-1 border-none outline-none focus:ring-0"
      />
      <button className="flex items-center justify-center rounded-full">
        <Image src={search_button} alt="search button" width={30} height={30} />
      </button>
    </div>
  );
}
