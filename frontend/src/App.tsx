// src/App.tsx

import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import type { WeatherResponse } from './types/weather';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Mock data based on the API response you provided
  const mockWeatherData: WeatherResponse = {
    location: {
      name: "Colombo",
      region: "Western",
      country: "Sri Lanka",
      lat: 6.9319,
      lon: 79.8478,
      tz_id: "Asia/Colombo",
      localtime_epoch: 1750165972,
      localtime: "2025-06-17 18:42"
    },
    current: {
      last_updated_epoch: 1750165200,
      last_updated: "2025-06-17 18:30",
      temp_c: 27,
      temp_f: 80.6,
      is_day: 0,
      condition: {
        text: "Patchy rain nearby",
        icon: "//cdn.weatherapi.com/weather/64x64/night/176.png",
        code: 1063
      },
      wind_mph: 9.2,
      wind_kph: 14.8,
      wind_degree: 236,
      wind_dir: "WSW",
      pressure_mb: 1010,
      pressure_in: 29.82,
      precip_mm: 0.08,
      precip_in: 0,
      humidity: 81,
      cloud: 78,
      feelslike_c: 30.5,
      feelslike_f: 86.8,
      windchill_c: 27,
      windchill_f: 80.6,
      heatindex_c: 30.5,
      heatindex_f: 86.8,
      dewpoint_c: 23.5,
      dewpoint_f: 74.4,
      vis_km: 10,
      vis_miles: 6,
      uv: 0,
      gust_mph: 14.1,
      gust_kph: 22.8
    }
  };

  // Simulate loading for 3 seconds to test skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <WeatherCard weatherData={mockWeatherData} />
    </div>
  );
}

export default App;