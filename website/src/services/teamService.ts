import axios from "axios";
import type { Team } from "../types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}`;

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await axios.get(`${API_URL}/teams`, {
    withCredentials: true,
  });
  return response.data;
};

