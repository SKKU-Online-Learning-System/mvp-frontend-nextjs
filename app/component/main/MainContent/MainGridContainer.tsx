'use client';

import { getContents } from '@/app/api/content';
import { ContentResponseType } from '@/app/type/content';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ContentCategory } from './ContentCategory';
import { MainContentCard } from './MainContentCard';
import { CategoryKey } from './category';

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
      <ContentCategory category={category} />
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
