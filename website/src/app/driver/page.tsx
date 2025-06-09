"use client";
import React, { useEffect, useState } from "react";
import {
  fetchDrivers,
  fetchTeamOptions,
  fetchNationalityOptions,
} from "@/services/driverService";

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
  imageUrl?: string;
  nationality: string;
  team: Team;
}

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filtered, setFiltered] = useState<Driver[]>([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [search, setSearch] = useState("");

  const [teamOptions, setTeamOptions] = useState<string[]>([]);
  const [nationalityOptions, setNationalityOptions] = useState<string[]>([]);

  // Load filter options
  useEffect(() => {
    fetchTeamOptions().then(setTeamOptions);
    fetchNationalityOptions().then(setNationalityOptions);
  }, []);

  // Load filtered drivers
  useEffect(() => {
    fetchDrivers(teamFilter, nationalityFilter)
      .then((data) => {
        setDrivers(data);
        setFiltered(data);
      })
      .catch(() => setDrivers([]));
  }, [teamFilter, nationalityFilter]);

  // Search filter
  useEffect(() => {
    const filteredData = drivers.filter((d) =>
      `${d.firstName} ${d.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, drivers]);

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">F1 Drivers</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 bg-gray-800 rounded"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        >
          <option value="">All Teams</option>
          {teamOptions.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>

        <select
          className="p-2 bg-gray-800 rounded"
          value={nationalityFilter}
          onChange={(e) => setNationalityFilter(e.target.value)}
        >
          <option value="">All Nationalities</option>
          {nationalityOptions.map((nat) => (
            <option key={nat} value={nat}>
              {nat}
            </option>
          ))}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((driver) => (
          <div
            key={driver.id}
            className="bg-gray-900 p-4 rounded-lg shadow text-center"
          >
            {driver.imageUrl && (
              <img
                src={driver.imageUrl}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="w-24 h-24 mx-auto mb-3 object-cover rounded-full border border-gray-700"
              />
            )}
            <h3 className="text-lg font-semibold">
              {driver.firstName} {driver.lastName}
            </h3>
            <p className="text-sm text-gray-400">{driver.nationality}</p>
            <p className="text-sm text-gray-500 italic mt-1">
              Team: {driver.team?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
