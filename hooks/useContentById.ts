import { getPlaylists } from '@/app/api/content';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

export default function useContentById(id: number) {
  const [contents, setContents] = useState<ContentResponseType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // 언마운트 시 상태 업데이트 방지

    const fetchContents = async () => {
      setLoading(true); // id가 바뀔 때도 재실행 보장
      try {
        const data = await getPlaylists(id);
        if (!cancelled) {
          setContents(data?.contents ?? []); // null/undefined 모두 빈 배열로
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchContents();
    return () => {
      cancelled = true; // cleanup
    };
  }, [id]);

  return { contents, loading };
}
