"use client"
import React, { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
  logoUrl: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  nationality: string;
  number: number;
  team: Team;
}

interface Season {
  id: number;
  year: number;
}

interface DriverStanding {
  id: number;
  driver: Driver;
  season: Season;
  points: number;
  position: number;
}

const DriverStandingPage: React.FC = () => {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  // Default placeholder image for drivers
  const defaultDriverImage = "https://www.formula1.com/etc.clientlibs/fom/clientlibs/publish/fom-2020/clientlibs/base/resources/img/F1/driver-placeholder.png";
  
  // Default placeholder image for teams
  const defaultTeamLogo = "https://www.formula1.com/etc.clientlibs/fom/clientlibs/publish/fom-2020/clientlibs/base/resources/img/F1/team-placeholder.png";

  useEffect(() => {
    const fetchData = async () => {
      const [res1, res2] = await Promise.all([
        fetch("http://localhost:8080/driver-standings"),
        fetch("http://localhost:8080/seasons")
      ]);

      const [data1, data2] = await Promise.all([
        res1.json(),
        res2.json()
      ]);

      setStandings(data1);
      setSeasons(data2);
    };
    fetchData();
  }, []);

  const filtered = standings
    .filter(s => !selectedSeason || s.season.id.toString() === selectedSeason)
    .sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Driver Standings</h1>
      <div className="flex justify-center mb-6">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>{s.year}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">Position</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Points</th>
              <th className="p-3">Team</th>
              <th className="p-3">Nationality</th>
              <th className="p-3">Season</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-3">{s.position}</td>
                <td className="p-3 flex items-center gap-3">
                  <img 
                    src={s.driver.imageUrl || defaultDriverImage} 
                    alt={s.driver.firstName} 
                    className="h-10 w-10 rounded-full object-cover bg-gray-700" 
                  />
                  <span>{s.driver.firstName} {s.driver.lastName}</span>
                </td>
                <td className="p-3">{s.points}</td>
                <td className="p-3 flex items-center gap-2">
                  <img 
                    src={s.driver.team.logoUrl || defaultTeamLogo} 
                    alt={s.driver.team.name}
                    className="h-6 w-6 object-contain bg-gray-700" 
                  />
                  {s.driver.team.name}
                </td>
                <td className="p-3">{s.driver.nationality}</td>
                <td className="p-3">{s.season.year}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">No standings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverStandingPage;
