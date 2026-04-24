import '@/app/global.css';
import { Toaster } from 'sonner';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://mrdang.cs.skku.edu'),
    title: {
        default: '온라인 명륜당 | 성균관대학교 온라인 강의 플랫폼',
        template: '%s | 온라인 명륜당',
    },
    description:
        '온라인 명륜당은 성균관대학교의 온라인 강의, 공개형 교육, 활동 콘텐츠를 제공하는 플랫폼입니다.',
    keywords: [
        '온라인 명륜당',
        '명륜당',
        '성균관대학교',
        '성균관대 온라인 강의',
        '온라인 강의 플랫폼',
        'SKKU',
    ],
    applicationName: '온라인 명륜당',
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        title: '온라인 명륜당 | 성균관대학교 온라인 강의 플랫폼',
        description:
            '온라인 명륜당은 성균관대학교의 온라인 강의, 공개형 교육, 활동 콘텐츠를 제공하는 플랫폼입니다.',
        url: 'https://mrdang.cs.skku.edu',
        siteName: '온라인 명륜당',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: '온라인 명륜당 미리보기 이미지',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '온라인 명륜당 | 성균관대학교 온라인 강의 플랫폼',
        description:
            '온라인 명륜당은 성균관대학교의 온라인 강의, 공개형 교육, 활동 콘텐츠를 제공하는 플랫폼입니다.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.png',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <main>{children}</main>
                <Toaster closeButton />
            </body>
        </html>
    );
}
