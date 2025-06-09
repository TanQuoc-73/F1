import axios from "axios";

const API_URL = "http://localhost:8080/drivers";

export const fetchDrivers = async (team?: string, nationality?: string) => {
  const response = await axios.get(`${API_URL}/filter`, {
    params: { team, nationality },
    withCredentials: true,
  });
  return response.data;
};

export const fetchTeamOptions = async () => {
  const response = await axios.get(`${API_URL}/teams`);
  return response.data;
};  

export const fetchNationalityOptions = async () => {
  const response = await axios.get(`${API_URL}/nationalities`);
  return response.data;
};
