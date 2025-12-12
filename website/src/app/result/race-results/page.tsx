"use client"
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

interface Circuit {
  id: number;
  name: string;
  location: string;
  country: string;
  lengthKm: number;
  laps: number;
  imageUrl: string;
}

interface Season {
  id: number;
  year: number;
  championDriver: Driver | null;
  championTeam: Team | null;
}

interface Race {
  id: number;
  season: Season;
  circuit: Circuit;
  raceName: string;
  raceDate: string;
  roundNumber: number;
}

interface RaceResult {
  id: number;
  race: Race;
  driver: Driver;
  team: Team;
  position: number;
  points: number;
  time: string;
  fastestLap: boolean;
}

export default function RaceResultsPage() {
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all race results and extract unique seasons
  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/race-results`);
        const data = await res.json();
        setRaceResults(data);
        
        // Extract unique seasons from race results
        const uniqueSeasons = Array.from(
          new Set(data.map((result: RaceResult) => result.race.season.id))
        ).map(id => {
          const season = data.find((result: RaceResult) => result.race.season.id === id)?.race.season;
          return season;
        }).sort((a, b) => b.year - a.year); // Sort by year descending

        setSeasons(uniqueSeasons);
        if (uniqueSeasons.length > 0) {
          setSelectedSeason(uniqueSeasons[0]); // Set first season as default
        }
        setError("");
      } catch (err) {
        setError("Failed to load race results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRaceResults();
  }, []);

  // Filter results by selected season
  const filteredResults = selectedSeason
    ? raceResults.filter(result => result.race.season.id === selectedSeason.id)
    : [];

  // Group filtered results by race
  const groupedResults = filteredResults.reduce((acc, result) => {
    const raceId = result.race.id;
    if (!acc[raceId]) {
      acc[raceId] = {
        race: result.race,
        results: []
      };
    }
    acc[raceId].results.push(result);
    return acc;
  }, {} as Record<number, { race: Race; results: RaceResult[] }>);

  if (loading) return <div className="text-center mt-4 text-white">Loading race results...</div>;
  if (error) return <div className="text-center mt-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Race Results</h1>
      
      {/* Season Filter */}
      <div className="flex justify-center mb-8">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedSeason?.id || ''}
          onChange={e => {
            const season = seasons.find(s => s.id === Number(e.target.value));
            setSelectedSeason(season || null);
          }}
        >
          {seasons.map(s => (
            <option key={s.id} value={s.id}>{s.year}</option>
          ))}
        </select>
      </div>

      {selectedSeason && (
        <div className="text-center text-gray-400 mb-8">Season {selectedSeason.year}</div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {Object.values(groupedResults).map(({ race, results }) => (
          <div key={race.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Race Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">{race.raceName}</h2>
                  <p className="text-gray-400">
                    {new Date(race.raceDate).toLocaleDateString()} - Round {race.roundNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{race.circuit.name}</p>
                  <p className="text-gray-400">{race.circuit.location}, {race.circuit.country}</p>
                </div>
              </div>
            </div>

            {/* Circuit Image */}
            {race.circuit.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={race.circuit.imageUrl} 
                  alt={race.circuit.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4 text-left">Position</th>
                    <th className="p-4 text-left">Driver</th>
                    <th className="p-4 text-left">Team</th>
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Points</th>
                    <th className="p-4 text-left">Fastest Lap</th>
                  </tr>
                </thead>
                <tbody>
                  {results.sort((a, b) => a.position - b.position).map((result) => (
                    <tr key={result.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="p-4">
                        <span className="text-2xl font-bold text-yellow-400">{result.position}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {result.driver.imageUrl && (
                            <img 
                              src={result.driver.imageUrl} 
                              alt={`${result.driver.firstName} ${result.driver.lastName}`} 
                              className="h-10 w-10 rounded-full"
                            />
                          )}
                          <div>
                            <div className="font-bold">
                              {result.driver.firstName} {result.driver.lastName}
                            </div>
                            <div className="text-sm text-gray-400">
                              #{result.driver.number} • {result.driver.nationality}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {result.team.logoUrl && (
                            <img 
                              src={result.team.logoUrl} 
                              alt={result.team.name} 
                              className="h-6 w-6"
                            />
                          )}
                          <span>{result.team.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{result.time}</td>
                      <td className="p-4 font-bold">{result.points}</td>
                      <td className="p-4">
                        {result.fastestLap && (
                          <span className="text-yellow-400">★</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

