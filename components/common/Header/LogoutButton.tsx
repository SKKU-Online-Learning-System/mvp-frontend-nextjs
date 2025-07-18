'use client';

import { logout } from '@/actions/auth';
import { Style } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

type Props = Style;

export function LogoutButton({ style }: Props) {
  return (
    <div className='flex flex-col justify-end items-end h-full pb-2 w-[150px]'>
      <div
        onClick={logout}
        className={cn(
          'group inline-flex h-7 w-max items-center justify-center rounded-md bg-my-background px-4 py-2 text-xs font-extrabold focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
          style === 'white'
            ? 'text-gray-400 hover:bg-accent hover:text-gray-500 focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50'
            : 'text-white hover:bg-black/40 hover:text-my-accent-foreground focus:bg-my-accent focus:text-my-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-black/40 data-[state=open]:text-my-accent-foreground data-[state=open]:focus:bg-my-accent data-[state=open]:bg-black/40'
        )}
      >
        LOGOUT
      </div>
    </div>
  );
}
