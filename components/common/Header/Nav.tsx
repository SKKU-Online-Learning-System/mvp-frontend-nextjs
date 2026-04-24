'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { LoginButton } from './LoginButton';
import Logo from './Logo';
import { LogoutButton } from './LogoutButton';
import { MobileMenu } from './MobileMenu';
import { MyNavigationMenu } from './MyNavigationMenu';

type Props = {
    refreshToken?: unknown;
    style?: 'black' | 'white';
};

export default function Nav({ style = 'black' }: Props) {
    const navRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);
    const { currentUser } = useCurrentUser();

    React.useEffect(() => {
        const check = () => {
            if (!navRef.current || !menuRef.current) return;

            const navWidth = navRef.current.clientWidth;
            const menuWidth = menuRef.current.scrollWidth;
            const reserved = 350;
            const shouldCollapse = menuWidth + reserved > navWidth;

            setCollapsed((prev) =>
                prev === shouldCollapse ? prev : shouldCollapse
            );
        };

        const resizeObserver = new ResizeObserver(check);

        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }

        window.addEventListener('resize', check);
        check();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', check);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className={`flex w-full h-16 ${
                style === 'white' ? 'bg-white shadow-md' : 'bg-black/40'
            } fixed items-center px-6 z-50`}
        >
            <div className="shrink-0">
                <Logo />
            </div>

            <div className="flex-1 flex justify-center min-w-0">
                {!collapsed && <MyNavigationMenu style={style} />}
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {currentUser ? (
                    <div className="flex items-center gap-3">
                        <span
                            className={`hidden sm:block text-sm ${
                                style === 'white' ? 'text-gray-600' : 'text-white'
                            }`}
                        >
                            {currentUser.name}
                        </span>
                        <LogoutButton style={style} />
                    </div>
                ) : (
                    <LoginButton style={style} />
                )}

                {collapsed && (
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button type="button">
                                <Menu
                                    className={
                                        style === 'white'
                                            ? 'text-black'
                                            : 'text-white'
                                    }
                                />
                            </button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-[340px] px-6 py-8 bg-background/95 backdrop-blur-xl border-l"
                        >
                            <SheetTitle className="sr-only">메뉴</SheetTitle>

                            <MobileMenu
                                style={style}
                                currentUser={currentUser}
                                setOpen={setOpen}
                            />
                        </SheetContent>
                    </Sheet>
                )}
            </div>

            <div className="absolute invisible pointer-events-none h-0 overflow-hidden">
                <div ref={menuRef}>
                    <MyNavigationMenu style={style} />
                </div>
            </div>
        </nav>
    );
}
