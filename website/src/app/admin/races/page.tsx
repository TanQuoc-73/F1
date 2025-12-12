"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import RaceModal from "./components/RaceModal";
import RaceResultModal from "./components/RaceResultModal";

interface Season {
  id: number;
  year: number;
}

interface Circuit {
  id: number;
  name: string;
}

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
  raceDate: string;
  roundNumber: number;
  season: Season;
  circuit: Circuit;
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

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}`;

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

async function fetchDrivers(): Promise<Driver[]> {
  const res = await axios.get(`${API_URL}/drivers`);
  return res.data;
}

async function fetchTeams(): Promise<Team[]> {
  const res = await axios.get(`${API_URL}/teams`);
  return res.data;
}

async function fetchRaceResults(raceId: number): Promise<RaceResult[]> {
  const res = await axios.get(`${API_URL}/race-results`);
  const allResults = res.data;
  // Filter results by race ID
  return allResults.filter((result: RaceResult) => result.race.id === raceId);
}

async function deleteRace(id: number): Promise<void> {
  try {
    // First delete all race results for this race
    const results = await fetchRaceResults(id);
    if (results.length > 0) {
      await Promise.all(results.map(result => deleteRaceResult(result.id)));
    }
    // Then delete the race
    await axios.delete(`${API_URL}/races/${id}`);
  } catch (error) {
    console.error("Error deleting race:", error);
    throw new Error("Failed to delete race. Please try again.");
  }
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

async function createRaceResult(result: {
  race: { id: number };
  driver: { id: number };
  team: { id: number };
  position: number;
  points: number;
  grid: number;
  fastestLap: boolean;
  fastestLapTime: string;
  status: string;
}): Promise<RaceResult> {
  const res = await axios.post(`${API_URL}/race-results`, result);
  return res.data;
}

async function deleteRaceResult(id: number): Promise<void> {
  await axios.delete(`${API_URL}/race-results/${id}`);
}

async function updateRaceResult(id: number, result: {
  race: { id: number };
  driver: { id: number };
  team: { id: number };
  position: number;
  points: number;
  grid: number;
  fastestLap: boolean;
  fastestLapTime: string;
  status: string;
}): Promise<RaceResult> {
  const res = await axios.put(`${API_URL}/race-results/${id}`, result);
  return res.data;
}

async function updateRace(id: number, race: {
  raceName: string;
  raceDate: string;
  roundNumber: number;
  season: { id: number };
  circuit: { id: number };
}): Promise<Race> {
  const res = await axios.put(`${API_URL}/races/${id}`, race);
  return res.data;
}

export default function RaceManagementPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allRaceResults, setAllRaceResults] = useState<RaceResult[]>([]);

  // Modal states
  const [isRaceModalOpen, setIsRaceModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingRace, setEditingRace] = useState<Race | null>(null);
  const [editingResult, setEditingResult] = useState<RaceResult | null>(null);

  useEffect(() => {
    Promise.all([
      fetchRaces(),
      fetchSeasons(),
      fetchCircuits(),
      fetchDrivers(),
      fetchTeams(),
      axios.get(`${API_URL}/race-results`).then(res => res.data)
    ])
      .then(([racesData, seasonsData, circuitsData, driversData, teamsData, resultsData]) => {
        setRaces(racesData);
        setSeasons(seasonsData);
        setCircuits(circuitsData);
        setDrivers(driversData);
        setTeams(teamsData);
        setAllRaceResults(resultsData);
        setError(null);
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedRace) {
      setLoading(true);
      fetchRaceResults(selectedRace.id)
        .then((results) => {
          const sortedResults = results.sort((a, b) => a.position - b.position);
          setRaceResults(sortedResults);
          setError(null);
        })
        .catch(() => setError("Failed to load race results"))
        .finally(() => setLoading(false));
    } else {
      setRaceResults([]);
    }
  }, [selectedRace]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this race? This will also delete all race results.")) return;
    try {
      setLoading(true);
      await deleteRace(id);
      setRaces(races.filter((r) => r.id !== id));
      if (selectedRace?.id === id) {
        setSelectedRace(null);
        setRaceResults([]);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete race");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRace = async (race: {
    raceName: string;
    raceDate: string;
    roundNumber: number;
    season: { id: number };
    circuit: { id: number };
  }) => {
    try {
      const newRace = await createRace(race);
      setRaces([...races, newRace]);
      setIsRaceModalOpen(false);
    } catch {
      alert("Failed to create race");
    }
  };

  const handleCreateResult = async (result: {
    race: { id: number };
    driver: { id: number };
    team: { id: number };
    position: number;
    points: number;
    grid: number;
    fastestLap: boolean;
    fastestLapTime: string;
    status: string;
  }) => {
    try {
      if (editingResult) {
        // Update existing result
        await updateRaceResult(editingResult.id, result);
      } else {
        // Create new result
        await createRaceResult(result);
      }
      // Fetch updated results
      const updatedResults = await fetchRaceResults(selectedRace!.id);
      setRaceResults(updatedResults.sort((a, b) => a.position - b.position));
      setIsResultModalOpen(false);
      setEditingResult(null);
    } catch {
      alert(editingResult ? "Failed to update race result" : "Failed to create race result");
    }
  };

  const handleDeleteResult = async (id: number) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      await deleteRaceResult(id);
      // Fetch updated results
      const updatedResults = await fetchRaceResults(selectedRace!.id);
      setRaceResults(updatedResults.sort((a, b) => a.position - b.position));
    } catch {
      alert("Failed to delete race result");
    }
  };

  const handleUpdateResult = async (id: number, result: {
    race: { id: number };
    driver: { id: number };
    team: { id: number };
    position: number;
    points: number;
    grid: number;
    fastestLap: boolean;
    fastestLapTime: string;
    status: string;
  }) => {
    try {
      await updateRaceResult(id, result);
      // Fetch updated results
      const updatedResults = await fetchRaceResults(selectedRace!.id);
      setRaceResults(updatedResults.sort((a, b) => a.position - b.position));
      setIsResultModalOpen(false);
      setEditingResult(null);
    } catch {
      alert("Failed to update race result");
    }
  };

  const handleUpdateRace = async (race: {
    raceName: string;
    raceDate: string;
    roundNumber: number;
    season: { id: number };
    circuit: { id: number };
  }) => {
    if (!editingRace) return;
    try {
      const updatedRace = await updateRace(editingRace.id, race);
      setRaces(races.map(r => r.id === updatedRace.id ? updatedRace : r));
      setIsRaceModalOpen(false);
      setEditingRace(null);
    } catch {
      alert("Failed to update race");
    }
  };

  const completedRaces = races.filter(race => {
    const hasResults = allRaceResults.some(result => result.race.id === race.id);
    const raceDate = new Date(race.raceDate);
    const today = new Date();
    return hasResults || raceDate < today;
  });

  const upcomingRaces = races.filter(race => {
    const hasResults = allRaceResults.some(result => result.race.id === race.id);
    const raceDate = new Date(race.raceDate);
    const today = new Date();
    return !hasResults && raceDate >= today;
  });

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-6">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-white p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Race Management</h1>
          <button
            onClick={() => setIsRaceModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Add New Race
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Race Lists */}
          <div className="lg:col-span-2">
            {/* Completed Races Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Completed Races</h2>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 text-left">Round</th>
                      <th className="p-4 text-left">Race Name</th>
                      <th className="p-4 text-left">Circuit</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Season</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedRaces.map((race) => (
                      <tr 
                        key={race.id} 
                        className={`border-t border-gray-700 hover:bg-gray-700 cursor-pointer ${
                          selectedRace?.id === race.id ? 'bg-gray-700' : ''
                        }`}
                        onClick={() => setSelectedRace(race)}
                      >
                        <td className="p-4">{race.roundNumber}</td>
                        <td className="p-4">{race.raceName}</td>
                        <td className="p-4">{race.circuit.name}</td>
                        <td className="p-4">{new Date(race.raceDate).toLocaleDateString()}</td>
                        <td className="p-4">{race.season.year}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingRace(race);
                                setIsRaceModalOpen(true);
                              }}
                              className="text-yellow-400 hover:text-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRace(race);
                                setIsResultModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-600"
                            >
                              Results
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(race.id);
                              }}
                              className="text-red-400 hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {completedRaces.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-400">No completed races</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Races Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Races</h2>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 text-left">Round</th>
                      <th className="p-4 text-left">Race Name</th>
                      <th className="p-4 text-left">Circuit</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Season</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingRaces.map((race) => (
                      <tr 
                        key={race.id} 
                        className={`border-t border-gray-700 hover:bg-gray-700 cursor-pointer ${
                          selectedRace?.id === race.id ? 'bg-gray-700' : ''
                        }`}
                        onClick={() => setSelectedRace(race)}
                      >
                        <td className="p-4">{race.roundNumber}</td>
                        <td className="p-4">{race.raceName}</td>
                        <td className="p-4">{race.circuit.name}</td>
                        <td className="p-4">{new Date(race.raceDate).toLocaleDateString()}</td>
                        <td className="p-4">{race.season.year}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingRace(race);
                                setIsRaceModalOpen(true);
                              }}
                              className="text-yellow-400 hover:text-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRace(race);
                                setIsResultModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-600"
                            >
                              Results
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(race.id);
                              }}
                              className="text-red-400 hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {upcomingRaces.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-400">No upcoming races</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Race Results Panel */}
          <div className="lg:col-span-1">
            {selectedRace ? (
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden sticky top-6">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedRace.raceName}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(selectedRace.raceDate).toLocaleDateString()} • Round {selectedRace.roundNumber}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingResult(null);
                          setIsResultModalOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Add Result
                      </button>
                      <button
                        onClick={() => setSelectedRace(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {raceResults.length > 0 ? (
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="p-3 text-left">Pos</th>
                          <th className="p-3 text-left">Driver</th>
                          <th className="p-3 text-left">Team</th>
                          <th className="p-3 text-left">Grid</th>
                          <th className="p-3 text-left">Points</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {raceResults.map((result) => (
                          <tr key={result.id} className="hover:bg-gray-700 transition-colors">
                            <td className="p-3">
                              <span className="text-xl font-bold text-yellow-400">{result.position}</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="font-medium">
                                    {result.driver.firstName} {result.driver.lastName}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {result.driver.nationality}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span>{result.team.name}</span>
                              </div>
                            </td>
                            <td className="p-3">{result.grid}</td>
                            <td className="p-3 font-medium">{result.points}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span>{result.status}</span>
                                {result.fastestLap && (
                                  <span className="text-yellow-400" title={`Fastest Lap: ${result.fastestLapTime}`}>★</span>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingResult(result);
                                    setIsResultModalOpen(true);
                                  }}
                                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-sm font-medium transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteResult(result.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm font-medium transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No results available for this race
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-400">Select a race to view its results</p>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {isRaceModalOpen && (
          <RaceModal
            isOpen={isRaceModalOpen}
            onClose={() => {
              setIsRaceModalOpen(false);
              setEditingRace(null);
            }}
            onSubmit={editingRace ? handleUpdateRace : handleCreateRace}
            seasons={seasons}
            circuits={circuits}
            initialData={editingRace || undefined}
            mode={editingRace ? 'edit' : 'create'}
          />
        )}

        {isResultModalOpen && selectedRace && (
          <RaceResultModal
            isOpen={isResultModalOpen}
            onClose={() => {
              setIsResultModalOpen(false);
              setEditingResult(null);
            }}
            onSubmit={handleCreateResult}
            drivers={drivers}
            teams={teams}
            race={selectedRace}
            initialData={editingResult || undefined}
            mode={editingResult ? 'edit' : 'create'}
          />
        )}
      </div>
    </div>
  );
}

