"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Circuit {
  id: number;
  name: string;
  location: string;
  country: string;
  lengthKm: number;
  laps: number;
  imageUrl?: string;
}

const API_URL = "http://localhost:8080";

async function fetchCircuits(): Promise<Circuit[]> {
  const response = await axios.get(`${API_URL}/circuits`, { withCredentials: true });
  return response.data;
}

export default function CircuitsPage() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCircuits()
      .then((data) => {
        setCircuits(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load circuits");
        setCircuits([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-white">Loading circuits...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">F1 Circuits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((circuit) => (
          <div key={circuit.id} className="bg-gray-900 p-4 rounded-lg shadow">
            {circuit.imageUrl && (
              <img
                src={circuit.imageUrl}
                alt={circuit.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-1">{circuit.name}</h2>
            <p className="text-sm text-gray-400 mb-1">
              Location: {circuit.location}, {circuit.country}
            </p>
            <p className="text-sm text-gray-500">
              Length: {circuit.lengthKm} km | Laps: {circuit.laps}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
