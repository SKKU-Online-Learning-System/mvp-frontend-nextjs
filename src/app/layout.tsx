import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "온라인 명륜당 ++",
  description: "성균관대학교 온라인 강의 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
