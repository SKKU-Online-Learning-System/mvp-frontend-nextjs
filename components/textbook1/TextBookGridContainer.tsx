'use client';

import { TextBookResponseType } from '@/types/textbook';
import { useState } from 'react';
import { TextBookCard } from './TextBookCard';

const defaultTextBookResponses: TextBookResponseType[] = [
  {
    id: 1,
    title: '컴퓨팅 사고와 문제해결',
    description: '',
    author: '황숙희·조미영',
    thumbnailUrl:
      'https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg',
    viewCount: 0,
  },
  // {
  //   id: 2,
  //   title: "컴퓨팅 사고와 문제해결",
  //   description: "",
  //   author: "황숙희·조미영",
  //   thumbnailUrl:
  //     "https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg",
  //   viewCount: 0,
  // },
  // {
  //   id: 3,
  //   title: "컴퓨팅 사고와 문제해결",
  //   description: "",
  //   author: "황숙희·조미영",
  //   thumbnailUrl:
  //     "https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg",
  //   viewCount: 0,
  // },
  // {
  //   id: 4,
  //   title: "컴퓨팅 사고와 문제해결",
  //   description: "",
  //   author: "황숙희·조미영",
  //   thumbnailUrl:
  //     "https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg",
  //   viewCount: 0,
  // },
  // {
  //   id: 5,
  //   title: "컴퓨팅 사고와 문제해결",
  //   description: "",
  //   author: "황숙희·조미영",
  //   thumbnailUrl:
  //     "https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg",
  //   viewCount: 0,
  // },
];

export function TextBookGridContainer() {
  const [textbooks] = useState<TextBookResponseType[]>(
    defaultTextBookResponses
  );
  // useEffect(() => {
  //   const fetchContents = async () => {
  //     const contents = await getContents();
  //     setContents(contents);
  //   };
  //   fetchContents();
  // }, []);

  return (
    <div className='my-container'>
      <div className='my-grid'>
        {textbooks.map((textbook) => (
          <TextBookCard key={textbook.id} textbook={textbook} />
        ))}
      </div>
    </div>
  );
}
