import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="https://login.skku.edu/?retUrl=i0u4a8g61ure5516k3z6"
      className="flex h-12 cursor-pointer items-center rounded-xl border px-4 font-bold text-green-800"
    >
      로그인
    </Link>
  );
}
