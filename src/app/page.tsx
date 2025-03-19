import { cookies } from "next/headers";
import { Header } from "@/component/common/Header";
import { MainGridContainer } from "@/component/main/MainContent";
import LeftSideBar from "@/component/main/SideBar/LeftSideBar";

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token");
  // const accessToken = cookieStore.get("access-token");

  return (
    <div>
      <Header refreshToken={refreshToken} />
      <div className="flex pt-[8rem] max-[944px]:pt-[12rem]">
        <LeftSideBar refreshToken={refreshToken} />
        <MainGridContainer />
      </div>
    </div>
  );
}
