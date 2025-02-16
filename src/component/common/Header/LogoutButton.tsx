"use client";

import { logout } from "@/action/auth";

export function LogoutButton() {
  return (
    <div
      onClick={logout}
      className="flex h-12 cursor-pointer items-center rounded-xl border px-4 font-bold text-green-800"
    >
      로그아웃
    </div>
  );
}
