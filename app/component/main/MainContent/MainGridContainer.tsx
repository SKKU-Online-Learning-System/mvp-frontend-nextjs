'use client';

import { getContents } from '@/app/api/content';
import { ContentResponseType } from '@/app/type/content';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';
import { CategoryKey, Filter } from './category';

const filterList: Filter[] = [
  { name: 'S-TOP', checked: true },
  { name: '성대의 성대한 특강', checked: false },
  { name: '성대의 성대한 스토리', checked: false },
  { name: '글로벌 IT전문가와 킹고인의 만남', checked: false },
  { name: '공개형 온라인 강의', checked: false },
  { name: '인턴십 후기', checked: false },
  { name: '글로벌 챌린지', checked: false },
  { name: '공개형 교재', checked: false },
  { name: 'IT 해외봉사', checked: false },
];

export function MainGridContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category') as CategoryKey | null;

  const [contents, setContents] = useState<ContentResponseType[]>();
  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents(query ?? '');
      setContents(contents);
    };
    fetchContents();
  }, [query]);

  return (
    <div className='my-container'>
      <ContentFilter filterList={filterList} />
      <div className='my-grid'>
        {contents
          ?.filter(
            (content) =>
              category === null || new RegExp(category, 'i').test(content.title)
          )
          .map((content) => (
            <MainContentCard key={content.id} content={content} />
          ))}
      </div>
    </div>
  );
}
