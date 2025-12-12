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
  const [filteredStandings, setFilteredStandings] = useState<TeamStanding[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<TeamStanding | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"position" | "points" | "name">("position");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch all seasons and set default to latest
  useEffect(() => {
    const fetchSeasons = async () => {
      const res = await fetch("http://localhost:8080/seasons");
      const data = await res.json();
      setSeasons(data);
      if (data.length > 0) {
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
      setFilteredStandings([]);
      return;
    }
    setLoading(true);
    setTeamStandings([]);
    setFilteredStandings([]);
    Promise.all([
      fetch(`http://localhost:8080/team-standings?seasonId=${selectedSeason.id}`).then(res => res.json()),
      fetchDrivers()
    ])
      .then(([standingsData, driversData]) => {
        const filtered = standingsData.filter((s: TeamStanding) => s.season.id === selectedSeason.id);
        const sorted = filtered.sort((a: TeamStanding, b: TeamStanding) => a.position - b.position);
        setTeamStandings(sorted);
        setFilteredStandings(sorted);
        setDrivers(driversData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data.");
        setLoading(false);
        console.error(err);
      });
  }, [selectedSeason]);

  // Filter and sort teams
  useEffect(() => {
    let filtered = [...teamStandings];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(standing =>
        standing.team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "position":
          comparison = a.position - b.position;
          break;
        case "points":
          comparison = b.points - a.points;
          break;
        case "name":
          comparison = a.team.name.localeCompare(b.team.name);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredStandings(filtered);
  }, [teamStandings, searchQuery, sortBy, sortOrder]);

  if (loading) return <p className="text-center mt-4 text-white">Loading teams...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">F1 Teams</h1>
      
      {/* Filters and Search */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8 space-y-4">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Season Filter */}
          <select
            className="bg-gray-800 text-white px-4 py-2.5 md:py-2 rounded w-full text-base"
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

          {/* Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2.5 md:py-2 rounded w-full pl-10 text-base"
            />
            <svg
              className="absolute left-3 top-3 md:top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 w-full">
            <select
              className="bg-gray-800 text-white px-4 py-2.5 md:py-2 rounded flex-1 text-base"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "position" | "points" | "name")}
            >
              <option value="position">Position</option>
              <option value="points">Points</option>
              <option value="name">Team Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="bg-gray-800 text-white px-4 py-2.5 md:py-2 rounded hover:bg-gray-700 min-w-[50px]"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {selectedSeason && (
          <div className="text-center text-gray-400 text-sm md:text-base">Season {selectedSeason.year}</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {filteredStandings.map((standing) => {
          const teamDrivers = drivers.filter(d => d.team.id === standing.team.id);
          return (
            <div
              key={standing.id}
              onClick={() => setSelectedTeam(standing)}
              className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-0 flex flex-col h-auto md:h-[500px] w-full mx-auto overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="flex justify-between items-start px-4 pt-3 pb-3 border-b border-gray-700">
                <div className="text-2xl md:text-3xl font-extrabold text-yellow-400" style={{ fontFamily: 'F1Bold,Arial,sans-serif' }}>
                  {standing.position}
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg md:text-xl font-black text-yellow-400 leading-none">
                    {standing.points}
                  </div>
                  <div className="text-xs font-black bg-gray-700 text-white px-2 py-1 rounded mt-1 tracking-widest">
                    PTS
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-4 pt-4 pb-2">
                <div className="flex items-center justify-between gap-2 md:gap-4 mb-4 w-full">
                  {teamDrivers[0]?.imageUrl && (
                    <div className="flex items-center gap-2 md:gap-3 flex-1">
                      <img 
                        src={teamDrivers[0].imageUrl} 
                        alt={teamDrivers[0].lastName} 
                        className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border-2 border-gray-600" 
                      />
                      <div className="text-xs md:text-sm text-gray-300">
                        {teamDrivers[0].firstName} <br />
                        <span className="font-bold text-white">{teamDrivers[0].lastName}</span>
                      </div>
                    </div>
                  )}
                  {teamDrivers[1]?.imageUrl && (
                    <div className="flex items-center gap-2 md:gap-3 flex-1">
                      <img 
                        src={teamDrivers[1].imageUrl} 
                        alt={teamDrivers[1].lastName} 
                        className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border-2 border-gray-600" 
                      />
                      <div className="text-xs md:text-sm text-gray-300">
                        {teamDrivers[1].firstName} <br />
                        <span className="font-bold text-white">{teamDrivers[1].lastName}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-4 bg-red-600 mr-2" />
                  <div className="text-base md:text-lg font-extrabold uppercase tracking-wide text-yellow-400 leading-tight" style={{ fontFamily: 'F1Bold,Arial,sans-serif' }}>
                    {standing.team.name}
                  </div>
                </div>
              </div>

              {standing.team.logoUrl && (
                <div className="flex-none flex items-center justify-center h-32 md:h-48 px-4">
                  <img 
                    src={standing.team.logoUrl} 
                    alt={standing.team.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}

              {standing.team.carImageUrl && (
                <div className="flex-none flex items-center justify-center h-16 md:h-20 px-4 mt-2">
                  <img 
                    src={standing.team.carImageUrl} 
                    alt={standing.team.name} 
                    className="w-full h-8 md:h-10 object-contain" 
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