import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchTeams = async () => {
  const response = await axios.get(`${API_URL}/teams`, {
    withCredentials: true, // nếu dùng cookie
  });
  return response.data;
};
