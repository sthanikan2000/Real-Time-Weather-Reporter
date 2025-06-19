// src/types/weather.ts

export interface Location {
  name: string;
  region: string;
  country: string;
}

export interface City extends Location {
  id: string;
}

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
  gust_kph?: number;
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
  selectedCity: City;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  retryCount: number;
}

export const DEFAULT_WEATHER_RESPONSE: WeatherResponse = {
  error: false,
  message: {
    location: {
      name: 'Jaffna',
      region: 'Northern Province',
      country: 'Sri Lanka'
    },
    alerts: [
      {
        headline: 'Flood Warning',
        msgtype: null,
        severity: null,
        urgency: 'Immediate',
        areas: null,
        category: '',
        certainty: null,
        event: '',
        note: null,
        effective: '',
        expires: '',
        desc: '',
        instruction: ''
      }
    ],
    current: {
      last_updated: '2025-06-19 14:15',
      temp_c: 30,
      temp_f: 86,   
      feelslike_c: 32,
      feelslike_f: 90,
      condition: {
        text: 'Partly Cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      wind_mph: 10,
      wind_kph: 16,
      wind_degree: 180,
      wind_dir: 'SSW',
      humidity: 70,
      uv: 5,
      gust_kph: 20  
    },
    forecast: [
      {
              time: "2025-06-19 00:00",
              temp_c: 27.5,
              temp_f: 81.5,
              condition:{
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
              },
              wind_mph: 15.5,
              wind_kph: 25,
              wind_degree: 200,
              wind_dir: "SSW",
              humidity: 80,
              uv: 0
          },

      {
              time: "2025-06-19 01:00",
              temp_c: 27.0,
              temp_f: 80.6,
              condition:{
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
              },
              wind_mph: 14.0,
              wind_kph: 22.5,
              wind_degree: 210,
              wind_dir: "SSW",
              humidity: 82,
              uv: 0
          },
      {
              time: "2025-06-19 02:00",
              temp_c: 26.5,
              temp_f: 79.7,
              condition:{
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
              },
              wind_mph: 12.5,
              wind_kph: 20,
              wind_degree: 220,
              wind_dir: "SW",
              humidity: 85,
              uv: 0
          },
      {
              time: "2025-06-19 03:00",
              temp_c: 26.0,
              temp_f: 78.8,
              condition:{
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
              },
              wind_mph: 11.0,
              wind_kph: 17.5,
              wind_degree: 230,
              wind_dir: "SW",
              humidity: 87,
              uv: 0
          },
    ]
  }
};

export const DEFAULT_CITIES: City[] = [
  {
    id: "colombo",
    name: "Colombo",
    region: "Western Province",
    country: "Sri Lanka",
  },
  {
    id: "kandy",
    name: "Kandy",
    region: "Central Province", 
    country: "Sri Lanka",
  },
  {
    id: "galle",
    name: "Galle",
    region: "Southern Province",
    country: "Sri Lanka", 
  },
  {
    id: "jaffna",
    name: "Jaffna",
    region: "Northern Province",
    country: "Sri Lanka",
  },
  {
    id: "batticaloa",
    name: "Batticaloa",
    region: "Eastern Province",
    country: "Sri Lanka",
  }
];
