import { deleteAnswer } from '@/app/api/qna';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { Answer } from '@/types/qna';

export default function AnswerList({
    answers,
    getAnswerOwnerToken,
    onDeleted,
    questionId,
    removeAnswerOwnerToken,
}: {
    answers: Answer[];
    getAnswerOwnerToken: (answerId: number) => string | null;
    onDeleted: () => void;
    questionId: number;
    removeAnswerOwnerToken: (answerId: number) => void;
}) {
    return (
        <div className="mb-6">
            <h3 className="font-semibold mb-3">댓글 {answers.length}</h3>

            {answers.length === 0 ? (
                <p className="text-gray-400 text-sm">아직 댓글이 없습니다.</p>
            ) : (
                <div className="space-y-3">
                    {answers.map((answer) => {
                        const ownerToken = getAnswerOwnerToken(answer.id);

                        return (
                            <div
                                key={answer.id}
                                className="border rounded-lg p-3 bg-gray-50"
                            >
                                <p>{answer.content}</p>

                                <div className="flex items-center justify-between gap-4 text-xs text-gray-400 mt-2">
                                    <span>
                                        {getAuthorName(answer.author)} ·{' '}
                                        {formatDateTime(answer.createdAt)}
                                    </span>

                                    {ownerToken && (
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-600"
                                            onClick={async () => {
                                                const success = await deleteAnswer(
                                                    questionId,
                                                    answer.id,
                                                    ownerToken
                                                );

                                                if (success) {
                                                    removeAnswerOwnerToken(
                                                        answer.id
                                                    );
                                                    onDeleted();
                                                }
                                            }}
                                        >
                                            댓글 삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
