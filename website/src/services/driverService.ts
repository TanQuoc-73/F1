import axios from "axios";
import type { Driver } from "../types";

const API_URL = "http://localhost:8080/drivers";

// Simplified: Get all drivers with team details in one call
export const fetchDrivers = async (team?: string, nationality?: string): Promise<Driver[]> => {
  const response = await axios.get(`${API_URL}/summary`, {
    params: { team, nationality },
    withCredentials: true,
  });
  return response.data;
};
