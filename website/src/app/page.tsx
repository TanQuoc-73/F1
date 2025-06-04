"use client";

import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".snap-center");
    let isScrolling = false;

    interface ScrollEvent {
      deltaY?: number;
      delta?: number;
      wheelDelta?: number;
    }

    interface TouchEventLike {
      touches: { clientY: number }[];
    }

    const handleScroll = (e: ScrollEvent) => {
      if (isScrolling) return;
      isScrolling = true;

      const delta = e.deltaY ?? e.delta ?? -e.wheelDelta!; // Hỗ trợ các trình duyệt khác nhau
      const currentScroll = window.scrollY;
      let targetSection: Element | null = null;

      sections.forEach((section: Element) => {
        const sectionTop = (section as HTMLElement).offsetTop;

        if (delta > 0 && sectionTop > currentScroll + window.innerHeight / 2) {
          if (
            !targetSection ||
            sectionTop < (targetSection as HTMLElement).offsetTop
          ) {
            targetSection = section;
          }
        } else if (delta < 0 && sectionTop < currentScroll) {
          if (
            !targetSection ||
            sectionTop > (targetSection as HTMLElement).offsetTop
          ) {
            targetSection = section;
          }
        }
      });

      if (targetSection) {
        window.scrollTo({
          top: (targetSection as HTMLElement).offsetTop,
          behavior: "smooth", // Chuyển mượt mà
        });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 600); // Độ trễ cho cuộn mượt
    };

    // Thêm sự kiện wheel cho chuột và touchpad
    window.addEventListener("wheel", handleScroll, { passive: false });

    // Hỗ trợ touch trên di động
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;
      const touchEndY = e.touches[0].clientY;
      const delta = touchStartY - touchEndY;
      handleScroll({ deltaY: delta });
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] snap-y snap-mandatory gap-4 p-4">
      <Head>
        <title>Formula 1 Experience</title>
        <meta name="description" content="Immerse yourself in the thrilling world of Formula 1" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/50 z-30">
        <ul className="flex justify-center gap-8 py-4 text-white">
          <li><a href="#page1" className="hover:text-red-600">Home</a></li>
          <li><a href="#page2" className="hover:text-red-600">Experience</a></li>
          <li><a href="#page3" className="hover:text-red-600">Highlights</a></li>
        </ul>
      </nav>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/vid/demo.mp4" type="video/mp4" />
      </video>

      {/* Page1 */}
      <div
        id="page1"
        className="relative h-screen w-full flex flex-col items-center justify-center bg-black/30 z-10 snap-center rounded-2xl shadow-lg"
      >
        <h1 className="text-6xl text-gray-200 font-bold tracking-tight">FORMULA 1</h1>
        <p className="text-2xl text-gray-300 mt-4">Welcome to my F1 website</p>
      </div>

      {/* Page2 */}
      <div
        id="page2"
        className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/70 z-20 snap-center rounded-2xl shadow-lg"
      >
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <h1 className="text-5xl text-white font-extrabold mb-6 animate-fade-in">
            Experience the Speed
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-fade-in delay-100">
            Join the adrenaline-pumping world of Formula 1 with exclusive race updates, driver
            insights, and more.
          </p>
          <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden mb-8 animate-fade-in delay-200">
            <img
              src="/images/f1-car.jpg" // Thay bằng hình ảnh thực tế
              alt="Formula 1 Car"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Sparkle effect */}
            <div className="sparkles-container">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    ["--x-offset" as any]: `${(Math.random() - 0.5) * 100}px`,
                  } as React.CSSProperties & Record<string, any>}
                />
              ))}
            </div>
          </div>
          <a
            href="#page3"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors animate-fade-in delay-300"
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Page3 */}
      <div
        id="page3"
        className="relative h-screen w-full flex flex-col items-center justify-center bg-black/30 z-10 snap-center rounded-2xl shadow-lg"
      >
        <h1 className="text-4xl text-white font-bold">F1 Highlights</h1>
        <p className="text-xl text-gray-300 mt-4">Catch the latest race moments</p>
      </div>
    </div>
  );
}