"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">F1 Schedule</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Races Card */}
          <Link href={`/schedule/races?seasonId=${selectedSeason?.id}`} className="block">
            <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Upcoming Races</h2>
                <div className="text-sm text-gray-400">Next 3</div>
              </div>
              <div className="space-y-6">
                {upcomingRaces.length > 0 ? (
                  upcomingRaces.map((race) => (
                    <div key={race.id} className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="font-bold text-lg mb-2">{race.name}</div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-400">
                          {race.circuit.name}
                        </div>
                        <div className="text-gray-400">
                          {new Date(race.raceDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        {race.circuit.country}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-center py-4">
                    No upcoming races found
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Circuits Card */}
          <Link href={`/schedule/circuit?seasonId=${selectedSeason?.id}`} className="block">
            <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Featured Circuits</h2>
                <div className="text-sm text-gray-400">Top 3</div>
              </div>
              <div className="space-y-6">
                {circuits.map((circuit) => (
                  <div key={circuit.id} className="flex items-center gap-4 bg-gray-700/50 p-4 rounded-lg">
                    {circuit.imageUrl && (
                      <img
                        src={circuit.imageUrl}
                        alt={circuit.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-grow">
                      <div className="font-bold text-lg">{circuit.name}</div>
                      <div className="text-sm text-gray-400">{circuit.country}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Length: {circuit.length}km • Laps: {circuit.numberOfLaps}
                      </div>
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
