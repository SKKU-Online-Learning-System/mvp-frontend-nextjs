import Nav from '@/components/common/Header/Nav';
import { MyDashboard } from '@/components/my/MyDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '나의 명륜당',
  description: '학습 기록과 관심 콘텐츠, 로드맵 진행 상황을 확인합니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPage() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Nav style='white' />
      <MyDashboard />
    </div>
  );
}
