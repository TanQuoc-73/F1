// Race related types
export interface CircuitSummary {
  id: number;
  name: string;
  location: string;
  country: string;
  imageUrl?: string;
}

export interface Race {
  id: number;
  raceName: string;
  raceDate: string;
  circuit: CircuitSummary;
  roundNumber: number;
  seasonYear: number;
}
