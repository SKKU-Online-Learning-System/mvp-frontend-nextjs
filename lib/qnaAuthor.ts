import { AuthUser } from '@/types/auth';
import { QnAAuthor } from '@/types/qna';

export const getAuthorName = (author: QnAAuthor) => {
    if (typeof author === 'string') {
        return author;
    }

    return author.name;
};

export const getAuthorId = (author: QnAAuthor) => {
    if (typeof author === 'string') {
        return null;
    }

    return author.id ?? null;
};

export const isOwnedByCurrentViewer = (
    author: QnAAuthor,
    currentUser: AuthUser | null,
    authorName: string
) => {
    const authorId = getAuthorId(author);

    if (currentUser && authorId !== null) {
        return String(currentUser.id) === String(authorId);
    }

    const normalizedAuthorName = getAuthorName(author).trim();
    return Boolean(authorName.trim()) && normalizedAuthorName === authorName.trim();
};
