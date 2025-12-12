"use client"

import React, { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
  logoUrl: string;
  baseCountry: string;
  principal: string;
  powerUnit: string;
}

interface Season {
  id: number;
  year: number;
}

interface TeamStanding {
  id: number;
  team: Team;
  season: Season;
  points: number;
  position: number;
}

const TeamStandingPage: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [standingRes, seasonRes] = await Promise.all([
        fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/team-standings"),
        fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/seasons"),
      ]);

      const [standingData, seasonData] = await Promise.all([
        standingRes.json(),
        seasonRes.json(),
      ]);

      setStandings(standingData);
      setSeasons(seasonData);
    };

    fetchData();
  }, []);

  const filteredStandings = standings
    .filter((s) =>
      selectedSeasonId
        ? s.season.id.toString() === selectedSeasonId
        : true
    )
    .sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Team Standings</h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedSeasonId}
          onChange={(e) => setSelectedSeasonId(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded"
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded shadow-lg text-left">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="p-4">Position</th>
              <th className="p-4">Team</th>
              <th className="p-4">Points</th>
              <th className="p-4">Country</th>
              <th className="p-4">Principal</th>
              <th className="p-4">Power Unit</th>
              <th className="p-4">Season</th>
            </tr>
          </thead>
          <tbody>
            {filteredStandings.map((s, index) => (
              <tr key={s.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 flex items-center space-x-4">
                  <img
                    src={s.team.logoUrl}
                    alt={s.team.name}
                    className="h-10 w-10 object-contain"
                  />
                  <span>{s.team.name}</span>
                </td>
                <td className="p-4">{s.points}</td>
                <td className="p-4">{s.team.baseCountry}</td>
                <td className="p-4">{s.team.principal}</td>
                <td className="p-4">{s.team.powerUnit}</td>
                <td className="p-4">{s.season.year}</td>
              </tr>
            ))}
            {filteredStandings.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  No standings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStandingPage;

