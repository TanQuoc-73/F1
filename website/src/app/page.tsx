"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate loading time for images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const newsItems = [
    {
      title: "Verstappen Dominates Monaco GP",
      image: "/img/news1.jpg",
      date: "May 28, 2024",
      category: "Race Report"
    },
    {
      title: "Ferrari Unveils New Car Design",
      image: "/img/news2.jpg",
      date: "May 25, 2024",
      category: "Team News"
    },
    {
      title: "Hamilton Signs New Mercedes Contract",
      image: "/img/news3.jpg",
      date: "May 23, 2024",
      category: "Driver News"
    }
  ];

  const upcomingRaces = [
    {
      name: "Canadian Grand Prix",
      date: "June 9, 2024",
      circuit: "Circuit Gilles Villeneuve",
      image: "/img/circuit1.jpg"
    },
    {
      name: "Spanish Grand Prix",
      date: "June 23, 2024",
      circuit: "Circuit de Barcelona-Catalunya",
      image: "/img/circuit2.jpg"
    },
    {
      name: "Austrian Grand Prix",
      date: "June 30, 2024",
      circuit: "Red Bull Ring",
      image: "/img/circuit3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid/demo.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-red-600">
            FORMULA 1
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Experience the pinnacle of motorsport. Follow the world's fastest racing series.
          </p>
          <div className="mt-8 flex gap-4">
            <Link 
              href="/schedule" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors"
            >
              View Schedule
            </Link>
            <Link 
              href="/news" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-md transition-colors"
            >
              Latest News
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-red-500 text-sm font-semibold">{item.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Races Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Races</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingRaces.map((race, index) => (
              <div key={index} className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <div className="relative h-48">
                  <Image
                    src={race.image}
                    alt={race.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{race.name}</h3>
                  <p className="text-gray-400 mb-2">{race.circuit}</p>
                  <p className="text-red-500 font-semibold">{race.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Season Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Races", value: "24" },
              { label: "Teams", value: "10" },
              { label: "Drivers", value: "20" },
              { label: "Points System", value: "25-18-15" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the F1 Community</h2>
          <p className="text-xl mb-8">
            Get exclusive access to race highlights, driver interviews, and behind-the-scenes content.
          </p>
          <Link 
            href="/register" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-md transition-colors inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
