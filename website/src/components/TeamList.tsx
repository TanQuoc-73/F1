"use client";
import React, { useEffect, useState } from "react";
import { fetchTeams } from "@/services/teamService";

interface Team {
  id: number;
  name: string;
  logoUrl?: string;
  country?: string;
}

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load teams.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p className="text-center mt-4 text-white">Loading teams...</p>;
  if (error) return <p className="text-center mt-4 text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="border border-gray-700 rounded-lg p-4 bg-[#1a1a1a] shadow-lg text-center text-white hover:shadow-xl transition"
        >
          {team.logoUrl && (
            <img
              src={team.logoUrl}
              alt={team.name}
              className="w-20 h-20 mx-auto mb-2 object-contain"
            />
          )}
          <h3 className="text-lg font-semibold">{team.name}</h3>
          {team.country && (
            <p className="text-sm text-gray-400">{team.country}</p>
          )}
        </div>
      ))}
    </div>
  );
}
