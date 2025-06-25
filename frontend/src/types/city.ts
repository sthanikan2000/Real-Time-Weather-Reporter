export interface Location {
  name: string;
  region: string;
  country: string;
}

export interface City extends Location {
  id: string;
}