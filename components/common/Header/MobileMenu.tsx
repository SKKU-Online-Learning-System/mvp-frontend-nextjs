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
        name: '강의 컨퍼런스',
        items: [
            '강연자 특강 영상',
            '강연자 특강 스토리',
            '글로벌 IT 전문가와 성공인의 만남',
        ],
        type: 'conference',
    },
    {
        name: '기술 교류회',
        items: ['S-TOP'],
        type: 'forum',
    },
    {
        name: '공개 교육',
        items: ['공개 온라인 강의', '공개 교재'],
        type: 'education',
    },
    {
        name: '학생 활동',
        items: ['해외 연수기', 'IT 대외 행사', '글로벌 챌린지', '취업 인터뷰'],
        type: 'activity',
    },
    {
        name: '데이터셋',
        items: ['데이터셋 플랫폼', '공모전 데이터셋'],
        type: 'dataset',
    },
];

export function MobileMenu({ style, currentUser, setOpen }: Props) {
    return (
        <div className="flex flex-col h-full">
            <div className="text-xl font-bold mb-6">메뉴</div>

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
                    콘텐츠 업로드
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
