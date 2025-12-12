// Driver related types
export interface TeamSummary {
  id: number;
  name: string;
  logoUrl?: string;
}

export interface Driver {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  number: number;
  imageUrl?: string;
  team: TeamSummary;
}

