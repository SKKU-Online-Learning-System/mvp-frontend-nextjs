'use client';

import { logout } from '@/app/action/auth';

export function LogoutButton() {
  return (
    <div
      onClick={logout}
      className='group inline-flex text-white h-7 w-max items-center justify-center rounded-md bg-my-background px-4 py-2 text-xs font-extrabold hover:bg-black/40 hover:text-my-accent-foreground focus:bg-my-accent focus:text-my-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-black/40 data-[state=open]:text-my-accent-foreground data-[state=open]:focus:bg-my-accent data-[state=open]:bg-black/40 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
    >
      LOGOUT
    </div>
  );
}
