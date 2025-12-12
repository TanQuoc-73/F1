export interface Circuit {
    id: number;
    name: string;
    location: string;
    country: string;
    lengthKm: number | string; // Can be number from frontend or string for BigDecimal
    laps: number;
    imageUrl: string;
} 
