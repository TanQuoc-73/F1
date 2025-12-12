"use client";

import React, { useEffect, useState } from "react";
import RaceResultModal from "@/components/RaceResultModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar, MapPin, Flag, Search, Filter, ChevronDown } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all race results and extract unique seasons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [racesRes, resultsRes] = await Promise.all([
          fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/races"),
          fetch("${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/race-results")
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

  // Get unique countries for filter
  const countries = Array.from(new Set(races.map(race => race.circuit.country))).sort();

  // Filter races by selected season, search query and country
  const filteredRaces = races.filter(race => {
    const matchesSeason = selectedSeason ? race.season.id === selectedSeason.id : true;
    const matchesSearch = 
      race.raceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.circuit.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.circuit.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "" || race.circuit.country === selectedCountry;
    
    return matchesSeason && matchesSearch && matchesCountry;
  });

  // Get results for selected race
  const selectedRaceResults = selectedRace
    ? raceResults.filter(result => result.race.id === selectedRace.id)
    : [];

  // Check if a race is upcoming
  const isUpcomingRace = (race: Race) => {
    const raceDate = new Date(race.raceDate);
    const today = new Date();
    return raceDate > today;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">F1 Races</h1>
      
      {/* Season Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-64">
            <select
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={selectedSeason?.id || ''}
              onChange={e => {
                const season = seasons.find(s => s.id === Number(e.target.value));
                setSelectedSeason(season || null);
              }}
            >
              {seasons.map(s => (
                <option key={s.id} value={s.id}>Season {s.year}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search races..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Additional Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800 rounded-md border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <span>Found {filteredRaces.length} races</span>
          {(searchQuery || selectedCountry) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
              }}
              className="text-gray-400 hover:text-white"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredRaces.map((race) => {
          const upcoming = isUpcomingRace(race);
          return (
            <Card
              key={race.id}
              onClick={() => setSelectedRace(race)}
              className={`bg-gray-800 border-gray-700 cursor-pointer transition-all duration-300 ${
                upcoming 
                  ? 'hover:bg-gray-700 border-red-500/50' 
                  : 'hover:bg-gray-700'
              }`}
            >
              {/* Circuit Image */}
              {race.circuit.imageUrl && (
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={race.circuit.imageUrl} 
                    alt={race.circuit.name} 
                    className="w-full h-full object-cover"
                  />
                  {upcoming && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Upcoming
                    </div>
                  )}
                </div>
              )}

              {/* Race Info */}
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className={`text-xl ${upcoming ? 'text-red-400' : 'text-gray-200'}`}>
                    {race.raceName}
                  </CardTitle>
                  <span className="text-gray-400">Round {race.roundNumber}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(race.raceDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {race.circuit.name}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Flag className="w-4 h-4 mr-2" />
                    {race.circuit.location}, {race.circuit.country}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Race Result Modal */}
      {selectedRace && (
        <RaceResultModal
          isOpen={selectedRace !== null}
          race={selectedRace}
          results={selectedRaceResults}
          onClose={() => setSelectedRace(null)}
        />
      )}
    </div>
  );
} 
