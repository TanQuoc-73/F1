"use client";

import React, { useEffect, useState } from "react";
import RaceResultModal from "@/components/RaceResultModal";

interface Season {
  id: number;
  year: number;
  championDriver: Driver | null;
  championTeam: Team | null;
}

interface Circuit {
  id: number;
  name: string;
  location: string;
  country: string;
  lengthKm: number;
  laps: number;
  imageUrl: string;
}

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
  nationality: string;
  dateOfBirth: string;
  imageUrl: string;
  number: number;
  team: Team;
}

interface Race {
  id: number;
  season: Season;
  circuit: Circuit;
  raceName: string;
  raceDate: string;
  roundNumber: number;
}

interface RaceResult {
  id: number;
  race: Race;
  driver: Driver;
  team: Team;
  position: number;
  points: number;
  time: string;
  fastestLap: boolean;
}

export default function RacePage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all race results and extract unique seasons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [racesRes, resultsRes] = await Promise.all([
          fetch("http://localhost:8080/races"),
          fetch("http://localhost:8080/race-results")
        ]);
        
        const racesData = await racesRes.json();
        const resultsData = await resultsRes.json();
        
        setRaces(racesData);
        setRaceResults(resultsData);
        
        // Extract unique seasons from race results
        const uniqueSeasons = Array.from(
          new Set(resultsData.map((result: RaceResult) => result.race.season.id))
        ).map(id => {
          const season = resultsData.find((result: RaceResult) => result.race.season.id === id)?.race.season;
          return season;
        }).sort((a, b) => b.year - a.year); // Sort by year descending

        setSeasons(uniqueSeasons);
        if (uniqueSeasons.length > 0) {
          setSelectedSeason(uniqueSeasons[0]); // Set first season as default
        }
        setError("");
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter races by selected season
  const filteredRaces = selectedSeason
    ? races.filter(race => race.season.id === selectedSeason.id)
    : [];

  // Get results for selected race
  const selectedRaceResults = selectedRace
    ? raceResults.filter(result => result.race.id === selectedRace.id)
    : [];

  if (loading) return <div className="text-center mt-4 text-white">Loading races...</div>;
  if (error) return <div className="text-center mt-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">F1 Races</h1>
      
      {/* Season Filter */}
      <div className="flex justify-center mb-8">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedSeason?.id || ''}
          onChange={e => {
            const season = seasons.find(s => s.id === Number(e.target.value));
            setSelectedSeason(season || null);
          }}
        >
          {seasons.map(s => (
            <option key={s.id} value={s.id}>{s.year}</option>
          ))}
        </select>
      </div>

      {selectedSeason && (
        <div className="text-center text-gray-400 mb-8">Season {selectedSeason.year}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredRaces.map((race) => (
          <div
            key={race.id}
            onClick={() => setSelectedRace(race)}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            {/* Circuit Image */}
            {race.circuit.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={race.circuit.imageUrl} 
                  alt={race.circuit.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Race Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-yellow-400">{race.raceName}</h2>
                <span className="text-gray-400">Round {race.roundNumber}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-400">
                  {new Date(race.raceDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400">
                  {race.circuit.name}
                </p>
                <p className="text-gray-400">
                  {race.circuit.location}, {race.circuit.country}
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Length: {race.circuit.lengthKm} km</span>
                  <span>Laps: {race.circuit.laps}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RaceResultModal
        isOpen={selectedRace !== null}
        onClose={() => setSelectedRace(null)}
        race={selectedRace}
        results={selectedRaceResults}
      />
    </div>
  );
} 