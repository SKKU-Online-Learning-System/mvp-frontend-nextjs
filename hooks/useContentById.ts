import { getPlaylists } from '@/app/api/content';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

export default function useContentById(id: number) {
  const [contents, setContents] = useState<ContentResponseType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await getPlaylists(id);
        if (data) setContents(data.contents); // ✅ null 체크 후 접근
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, [id]);

  return { contents, loading };
}
