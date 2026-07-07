'use client';

import { AuthUser } from '@/types/auth';
import { ChevronDown, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

type Props = {
  currentUser: AuthUser;
  style: 'black' | 'white';
};

export function UserMenu({ currentUser, style }: Props) {
  return (
    <div className='group relative py-3'>
      <button
        type='button'
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-green-500 ${
          style === 'white'
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-white hover:bg-black/30'
        }`}
        aria-haspopup='menu'
      >
        <CircleUserRound className='h-5 w-5' aria-hidden='true' />
        <span className='max-w-32 truncate'>{currentUser.name}</span>
        <ChevronDown
          className='h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180'
          aria-hidden='true'
        />
      </button>

      <div
        role='menu'
        className='invisible absolute right-0 top-full z-50 w-44 translate-y-1 rounded-xl border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'
      >
        <Link
          href='/my'
          role='menuitem'
          className='block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus-visible:bg-gray-100'
        >
          나의 명륜당
        </Link>
        <LogoutButton style={style} variant='menu-item' />
      </div>
    </div>
  );
}
