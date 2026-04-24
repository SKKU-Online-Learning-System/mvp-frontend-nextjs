import Nav from '@/components/common/Header/Nav';
import { MainGridContainer } from '@/components/main/MainContent';
import { Topic } from '@/hooks/useFilter';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import DatasetPlatform from '@/components/dataset/DatasetPlatform';
import CompetitionDataset from '@/components/dataset/CompetitionDataset';
import QnABoard from '@/components/qna/QnABoard';

export const dynamicParams = true;

type EngType = 'conference' | 'forum' | 'education' | 'activity' | 'dataset' | 'qna';

type Props = {
  params: Promise<{ topic: EngType }>;
  searchParams: Promise<{ category?: string }>;
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
  } else if (engType == 'dataset') {
    return '성대한데이터';
  } else if (engType == 'qna') {
    return 'qna';
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

export default async function Content({ params, searchParams }: Props) {
  const { topic } = await params;
  const { category } = await searchParams;

  const isDatasetPlatform =
    topic === 'dataset' && category === '데이터셋 플랫폼';

  const isCompetitionDataset =
    topic === 'dataset' && category === '대회 데이터셋';

  const isQnA = topic === 'qna';

  return (
    <div
      className={`w-full ${isDatasetPlatform || isCompetitionDataset
        ? 'pt-10 px-6'
        : 'pt-logo'
        }`}
    >
      {isDatasetPlatform ? (
        <DatasetPlatform />
      ) : isCompetitionDataset ? (
        <CompetitionDataset />
      ) : isQnA ? (
        <QnABoard />
      ) : (
        <MainGridContainer
          topic={engToKorType(topic)}
          showBadge={true}
        />
      )}
    </div>
  );
}

