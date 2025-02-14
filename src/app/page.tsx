import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import { IoHome, IoTimeSharp, IoPerson } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";

import { Header, SearchBar, LoginButton } from "@/component/common/Header";
import { SideBar, SideBarButton } from "@/component/main/SideBar";
import {
  MainGridContainer,
  MainContentCard,
} from "@/component/main/MainContent";
import mrdang_logo from "@/asset/mrdang_logo.svg";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token");
  const refreshToken = cookieStore.get("refresh-token");

  return (
    <div>
      <Header>
        <Link href="/">
          <Image src={mrdang_logo} alt="mrdang logo" />
        </Link>
        <SearchBar />
        <LoginButton />
      </Header>
      <div className="flex flex-row-reverse">
        <SideBar>
          <SideBarButton icon={IoHome} text="홈" />
          <SideBarButton icon={IoTimeSharp} text="수강하던 강의" />
          <hr />
          <SideBarButton icon={IoPerson} text="내 페이지" />
          {accessToken && refreshToken ? (
            <>
              <hr />
              <Link href="/upload">
                <SideBarButton icon={MdFileUpload} text="업로드" />
              </Link>
            </>
          ) : null}
        </SideBar>
        <MainGridContainer>
          {Array.from({ length: 100 }, (_, index) => (
            <MainContentCard key={index} />
          ))}
        </MainGridContainer>
      </div>
    </div>
  );
}
