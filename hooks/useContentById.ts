import { getPlaylists } from '@/app/api/content';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

export default function useContentById(id: number) {
  const [contents, setContents] = useState<ContentResponseType[]>();

  useEffect(() => {
    const fetchContents = async () => {
      const { contents } = await getPlaylists(id);
      setContents(contents);
    };
    fetchContents();
  }, [id]);
  return { contents };
}
