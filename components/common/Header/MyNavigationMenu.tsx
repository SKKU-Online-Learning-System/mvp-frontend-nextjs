'use client';

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLinkAsChild,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import MyNavMenuItem from './MyNavMenuItem';

type Props = { style: 'black' | 'white' };

const menuItems: {
    triggerName: string;
    components: { title: string; href: string; description: string }[];
}[] = [
    {
        triggerName: '성대한만남',
        components: [
            {
                title: '강연자 특강 영상',
                href: '/content/conference?category=강연자 특강 영상',
                description: '',
            },
            {
                title: '강연자 특강 스토리',
                href: '/content/conference?category=강연자 특강 스토리',
                description: '',
            },
            {
                title: '글로벌 IT전문가와 킹고인의 만남',
                href: '/content/conference?category=글로벌 IT전문가와 킹고인의 만남',
                description: '',
            },
        ],
    },
    {
        triggerName: '기술교류회',
        components: [
            {
                title: 'S-TOP',
                href: '/content/forum?category=S-TOP',
                description: '',
            },
        ],
    },
    {
        triggerName: '공개형교육',
        components: [
            {
                title: '공개형 온라인 강의',
                href: '/content/education?category=공개형 온라인 강의',
                description: '',
            },
            {
                title: '공개형 교재',
                href: '/content/education?category=공개형 교재',
                description: '',
            },
        ],
    },
    {
        triggerName: '성대한활동',
        components: [
            {
                title: '해외 연수기',
                href: '/content/activity?category=해외 연수기',
                description: '',
            },
            {
                title: 'IT 대외행사',
                href: '/content/activity?category=IT 대외행사',
                description: '',
            },
            {
                title: '글로벌 챌린지',
                href: '/content/activity?category=글로벌 챌린지',
                description: '',
            },
            {
                title: '현직자 인터뷰',
                href: '/content/activity?category=현직자 인터뷰',
                description: '',
            },
        ],
    },
    {
        triggerName: '데이터셋',
        components: [
            {
                title: '데이터셋 플랫폼',
                href: '/content/dataset?category=데이터셋 플랫폼',
                description: '',
            },
        ],
    },
    {
        triggerName: '질문 게시판',
        components: [
            {
                title: 'Q&A',
                href: '/content/qna?category=qna',
                description: '',
            },
        ],
    },
];

export function MyNavigationMenu({ style }: Props) {
    return (
        <NavigationMenu style={style}>
            <NavigationMenuList className="h-16">
                {menuItems.map(({ triggerName, components }, idx) => (
                    <MyNavMenuItem
                        key={idx}
                        style={style}
                        triggerName={triggerName}
                        components={components}
                    />
                ))}

                <NavigationMenuItem>
                    <NavigationMenuLinkAsChild
                        style={style}
                        className={navigationMenuTriggerStyle(style)}
                    >
                        <Link href="/playground">콘텐츠 업로드</Link>
                    </NavigationMenuLinkAsChild>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
