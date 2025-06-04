import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "F1 - The Official Website",
  description: "Khám phá thế giới Formula 1 với tin tức, cập nhật và thông tin chi tiết.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${barlow.className} antialiased bg-gray-100`}>
        {/* Header */}
        <Header />
        {/* Main content */}
        <div className="flex flex-col min-h-screen mt-20">
          <main className="flex-1 flex flex-col ">{children}</main>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}