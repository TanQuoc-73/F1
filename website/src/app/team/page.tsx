"use client";

import React, { useEffect, useState } from "react";
import { fetchDrivers } from "@/services/driverService";
import TeamDetailModal from "@/components/TeamDetailModal";

interface Team {
  id: number;
  name: string;
  logoUrl?: string;
  carImageUrl?: string;
  country?: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  team: {
    id: number;
  };
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

export default function TeamPage() {
  const [teamStandings, setTeamStandings] = useState<TeamStanding[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<TeamStanding | null>(null);

  // Fetch all seasons and set default to latest
  useEffect(() => {
    const fetchSeasons = async () => {
      const res = await fetch("http://localhost:8080/seasons");
      const data = await res.json();
      setSeasons(data);
      if (data.length > 0) {
        // Chọn mùa mới nhất (năm lớn nhất)
        const latest = data.reduce((a: Season, b: Season) => (a.year > b.year ? a : b));
        setSelectedSeason(latest);
      }
    };
    fetchSeasons();
  }, []);

  // Fetch standings theo season
  useEffect(() => {
    if (!selectedSeason) {
      setTeamStandings([]);
      return;
    }
    setLoading(true);
    setTeamStandings([]); // Reset standings khi đổi season
    Promise.all([
      fetch(`http://localhost:8080/team-standings?seasonId=${selectedSeason.id}`).then(res => res.json()),
      fetchDrivers()
    ])
      .then(([standingsData, driversData]) => {
        // Chỉ lấy standings đúng mùa
        const filtered = standingsData.filter((s: TeamStanding) => s.season.id === selectedSeason.id);
        setTeamStandings(filtered.sort((a: TeamStanding, b: TeamStanding) => a.position - b.position));
        setDrivers(driversData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data.");
        setLoading(false);
        console.error(err);
      });
  }, [selectedSeason]);

  if (loading) return <p className="text-center mt-4 text-white">Loading teams...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">F1 Teams</h1>
      {/* Season Filter */}
      <div className="flex justify-center mb-8">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedSeason?.id || ''}
          onChange={e => {
            const season = seasons.find(s => s.id === Number(e.target.value));
            setSelectedSeason(season || null);
          }}
        >
          {seasons.map(s => (
            <option key={s.id} value={s.id}>{s.year}</option>
          ))}
        </select>
      </div>
      {selectedSeason && (
        <div className="text-center text-gray-400 mb-8">Season {selectedSeason.year}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {teamStandings.map((standing) => {
          const teamDrivers = drivers.filter(d => d.team.id === standing.team.id);
          return (
            <div
              key={standing.id}
              onClick={() => setSelectedTeam(standing)}
              className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-0 flex flex-col h-[500px] w-full mx-auto overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="flex justify-between items-start px-4 pt-3 pb-3 border-b border-gray-700">
                <div className="text-3xl font-extrabold text-yellow-400" style={{ fontFamily: 'F1Bold,Arial,sans-serif' }}>
                  {standing.position}
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-black text-yellow-400 leading-none">
                    {standing.points}
                  </div>
                  <div className="text-xs font-black bg-gray-700 text-white px-2 py-1 rounded mt-1 tracking-widest">
                    PTS
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-4 pt-4 pb-2">
                <div className="flex items-center justify-between gap-4 mb-4 w-full">
                  {teamDrivers[0]?.imageUrl && (
                    <div className="flex items-center gap-3">
                      <img 
                        src={teamDrivers[0].imageUrl} 
                        alt={teamDrivers[0].lastName} 
                        className="h-12 w-12 object-contain rounded-full border-2 border-gray-600" 
                      />
                      <div className="text-sm text-gray-300">
                        {teamDrivers[0].firstName} <br />
                        <span className="font-bold text-white">{teamDrivers[0].lastName}</span>
                      </div>
                    </div>
                  )}
                  {teamDrivers[1]?.imageUrl && (
                    <div className="flex items-center gap-3">
                      <img 
                        src={teamDrivers[1].imageUrl} 
                        alt={teamDrivers[1].lastName} 
                        className="h-12 w-12 object-contain rounded-full border-2 border-gray-600" 
                      />
                      <div className="text-sm text-gray-300">
                        {teamDrivers[1].firstName} <br />
                        <span className="font-bold text-white">{teamDrivers[1].lastName}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-4 bg-red-600 mr-2" />
                  <div className="text-lg font-extrabold uppercase tracking-wide text-yellow-400 leading-tight" style={{ fontFamily: 'F1Bold,Arial,sans-serif' }}>
                    {standing.team.name}
                  </div>
                </div>
              </div>

              {standing.team.logoUrl && (
                <div className="flex-none flex items-center justify-center h-48 px-4">
                  <img 
                    src={standing.team.logoUrl} 
                    alt={standing.team.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}

              {standing.team.carImageUrl && (
                <div className="flex-none flex items-center justify-center h-20 px-4 mt-2">
                  <img 
                    src={standing.team.carImageUrl} 
                    alt={standing.team.name} 
                    className="w-full h-10 object-contain" 
                  />
                </div>
              )}

              <div className="flex flex-col items-center px-4 pt-2 pb-4 flex-grow mt-auto">
              </div>
            </div>
          );
        })}
      </div>

      <TeamDetailModal
        isOpen={selectedTeam !== null}
        onClose={() => setSelectedTeam(null)}
        teamStanding={selectedTeam}
        drivers={drivers}
      />
    </div>
  );
}