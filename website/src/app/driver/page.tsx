"use client";
import React, { useEffect, useState } from "react";
import DriverDetailModal from "@/components/DriverDetailModal";

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
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

export default function DriverPage() {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [filteredStandings, setFilteredStandings] = useState<DriverStanding[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"position" | "points" | "name" | "number">("position");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

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
      setStandings([]);
      setFilteredStandings([]);
      return;
    }
    setLoading(true);
    setStandings([]);
    setFilteredStandings([]);
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/driver-standings?seasonId=${selectedSeason.id}`);
      const data = await res.json();
      const filtered = data.filter((s: DriverStanding) => s.season.id === selectedSeason.id);
      const sorted = filtered.sort((a: DriverStanding, b: DriverStanding) => a.position - b.position);
      setStandings(sorted);
      setFilteredStandings(sorted);
      setLoading(false);
    };
    fetchData();
  }, [selectedSeason]);

  // Filter and sort drivers
  useEffect(() => {
    let filtered = [...standings];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(standing =>
        standing.driver.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        standing.driver.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply team filter
    if (selectedTeam !== "all") {
      filtered = filtered.filter(standing =>
        standing.driver.team.name === selectedTeam
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
          comparison = a.driver.lastName.localeCompare(b.driver.lastName);
          break;
        case "number":
          comparison = a.driver.number - b.driver.number;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredStandings(filtered);
  }, [standings, searchQuery, sortBy, sortOrder, selectedTeam]);

  // Get unique teams for filter
  const teams = Array.from(new Set(standings.map(s => s.driver.team.name)));

  const top3 = filteredStandings.slice(0, 3);
  const rest = filteredStandings.slice(3);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">F1 Drivers</h1>
      
      {/* Filters and Search */}
      <div className="max-w-6xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Season Filter */}
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded w-full md:w-auto"
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

          {/* Team Filter */}
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded w-full md:w-auto"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded w-full md:w-64 pl-10"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          <div className="flex gap-2 w-full md:w-auto">
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "position" | "points" | "name" | "number")}
            >
              <option value="position">Position</option>
              <option value="points">Points</option>
              <option value="name">Driver Name</option>
              <option value="number">Driver Number</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {selectedSeason && (
          <div className="text-center text-gray-400">Season {selectedSeason.year}</div>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-xl">Loading...</div>
      ) : (
        <>
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {top3.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setSelectedDriver(s.driver)}
                className={`relative group rounded-2xl flex flex-col items-stretch p-0 overflow-visible border-4 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_0_rgba(255,255,255,0.15)] ${
                  idx === 0 ? "border-yellow-400" : idx === 1 ? "border-gray-400" : "border-orange-400"
                } bg-gray-800 w-full cursor-pointer`}
                style={{ minHeight: 480, minWidth: 300, maxWidth: 420, margin: '0 auto' }}
              >
                {/* Top row: position & points */}
                <div className="flex justify-between items-start px-6 pt-4">
                  <div className="text-3xl font-extrabold text-white/90" style={{fontFamily:'F1Bold,Arial,sans-serif'}}>{s.position}</div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-black text-white leading-none">{s.points}</div>
                    <div className="text-xs font-black bg-black text-white px-2 py-0.5 rounded mt-1 tracking-widest">PTS</div>
                  </div>
                </div>
                {/* Name, flag, team */}
                <div className="px-6 mt-2 mb-2 border-b border-gray-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">{s.driver.firstName}</span>
                    {s.driver.nationality && (
                      <img src={`https://flagcdn.com/24x18/${getCountryCode(s.driver.nationality)}.png`} alt={s.driver.nationality} className="h-4 w-6 object-cover rounded-sm ml-1" />
                    )}
                  </div>
                  <div className="text-2xl font-extrabold uppercase tracking-wide text-white leading-tight" style={{fontFamily:'F1Bold,Arial,sans-serif'}}>{s.driver.lastName}</div>
                  <div className="text-sm text-gray-400 mt-1">{s.driver.team.name}</div>
                </div>
                {/* Driver image lớn, sát đáy thẻ */}
                <div className="flex-1 flex items-end justify-center relative min-h-[300px]">
                  {s.driver.imageUrl && s.driver.imageUrl.trim() !== "" && (
                    <img
                      src={s.driver.imageUrl}
                      alt={s.driver.firstName}
                      className="w-[240px] h-[300px] object-contain drop-shadow-xl z-10 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "transparent" }}
                    />
                  )}
                  {/* Số áo lớn góc dưới trái, overlay lên ảnh */}
                  <div className="absolute left-6 bottom-4 text-7xl font-extrabold select-none" style={{ color: idx === 0 ? '#ff9800' : idx === 1 ? '#bdbdbd' : '#e53935', fontFamily:'F1Bold,Arial,sans-serif', opacity:0.95 }}>
                    {s.driver.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Rest of Drivers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {rest.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedDriver(s.driver)}
                className="relative group flex flex-col items-stretch p-0 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_0_rgba(255,255,255,0.10)] bg-gray-800 w-full cursor-pointer"
                style={{ minHeight: 380, minWidth: 220, maxWidth: 320, margin: '0 auto' }}
              >
                {/* Top: position & points */}
                <div className="flex justify-between items-start px-5 pt-3">
                  <div className="text-xl font-extrabold text-white/80">{s.position}</div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-black text-white leading-none">{s.points}</div>
                    <div className="text-xs font-black bg-black text-white px-2 py-0.5 rounded mt-1 tracking-widest">PTS</div>
                  </div>
                </div>
                {/* Name, flag, team */}
                <div className="px-5 mt-1 mb-1 border-b border-gray-700 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">{s.driver.firstName}</span>
                    {s.driver.nationality && (
                      <img src={`https://flagcdn.com/24x18/${getCountryCode(s.driver.nationality)}.png`} alt={s.driver.nationality} className="h-4 w-6 object-cover rounded-sm ml-1" />
                    )}
                  </div>
                  <div className="text-xl font-extrabold uppercase tracking-wide text-white leading-tight">{s.driver.lastName}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.driver.team.name}</div>
                </div>
                {/* Driver image lớn hơn */}
                <div className="flex-1 flex items-end justify-center relative min-h-[180px]">
                  {s.driver.imageUrl && s.driver.imageUrl.trim() !== "" && (
                    <img
                      src={s.driver.imageUrl}
                      alt={s.driver.firstName}
                      className="w-[140px] h-[180px] object-contain drop-shadow-xl z-10 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "transparent" }}
                    />
                  )}
                  {/* Số áo lớn góc dưới */}
                  <div className="absolute left-5 bottom-4 text-5xl font-extrabold select-none" style={{ color: '#ff9800', fontFamily:'F1Bold,Arial,sans-serif', opacity:0.9 }}>
                    {s.driver.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <DriverDetailModal
        isOpen={selectedDriver !== null}
        onClose={() => setSelectedDriver(null)}
        driver={selectedDriver}
      />
    </div>
  );
}

// Helper function for country code
function getCountryCode(nationality: string): string {
  const map: Record<string, string> = {
    Australia: "au",
    "United Kingdom": "gb",
    Netherlands: "nl",
    Monaco: "mc",
    Italy: "it",
    France: "fr",
    Spain: "es",
    Germany: "de",
    Finland: "fi",
    Mexico: "mx",
    Canada: "ca",
    Japan: "jp",
    China: "cn",
    Brazil: "br",
    USA: "us",
  };
  return map[nationality] || "us";
}
