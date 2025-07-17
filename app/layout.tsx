import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientLayout from "./components/ClientLayout";
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
  title: "fromB - A Message Beyond Words",
  description: "水崎一耀のポートフォリオサイト",
  keywords: ["映像制作", "動画", "クリエイティブ", "ポートフォリオ", "fromB", "message beyond words"],
  authors: [{ name: "fromB" }],
  icons: {
    icon: "/logo-only.png",
    shortcut: "/logo-only.png",
    apple: "/logo-only.png",
  },
  openGraph: {
    title: "fromB - A Message Beyond Words",
    description: "言葉以上のメッセージを。独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "fromB - A Message Beyond Words",
    description: "言葉以上のメッセージを。独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト",
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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
