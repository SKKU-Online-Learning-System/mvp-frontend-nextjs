import { Answer } from '@/lib/qnaApi';

export default function AnswerList({ answers }: { answers: Answer[] }) {
    return (
        <div className="mb-6">
            <h3 className="font-semibold mb-3">답변 {answers.length}</h3>

            {answers.length === 0 ? (
                <p className="text-gray-400 text-sm">아직 답변이 없습니다.</p>
            ) : (
                <div className="space-y-3">
                    {answers.map((a) => (
                        <div key={a.id} className="border rounded-lg p-3 bg-gray-50">
                            <p>{a.content}</p>
                            <div className="text-xs text-gray-400 mt-2">
                                {a.author}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
