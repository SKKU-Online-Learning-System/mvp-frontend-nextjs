'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'video-comment-author';

export default function useVideoCommentAuthor() {
  const [author, setAuthorState] = useState('');

  useEffect(() => {
    setAuthorState(window.localStorage.getItem(STORAGE_KEY) ?? '');
  }, []);

  const setAuthor = (value: string) => {
    setAuthorState(value);
    const trimmed = value.trim();

    if (trimmed) {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { author, setAuthor };
}
