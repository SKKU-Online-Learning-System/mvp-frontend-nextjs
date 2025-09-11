import { Toaster } from 'sonner';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '온라인 명륜당',
  description: '성균관대학교 온라인 강의 플랫폼',
  icons: {
    icon: '/favicon.ico',
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
