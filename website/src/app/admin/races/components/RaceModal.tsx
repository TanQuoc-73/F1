import React from 'react';

interface Season {
  id: number;
  year: number;
}

interface Circuit {
  id: number;
  name: string;
}

interface Race {
  id: number;
  raceName: string;
  raceDate: string;
  roundNumber: number;
  season: Season;
  circuit: Circuit;
}

interface RaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (race: {
    raceName: string;
    raceDate: string;
    roundNumber: number;
    season: { id: number };
    circuit: { id: number };
  }) => void;
  seasons: Season[];
  circuits: Circuit[];
  initialData?: Race;
  mode: 'create' | 'edit';
}

export default function RaceModal({
  isOpen,
  onClose,
  onSubmit,
  seasons,
  circuits,
  initialData,
  mode
}: RaceModalProps) {
  const [raceName, setRaceName] = React.useState(initialData?.raceName || '');
  const [raceDate, setRaceDate] = React.useState(initialData?.raceDate || '');
  const [roundNumber, setRoundNumber] = React.useState(initialData?.roundNumber || 1);
  const [seasonId, setSeasonId] = React.useState<number | "">(initialData?.season.id || "");
  const [circuitId, setCircuitId] = React.useState<number | "">(initialData?.circuit.id || "");

  React.useEffect(() => {
    if (initialData) {
      setRaceName(initialData.raceName);
      setRaceDate(initialData.raceDate);
      setRoundNumber(initialData.roundNumber);
      setSeasonId(initialData.season.id);
      setCircuitId(initialData.circuit.id);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!raceName || !raceDate || !seasonId || !circuitId) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      raceName,
      raceDate,
      roundNumber,
      season: { id: Number(seasonId) },
      circuit: { id: Number(circuitId) },
    });

    // Reset form
    setRaceName("");
    setRaceDate("");
    setRoundNumber(1);
    setSeasonId("");
    setCircuitId("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {mode === 'create' ? 'Create New Race' : 'Edit Race'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="raceName">
              Race Name
            </label>
            <input
              id="raceName"
              type="text"
              value={raceName}
              onChange={(e) => setRaceName(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="raceDate">
                Race Date
              </label>
              <input
                id="raceDate"
                type="date"
                value={raceDate}
                onChange={(e) => setRaceDate(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="roundNumber">
                Round Number
              </label>
              <input
                id="roundNumber"
                type="number"
                min={1}
                value={roundNumber}
                onChange={(e) => setRoundNumber(Number(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="season">
                Season
              </label>
              <select
                id="season"
                value={seasonId}
                onChange={(e) => setSeasonId(e.target.value ? Number(e.target.value) : "")}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Season</option>
                {seasons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="circuit">
                Circuit
              </label>
              <select
                id="circuit"
                value={circuitId}
                onChange={(e) => setCircuitId(e.target.value ? Number(e.target.value) : "")}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Circuit</option>
                {circuits.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {mode === 'create' ? 'Create Race' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 