import { Question } from '@/lib/qnaApi';

export default function QnAItem({
    post,
    onClick,
}: {
    post: Question;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="border p-4 rounded-xl hover:shadow cursor-pointer"
        >
            <div className="flex justify-between">
                <h2 className="font-semibold">{post.title}</h2>
                <span>{post.status}</span>
            </div>
            <p className="text-sm text-gray-500">{post.author}</p>
        </div>
    );
}
