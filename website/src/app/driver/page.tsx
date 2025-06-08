"use client";
import React, { useEffect, useState } from "react";
import { fetchDrivers } from "@/services/driverService";

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
  name: string;
  photoUrl?: string;
  nationality: string;
  team: Team;
}

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filtered, setFiltered] = useState<Driver[]>([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDrivers(teamFilter, nationalityFilter)
      .then((data: Driver[]) => {
        const validDrivers = data.filter(
          (driver: Driver): driver is Driver => !!driver.name && typeof driver.name === "string"
        );
        setDrivers(validDrivers);
        setFiltered(validDrivers);
      })
      .catch(() => setDrivers([]));
  }, [teamFilter, nationalityFilter]);

  useEffect(() => {
    const filteredData = drivers.filter((d: Driver) =>
      d.name ? d.name.toLowerCase().includes(search.toLowerCase()) : false
    );
    setFiltered(filteredData);
  }, [search, drivers]);

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Driver List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 bg-gray-800 rounded"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        >
          <option value="">All Teams</option>
          <option value="Red Bull">Red Bull</option>
          <option value="Ferrari">Ferrari</option>
          {/* Add more as needed */}
        </select>

        <select
          className="p-2 bg-gray-800 rounded"
          value={nationalityFilter}
          onChange={(e) => setNationalityFilter(e.target.value)}
        >
          <option value="">All Nationalities</option>
          <option value="Netherlands">Netherlands</option>
          <option value="UK">UK</option>
          {/* Add more as needed */}
        </select>

        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 bg-gray-800 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((driver) => (
          <div
            key={driver.id}
            className="bg-gray-900 p-4 rounded shadow text-center"
          >
            {driver.photoUrl && (
              <img
                src={driver.photoUrl}
                alt={driver.name}
                className="w-20 h-20 mx-auto mb-2 object-cover rounded-full"
              />
            )}
            <h3 className="text-lg font-semibold">{driver.name}</h3>
            <p className="text-sm text-gray-400">{driver.nationality}</p>
            <p className="text-sm text-gray-500 italic">{driver.team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}