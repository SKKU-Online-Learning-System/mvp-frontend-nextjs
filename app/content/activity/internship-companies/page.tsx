import { InternshipCompanyDirectory } from '@/components/internship/InternshipCompanyDirectory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인턴십 참여 기업 | 온라인 명륜당',
  description:
    '성균관대학교 온라인 명륜당의 2024~2025년 인턴십 참여 기업 정보입니다.',
  openGraph: {
    title: '인턴십 참여 기업 - 온라인 명륜당',
    url: 'https://mrdang.cs.skku.edu/content/activity/internship-companies',
  },
};

export default function InternshipCompaniesPage() {
  return (
    <div className='pt-logo'>
      <InternshipCompanyDirectory />
    </div>
  );
}
