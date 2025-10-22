import Nav from '@/components/common/Header/Nav';
import { MainGridContainer } from '@/components/main/MainContent';
import { Topic } from '@/hooks/useFilter';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const dynamicParams = true;

type EngType = 'conference' | 'forum' | 'education' | 'activity';

type Props = {
  params: Promise<{ topic: EngType }>;
};

const engToKorType = (engType: EngType): Topic => {
  if (engType == 'conference') {
    return '성대한만남';
  } else if (engType == 'forum') {
    return '기술교류회';
  } else if (engType == 'education') {
    return '공개형교육';
  } else if (engType == 'activity') {
    return '성대한활동';
  }

  return '성대한만남';
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: EngType }>;
}): Promise<Metadata> {
  const { topic } = await params;

  return {
    title: `${engToKorType(topic)} | 온라인 명륜당`,
    description: `${engToKorType(topic)} 관련 강의 콘텐츠입니다.`,
    openGraph: {
      title: `${engToKorType(topic)} - 온라인 명륜당`,
      url: `https://mrdang.cs.skku.edu/content/${topic}`,
    },
  };
}

export default async function Content({ params }: Props) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');
  // const accessToken = cookieStore.get("access-token");

  const { topic } = await params;
  console.log('🚀 ~ Content ~ topic:', topic);

  return (
    <div>
      <Nav style='white' refreshToken={refreshToken} />
      <div className='pt-logo w-full'>
        <MainGridContainer topic={engToKorType(topic)} />
      </div>
    </div>
  );
}
