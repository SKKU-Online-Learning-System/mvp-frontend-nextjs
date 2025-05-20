'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { categoryInfo } from '../../main/MainContent/category';
import DemoNavMenuItem from './DemoNavMenuItem';

const menuItems: {
  triggerName: string;
  components: { title: string; href: string; description: string }[];
}[] = [
  {
    triggerName: '성대한만남',
    components: [
      {
        title: '성대의 성대한 특강',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['성대의 성대한 특강'],
      },
      {
        title: '성대의 성대한 스토리',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['성대의 성대한 스토리'],
      },
      {
        title: '글로벌 IT전문가와 킹고인의 만남',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['글로벌 IT전문가와 킹고인의 만남'],
      },
    ],
  },
  {
    triggerName: '기술교류회',
    components: [
      {
        title: 'S-TOP',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['S-TOP'],
      },
    ],
  },
  {
    triggerName: '공개형교육',
    components: [
      {
        title: '공개형 온라인 강의',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['공개형 온라인 강의'],
      },
      {
        title: '공개형 교재',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['공개형 교재'],
      },
    ],
  },
  {
    triggerName: '성대한활동',
    components: [
      {
        title: '글로벌챌린지',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['글로벌챌린지'],
      },
      {
        title: '인턴십 후기',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['인턴십 후기'],
      },
      {
        title: 'IT 해외봉사',
        href: '/docs/primitives/alert-dialog',
        description: categoryInfo['IT 해외봉사'],
      },
    ],
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className='h-16'>
        {menuItems.map(({ triggerName, components }, idx) => (
          <DemoNavMenuItem
            key={idx}
            triggerName={triggerName}
            components={components}
          />
        ))}

        <NavigationMenuItem>
          <Link href='/docs' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              콘텐츠 업로드
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
