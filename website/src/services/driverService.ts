import axios from "axios";
const API_URL = "http://localhost:8080";

export const fetchDrivers = async (team?: string, nationality?: string) => {
  const response = await axios.get(`${API_URL}/drivers`, {
    params: { team, nationality },
    withCredentials: true,
  });
  return response.data;
};
