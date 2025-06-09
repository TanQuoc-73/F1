"use client";

import { useEffect, useState } from "react";

interface Team {
  id?: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

export default function TeamsAdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState<Team>({
    name: "",
    baseCountry: "",
    logoUrl: "",
    principal: "",
    powerUnit: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const res = await fetch("http://localhost:8080/teams");
    const data = await res.json();
    setTeams(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/teams/${editingId}`
      : "http://localhost:8080/teams";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      baseCountry: "",
      logoUrl: "",
      principal: "",
      powerUnit: "",
    });
    setEditingId(null);
    fetchTeams();
  };

  const handleEdit = (team: Team) => {
    setForm(team);
    setEditingId(team.id!);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/teams/${id}`, {
      method: "DELETE",
    });
    fetchTeams();
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Team Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Base Country"
            value={form.baseCountry}
            onChange={(e) => setForm({ ...form, baseCountry: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Principal"
            value={form.principal}
            onChange={(e) => setForm({ ...form, principal: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Power Unit"
            value={form.powerUnit}
            onChange={(e) => setForm({ ...form, powerUnit: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            className="col-span-2 p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"} Team
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-gray-900 p-4 rounded shadow">
            {team.logoUrl && (
              <img
                src={team.logoUrl}
                alt={team.name}
                className="w-full h-32 object-contain bg-white p-2 rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold">{team.name}</h2>
            <p className="text-gray-400">{team.baseCountry}</p>
            <p className="text-sm text-gray-500">Principal: {team.principal}</p>
            <p className="text-sm text-gray-500">Power Unit: {team.powerUnit}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(team)}
                className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(team.id!)}
                className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
