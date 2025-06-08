"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Driver {
  id: number;
  name: string;
  imageUrl?: string;
  nationality?: string;
  teamName?: string;
}

export default function DriverList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/drivers", { withCredentials: true })
      .then((res) => {
        setDrivers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load drivers.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Loading drivers...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="bg-neutral-900 border border-neutral-700 text-white rounded-xl p-4 shadow-lg text-center"
        >
          {driver.imageUrl && (
            <img
              src={driver.imageUrl}
              alt={driver.name}
              className="w-24 h-24 mx-auto mb-3 object-cover rounded-full border border-gray-500"
            />
          )}
          <h3 className="text-lg font-semibold">{driver.name}</h3>
          {driver.nationality && (
            <p className="text-sm text-neutral-400">{driver.nationality}</p>
          )}
          {driver.teamName && (
            <p className="text-sm text-neutral-400 italic mt-1">
              Team: {driver.teamName}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
