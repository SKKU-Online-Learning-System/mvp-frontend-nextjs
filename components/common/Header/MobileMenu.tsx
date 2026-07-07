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
        name: '성대한 활동',
        items: [
            '인턴십 후기',
            '인턴십 참여 기업',
            'IT 해외봉사',
            '글로벌 챌린지',
            '현직자 인터뷰',
        ],
        type: 'activity',
    },
    {
        name: '성대한 데이터',
        items: ['데이터셋 플랫폼', '대회 데이터셋'],
        type: 'dataset',
    },
    {
        name: '질문 게시판',
        items: ['Q&A'],
        type: 'qna',
    },
];

const getMenuHref = (type: string, item: string) => {
    if (item === '인턴십 참여 기업') {
        return '/content/activity/internship-companies';
    }

    return `/content/${type}?category=${item}`;
};

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
                                    href={getMenuHref(menu.type, item)}
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
                    <div className="flex flex-col gap-2">
                        <p className="mb-1 truncate px-3 text-sm font-semibold text-gray-700">
                            {currentUser.name}
                        </p>
                        <Link
                            href="/my"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-accent"
                        >
                            나의 명륜당
                        </Link>
                        <LogoutButton style={style} variant="menu-item" />
                    </div>
                ) : (
                    <LoginButton style={style} />
                )}
            </div>
        </div>
    );
}
