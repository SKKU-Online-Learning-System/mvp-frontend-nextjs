import Link from "next/link";
import Image from "next/image";

import {
  SearchBar,
  LoginButton,
  LogoutButton,
} from "@/component/common/Header";
import mrdang_logo from "@/asset/mrdang_logo.svg";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
// import { PlaylistBox, PlaylistCard } from "@/component/video/PlaylistBox";

type Props = {
  refreshToken?: RequestCookie;
};

export function Header({ refreshToken }: Props) {
  return (
    <>
      <div className="sticky top-0 z-10 flex flex-row items-end justify-between bg-white px-12 py-8">
        <Link href="/">
          <Image src={mrdang_logo} alt="mrdang logo" />
        </Link>
        <SearchBar />
        {refreshToken ? <LogoutButton /> : <LoginButton />}
      </div>
    </>
  );
}
