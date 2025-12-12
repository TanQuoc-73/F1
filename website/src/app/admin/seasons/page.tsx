"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Season {
  id: number;
  year: number;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}`;

async function fetchSeasons(): Promise<Season[]> {
  const res = await axios.get(`${API_URL}/seasons`);
  return res.data;
}

async function createSeason(year: number): Promise<Season> {
  const res = await axios.post(`${API_URL}/seasons`, { year });
  return res.data;
}

async function deleteSeason(id: number): Promise<void> {
  await axios.delete(`${API_URL}/seasons/${id}`);
}

export default function SeasonManagementPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newYear, setNewYear] = useState("");

  useEffect(() => {
    loadSeasons();
  }, []);

  const loadSeasons = async () => {
    try {
      const data = await fetchSeasons();
      setSeasons(data.sort((a, b) => b.year - a.year));
      setError(null);
    } catch {
      setError("Failed to load seasons");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear) return;

    try {
      const year = parseInt(newYear);
      if (isNaN(year)) {
        alert("Please enter a valid year");
        return;
      }

      await createSeason(year);
      setNewYear("");
      loadSeasons();
    } catch {
      alert("Failed to create season");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this season?")) return;
    try {
      await deleteSeason(id);
      loadSeasons();
    } catch {
      alert("Failed to delete season");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Season Management</h1>
        </div>

        {/* Create Season Form */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Season</h2>
          <form onSubmit={handleCreate} className="flex gap-4">
            <input
              type="number"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder="Enter year (e.g., 2024)"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create Season
            </button>
          </form>
        </div>

        {/* Seasons List */}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Seasons</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {seasons.map((season) => (
              <div key={season.id} className="p-4 hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Season {season.year}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(season.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
