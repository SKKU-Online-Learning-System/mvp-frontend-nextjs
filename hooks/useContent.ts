import { getContents } from '@/app/api/content';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

export default function useContent(query: string | null) {
  const [contents, setContents] = useState<ContentResponseType[]>();

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents(query ?? '');
      setContents(contents);
    };
    fetchContents();
  }, [query]);
  return { contents };
}
