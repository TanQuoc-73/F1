"use client"

// src/pages/DriverStandingAdminPage.tsx
import React, { useEffect, useState } from "react";

const DriverStandingAdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    driverId: "",
    seasonId: "",
    points: "",
    position: ""
  });
  const [standings, setStandings] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/driver-standings")
      .then(res => res.json())
      .then(setStandings);
  }, []);

  const handleAddStanding = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/driver-standings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driver: { id: parseInt(formData.driverId) },
        season: { id: parseInt(formData.seasonId) },
        points: parseFloat(formData.points),
        position: parseInt(formData.position)
      })
    });
    if (res.ok) {
      const newStanding = await res.json();
      setStandings([...standings, newStanding]);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/driver-standings/${id}`, {
      method: "DELETE"
    });
    setStandings(standings.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý Driver Standings</h1>
      <form className="flex gap-2 flex-wrap mb-6" onSubmit={handleAddStanding}>
        <input type="number" placeholder="Driver ID" value={formData.driverId} onChange={e => setFormData({ ...formData, driverId: e.target.value })} className="bg-gray-700 text-white px-2 py-1 rounded" required />
        <input type="number" placeholder="Season ID" value={formData.seasonId} onChange={e => setFormData({ ...formData, seasonId: e.target.value })} className="bg-gray-700 text-white px-2 py-1 rounded" required />
        <input type="number" step="0.1" placeholder="Points" value={formData.points} onChange={e => setFormData({ ...formData, points: e.target.value })} className="bg-gray-700 text-white px-2 py-1 rounded" required />
        <input type="number" placeholder="Position" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} className="bg-gray-700 text-white px-2 py-1 rounded" required />
        <button type="submit" className="bg-green-600 px-3 py-1 rounded">Add</button>
      </form>
      <table className="w-full bg-gray-800 rounded-lg">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Driver ID</th>
            <th className="p-3">Season ID</th>
            <th className="p-3">Points</th>
            <th className="p-3">Position</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(s => (
            <tr key={s.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{s.id}</td>
              <td className="p-3">{s.driver.id}</td>
              <td className="p-3">{s.season.id}</td>
              <td className="p-3">{s.points}</td>
              <td className="p-3">{s.position}</td>
              <td className="p-3">
                <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandingAdminPage;
