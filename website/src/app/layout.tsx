import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

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
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <div className="flex flex-col min-h-screen mt-16 md:mt-24">
              <main className="flex-1 flex flex-col ">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
