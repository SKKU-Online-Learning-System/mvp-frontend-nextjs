'use client';

import Link from 'next/link';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

type Props = {
    style: 'black' | 'white';
    refreshToken?: any;
    setOpen: (open: boolean) => void;
};

const menuItems = [
    {
        name: '성대한만남',
        items: [
            '성대의 성대한 특강',
            '성대의 성대한 스토리',
            '글로벌 IT전문가와 킹고인의 만남',
        ],
        type: 'conference',
    },
    {
        name: '기술교류회',
        items: ['S-TOP'],
        type: 'forum',
    },
    {
        name: '공개형교육',
        items: ['공개형 온라인 강의', '공개형 교재'],
        type: 'education',
    },
    {
        name: '성대한활동',
        items: ['인턴십 후기', 'IT 해외봉사', '글로벌 챌린지', '현직자 인터뷰'],
        type: 'activity',
    },
];

export function MobileMenu({ style, refreshToken, setOpen }: Props) {
    return (
        <div className="flex flex-col h-full">
            {/* 🔥 상단 */}
            <div className="text-xl font-bold mb-6">메뉴</div>

            {/* 🔥 메뉴 리스트 */}
            <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
                {menuItems.map((menu) => (
                    <div
                        key={menu.name}
                        className="rounded-xl border p-4 shadow-sm bg-white/5 backdrop-blur"
                    >
                        {/* 카테고리 */}
                        <div className="font-semibold text-base mb-3">
                            {menu.name}
                        </div>

                        {/* 항목들 */}
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

                {/* 콘텐츠 업로드 */}
                <Link
                    href="/playground"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border p-5 font-semibold hover:bg-accent transition"
                >
                    콘텐츠 업로드
                </Link>
            </div>

            {/* 🔥 하단 로그인 */}
            <div className="pt-6 border-t mt-6">
                {refreshToken ? (
                    <LogoutButton style={style} />
                ) : (
                    <LoginButton style={style} />
                )}
            </div>
        </div>
    );
}