// src/types/weather.ts

// export interface Location {
//   name: string;
//   region: string;
//   country: string;
// }

// export interface City extends Location {
//   id: string;
// }

import type { City, Location } from "./city";

export interface Alert {
  headline: string;
  msgtype: string | null;
  severity: string | null;
  urgency: string | null;
  areas: string | null;
  category: string;
  certainty: string | null;
  event: string;
  note: string | null;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  uv: number;
  gust_kph: number;
  gust_mph: number;
  precip_mm: number;
  precip_in: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  uv: number;
  precip_mm:number;
  precip_in: number;
}

export interface WeatherMessage {
  location: Location;
  alerts: Alert[];
  current: CurrentWeather;
  forecast: HourlyForecast[];
}

export interface WeatherResponse {
  error: boolean;
  message: WeatherMessage;
}


// Custom Hook State Types
export interface WeatherState {
  currentWeather: CurrentWeather | null;
  hourlyWeather: HourlyForecast[] | null;
  alerts: Alert[]; 
  selectedCity: City;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  retryCount: number;
}
