"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl?: string;
  principal?: string;
  powerUnit?: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality?: string;
  dateOfBirth?: string;
  imageUrl?: string;
  number?: number;
  team?: Team;
}

interface Season {
  id: number;
  year: number;
  championDriver?: Driver | null;
  championTeam?: Team | null;
}

const API_URL = "http://localhost:8080";

async function fetchSeasons(): Promise<Season[]> {
  const response = await axios.get(`${API_URL}/seasons`, { withCredentials: true });
  return response.data;
}

export default function SeasonsPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSeasons()
      .then((data) => {
        setSeasons(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load seasons");
        setSeasons([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">Loading seasons...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">F1 Seasons</h1>
      <ul className="space-y-6">
        {seasons.map((season) => (
          <li
            key={season.id}
            className="bg-gray-900 p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Season {season.year}</h2>
              {season.championDriver ? (
                <div className="flex items-center gap-4">
                  {season.championDriver.imageUrl && (
                    <img
                      src={season.championDriver.imageUrl}
                      alt={`${season.championDriver.firstName} ${season.championDriver.lastName}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-600"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">
                      Champion Driver: {season.championDriver.firstName} {season.championDriver.lastName}
                    </p>
                    <p className="text-sm text-gray-400">Nationality: {season.championDriver.nationality}</p>
                  </div>
                </div>
              ) : (
                <p className="italic text-gray-500">Champion driver not decided yet</p>
              )}
            </div>

            <div className="flex-1 flex items-center gap-4">
              {season.championTeam && season.championTeam.logoUrl ? (
                <img
                  src={season.championTeam.logoUrl}
                  alt={season.championTeam.name}
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-800 text-gray-600 italic text-sm">
                  No Champion Team
                </div>
              )}
              <div>
                <p className="font-semibold text-lg">Champion Team:</p>
                <p>{season.championTeam ? season.championTeam.name : "Not decided yet"}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
