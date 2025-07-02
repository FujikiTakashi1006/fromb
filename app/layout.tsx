import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "fromB - 映像が世界を変える",
  description: "独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト。光と影の対比が印象的な映像詩から前衛的作品まで、心に響く映像体験をお届けします。",
  keywords: ["映像制作", "動画", "クリエイティブ", "ポートフォリオ", "fromB"],
  authors: [{ name: "fromB" }],
  openGraph: {
    title: "fromB - 映像が世界を変える",
    description: "独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "fromB - 映像が世界を変える",
    description: "独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
