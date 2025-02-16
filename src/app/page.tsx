import Link from "next/link";
import { cookies } from "next/headers";

import { IoHome, IoTimeSharp, IoPerson } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";

import { Header } from "@/component/common/Header";
import { SideBar, SideBarButton } from "@/component/main/SideBar";
import { MainGridContainer } from "@/component/main/MainContent";

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token");
  // const accessToken = cookieStore.get("access-token");

  return (
    <div>
      <Header refreshToken={refreshToken} />
      <div className="flex flex-row-reverse">
        <SideBar>
          <SideBarButton icon={IoHome} text="홈" />
          <SideBarButton icon={IoTimeSharp} text="수강하던 강의" />
          <hr />
          <SideBarButton icon={IoPerson} text="내 페이지" />
          {refreshToken ? (
            <>
              <hr />
              <Link href="/upload">
                <SideBarButton icon={MdFileUpload} text="업로드" />
              </Link>
            </>
          ) : null}
        </SideBar>
        <MainGridContainer />
      </div>
    </div>
  );
}
