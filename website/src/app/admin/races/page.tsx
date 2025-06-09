"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Season {
  id: number;
  year: number;
}

interface Circuit {
  id: number;
  name: string;
}

interface Race {
  id: number;
  raceName: string;
  raceDate: string;
  roundNumber: number;
  season: Season;
  circuit: Circuit;
}

const API_URL = "http://localhost:8080";

async function fetchRaces(): Promise<Race[]> {
  const res = await axios.get(`${API_URL}/races`);
  return res.data;
}

async function fetchSeasons(): Promise<Season[]> {
  const res = await axios.get(`${API_URL}/seasons`);
  return res.data;
}

async function fetchCircuits(): Promise<Circuit[]> {
  const res = await axios.get(`${API_URL}/circuits`);
  return res.data;
}

async function deleteRace(id: number): Promise<void> {
  await axios.delete(`${API_URL}/races/${id}`);
}

async function createRace(race: {
  raceName: string;
  raceDate: string;
  roundNumber: number;
  season: { id: number };
  circuit: { id: number };
}): Promise<Race> {
  const res = await axios.post(`${API_URL}/races`, race);
  return res.data;
}

export default function RaceManagementPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [raceName, setRaceName] = useState("");
  const [raceDate, setRaceDate] = useState("");
  const [roundNumber, setRoundNumber] = useState(1);
  const [seasonId, setSeasonId] = useState<number | "">("");
  const [circuitId, setCircuitId] = useState<number | "">("");

  useEffect(() => {
    Promise.all([fetchRaces(), fetchSeasons(), fetchCircuits()])
      .then(([racesData, seasonsData, circuitsData]) => {
        setRaces(racesData);
        setSeasons(seasonsData);
        setCircuits(circuitsData);
        setError(null);
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa race này?")) return;
    try {
      await deleteRace(id);
      setRaces(races.filter((r) => r.id !== id));
    } catch {
      alert("Xóa race thất bại");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!raceName || !raceDate || !seasonId || !circuitId) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const newRace = await createRace({
        raceName,
        raceDate,
        roundNumber,
        season: { id: Number(seasonId) },
        circuit: { id: Number(circuitId) },
      });
      setRaces([...races, newRace]);

      // Reset form
      setRaceName("");
      setRaceDate("");
      setRoundNumber(1);
      setSeasonId("");
      setCircuitId("");
    } catch {
      alert("Tạo race thất bại");
    }
  };

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-black min-h-screen text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quản lý Race</h1>

      {/* Form tạo race */}
      <form onSubmit={handleCreate} className="mb-8 bg-gray-900 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Tạo race mới</h2>

        <div>
          <label className="block mb-1 font-medium" htmlFor="raceName">Tên Race</label>
          <input
            id="raceName"
            type="text"
            value={raceName}
            onChange={(e) => setRaceName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="raceDate">Ngày tổ chức</label>
          <input
            id="raceDate"
            type="date"
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="roundNumber">Số vòng đua</label>
          <input
            id="roundNumber"
            type="number"
            min={1}
            value={roundNumber}
            onChange={(e) => setRoundNumber(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="season">Season</label>
          <select
            id="season"
            value={seasonId}
            onChange={(e) => setSeasonId(e.target.value ? Number(e.target.value) : "")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          >
            <option value="">Chọn Season</option>
            {seasons.map((s) => (
              <option key={s.id} value={s.id}>
                {s.year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="circuit">Circuit</label>
          <select
            id="circuit"
            value={circuitId}
            onChange={(e) => setCircuitId(e.target.value ? Number(e.target.value) : "")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          >
            <option value="">Chọn Circuit</option>
            {circuits.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition rounded px-4 py-2 font-semibold"
        >
          Tạo Race
        </button>
      </form>

      {/* Danh sách races */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Danh sách Races</h2>
        {races.length === 0 ? (
          <p>Chưa có race nào.</p>
        ) : (
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">Tên Race</th>
                <th className="py-2 px-4">Ngày</th>
                <th className="py-2 px-4">Số vòng</th>
                <th className="py-2 px-4">Season</th>
                <th className="py-2 px-4">Circuit</th>
                <th className="py-2 px-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{race.raceName}</td>
                  <td className="py-2 px-4">{new Date(race.raceDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{race.roundNumber}</td>
                  <td className="py-2 px-4">{race.season.year}</td>
                  <td className="py-2 px-4">{race.circuit.name}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm"
                      onClick={() => handleDelete(race.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
