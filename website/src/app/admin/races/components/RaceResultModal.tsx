"use client";

import React, { useState, useEffect } from "react";

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

interface Team {
  id: number;
  name: string;
  baseCountry: string;
  logoUrl: string;
  principal: string;
  powerUnit: string;
}

interface Race {
  id: number;
  raceName: string;
}

interface RaceResult {
  id: number;
  race: Race;
  driver: Driver;
  team: Team;
  position: number;
  points: number;
  grid: number;
  fastestLap: boolean;
  fastestLapTime: string;
  status: string;
}

interface RaceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (result: {
    race: { id: number };
    driver: { id: number };
    team: { id: number };
    position: number;
    points: number;
    grid: number;
    fastestLap: boolean;
    fastestLapTime: string;
    status: string;
  }) => void;
  drivers: Driver[];
  teams: Team[];
  race: Race;
  initialData?: RaceResult;
  mode: 'create' | 'edit';
}

export default function RaceResultModal({
  isOpen,
  onClose,
  onSubmit,
  drivers,
  teams,
  race,
  initialData,
  mode
}: RaceResultModalProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamDrivers, setTeamDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState({
    driver: initialData?.driver.id || "",
    team: initialData?.team.id || "",
    position: initialData?.position || 1,
    points: initialData?.points || 0,
    grid: initialData?.grid || 1,
    fastestLap: initialData?.fastestLap || false,
    fastestLapTime: initialData?.fastestLapTime || "",
    status: initialData?.status || "Finished"
  });

  // Update team drivers when team changes
  useEffect(() => {
    if (formData.team) {
      const team = teams.find(t => t.id === Number(formData.team));
      setSelectedTeam(team || null);
      const filteredDrivers = drivers.filter(d => d.team.id === Number(formData.team));
      setTeamDrivers(filteredDrivers);
    } else {
      setSelectedTeam(null);
      setTeamDrivers([]);
    }
  }, [formData.team, teams, drivers]);

  // Set initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        driver: initialData.driver.id,
        team: initialData.team.id,
        position: initialData.position || 1,
        points: initialData.points || 0,
        grid: initialData.grid || 1,
        fastestLap: initialData.fastestLap || false,
        fastestLapTime: initialData.fastestLapTime || "",
        status: initialData.status || "Finished"
      });
      setSelectedTeam(initialData.team);
      const filteredDrivers = drivers.filter(d => d.team.id === initialData.team.id);
      setTeamDrivers(filteredDrivers);
    }
  }, [initialData, drivers]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        driver: "",
        team: "",
        position: 1,
        points: 0,
        grid: 1,
        fastestLap: false,
        fastestLapTime: "",
        status: "Finished"
      });
      setSelectedTeam(null);
      setTeamDrivers([]);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      race: { id: race.id },
      driver: { id: Number(formData.driver) },
      team: { id: Number(formData.team) },
      position: Number(formData.position),
      points: Number(formData.points),
      grid: Number(formData.grid),
      fastestLap: formData.fastestLap,
      fastestLapTime: formData.fastestLapTime,
      status: formData.status
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Add Race Result' : 'Edit Race Result'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Team
            </label>
            <select
              value={formData.team}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  team: e.target.value,
                  driver: "" // Reset driver when team changes
                }));
              }}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Driver Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Driver
            </label>
            <select
              value={formData.driver}
              onChange={(e) => setFormData(prev => ({ ...prev, driver: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.team}
            >
              <option value="">Select Driver</option>
              {teamDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.firstName} {driver.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Position
            </label>
            <input
              type="number"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: Number(e.target.value) || 1 }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Points
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData(prev => ({ ...prev, points: Number(e.target.value) || 0 }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.5"
            />
          </div>

          {/* Grid Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Grid Position
            </label>
            <input
              type="number"
              value={formData.grid}
              onChange={(e) => setFormData(prev => ({ ...prev, grid: Number(e.target.value) || 1 }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>

          {/* Fastest Lap */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="fastestLap"
              checked={formData.fastestLap}
              onChange={(e) => setFormData(prev => ({ ...prev, fastestLap: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="fastestLap" className="text-sm font-medium text-gray-300">
              Fastest Lap
            </label>
          </div>

          {/* Fastest Lap Time */}
          {formData.fastestLap && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fastest Lap Time
              </label>
              <input
                type="text"
                value={formData.fastestLapTime}
                onChange={(e) => setFormData(prev => ({ ...prev, fastestLapTime: e.target.value }))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1:30.123"
                required={formData.fastestLap}
              />
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., Finished, DNF, DNS"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === 'create' ? 'Add Result' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
