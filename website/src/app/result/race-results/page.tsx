"use client"
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface Team {
  id: number;
  name: string;
  logoUrl: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
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

const RaceResultPage: React.FC = () => {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("http://localhost:8080/race-results");
        if (!res.ok) throw new Error("Failed to fetch race results");
        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Race Results</h1>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-gray-800 rounded-lg shadow">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">Position</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Team</th>
                <th className="p-3">Nationality</th>
                <th className="p-3">Race</th>
                <th className="p-3">Points</th>
                <th className="p-3">Time</th>
                <th className="p-3">Fastest Lap</th>
              </tr>
            </thead>
            <tbody>
            {results.map((r) => (
                <tr key={r.id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-3">{r.position}</td>
                <td className="p-3 flex items-center gap-3">
                    <img src={r.driver.imageUrl} alt={r.driver.firstName} className="h-10 w-10 rounded-full" />
                    <div>
                    <div className="font-semibold">{r.driver.firstName} {r.driver.lastName}</div>
                    <div className="text-sm text-gray-400">#{r.driver.number}</div>
                    </div>
                </td>
                <td className="p-3 flex items-center gap-2">
                    <img src={r.team.logoUrl} alt={r.team.name} className="h-6 w-6" />
                    {r.team.name}
                </td>
                <td className="p-3">{r.driver.nationality}</td>
                <td className="p-3">
                    <div>{r.race.raceName}</div>
                    <div className="text-sm text-gray-400">{r.race.raceDate}</div>
                </td>
                <td className="p-3">{r.points}</td>
                <td className="p-3">{r.time}</td>
                <td className="p-3">
                    {r.fastestLap ? (
                    <span className="text-green-500">✔</span>
                    ) : (
                    <span className="text-red-500">✘</span>
                    )}
                </td>
                </tr>
            ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default RaceResultPage;
