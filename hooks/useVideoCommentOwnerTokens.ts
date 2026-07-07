'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'video-comment-owner-tokens';

type TokenMap = Record<string, string>;

const parseStoredTokens = (value: string | null): TokenMap => {
  if (!value) return {};

  try {
    return JSON.parse(value) as TokenMap;
  } catch {
    return {};
  }
};

export default function useVideoCommentOwnerTokens() {
  const [tokens, setTokens] = useState<TokenMap>({});

  useEffect(() => {
    setTokens(parseStoredTokens(window.localStorage.getItem(STORAGE_KEY)));
  }, []);

  const setOwnerToken = (commentId: number, token: string) => {
    setTokens((previous) => {
      const next = { ...previous, [String(commentId)]: token };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeOwnerToken = (commentId: number) => {
    setTokens((previous) => {
      const next = { ...previous };
      delete next[String(commentId)];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const getOwnerToken = (commentId: number) =>
    tokens[String(commentId)] ?? null;

  return { getOwnerToken, removeOwnerToken, setOwnerToken };
}
