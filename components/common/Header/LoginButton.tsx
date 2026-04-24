'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Style } from '@/components/ui/navigation-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

type Props = Style;

const loginOptions = [
    {
        label: 'Google 로그인',
        description: '구글 계정으로 로그인합니다.',
        href: '/api/auth/google/login',
    },
    {
        label: '킹고ID 로그인',
        description: '성균관대 킹고ID로 로그인합니다.',
        href: 'https://login.skku.edu/?retUrl=i0u4a8g61ure5516k3z6',
    },
];

export function LoginButton({ style }: Props) {
    return (
        <div className="flex flex-col justify-end items-end h-full pb-2 w-[150px]">
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'group inline-flex h-7 w-max items-center justify-center gap-1 rounded-md bg-my-background px-4 py-2 text-xs font-extrabold focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
                            style === 'white'
                                ? 'text-gray-500 hover:bg-accent hover:text-gray-700 focus:bg-accent focus:text-accent-foreground'
                                : 'text-white hover:bg-black/40 hover:text-my-accent-foreground focus:bg-my-accent focus:text-my-accent-foreground'
                        )}
                    >
                        LOGIN
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-64 p-2">
                    <div className="space-y-1">
                        {loginOptions.map((option) => (
                            <Link
                                key={option.label}
                                href={option.href}
                                className="block rounded-md px-3 py-2 hover:bg-accent transition"
                            >
                                <div className="text-sm font-semibold">
                                    {option.label}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {option.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
