'use client';

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLinkAsChild,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { categoryInfo } from '../../main/MainContent/category';
import MyNavMenuItem from './MyNavMenuItem';

type Props = { style: 'black' | 'white' };

const descriptions = categoryInfo as Record<string, string>;

const menuItems: {
    triggerName: string;
    components: { title: string; href: string; description: string }[];
}[] = [
    {
        triggerName: '성대한만남',
        components: [
            {
                title: '성대의 성대한 특강',
                href: '/content/conference?category=성대의 성대한 특강',
                description: descriptions['성대의 성대한 특강'] ?? '',
            },
            {
                title: '성대의 성대한 스토리',
                href: '/content/conference?category=성대의 성대한 스토리',
                description: descriptions['성대의 성대한 스토리'] ?? '',
            },
            {
                title: '글로벌 IT전문가와 킹고인의 만남',
                href: '/content/conference?category=글로벌 IT전문가와 킹고인의 만남',
                description:
                    descriptions['글로벌 IT전문가와 킹고인의 만남'] ?? '',
            },
        ],
    },
    {
        triggerName: '기술교류회',
        components: [
            {
                title: 'S-TOP',
                href: '/content/forum?category=S-TOP',
                description: descriptions['S-TOP'] ?? '',
            },
        ],
    },
    {
        triggerName: '공개형교육',
        components: [
            {
                title: '공개형 온라인 강의',
                href: '/content/education?category=공개형 온라인 강의',
                description: descriptions['공개형 온라인 강의'] ?? '',
            },
            {
                title: '공개형 교재',
                href: '/content/education?category=공개형 교재',
                description: descriptions['공개형 교재'] ?? '',
            },
        ],
    },
    {
        triggerName: '성대한활동',
        components: [
            {
                title: '인턴십 후기',
                href: '/content/activity?category=인턴십 후기',
                description: descriptions['인턴십 후기'] ?? '',
            },
            {
                title: '인턴십 참여 기업',
                href: '/content/activity/internship-companies',
                description: descriptions['인턴십 참여 기업'] ?? '',
            },
            {
                title: 'IT 해외봉사',
                href: '/content/activity?category=IT 해외봉사',
                description: descriptions['IT 해외봉사'] ?? '',
            },
            {
                title: '글로벌 챌린지',
                href: '/content/activity?category=글로벌 챌린지',
                description: descriptions['글로벌 챌린지'] ?? '',
            },
            {
                title: '현직자 인터뷰',
                href: '/content/activity?category=현직자 인터뷰',
                description: descriptions['현직자 인터뷰'] ?? '',
            },
        ],
    },
    {
        triggerName: '성대한데이터',
        components: [
            {
                title: '데이터셋 플랫폼',
                href: '/content/dataset?category=데이터셋 플랫폼',
                description: descriptions['데이터셋 플랫폼'] ?? '',
            },
            {
                title: '대회 데이터셋',
                href: '/content/dataset?category=대회 데이터셋',
                description: descriptions['대회 데이터셋'] ?? '',
            },
        ],
    },
    {
        triggerName: '질문 게시판',
        components: [
            {
                title: 'Q&A',
                href: '/content/qna?category=qna',
                description: descriptions.qna ?? '',
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
