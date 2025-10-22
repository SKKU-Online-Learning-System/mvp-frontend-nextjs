import '@/app/global.css';
import { Toaster } from 'sonner';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mrdang.cs.skku.edu'),
  title: '온라인 명륜당',
  description: '성균관대학교 온라인 강의 플랫폼',
  keywords: ['성균관대', '온라인 강의', '명륜당', 'SKKU', '강의 플랫폼'],
  applicationName: '온라인 명륜당',
  openGraph: {
    title: '온라인 명륜당',
    description: '성균관대학교 온라인 강의 플랫폼',
    url: 'https://mrdang.cs.skku.edu',
    siteName: '온라인 명륜당',
    images: [
      {
        url: '/og-image.png', // public 폴더 기준
        width: 1200,
        height: 630,
        alt: '온라인 명륜당 미리보기 이미지',
      },
    ],
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
    <html lang='ko'>
      <body>
        <main>{children}</main>
        <Toaster closeButton />
      </body>
    </html>
  );
}
