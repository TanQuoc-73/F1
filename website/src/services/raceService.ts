import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchRaces = async () => {
  const response = await axios.get(`${API_URL}/races`, {
    withCredentials: true,
  });
  return response.data;
};


export interface Circuit {
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
  circuit: Circuit;
  roundNumber: number;
  imageUrl?: string; 
}