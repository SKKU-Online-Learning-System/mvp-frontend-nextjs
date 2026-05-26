import { QuestionCategory } from '@/types/qna';

export const QUESTION_CATEGORY_OPTIONS: {
    label: string;
    value: QuestionCategory;
}[] = [
    { label: '군대', value: 'MILITARY' },
    { label: '학업', value: 'ACADEMIC' },
    { label: '일반', value: 'GENERAL' },
];

export const getQuestionCategoryLabel = (category?: QuestionCategory) =>
    QUESTION_CATEGORY_OPTIONS.find((option) => option.value === category)
        ?.label ?? '일반';
