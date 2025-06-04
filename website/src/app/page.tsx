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
      <div id="page2" className="relative h-screen flex items-center justify-center z-20 snap-center ">
        <div className="text-center bg-black/60 backdrop-blur-sm py-8 sm:py-12 px-6 shadow-2xl rounded-xl max-w-4xl w-full mx-auto"> {/* Added mx-auto and max-width */}
            <h1 className="text-4xl sm:text-5xl text-white font-extrabold mb-3 text-shadow">Experience the <span className="text-red-500">Speed</span></h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Feel the Gs, hear the roar, witness the precision.
            </p>
            <div className="relative w-full aspect-video max-h-[50vh] overflow-hidden rounded-lg group shadow-xl"> {/* Aspect ratio and max height */}
              <img
                src="/img/ferrarif1.png"
                alt="Formula 1 Car in action" // More descriptive alt text
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" // Scale up on hover
              />
              {/* Sparkle effect */}
              <div className="sparkles-container absolute inset-0">
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
      <div id="page3" className="relative h-screen w-full flex items-center justify-center z-10 snap-center" > 
        <div className="max-w-5xl w-full text-center bg-black/60 backdrop-blur-sm p-8 sm:p-12 shadow-2xl rounded-xl">
            <h1 className="text-4xl sm:text-5xl text-white font-bold mb-6 text-shadow">Race <span className="text-red-500">Highlights</span></h1>
            <p className="text-lg sm:text-xl text-gray-300 mt-2 mb-10">
              Relive the most iconic moments and breathtaking overtakes from recent races.
            </p>
            {/* Example Grid for Highlights - Replace with actual content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Monaco GP Drama", img: "/img/highlight1.jpg", link:"#"},
                { title: "Silverstone Showdown", img: "/img/highlight2.jpg", link:"#"},
                { title: "Italian GP Triumph", img: "/img/highlight3.jpg", link:"#"}
              ].map((highlight, index) => (
                <a key={index} href={highlight.link} className="block bg-gray-800/70 rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-red-500/40 hover:scale-105">
                  <img src={highlight.img} alt={highlight.title} className="w-full h-40 object-cover"/>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{highlight.title}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-red-400 transition-colors">Watch now &rarr;</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
