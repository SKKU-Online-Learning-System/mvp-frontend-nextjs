'use client';

import Link from 'next/link';
import { AuthUser } from '@/types/auth';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

type Props = {
    style: 'black' | 'white';
    currentUser: AuthUser | null;
    setOpen: (open: boolean) => void;
};

const menuItems = [
    {
        name: '媛뺤쓽 而⑦띁?곗뒪',
        items: [
            '媛뺤뿰???밴컯 ?곸긽',
            '媛뺤뿰???밴컯 ?ㅽ넗由?',
            '湲濡쒕쾶 IT ?꾨Ц媛? ?깃났?몄쓽 留뚮궓',
        ],
        type: 'conference',
    },
    {
        name: '湲곗닠 援먮쪟??',
        items: ['S-TOP'],
        type: 'forum',
    },
    {
        name: '怨듦컻 援먯쑁',
        items: ['怨듦컻 ?⑤씪??媛뺤쓽', '怨듦컻 援먯옱'],
        type: 'education',
    },
    {
        name: '?숈깮 ?쒕룞',
        items: ['?댁쇅 ?곗닔湲?', 'IT ????됱궗', '湲濡쒕쾶 梨뚮┛吏', '痍⑥뾽 ?명꽣酉?'],
        type: 'activity',
    },
    {
        name: '?곗씠?곗뀑',
        items: ['?곗씠?곗뀑 ?뚮옯??'],
        type: 'dataset',
    },
];

export function MobileMenu({ style, currentUser, setOpen }: Props) {
    return (
        <div className="flex flex-col h-full">
            <div className="text-xl font-bold mb-6">硫붾돱</div>

            <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
                {menuItems.map((menu) => (
                    <div
                        key={menu.name}
                        className="rounded-xl border p-4 shadow-sm bg-white/5 backdrop-blur"
                    >
                        <div className="font-semibold text-base mb-3">
                            {menu.name}
                        </div>

                        <div className="flex flex-col gap-2">
                            {menu.items.map((item) => (
                                <Link
                                    key={item}
                                    href={`/content/${menu.type}?category=${item}`}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-accent transition"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <Link
                    href="/playground"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border p-5 font-semibold hover:bg-accent transition"
                >
                    肄섑뀗痢??낅줈??
                </Link>
            </div>

            <div className="pt-6 border-t mt-6">
                {currentUser ? (
                    <div className="flex flex-col items-end gap-2">
                        <p className="text-sm text-muted-foreground">
                            {currentUser.name}
                        </p>
                        <LogoutButton style={style} />
                    </div>
                ) : (
                    <LoginButton style={style} />
                )}
            </div>
        </div>
    );
}
