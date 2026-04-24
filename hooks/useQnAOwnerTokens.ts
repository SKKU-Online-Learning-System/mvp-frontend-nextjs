'use client';

import { useEffect, useState } from 'react';

const QUESTION_TOKENS_KEY = 'qna-question-owner-tokens';
const ANSWER_TOKENS_KEY = 'qna-answer-owner-tokens';

type TokenMap = Record<string, string>;

const parseStoredTokens = (value: string | null) => {
    if (!value) return {};

    try {
        return JSON.parse(value) as TokenMap;
    } catch {
        return {};
    }
};

export default function useQnAOwnerTokens() {
    const [questionTokens, setQuestionTokens] = useState<TokenMap>({});
    const [answerTokens, setAnswerTokens] = useState<TokenMap>({});

    useEffect(() => {
        setQuestionTokens(
            parseStoredTokens(window.localStorage.getItem(QUESTION_TOKENS_KEY))
        );
        setAnswerTokens(
            parseStoredTokens(window.localStorage.getItem(ANSWER_TOKENS_KEY))
        );
    }, []);

    const setQuestionOwnerToken = (questionId: number, token: string) => {
        setQuestionTokens((prev) => {
            const next = { ...prev, [String(questionId)]: token };
            window.localStorage.setItem(
                QUESTION_TOKENS_KEY,
                JSON.stringify(next)
            );
            return next;
        });
    };

    const setAnswerOwnerToken = (answerId: number, token: string) => {
        setAnswerTokens((prev) => {
            const next = { ...prev, [String(answerId)]: token };
            window.localStorage.setItem(ANSWER_TOKENS_KEY, JSON.stringify(next));
            return next;
        });
    };

    const removeQuestionOwnerToken = (questionId: number) => {
        setQuestionTokens((prev) => {
            const next = { ...prev };
            delete next[String(questionId)];
            window.localStorage.setItem(
                QUESTION_TOKENS_KEY,
                JSON.stringify(next)
            );
            return next;
        });
    };

    const removeAnswerOwnerToken = (answerId: number) => {
        setAnswerTokens((prev) => {
            const next = { ...prev };
            delete next[String(answerId)];
            window.localStorage.setItem(ANSWER_TOKENS_KEY, JSON.stringify(next));
            return next;
        });
    };

    const getQuestionOwnerToken = (questionId: number) =>
        questionTokens[String(questionId)] ?? null;

    const getAnswerOwnerToken = (answerId: number) =>
        answerTokens[String(answerId)] ?? null;

    return {
        getAnswerOwnerToken,
        getQuestionOwnerToken,
        removeAnswerOwnerToken,
        removeQuestionOwnerToken,
        setAnswerOwnerToken,
        setQuestionOwnerToken,
    };
}
