'use client';

import { TextBookDetailResponseType } from '@/app/type/textbook';
import { useState } from 'react';
import TextBookInfo from './TextBookInfo';

type Props = {
  id: number;
};

const defaultTextBookDetailResponse: TextBookDetailResponseType = {
  id: 1,
  title: '컴퓨팅 사고와 문제해결',
  description: '',
  author: '황숙희·조미영',
  uploadDate: '2024.03.19',
  thumbnailUrl:
    'https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg',
  fileName: '컴퓨팅사고와문제해결.pdf',
  viewCount: 0,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TextBookContentContainer({ id }: Props) {
  const [content] = useState<TextBookDetailResponseType>(
    defaultTextBookDetailResponse
  );

  // useEffect(() => {
  //   const fetchContent = async () => {
  //     const content = await getContent(id);
  //     setContent(content);
  //   };
  //   fetchContent();
  // }, [id]);

  return <TextBookInfo content={content} />;
}
