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
    const logoRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const authMeasureRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);
    const { currentUser } = useCurrentUser();

    React.useEffect(() => {
        let isMounted = true;
        let previousWidth = window.innerWidth;

        const check = () => {
            if (
                !isMounted ||
                !navRef.current ||
                !logoRef.current ||
                !menuRef.current ||
                !authMeasureRef.current
            ) {
                return;
            }

            const navStyle = window.getComputedStyle(navRef.current);
            const navWidth =
                navRef.current.clientWidth -
                parseFloat(navStyle.paddingLeft) -
                parseFloat(navStyle.paddingRight);
            const logoWidth = logoRef.current.getBoundingClientRect().width;
            const menuWidth = menuRef.current.scrollWidth;
            const authWidth = authMeasureRef.current.scrollWidth;
            const safeGap = 12;
            const shouldCollapse =
                logoWidth + menuWidth + authWidth + safeGap > navWidth;

            setCollapsed((prev) =>
                prev === shouldCollapse ? prev : shouldCollapse
            );
        };

        const resizeObserver = new ResizeObserver(check);

        [
            navRef.current,
            document.documentElement,
            logoRef.current,
            menuRef.current,
            authMeasureRef.current,
        ].forEach((element) => {
            if (element) {
                resizeObserver.observe(element);
            }
        });

        window.addEventListener('resize', check);
        window.visualViewport?.addEventListener('resize', check);
        const widthFallback = window.setInterval(() => {
            if (previousWidth === window.innerWidth) {
                return;
            }

            previousWidth = window.innerWidth;
            check();
        }, 250);
        requestAnimationFrame(check);
        document.fonts?.ready.then(check);

        return () => {
            isMounted = false;
            resizeObserver.disconnect();
            window.removeEventListener('resize', check);
            window.visualViewport?.removeEventListener('resize', check);
            window.clearInterval(widthFallback);
        };
    }, [currentUser?.name]);

    const renderAuthControls = () =>
        currentUser ? (
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
        );

    return (
        <nav
            ref={navRef}
            className={`flex w-full h-16 ${
                style === 'white' ? 'bg-white shadow-md' : 'bg-black/40'
            } fixed items-center px-6 z-50`}
        >
            <div ref={logoRef} className="shrink-0">
                <Logo />
            </div>

            <div className="flex-1 flex justify-center min-w-0">
                {!collapsed && <MyNavigationMenu style={style} />}
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {!collapsed && renderAuthControls()}

                {collapsed && (
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button type="button" aria-label="메뉴 열기">
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

            <div
                aria-hidden="true"
                inert
                className="absolute left-0 top-0 invisible h-0 overflow-hidden pointer-events-none"
            >
                <div ref={menuRef} className="w-max">
                    <MyNavigationMenu style={style} />
                </div>
                <div
                    ref={authMeasureRef}
                    className="flex w-max items-center gap-2"
                >
                    {renderAuthControls()}
                </div>
            </div>
        </nav>
    );
}
