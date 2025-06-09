"use client";
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

export default function DriverPage() {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(false);

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
      setStandings([]);
      return;
    }
    setLoading(true);
    setStandings([]); // Reset standings khi đổi season
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/driver-standings?seasonId=${selectedSeason.id}`);
      const data = await res.json();
      // Chỉ lấy standings đúng mùa, không lặp driver
      const filtered = data.filter((s: DriverStanding) => s.season.id === selectedSeason.id);
      setStandings(filtered.sort((a: DriverStanding, b: DriverStanding) => a.position - b.position));
      setLoading(false);
    };
    fetchData();
  }, [selectedSeason]);

  const top3 = standings.slice(0, 3);
  const rest = standings.slice(3);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">F1 Drivers</h1>
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
      {loading ? (
        <div className="text-center text-gray-400 text-xl">Loading...</div>
      ) : (
        <>
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {top3.map((s, idx) => (
              <div
                key={s.id}
                className={`relative bg-white text-black rounded-2xl shadow-lg flex flex-col items-center p-6 border-4 ${
                  idx === 0 ? "border-yellow-400" : idx === 1 ? "border-gray-400" : "border-orange-400"
                }`}
                style={{ minHeight: 420 }}
              >
                <div className="absolute top-4 left-4 text-4xl font-bold opacity-30 select-none">
                  {s.position}
                </div>
                <div className="absolute top-4 right-4 text-right">
                  <div className="text-2xl font-bold">{s.points}</div>
                  <div className="text-xs font-black bg-black text-white px-2 py-1 rounded">PTS</div>
                </div>
                <div className="flex flex-col items-center mt-8">
                  <img
                    src={s.driver.imageUrl}
                    alt={s.driver.firstName}
                    className="w-36 h-36 object-contain mb-4"
                    style={{ background: "#f3f3f3", borderRadius: 16 }}
                  />
                  <div className="text-lg font-bold uppercase tracking-wide">
                    {s.driver.firstName}
                  </div>
                  <div className="text-2xl font-extrabold uppercase mb-2" style={{ letterSpacing: 1 }}>
                    {s.driver.lastName}
                  </div>
                  <div className="text-gray-500 mb-2">{s.driver.team.name}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={s.driver.team.logoUrl} alt={s.driver.team.name} className="h-6 w-6" />
                    <span className="text-xs text-gray-700">{s.driver.nationality}</span>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 text-5xl font-extrabold opacity-20 select-none" style={{ color: idx === 0 ? '#ff9800' : idx === 1 ? '#ffb300' : '#e53935' }}>
                    {s.driver.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Rest of Drivers */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rest.map((s) => (
              <div
                key={s.id}
                className="bg-gray-900 p-4 rounded-lg shadow text-center flex flex-col items-center"
              >
                <img
                  src={s.driver.imageUrl}
                  alt={s.driver.firstName}
                  className="w-20 h-20 object-contain mb-3 rounded-full border border-gray-700"
                  style={{ background: "#f3f3f3" }}
                />
                <div className="text-lg font-semibold">
                  {s.driver.firstName} {s.driver.lastName}
                </div>
                <div className="text-sm text-gray-400">{s.driver.nationality}</div>
                <div className="text-sm text-gray-500 italic mt-1">Team: {s.driver.team.name}</div>
                <div className="text-xs text-gray-400 mt-1">#{s.driver.number} • {s.points} pts</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
