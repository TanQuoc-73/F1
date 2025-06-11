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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
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
          <h1 className="text-6xl md:text-8xl mb-6 text-gray-200">
            FORMULA 1
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Experience the pinnacle of motorsport. Follow the world's fastest racing series.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild variant="default" className="bg-red-600 hover:bg-red-700">
              <Link href="/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white hover:bg-white/10">
              <Link href="/new">
                <Newspaper className="mr-2 h-4 w-4" />
                Latest News
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Latest News Section */}
      {news.length > 0 && (
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <Card key={item.id} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
                  <div className="relative h-48">
                    <img
                      src={item.imageUrl || '/img/default-news.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-red-500 text-sm font-semibold">News</span>
                    <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.publishedAt).toLocaleDateString()} • By {item.author.username}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Races Section */}
      {upcomingRaces.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Races</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingRaces.map((race) => (
                <Card key={race.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                  <div className="relative h-48">
                    <img
                      src={race.circuit.imageUrl || '/img/default-circuit.jpg'}
                      alt={race.raceName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{race.raceName}</h3>
                    <p className="text-gray-400 mb-2">{race.circuit.name}</p>
                    <p className="text-red-500 font-semibold">
                      {new Date(race.raceDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Current Season Section */}
      {currentSeason && (
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Current Season</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentSeason.championDriver && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Driver Champion</h3>
                      <p className="text-xl text-gray-300">
                        {currentSeason.championDriver.firstName} {currentSeason.championDriver.lastName}
                      </p>
                      <p className="text-gray-400">
                        {currentSeason.championDriver.team.name}
                      </p>
                    </div>
                  )}
                  {currentSeason.championTeam && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Constructor Champion</h3>
                      <p className="text-xl text-gray-300">
                        {currentSeason.championTeam.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
