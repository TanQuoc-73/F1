import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 - Formula 1",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        {/* Header */}
        <Header />
        {/* Main content */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 flex flex-col">{children}</main>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}