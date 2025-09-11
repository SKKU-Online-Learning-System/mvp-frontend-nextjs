'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLinkAsChild,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { categoryInfo } from '../../main/MainContent/category';
import DemoNavMenuItem from './DemoNavMenuItem';

type Props = { style: 'black' | 'white' };

const menuItems: {
  triggerName: string;
  components: { title: string; href: string; description: string }[];
}[] = [
  {
    triggerName: '성대한만남',
    components: [
      {
        title: '성대의 성대한 특강',
        href: '/content?topic=성대한만남&category=성대의 성대한 특강',
        description: categoryInfo['성대의 성대한 특강'],
      },
      {
        title: '성대의 성대한 스토리',
        href: '/content?topic=성대한만남&category=성대의 성대한 스토리',
        description: categoryInfo['성대의 성대한 스토리'],
      },
      {
        title: '글로벌 IT전문가와 킹고인의 만남',
        href: '/content?topic=성대한만남&category=글로벌 IT전문가와 킹고인의 만남',
        description: categoryInfo['글로벌 IT전문가와 킹고인의 만남'],
      },
    ],
  },
  {
    triggerName: '기술교류회',
    components: [
      {
        title: 'S-TOP',
        href: '/content?topic=기술교류회&category=S-TOP',
        description: categoryInfo['S-TOP'],
      },
    ],
  },
  {
    triggerName: '공개형교육',
    components: [
      {
        title: '공개형 온라인 강의',
        href: '/content?topic=공개형교육&category=공개형 온라인 강의',
        description: categoryInfo['공개형 온라인 강의'],
      },
      {
        title: '공개형 교재',
        href: '/content?topic=공개형교육&category=공개형 교재',
        description: categoryInfo['공개형 교재'],
      },
    ],
  },
  {
    triggerName: '성대한활동',
    components: [
      {
        title: '인턴십 후기',
        href: '/content?topic=성대한활동&category=인턴십 후기',
        description: categoryInfo['인턴십 후기'],
      },
      {
        title: 'IT 해외봉사',
        href: '/content?topic=성대한활동&category=IT 해외봉사',
        description: categoryInfo['IT 해외봉사'],
      },
      {
        title: '글로벌 챌린지',
        href: '/content?topic=성대한활동&category=글로벌 챌린지',
        description: categoryInfo['글로벌 챌린지'],
      },
      {
        title: '현직자 인터뷰',
        href: '/content?topic=성대한활동&category=현직자 인터뷰',
        description: categoryInfo['현직자 인터뷰'],
      },
    ],
  },
];

export function NavigationMenuDemo({ style }: Props) {
  return (
    <NavigationMenu style={style}>
      <NavigationMenuList className='h-16'>
        {menuItems.map(({ triggerName, components }, idx) => (
          <DemoNavMenuItem
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
            <Link href={'/playground'}>콘텐츠 업로드</Link>
          </NavigationMenuLinkAsChild>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
