"use client";

import { useEffect, useState } from "react";

interface Circuit {
  id?: number;
  name: string;
  location: string;
  country: string;
  lengthKm: number;
  laps: number;
  imageUrl?: string;
}

export default function CircuitsAdminPage() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [form, setForm] = useState<Circuit>({
    name: "",
    location: "",
    country: "",
    lengthKm: 0,
    laps: 0,
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCircuits();
  }, []);

  const fetchCircuits = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/circuits`);
    const data = await res.json();
    setCircuits(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/circuits/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/circuits`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      location: "",
      country: "",
      lengthKm: 0,
      laps: 0,
      imageUrl: "",
    });
    setEditingId(null);
    fetchCircuits();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/circuits/${id}`, {
      method: "DELETE",
    });
    fetchCircuits();
  };

  const handleEdit = (c: Circuit) => {
    setForm(c);
    setEditingId(c.id!);
  };

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Circuit Management</h1>

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
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="number"
            placeholder="Length (km)"
            value={form.lengthKm}
            onChange={(e) => setForm({ ...form, lengthKm: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700 text-white"
            step="0.01"
            required
          />
          <input
            type="number"
            placeholder="Laps"
            value={form.laps}
            onChange={(e) => setForm({ ...form, laps: parseInt(e.target.value) })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"} Circuit
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((c) => (
          <div key={c.id} className="bg-gray-900 p-4 rounded shadow">
            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-xl font-bold">{c.name}</h2>
            <p className="text-sm text-gray-400">
              {c.location}, {c.country}
            </p>
            <p className="text-sm text-gray-500">Length: {c.lengthKm} km</p>
            <p className="text-sm text-gray-500">Laps: {c.laps}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c.id!)}
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

