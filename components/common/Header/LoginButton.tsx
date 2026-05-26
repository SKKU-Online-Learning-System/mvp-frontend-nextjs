'use client';

import { clearLoggedOutMarker, setLocalDevUser } from '@/app/api/auth';
import { Style } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = Style;

const isDevelopment = process.env.NODE_ENV === 'development';
const localLoginGlsId =
  process.env.NEXT_PUBLIC_LOCAL_LOGIN_GLS_ID ?? 'local-dev';
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

const isLocalApiBaseUrl = (url?: string) => {
  if (!url) {
    return false;
  }

  try {
    const hostname = new URL(url).hostname;

    return ['localhost', '127.0.0.1', '::1'].includes(hostname);
  } catch {
    return false;
  }
};

const shouldUseBackdoor = isDevelopment && isLocalApiBaseUrl(apiBaseUrl);

export function LoginButton({ style }: Props) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const className = cn(
    'group inline-flex h-7 w-max items-center justify-center rounded-md bg-my-background px-4 py-2 text-xs font-extrabold focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-60',
    style === 'white'
      ? 'text-gray-500 hover:bg-accent hover:text-gray-700 focus:bg-accent focus:text-accent-foreground'
      : 'text-white hover:bg-black/40 hover:text-my-accent-foreground focus:bg-my-accent focus:text-my-accent-foreground'
  );

  const handleLocalLogin = async () => {
    if (isLoggingIn) {
      return;
    }

    clearLoggedOutMarker();
    setIsLoggingIn(true);

    if (!shouldUseBackdoor) {
      setLocalDevUser();
      window.location.reload();
      return;
    }

    try {
      const response = await fetch(
        `/api/backdoor?glsId=${encodeURIComponent(localLoginGlsId)}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('local login failed');
      }

      window.location.reload();
    } catch {
      setLocalDevUser();
      window.location.reload();
    }
  };

  const handleSsoLogin = () => {
    clearLoggedOutMarker();
  };

  return (
    <div className='flex h-full w-[150px] flex-col items-end justify-end pb-2'>
      {isDevelopment ? (
        <button
          type='button'
          onClick={handleLocalLogin}
          disabled={isLoggingIn}
          className={className}
        >
          LOGIN
        </button>
      ) : (
        <Link
          href='https://login.skku.edu/?retUrl=i0u4a8g61ure5516k3z6'
          onClick={handleSsoLogin}
          className={className}
        >
          LOGIN
        </Link>
      )}
    </div>
  );
}
