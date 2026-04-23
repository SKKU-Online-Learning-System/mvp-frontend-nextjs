import Nav from '@/components/common/Header/Nav';
import { cookies } from 'next/headers';

export default async function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh-token');

    return (
        <div>
            <Nav style="white" refreshToken={refreshToken} />

            {/* 모든 content 하위 페이지 공통 */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
