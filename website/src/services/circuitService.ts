import { Circuit } from '../types/circuit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/circuits';

export const circuitService = {
    getAllCircuits: async (): Promise<Circuit[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getCircuitById: async (id: number): Promise<Circuit> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createCircuit: async (circuit: Omit<Circuit, 'id'>): Promise<Circuit> => {
        const response = await axios.post(API_URL, circuit);
        return response.data;
    },

    updateCircuit: async (id: number, circuit: Circuit): Promise<Circuit> => {
        // Ensure all required fields are present and in the correct format
        const circuitData = {
            name: circuit.name,
            location: circuit.location,
            country: circuit.country,
            lengthKm: circuit.lengthKm.toString(), // Convert to string for BigDecimal
            laps: circuit.laps,
            imageUrl: circuit.imageUrl || ''
        };

        console.log('Sending update request:', { id, circuitData });
        const response = await axios.put(`${API_URL}/${id}`, circuitData);
        return response.data;
    },

    deleteCircuit: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 