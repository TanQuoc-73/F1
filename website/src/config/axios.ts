import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://f1-1-gslk.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // Temporarily disabled to fix 500 errors on public endpoints
  // withCredentials: true,
});

export default instance; 
