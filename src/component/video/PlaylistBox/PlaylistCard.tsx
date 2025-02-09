import Link from "next/link";

export function PlaylistCard() {
  const description =
    "성균관대 소프트웨어융합대학에서 일반인을 대상으로 제공하는 IT특강입니다. 다양한 강의가 많이 준비되어 있습니다. 많은 참여 부탁드립니다. 성균관대 소프트웨어융합대학에서 일반인을 대상으로 제공하는 IT특강입니다. 다양한 강의가 많이 준비되어 있습니다. 많은 참여 부탁드립니다.";
  const time = 3;
  return (
    <Link
      href="/video?youtubeId=_yoKvywDpE0"
      className="flex flex-row items-center justify-between rounded-lg bg-gray-200 py-4"
    >
      <div className="mx-4 h-32 w-1/3 rounded-xl bg-white"></div>
      <div className="my-2 flex w-2/3 flex-col pr-4">
        <p className="line-clamp-3">{description}</p>
        <p className="mt-2 text-gray-500">약 {time}시간 소요</p>
      </div>
    </Link>
  );
}
