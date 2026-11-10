import type { Metadata } from "next";
import { Gowun_Batang, Gowun_Dodum } from "next/font/google";
import "./globals.css";

const bodyFont = Gowun_Dodum({
  variable: "--font-body",
  weight: "400",
  subsets: ["latin"],
});

const essayFont = Gowun_Batang({
  variable: "--font-essay",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "지원자 김재진 웹 프로파일",
  description: "김재진의 레쥬메와 포트폴리오, 자격사항을 한곳에서 확인하는 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${bodyFont.variable} ${essayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
