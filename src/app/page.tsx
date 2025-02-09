import Image from "next/image";
import Link from "next/link";
import { IoHome, IoTimeSharp, IoPerson } from "react-icons/io5";

import { Header, SearchBar, LoginButton } from "@/component/common/Header";
import { SideBar, SideBarButton } from "@/component/main/SideBar";
import {
  MainGridContainer,
  MainContentCard,
} from "@/component/main/MainContent";
import mrdang_logo from "@/asset/mrdang_logo.svg";

export default function Home() {
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
