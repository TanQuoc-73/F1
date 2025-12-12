import axios from "axios";
import type { FilterOptions } from "../types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/api/filters`;

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const response = await axios.get(`${API_URL}/options`, {
    withCredentials: true,
  });
  return response.data;
};

