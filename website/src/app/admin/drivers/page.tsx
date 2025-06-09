"use client";

import { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Driver {
  id?: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

export default function DriversAdminPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    dateOfBirth: "",
    imageUrl: "",
    number: 0,
    teamId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDrivers();
    fetchTeams();
  }, []);

  const fetchDrivers = async () => {
    const res = await fetch("http://localhost:8080/drivers");
    const data = await res.json();
    setDrivers(data);
  };

  const fetchTeams = async () => {
    const res = await fetch("http://localhost:8080/teams");
    const data = await res.json();
    setTeams(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/drivers/${editingId}`
      : "http://localhost:8080/drivers";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        team: teams.find((t) => t.id === form.teamId),
      }),
    });

    setForm({
      firstName: "",
      lastName: "",
      nationality: "",
      dateOfBirth: "",
      imageUrl: "",
      number: 0,
      teamId: 0,
    });
    setEditingId(null);
    fetchDrivers();
  };

  const handleEdit = (driver: Driver) => {
    setEditingId(driver.id!);
    setForm({
      firstName: driver.firstName,
      lastName: driver.lastName,
      nationality: driver.nationality,
      dateOfBirth: driver.dateOfBirth,
      imageUrl: driver.imageUrl,
      number: driver.number,
      teamId: driver.team.id,
    });
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/drivers/${id}`, {
      method: "DELETE",
    });
    fetchDrivers();
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Driver Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Nationality"
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="number"
            placeholder="Number"
            value={form.number}
            onChange={(e) =>
              setForm({ ...form, number: Number(e.target.value) })
            }
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="col-span-2 p-2 rounded bg-gray-700 text-white"
          />
          <select
            value={form.teamId}
            onChange={(e) => setForm({ ...form, teamId: Number(e.target.value) })}
            className="col-span-2 p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value={0}>Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"} Driver
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-gray-900 p-4 rounded shadow">
            {driver.imageUrl && (
              <img
                src={driver.imageUrl}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="w-full h-48 object-contain bg-white p-2 rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold">
              #{driver.number} {driver.firstName} {driver.lastName}
            </h2>
            <p className="text-gray-400">{driver.nationality}</p>
            <p className="text-sm text-gray-500">DOB: {driver.dateOfBirth}</p>
            <p className="text-sm text-gray-500">Team: {driver.team.name}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(driver)}
                className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(driver.id!)}
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
