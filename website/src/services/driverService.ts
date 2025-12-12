import axios from "axios";
import type { Driver } from "../types";

const API_URL = "${process.env.NEXT_PUBLIC_API_URL || \"https://f1-1-gslk.onrender.com\"}/drivers";

// Simplified: Get all drivers with team details in one call
export const fetchDrivers = async (team?: string, nationality?: string): Promise<Driver[]> => {
  const response = await axios.get(`${API_URL}/summary`, {
    params: { team, nationality },
    withCredentials: true,
  });
  return response.data;
};

