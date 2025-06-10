"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
        const [driverRes, teamRes, raceRes] = await Promise.all([
          fetch(`http://localhost:8080/driver-standings?seasonId=${selectedSeason.id}`),
          fetch(`http://localhost:8080/team-standings?seasonId=${selectedSeason.id}`),
          fetch(`http://localhost:8080/race-results?seasonId=${selectedSeason.id}`)
        ]);

        const [driverData, teamData, raceData] = await Promise.all([
          driverRes.json(),
          teamRes.json(),
          raceRes.json()
        ]);

        // Filter data by selected season
        const filteredDriverStandings = driverData
          .filter((standing: DriverStanding) => standing.season.id === selectedSeason.id)
          .sort((a: DriverStanding, b: DriverStanding) => a.position - b.position)
          .slice(0, 3);

        const filteredTeamStandings = teamData
          .filter((standing: TeamStanding) => standing.season.id === selectedSeason.id)
          .sort((a: TeamStanding, b: TeamStanding) => a.position - b.position)
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

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">F1 Results</h1>
          <div className="flex items-center gap-4">
            {selectedSeason && (
              <div className="text-gray-400">Season {selectedSeason.year}</div>
            )}
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded"
              value={selectedSeason?.id || ''}
              onChange={e => {
                const season = seasons.find(s => s.id === Number(e.target.value));
                setSelectedSeason(season || null);
              }}
            >
              {seasons.sort((a, b) => b.year - a.year).map(s => (
                <option key={s.id} value={s.id}>{s.year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Driver Standings Card */}
          <Link href={`/result/driver-standing?seasonId=${selectedSeason?.id}`} className="block">
            <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Driver Standings</h2>
                <div className="text-sm text-gray-400">Top 3</div>
              </div>
              <div className="space-y-6">
                {driverStandings.map((standing) => (
                  <div key={standing.id} className="flex items-center gap-4 bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 w-8">{standing.position}</div>
                    <img
                      src={standing.driver.imageUrl}
                      alt={standing.driver.lastName}
                      className="w-14 h-14 object-contain rounded-full border-2 border-gray-600"
                    />
                    <div className="flex-grow">
                      <div className="font-bold text-lg">{standing.driver.lastName}</div>
                      <div className="text-sm text-gray-400">{standing.driver.firstName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-400">{standing.points}</div>
                      <div className="text-xs text-gray-400">PTS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Team Standings Card */}
          <Link href={`/result/team-standing?seasonId=${selectedSeason?.id}`} className="block">
            <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Team Standings</h2>
                <div className="text-sm text-gray-400">Top 3</div>
              </div>
              <div className="space-y-6">
                {teamStandings.map((standing) => (
                  <div key={standing.id} className="flex items-center gap-4 bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 w-8">{standing.position}</div>
                    {standing.team.logoUrl && (
                      <img
                        src={standing.team.logoUrl}
                        alt={standing.team.name}
                        className="w-14 h-14 object-contain"
                      />
                    )}
                    <div className="flex-grow">
                      <div className="font-bold text-lg">{standing.team.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-400">{standing.points}</div>
                      <div className="text-xs text-gray-400">PTS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Race Results Card */}
          <Link href={`/result/race-results?seasonId=${selectedSeason?.id}`} className="block">
            <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Recent Races</h2>
                <div className="text-sm text-gray-400">Latest 3</div>
              </div>
              <div className="space-y-6">
                {raceResults.map((result) => (
                  <div key={result.id} className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="font-bold text-lg mb-2">{result.race.name}</div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-400">
                        {result.race.circuit.name}
                      </div>
                      <div className="text-gray-400">
                        {new Date(result.race.raceDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      {result.race.circuit.country}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}