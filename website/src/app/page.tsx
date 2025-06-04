import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 sm:p-20 gap-16">
        {/* Nội dung chính ở đây */}
      </main>
      {/* Footer*/}
      <Footer />
    </div>
  );
}
