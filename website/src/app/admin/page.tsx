"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
  totalSeasons: number;
  totalRaces: number;
  totalDrivers: number;
  totalTeams: number;
  totalDriverStandings: number;
  totalTeamStandings: number;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}`;

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalSeasons: 0,
    totalRaces: 0,
    totalDrivers: 0,
    totalTeams: 0,
    totalDriverStandings: 0,
    totalTeamStandings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [seasons, races, drivers, teams, driverStandings, teamStandings] = await Promise.all([
          axios.get(`${API_URL}/seasons`),
          axios.get(`${API_URL}/races`),
          axios.get(`${API_URL}/drivers`),
          axios.get(`${API_URL}/teams`),
          axios.get(`${API_URL}/driver-standings`),
          axios.get(`${API_URL}/team-standings`)
        ]);

        setStats({
          totalSeasons: seasons.data.length,
          totalRaces: races.data.length,
          totalDrivers: drivers.data.length,
          totalTeams: teams.data.length,
          totalDriverStandings: driverStandings.data.length,
          totalTeamStandings: teamStandings.data.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Seasons</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalSeasons}</p>
            <p className="text-sm text-gray-400 mt-2">Total F1 seasons</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Races</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalRaces}</p>
            <p className="text-sm text-gray-400 mt-2">Total races scheduled</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Drivers</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalDrivers}</p>
            <p className="text-sm text-gray-400 mt-2">Active drivers</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Teams</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalTeams}</p>
            <p className="text-sm text-gray-400 mt-2">Active teams</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Driver Standings</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalDriverStandings}</p>
            <p className="text-sm text-gray-400 mt-2">Total driver standings</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Team Standings</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalTeamStandings}</p>
            <p className="text-sm text-gray-400 mt-2">Total team standings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

