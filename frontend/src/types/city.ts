// src/types/city.ts
export interface Location {
  name: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface City extends Location {
  id: string;
}