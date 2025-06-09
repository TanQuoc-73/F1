"use client"

import React, { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Season {
  id: number;
  year: number;
}

interface TeamStanding {
  id?: number;
  team: Team;
  season: Season;
  points: number;
  position: number;
}

const AdminTeamStanding: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [filterSeasonId, setFilterSeasonId] = useState<string>("");

  const [form, setForm] = useState({
    seasonId: "",
    teamId: "",
    points: "",
    position: "",
  });

  const fetchData = async () => {
    const [standingsRes, teamsRes, seasonsRes] = await Promise.all([
      fetch("http://localhost:8080/team-standings"),
      fetch("http://localhost:8080/teams"),
      fetch("http://localhost:8080/seasons"),
    ]);

    const [standingsData, teamsData, seasonsData] = await Promise.all([
      standingsRes.json(),
      teamsRes.json(),
      seasonsRes.json(),
    ]);

    setStandings(standingsData);
    setTeams(teamsData);
    setSeasons(seasonsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const season = seasons.find((s) => s.id === parseInt(form.seasonId));
    const team = teams.find((t) => t.id === parseInt(form.teamId));
    if (!season || !team) return;

    const newStanding: TeamStanding = {
      season,
      team,
      points: parseFloat(form.points),
      position: parseInt(form.position),
    };

    const url = editId
      ? `http://localhost:8080/team-standings/${editId}`
      : "http://localhost:8080/team-standings";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStanding),
    });

    setForm({ seasonId: "", teamId: "", points: "", position: "" });
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    await fetch(`http://localhost:8080/team-standings/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleEdit = (standing: TeamStanding) => {
    setEditId(standing.id!);
    setForm({
      seasonId: standing.season.id.toString(),
      teamId: standing.team.id.toString(),
      points: standing.points.toString(),
      position: standing.position.toString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Manage Team Standings</h1>

      {/* Filter */}
      <div className="mb-6">
        <label className="mr-3">Filter by Season:</label>
        <select
          value={filterSeasonId}
          onChange={(e) => setFilterSeasonId(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="">All</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.year}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-2 gap-4">
        <select
          value={form.seasonId}
          onChange={(e) => setForm({ ...form, seasonId: e.target.value })}
          required
          className="p-2 bg-gray-800 rounded"
        >
          <option value="">Select Season</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.year}
            </option>
          ))}
        </select>

        <select
          value={form.teamId}
          onChange={(e) => setForm({ ...form, teamId: e.target.value })}
          required
          className="p-2 bg-gray-800 rounded"
        >
          <option value="">Select Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Points"
          value={form.points}
          onChange={(e) => setForm({ ...form, points: e.target.value })}
          required
          className="p-2 bg-gray-800 rounded"
        />

        <input
          type="number"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
          className="p-2 bg-gray-800 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"} Standing
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ seasonId: "", teamId: "", points: "", position: "" });
            }}
            className="col-span-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* List */}
      <table className="w-full bg-gray-800 rounded shadow">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="p-3">Season</th>
            <th className="p-3">Team</th>
            <th className="p-3">Points</th>
            <th className="p-3">Position</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {standings
            .filter((s) =>
              filterSeasonId
                ? s.season.id.toString() === filterSeasonId
                : true
            )
            .map((s) => (
              <tr key={s.id} className="border-b border-gray-700">
                <td className="p-3">{s.season.year}</td>
                <td className="p-3">{s.team.name}</td>
                <td className="p-3">{s.points}</td>
                <td className="p-3">{s.position}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id!)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTeamStanding;
