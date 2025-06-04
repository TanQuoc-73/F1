import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";

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
  const token = cookies().get("token")?.value;
  // Nếu dùng JWT, decode để lấy username
  // const username = token ? decodeToken(token) : null;

  return (
    <html lang="vi">
      <body className={`${barlow.className} antialiased bg-gray-100`}>
        <AuthProvider>
          <Header />
          <div className="flex flex-col min-h-screen mt-20">
            <main className="flex-1 flex flex-col ">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}