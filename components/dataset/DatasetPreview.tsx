'use client';

export default function DatasetPreview() {
    const previewData = [
        { id: 1, name: '홍길동', value: 3200 },
        { id: 2, name: '김철수', value: 2800 },
        { id: 3, name: '이영희', value: 3500 },
    ];

    return (
        <div className="overflow-x-auto border rounded-xl">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">이름</th>
                        <th className="px-4 py-2 text-left">값</th>
                    </tr>
                </thead>
                <tbody>
                    {previewData.map((row) => (
                        <tr key={row.id} className="border-t">
                            <td className="px-4 py-2">{row.id}</td>
                            <td className="px-4 py-2">{row.name}</td>
                            <td className="px-4 py-2">{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
