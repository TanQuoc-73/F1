"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Flag, Trophy } from "lucide-react";

interface Season {
  id: number;
  year: number;
}

interface Race {
  id: number;
  name: string;
  circuit: {
    id: number;
    name: string;
    country: string;
    imageUrl: string;
  };
  raceDate: string;
  season: Season;
}

interface Circuit {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  length: number;
  numberOfLaps: number;
  raceDistance: number;
}

export default function SchedulePage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all seasons and set default to latest
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const res = await fetch("http://localhost:8080/seasons");
        const data = await res.json();
        setSeasons(data);
        if (data.length > 0) {
          // Sort seasons by year in descending order and get the latest
          const sortedSeasons = [...data].sort((a, b) => b.year - a.year);
          setSelectedSeason(sortedSeasons[0]);
        }
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };
    fetchSeasons();
  }, []);

  // Fetch data when season changes
  useEffect(() => {
    if (!selectedSeason) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [upcomingRacesRes, circuitsRes] = await Promise.all([
          fetch(`http://localhost:8080/races/upcoming?limit=3`),
          fetch(`http://localhost:8080/circuits?seasonId=${selectedSeason.id}`)
        ]);

        const [upcomingRacesData, circuitsData] = await Promise.all([
          upcomingRacesRes.json(),
          circuitsRes.json()
        ]);

        setUpcomingRaces(upcomingRacesData);
        setCircuits(circuitsData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedSeason]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                F1 Schedule
              </h1>
              <p className="text-xl text-gray-200">
                {selectedSeason && `${selectedSeason.year} Season`}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <select
                className="bg-black/40 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                value={selectedSeason?.id || ''}
                onChange={e => {
                  const season = seasons.find(s => s.id === Number(e.target.value));
                  setSelectedSeason(season || null);
                }}
              >
                {seasons.sort((a, b) => b.year - a.year).map(s => (
                  <option key={s.id} value={s.id} className="bg-gray-900">Season {s.year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Races Card */}
          <Link href={`/schedule/races?seasonId=${selectedSeason?.id}`} className="block group">
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <Calendar className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Upcoming Races
                  </h2>
                </div>
                <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                  Next 3
                </div>
              </div>
              
              <div className="space-y-4">
                {upcomingRaces.length > 0 ? (
                  upcomingRaces.map((race, index) => (
                    <div 
                      key={race.id} 
                      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-5 rounded-xl border border-gray-600/30 hover:border-red-500/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="font-bold text-xl mb-3 text-white group-hover:text-red-400 transition-colors">
                        {race.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-red-400" />
                        {race.circuit.name}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Flag className="w-4 h-4 text-red-400" />
                          {race.circuit.country}
                        </div>
                        <div className="text-gray-300 font-medium">
                          {new Date(race.raceDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    No upcoming races found
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Circuits Card */}
          <Link href={`/schedule/circuit?seasonId=${selectedSeason?.id}`} className="block group">
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <Flag className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Featured Circuits
                  </h2>
                </div>
                <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                  Top 3
                </div>
              </div>
              
              <div className="space-y-4">
                {circuits.map((circuit, index) => (
                  <div 
                    key={circuit.id} 
                    className="flex items-center gap-5 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-5 rounded-xl border border-gray-600/30 hover:border-red-500/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {circuit.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                          src={circuit.imageUrl}
                          alt={circuit.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="font-bold text-xl mb-1 text-white group-hover:text-red-400 transition-colors">
                        {circuit.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Flag className="w-4 h-4 text-red-400" />
                        {circuit.country}
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="text-gray-300 font-medium">{circuit.length}km</span>
                        <span className="mx-2">•</span>
                        <span className="text-gray-300 font-medium">{circuit.numberOfLaps}</span> laps
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
