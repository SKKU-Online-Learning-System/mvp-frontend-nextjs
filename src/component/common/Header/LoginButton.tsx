import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="https://login.skku.edu/?retUrl=i0u4a8g61ure5516k3z6"
      className="flex h-12 w-[6rem] cursor-pointer items-center justify-center rounded-xl border px-4 font-bold text-green-800 max-sm:text-sm min-[768px]:max-[845px]:text-sm"
    >
      로그인
    </Link>
  );
}
