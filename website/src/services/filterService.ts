import axios from "axios";
import type { FilterOptions } from "../types";

const API_URL = "http://localhost:8080/api/filters";

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const response = await axios.get(`${API_URL}/options`, {
    withCredentials: true,
  });
  return response.data;
};
