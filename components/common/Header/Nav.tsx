'use client';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { LoginButton } from './LoginButton';
import Logo from './Logo';
import { LogoutButton } from './LogoutButton';
import { MyNavigationMenu } from './MyNavigationMenu';
import { Menu } from 'lucide-react';
import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileMenu } from './MobileMenu';

type Props = {
  refreshToken?: RequestCookie;
  style?: 'black' | 'white';
};

export default function Nav({ refreshToken, style = 'black' }: Props) {
  const navRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      if (!navRef.current || !menuRef.current) return;

      const navWidth = navRef.current.clientWidth;
      const menuWidth = menuRef.current.scrollWidth;

      // 로고 + 로그인 영역 대략 width 확보 (여유값)
      const RESERVED = 350;

      const shouldCollapse = menuWidth + RESERVED > navWidth;

      setCollapsed((prev) =>
        prev === shouldCollapse ? prev : shouldCollapse
      );
    };

    const resizeObserver = new ResizeObserver(check);
    if (navRef.current) resizeObserver.observe(navRef.current);

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
      className={`flex w-full h-16 ${style === 'white' ? 'bg-white shadow-md' : 'bg-black/40'
        } fixed items-center px-6 z-50`}
    >
      {/* 로고 */}
      <div className="shrink-0">
        <Logo />
      </div>

      {/* 메뉴 (보이는 버전) */}
      <div className="flex-1 flex justify-center min-w-0">
        {!collapsed && <MyNavigationMenu style={style} />}
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2 shrink-0">
        {refreshToken ? (
          <LogoutButton style={style} />
        ) : (
          <LoginButton style={style} />
        )}


        {collapsed && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button>
                <Menu
                  className={style === 'white' ? 'text-black' : 'text-white'}
                />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[340px] px-6 py-8 bg-background/95 backdrop-blur-xl border-l"
            >
              <SheetTitle className="sr-only"></SheetTitle>

              <MobileMenu
                style={style}
                refreshToken={refreshToken}
                setOpen={setOpen}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* 🔥 숨겨진 측정용 메뉴 */}
      <div className="absolute invisible pointer-events-none h-0 overflow-hidden">
        <div ref={menuRef}>
          <MyNavigationMenu style={style} />
        </div>
      </div>
    </nav>
  );
}