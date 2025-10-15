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

  useEffect(() => {
    const id = filters?.find(({ checked }) => checked)?.id;
    if (id == 11) {
      setContents([defaultTextBookDetailResponse]);
      return;
    }

    const fetchContents = async () => {
      if (!id) {
        return;
      }

      const { contents } = await getPlaylists(id);
      setContents(contents);
    };
    fetchContents();
  }, [filters]);
  return { contents };
}
