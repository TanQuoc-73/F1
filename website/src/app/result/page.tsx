"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Users, Flag, Calendar } from "lucide-react";

interface Season {
  id: number;
  year: number;
}

interface DriverStanding {
  id: number;
  driver: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  points: number;
  position: number;
  season: Season;
}

interface TeamStanding {
  id: number;
  team: {
    name: string;
    logoUrl: string;
  };
  points: number;
  position: number;
  season: Season;
}

interface Race {
  id: number;
  name: string;
  circuit: {
    name: string;
    country: string;
  };
  raceDate: string;
  season: Season;
}

interface RaceResult {
  id: number;
  race: Race;
}

export default function ResultPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [driverStandings, setDriverStandings] = useState<DriverStanding[]>([]);
  const [teamStandings, setTeamStandings] = useState<TeamStanding[]>([]);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all seasons and set default to latest
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/seasons`);
        const data = await res.json();
        setSeasons(data);
        if (data.length > 0) {
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
        const [driverRes, teamRes, raceRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/driver-standings?seasonId=${selectedSeason.id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/team-standings?seasonId=${selectedSeason.id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/race-results?seasonId=${selectedSeason.id}`)
        ]);

        const [driverData, teamData, raceData] = await Promise.all([
          driverRes.json(),
          teamRes.json(),
          raceRes.json()
        ]);

        const filteredDriverStandings = driverData
          .filter((standing: DriverStanding) => standing.season.id === selectedSeason.id)
          .sort((a: DriverStanding, b: DriverStanding) => a.position - b.position)
          .slice(0, 3);

        const filteredTeamStandings = teamData
          .filter((standing: TeamStanding) => standing.season.id === selectedSeason.id)
          .sort((a: TeamStanding, b: TeamStanding) => b.points - a.points)
          .slice(0, 3);

        const filteredRaceResults = raceData
          .filter((result: RaceResult) => result.race.season.id === selectedSeason.id)
          .sort((a: RaceResult, b: RaceResult) => new Date(b.race.raceDate).getTime() - new Date(a.race.raceDate).getTime())
          .slice(0, 3);

        setDriverStandings(filteredDriverStandings);
        setTeamStandings(filteredTeamStandings);
        setRaceResults(filteredRaceResults);
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

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-300";
      case 3: return "text-orange-400";
      default: return "text-gray-400";
    }
  };

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
                F1 Results
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Driver Standings Card */}
          <Link href={`/result/driver-standing?seasonId=${selectedSeason?.id}`} className="block group">
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-600/20 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Driver Standings
                  </h2>
                </div>
                <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                  Top 3
                </div>
              </div>
              
              <div className="space-y-4">
                {driverStandings.map((standing) => (
                  <div key={standing.id} className="flex items-center gap-4 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-4 rounded-xl border border-gray-600/30 hover:border-yellow-500/30 transition-all duration-300">
                    <div className={`text-3xl font-bold ${getMedalColor(standing.position)} w-10 flex-shrink-0`}>
                      {standing.position}
                    </div>
                    <img
                      src={standing.driver.imageUrl}
                      alt={standing.driver.lastName}
                      className="w-16 h-16 object-cover rounded-full border-2 border-gray-600 group-hover:border-yellow-500 transition-colors"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="font-bold text-lg text-white truncate group-hover:text-yellow-400 transition-colors">
                        {standing.driver.lastName}
                      </div>
                      <div className="text-sm text-gray-400 truncate">{standing.driver.firstName}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-yellow-400">{standing.points}</div>
                      <div className="text-xs text-gray-400">PTS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Team Standings Card */}
          <Link href={`/result/team-standing?seasonId=${selectedSeason?.id}`} className="block group">
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <Users className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Team Standings
                  </h2>
                </div>
                <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                  Top 3
                </div>
              </div>
              
              <div className="space-y-4">
                {teamStandings.map((standing, index) => (
                  <div key={standing.id} className="flex items-center gap-4 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-4 rounded-xl border border-gray-600/30 hover:border-red-500/30 transition-all duration-300">
                    <div className={`text-3xl font-bold ${getMedalColor(index + 1)} w-10 flex-shrink-0`}>
                      {index + 1}
                    </div>
                    {standing.team.logoUrl && (
                      <img
                        src={standing.team.logoUrl}
                        alt={standing.team.name}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="font-bold text-lg text-white truncate group-hover:text-red-400 transition-colors">
                        {standing.team.name}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-red-400">{standing.points}</div>
                      <div className="text-xs text-gray-400">PTS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Race Results Card */}
          <Link href={`/result/race-results?seasonId=${selectedSeason?.id}`} className="block group">
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Flag className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Recent Races
                  </h2>
                </div>
                <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                  Latest 3
                </div>
              </div>
              
              <div className="space-y-4">
                {raceResults.map((result) => (
                  <div key={result.id} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-5 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                    <div className="font-bold text-xl mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {result.race.name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Flag className="w-4 h-4 text-blue-400" />
                      {result.race.circuit.name}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        {result.race.circuit.country}
                      </div>
                      <div className="text-gray-300 font-medium">
                        {new Date(result.race.raceDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
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
