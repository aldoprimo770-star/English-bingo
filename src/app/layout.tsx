import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALDO PRIMO English Bingo",
  description:
    "子供が遊びながら英単語を自然に覚えられるビンゴゲームアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFF6F9]">
        {children}
      </body>
    </html>
  );
}
