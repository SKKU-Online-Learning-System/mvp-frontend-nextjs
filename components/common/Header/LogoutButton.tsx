'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/api/auth';
import { Style } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

type Props = Style & {
    variant?: 'button' | 'menu-item';
};

export function LogoutButton({ style, variant = 'button' }: Props) {
    const router = useRouter();

    const handleLogout = async () => {
        const success = await logoutUser();

        if (!success) return;

        router.replace('/');
        router.refresh();
    };

    if (variant === 'menu-item') {
        return (
            <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus-visible:bg-gray-100"
            >
                로그아웃
            </button>
        );
    }

    return (
        <div className="flex flex-col justify-end items-end h-full pb-2 w-[150px] cursor-pointer">
            <button
                type="button"
                onClick={handleLogout}
                className={cn(
                    'group inline-flex h-7 w-max items-center justify-center rounded-md bg-my-background px-4 py-2 text-xs font-extrabold focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
                    style === 'white'
                        ? 'text-gray-500 hover:bg-accent hover:text-gray-700 focus:bg-accent focus:text-accent-foreground'
                        : 'text-white hover:bg-black/40 hover:text-my-accent-foreground focus:bg-my-accent focus:text-my-accent-foreground'
                )}
            >
                LOGOUT
            </button>
        </div>
    );
}
