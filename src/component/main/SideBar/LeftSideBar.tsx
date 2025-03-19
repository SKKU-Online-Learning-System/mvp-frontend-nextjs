import Link from "next/link";
import { IoHome /*, IoTimeSharp, IoPerson*/ } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { SideBar, SideBarButton } from "@/component/main/SideBar";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props = {
  refreshToken: RequestCookie | undefined;
};

export default function LeftSideBar({ refreshToken }: Props) {
  return (
    <SideBar>
      <Link href="/">
        <SideBarButton icon={IoHome} text="홈" />
      </Link>
      {/* <SideBarButton icon={IoTimeSharp} text="수강하던 강의" /> */}
      {/* <hr /> */}
      {/* <SideBarButton icon={IoPerson} text="내 페이지" /> */}
      {refreshToken ? (
        <>
          <hr />
          <Link href="/upload">
            <SideBarButton icon={MdFileUpload} text="업로드" />
          </Link>
        </>
      ) : null}
      <Link href="/textbook">
        <SideBarButton icon={FaBookOpen} text="교재" />
      </Link>
    </SideBar>
  );
}
