"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "../config/axios";

interface News {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: {
    username: string;
  };
}

interface Race {
  id: number;
  raceName: string;
  raceDate: string;
  circuit: {
    name: string;
    imageUrl: string;
  };
  roundNumber: number;
}

interface Season {
  id: number;
  year: number;
  championDriver?: {
    firstName: string;
    lastName: string;
    team: {
      name: string;
    };
  };
  championTeam?: {
    name: string;
  };
}

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch latest news
        try {
          const newsResponse = await axios.get('/news/latest?limit=3');
          setNews(newsResponse.data);
        } catch (error) {
          console.error('Error fetching news:', error);
          setNews([]);
        }

        // Fetch upcoming races
        try {
          const racesResponse = await axios.get('/races/upcoming?limit=3');
          setUpcomingRaces(racesResponse.data);
        } catch (error) {
          console.error('Error fetching races:', error);
          setUpcomingRaces([]);
        }

        // Fetch current season
        try {
          const seasonResponse = await axios.get('/seasons/current');
          setCurrentSeason(seasonResponse.data);
        } catch (error) {
          console.error('Error fetching season:', error);
          setCurrentSeason(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

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
      {news.length > 0 && (
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                  <div className="relative h-48">
                    <Image
                      src={item.imageUrl || '/img/default-news.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-red-500 text-sm font-semibold">News</span>
                    <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.publishedAt).toLocaleDateString()} • By {item.author.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Races Section */}
      {upcomingRaces.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Races</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingRaces.map((race) => (
                <div key={race.id} className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                  <div className="relative h-48">
                    <Image
                      src={race.circuit.imageUrl || '/img/default-circuit.jpg'}
                      alt={race.raceName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{race.raceName}</h3>
                    <p className="text-gray-400 mb-2">{race.circuit.name}</p>
                    <p className="text-red-500 font-semibold">
                      {new Date(race.raceDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Current Season Stats */}
      {currentSeason && (
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Season {currentSeason.year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentSeason.championDriver && (
                <div className="bg-gray-900 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Driver Champion</h3>
                  <p className="text-xl">
                    {currentSeason.championDriver.firstName} {currentSeason.championDriver.lastName}
                  </p>
                  <p className="text-gray-400">{currentSeason.championDriver.team.name}</p>
                </div>
              )}
              {currentSeason.championTeam && (
                <div className="bg-gray-900 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Constructor Champion</h3>
                  <p className="text-xl">{currentSeason.championTeam.name}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
