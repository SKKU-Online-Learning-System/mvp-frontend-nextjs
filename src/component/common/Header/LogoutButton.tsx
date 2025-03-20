"use client";

import { logout } from "@/action/auth";

export function LogoutButton() {
  return (
    <div
      onClick={logout}
      className="flex h-12 w-[7.4rem] cursor-pointer items-center justify-center rounded-xl border px-4 font-bold text-green-800 max-sm:text-sm min-[768px]:max-[845px]:text-sm"
    >
      로그아웃
    </div>
  );
}
