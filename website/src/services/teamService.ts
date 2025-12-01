import axios from "axios";
import type { Team } from "../types";

const API_URL = "http://localhost:8080";

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await axios.get(`${API_URL}/teams`, {
    withCredentials: true,
  });
  return response.data;
};
