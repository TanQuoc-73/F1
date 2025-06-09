"use client";

import React, { useEffect, useState } from "react";
import { fetchRaces, Race } from "@/services/raceService";

export default function RacesPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRaces()
      .then((data) => {
        setRaces(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load races");
        setRaces([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">Loading races...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">F1 Races</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {races.map((race) => (
          <div key={race.id} className="bg-gray-900 p-4 rounded-lg shadow">
            {race.circuit.imageUrl && (
              <img
                src={race.circuit.imageUrl}
                alt={race.raceName}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-1">{race.raceName}</h2>
            <p className="text-sm text-gray-400 mb-1">
              Circuit: {race.circuit.name} — {race.circuit.location}, {race.circuit.country}
            </p>
            <p className="text-sm text-gray-500">
              Date: {new Date(race.raceDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">Round: {race.roundNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
