'use client';

import { ContentDetailResponseType } from '@/types/content';
import { BsPersonCircle } from 'react-icons/bs';
import { TagIcon } from '../../main/TagIcon';
import { VideoContentLike } from './VideoContentLike';
import { useEffect, useRef, useState } from 'react';

type Props = {
  content: ContentDetailResponseType | undefined;
  onClickLike: () => Promise<void>;
};

export function VideoInfo({ content, onClickLike }: Props) {

  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    if (!expanded) {
      requestAnimationFrame(() => {
        const isClamped = el.scrollHeight > el.clientHeight;
        setIsOverflow(isClamped);
      });
    }
  }, [content?.description, expanded]);

  return (
    <div className="w-full px-4 md:px-8">

      {/* 제목 */}
      <p className="py-4 text-lg md:text-2xl font-bold leading-snug">
        {content?.title}
      </p>

      <div className="flex items-center justify-between gap-2">

        {/* 작성자 */}
        <div className="flex items-center gap-2 min-w-0">
          <BsPersonCircle size={28} color="gray" />
          <p className="text-base md:text-xl font-semibold truncate">
            {content?.author}
          </p>
        </div>

        {/* 좋아요 */}
        <div className="shrink-0">
          <VideoContentLike
            onClickLike={onClickLike}
            isLike={content?.isLike}
          />
        </div>

      </div>

      {/* 조회수*/}
      <div className="my-4 flex flex-col rounded-lg bg-gray-100 p-3 md:p-4">

        <div className="flex flex-wrap gap-3 text-sm md:text-base">
          <p className="font-semibold text-gray-700">
            조회수 {content?.viewCount}회
          </p>
          <p className="font-semibold text-gray-700">
            좋아요 {content?.likeCount}회
          </p>
        </div>

        {/* 설명 */}
        <p
          ref={textRef}
          className={`mt-2 text-sm md:text-base text-gray-600 leading-relaxed break-words ${expanded ? '' : 'line-clamp-3'
            }`}
        >
          {content?.description}
        </p>

        {/* 🔥 진짜 핵심 */}
        {(isOverflow || expanded) && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-1 text-sm font-semibold text-gray-700 hover:underline self-start"
          >
            {expanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 text-sm md:text-base">
        {content?.tags.map((tag) => (
          <TagIcon key={tag} text={tag} />
        ))}
      </div>

    </div>
  );
}
