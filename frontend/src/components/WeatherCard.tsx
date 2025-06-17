import Temperature from './Temperature';
import Humidity from './Humidity';
import WindSpeed from './WindSpeed';
import UVIndex from './UVIndex';
import type { WeatherResponse } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  const { location, current } = weatherData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Weather in {location.name}
        </h1>
        <p className="text-gray-600">
          {location.region}, {location.country}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: {current.last_updated}
        </p>
      </div>

      {/* Weather Condition */}
      <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
        <img 
          src={`https:${current.condition.icon}`} 
          alt={current.condition.text}
          className="mx-auto mb-2 w-16 h-16"
        />
        <p className="text-xl font-semibold text-gray-700">
          {current.condition.text}
        </p>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Temperature 
          temp_c={current.temp_c}
          temp_f={current.temp_f}
          feelslike_c={current.feelslike_c}
          feelslike_f={current.feelslike_f}
        />
        
        <Humidity humidity={current.humidity} />
        
        <WindSpeed 
          wind_kph={current.wind_kph}
          wind_mph={current.wind_mph}
          wind_dir={current.wind_dir}
          wind_degree={current.wind_degree}
          gust_kph={current.gust_kph}
        />
        
        <UVIndex uv={current.uv} />
      </div>
    </div>
  );
}