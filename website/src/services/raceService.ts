import axios from "axios";
import type { Race } from "../types";

const API_URL = "http://localhost:8080/races";

// Simplified: Get all races with circuit details in one call
export const fetchRaces = async (): Promise<Race[]> => {
  const response = await axios.get(`${API_URL}/summary`, {
    withCredentials: true,
  });
  return response.data;
};