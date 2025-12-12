"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "../config/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Newspaper, Trophy, Users, Flag, ChevronRight } from "lucide-react";

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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white md:snap-none snap-y snap-mandatory overflow-y-auto">
      {/* Hero Section - Full viewport trên mobile */}
      <section className="relative h-screen snap-start snap-always">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80 z-10" />
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6 text-gray-200 font-bold">
            FORMULA 1
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl px-4">
            Experience the pinnacle of motorsport. Follow the world's fastest racing series.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 max-w-md sm:max-w-none">
            <Button asChild variant="default" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              <Link href="/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white hover:bg-white/10 w-full sm:w-auto">
              <Link href="/new">
                <Newspaper className="mr-2 h-4 w-4" />
                Latest News
              </Link>
            </Button>
          </div>
          
          {/* Scroll Indicator - Chỉ hiện trên mobile */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Quick Links Section - Full viewport trên mobile */}
      <section className="min-h-screen md:min-h-0 snap-start snap-always py-12 md:py-16 px-4 md:px-8 flex items-center bg-gray-900">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:hidden">Khám Phá</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Users className="mr-2 h-5 w-5 text-red-400" />
                  Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Meet the world's best racing drivers</p>
                <Button asChild variant="ghost" className="text-red-400 hover:text-red-300">
                  <Link href="/driver">
                    View Drivers
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Flag className="mr-2 h-5 w-5 text-red-400" />
                  Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Discover the top F1 teams</p>
                <Button asChild variant="ghost" className="text-red-400 hover:text-red-300">
                  <Link href="/team">
                    View Teams
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-red-400" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Check the race calendar</p>
                <Button asChild variant="ghost" className="text-red-400 hover:text-red-300">
                  <Link href="/schedule">
                    View Schedule
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-red-400" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Latest race results</p>
                <Button asChild variant="ghost" className="text-red-400 hover:text-red-300">
                  <Link href="/result">
                    View Results
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section - Full viewport trên mobile */}
      {news.length > 0 && (
        <section className="min-h-screen md:min-h-0 snap-start snap-always py-12 md:py-20 px-4 md:px-8 flex items-center bg-gray-900">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Tin Tức Mới Nhất</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {news.map((item) => (
                <Card key={item.id} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all hover:scale-105">
                  <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-lg">
                    <img
                      src={item.imageUrl || '/img/default-news.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <span className="text-red-500 text-sm font-semibold">News</span>
                    <h3 className="text-lg md:text-xl font-bold mt-2 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {new Date(item.publishedAt).toLocaleDateString()} • By {item.author.username}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Races Section - Full viewport trên mobile */}
      {upcomingRaces.length > 0 && (
        <section className="min-h-screen md:min-h-0 snap-start snap-always py-12 md:py-20 px-4 md:px-8 bg-gray-800 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Các Chặng Đua Sắp Tới</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcomingRaces.map((race) => (
                <Card key={race.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all hover:scale-105">
                  <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-lg">
                    <img
                      src={race.circuit.imageUrl || '/img/default-circuit.jpg'}
                      alt={race.raceName}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">{race.raceName}</h3>
                    <p className="text-gray-400 mb-2 text-sm md:text-base line-clamp-1">{race.circuit.name}</p>
                    <p className="text-red-500 font-semibold text-sm md:text-base">
                      {new Date(race.raceDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Current Season Section - Full viewport trên mobile */}
      {currentSeason && (
        <section className="min-h-screen md:min-h-0 snap-start snap-always py-12 md:py-20 px-4 md:px-8 flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block mb-4">
                <span className="text-5xl md:text-6xl">🏆</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Mùa Giải {currentSeason.year}</h2>
              <p className="text-gray-400 text-sm md:text-base">Nhà Vô Địch Thế Giới</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Driver Champion Card */}
              {currentSeason.championDriver && (
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 md:p-8 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-yellow-500/10 p-3 rounded-lg">
                          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
                          DRIVER
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-yellow-400">
                        Tay Đua Xuất Sắc Nhất
                      </h3>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {currentSeason.championDriver.firstName}
                        </p>
                        <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                          {currentSeason.championDriver.lastName}
                        </p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <p className="text-base md:text-lg text-gray-300">
                            {currentSeason.championDriver.team.name}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Constructor Champion Card */}
              {currentSeason.championTeam && (
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-red-500/30 hover:border-red-500/60 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 md:p-8 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-red-500/10 p-3 rounded-lg">
                          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
                          CONSTRUCTOR
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-400">
                        Đội Đua Xuất Sắc Nhất
                      </h3>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                          {currentSeason.championTeam.name}
                        </p>
                        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-700">
                          <Trophy className="w-5 h-5 text-red-400" />
                          <p className="text-sm md:text-base text-gray-400">
                            Vô Địch Constructors' Championship
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 md:mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm md:text-base text-gray-300">
                  Mùa giải {currentSeason.year} đã kết thúc
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
