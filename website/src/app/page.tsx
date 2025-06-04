"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [sparkleStyles, setSparkleStyles] = useState<
    { left: string; animationDelay: string; xOffset: string }[]
  >([]);

  useEffect(() => {
    setSparkleStyles(
      Array.from({ length: 10 }).map(() => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
        xOffset: `${(Math.random() - 0.5) * 100}px`,
      }))
    );
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".snap-center");
    let isScrolling = false;

    const handleScroll = (e: WheelEvent) => {
      if (isScrolling) return;
      isScrolling = true;

      const delta = e.deltaY;
      const currentScroll = window.scrollY;
      let targetSection: HTMLElement | null = null;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;

        if (delta > 0 && sectionTop > currentScroll + window.innerHeight / 2) {
          if (!targetSection || sectionTop < (targetSection as HTMLElement).offsetTop) {
            targetSection = section as HTMLElement;
          }
        } else if (delta < 0 && sectionTop < currentScroll) {
          if (!targetSection || sectionTop > (targetSection as HTMLElement).offsetTop) {
            targetSection = section as HTMLElement;
          }
        }
      });

      if (targetSection) {
        window.scrollTo({
          top: (targetSection as HTMLElement).offsetTop,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 600);
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen font-sans snap-y snap-mandatory">
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
      <div id="page1" className="relative h-screen flex items-center justify-center z-10 snap-center">
        <div className="text-center">
          <h1 className="text-6xl text-gray-200 font-bold">FORMULA 1</h1>
          <p className="text-2xl text-gray-300 mt-4">Welcome to my F1 website</p>
        </div>
      </div>

      {/* Page2 */}
      <div id="page2" className="relative h-screen flex items-center justify-center z-20 snap-center">
        <div className="text-center bg-black/50 p-6 shadow-lg">
          <h1 className="text-5xl text-white font-extrabold">Experience the Speed</h1>
          <p className="text-xl text-gray-200">Join the adrenaline-pumping world of Formula 1.</p>
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src="/img/ferrarif1.png"
              alt="Formula 1 Car"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-95"
            />
            {/* Sparkle effect */}
            <div className="sparkles-container">
              {sparkleStyles.map((spark, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    left: spark.left,
                    animationDelay: spark.animationDelay,
                    ["--x-offset" as any]: spark.xOffset,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page3 */}
      <div id="page3" className="relative h-screen flex items-center justify-center z-10 snap-center">
        <div className="text-center bg-black/50 p-6 shadow-lg">
          <h1 className="text-4xl text-white font-bold">F1 Highlights</h1>
          <p className="text-xl text-gray-300">Catch the latest race moments.</p>
        </div>
      </div>
    </div>
  );
}
