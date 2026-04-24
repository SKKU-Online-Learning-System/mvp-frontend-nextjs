'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'qna-author';

export default function useQnAAuthor() {
    const [author, setAuthorState] = useState('');

    useEffect(() => {
        const saved = window.localStorage.getItem(STORAGE_KEY) ?? '';
        setAuthorState(saved);
    }, []);

    const setAuthor = (value: string) => {
        setAuthorState(value);

        if (typeof window === 'undefined') return;

        const trimmed = value.trim();

        if (trimmed) {
            window.localStorage.setItem(STORAGE_KEY, trimmed);
            return;
        }

        window.localStorage.removeItem(STORAGE_KEY);
    };

    return {
        author,
        setAuthor,
    };
}
