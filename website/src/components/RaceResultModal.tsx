import React from 'react';

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

interface RaceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  race: Race | null;
  results: RaceResult[];
}

export default function RaceResultModal({ isOpen, onClose, race, results }: RaceResultModalProps) {
  if (!isOpen || !race) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">{race.raceName}</h2>
              <p className="text-gray-400">
                {new Date(race.raceDate).toLocaleDateString()} - Round {race.roundNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Circuit Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{race.circuit.name}</h3>
              <p className="text-gray-400">{race.circuit.location}, {race.circuit.country}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Length: {race.circuit.lengthKm} km</p>
              <p className="text-gray-400">Laps: {race.circuit.laps}</p>
            </div>
          </div>
        </div>

        {/* Circuit Image */}
        {race.circuit.imageUrl && (
          <div className="h-64 overflow-hidden">
            <img 
              src={race.circuit.imageUrl} 
              alt={race.circuit.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Results Table */}
        <div className="p-6">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Driver</th>
                <th className="p-4 text-left">Team</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Points</th>
                <th className="p-4 text-left">Fastest Lap</th>
              </tr>
            </thead>
            <tbody>
              {results.sort((a, b) => a.position - b.position).map((result) => (
                <tr key={result.id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-4">
                    <span className="text-2xl font-bold text-yellow-400">{result.position}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {result.driver.imageUrl && (
                        <img 
                          src={result.driver.imageUrl} 
                          alt={`${result.driver.firstName} ${result.driver.lastName}`} 
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-bold">
                          {result.driver.firstName} {result.driver.lastName}
                        </div>
                        <div className="text-sm text-gray-400">
                          #{result.driver.number} • {result.driver.nationality}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {result.team.logoUrl && (
                        <img 
                          src={result.team.logoUrl} 
                          alt={result.team.name} 
                          className="h-6 w-6"
                        />
                      )}
                      <span>{result.team.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{result.time}</td>
                  <td className="p-4 font-bold">{result.points}</td>
                  <td className="p-4">
                    {result.fastestLap && (
                      <span className="text-yellow-400">★</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
