export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Nav from '../components/common/Header/Nav';
import MainVideo from '../components/main/MainVideo';

export const metadata: Metadata = {
    title: '온라인 명륜당 | 성균관대학교 온라인 강의 플랫폼',
    description:
        '온라인 명륜당에서 성균관대학교의 온라인 강의, 공개형 교육, 데이터셋, 질문 게시판 콘텐츠를 만나보세요.',
    keywords: [
        '온라인 명륜당',
        '성균관대학교 온라인 명륜당',
        '성균관대 온라인 강의',
        '성균관대학교 강의 플랫폼',
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: '온라인 명륜당 | 성균관대학교 온라인 강의 플랫폼',
        description:
            '온라인 명륜당에서 성균관대학교의 온라인 강의와 다양한 학습 콘텐츠를 만나보세요.',
        url: 'https://mrdang.cs.skku.edu',
    },
};

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '온라인 명륜당',
    alternateName: ['성균관대학교 온라인 명륜당', '명륜당'],
    url: 'https://mrdang.cs.skku.edu',
    inLanguage: 'ko-KR',
    description:
        '성균관대학교의 온라인 강의와 공개형 교육 콘텐츠를 제공하는 온라인 명륜당 플랫폼',
};

export default function Main() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationJsonLd),
                }}
            />
            <Nav />
            <MainVideo />
        </>
    );
}
