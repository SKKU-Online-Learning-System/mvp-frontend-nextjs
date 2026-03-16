import { getPlaylists } from '@/app/api/content';
import { Filter } from '@/components/main/MainContent/category';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

const defaultTextBookDetailResponse: ContentResponseType = {
  id: 1,
  type: 'BOOK',
  title: '컴퓨팅 사고와 문제해결',
  description: '',
  author: '황숙희·조미영',
  duration: 0,
  link: '/file/textbooks/컴퓨팅사고와문제해결.pdf',
  thumbnailUrl:
    'https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg',
  tags: [],
  viewCount: 0,
  likeCount: 0,
  isLike: false,
  publishedAt: '2024.03.19',
  youtubeVideoId: '',
};

export default function useContent(filters: Filter[] | undefined) {
  const [contents, setContents] = useState<ContentResponseType[]>();
  const [loading, setLoading] = useState(true); // ✅ 추가

  useEffect(() => {
    let cancelled = false;
    const id = filters?.find(({ checked }) => checked)?.id;
    // 매번 필터 바뀔 때 로딩 시작 + 이전 데이터 초기화
    setLoading(true);
    setContents([]);

    if (id == 11) {
      if (!cancelled) {
        setContents([defaultTextBookDetailResponse]);
        setLoading(false);
      }
      return;
    }

    const fetchContents = async () => {
      if (!id) {
        setLoading(false); // ✅ 추가
        return;
      }

      try {
        const data = await getPlaylists(id); // ✅ null 체크
        if (!cancelled) {
          setContents(data?.contents ?? []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchContents();
    return () => {
      cancelled = true; // 언마운트 or 필터 재변경 시 이전 요청 무시
    };
  }, [filters]);

  return { contents, loading }; // ✅ loading 반환
}
