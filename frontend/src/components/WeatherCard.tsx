// src/components/CurrentWeatherCard.tsx
import { RefreshCw, MapPin, Clock } from 'lucide-react';
import type { CurrentWeather,HourlyForecast, Location } from '../types/weather';
import LoadingSpinner from './LoadingSpinner';
import Temperature from './Temperature';
import Humidity from './Humidity';
import WindSpeed from './WindSpeed';
import UVIndex from './UVIndex';
import { WeatherCardSkeleton } from './skeletons/DetailedSkeletons';
import SmallWeatherCard from './SmallWeatherCard';

interface CurrentWeatherCardProps {
  location: Location;
  current: CurrentWeather | null;
  hourlyWeather: HourlyForecast[] | null;
  isLoading: boolean;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  error: string | null;
  onRefresh: () => void;
}

export default function CurrentWeatherCard(
  {
    location,
    current,
    hourlyWeather,
    isLoading,
    isRefreshing,
    lastUpdated,
    error,
    onRefresh,
  }: CurrentWeatherCardProps
){
  const formatLastUpdated = (date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <WeatherCardSkeleton />
      </div>

    );
  }

  if (!current) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-center py-8">
          <p className="text-gray-500">No weather data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <MapPin className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Weather in {location.name}
            </h2>
            <p className="text-sm text-gray-500">
              {location.region}, {location.country}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`
              flex items-center px-3 py-2 rounded-md text-sm font-medium
              transition-colors duration-200
              ${isRefreshing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200'
              }
            `}
          >
            {isRefreshing ? (
              <LoadingSpinner size="sm" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Weather Condition */}
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="h-16 w-16 mx-auto mb-2"
            onError={(e) => {
              // Fallback if icon fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <p className="text-lg font-medium text-gray-700 mb-1">
            {current.condition.text}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {current.last_updated}
          </p>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Sliding Forecasting Window */}
      {
        (!hourlyWeather || hourlyWeather.length === 0) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="text-center py-8">
              <p className="text-gray-500">No hourly forecast data available</p>
            </div>
          </div>
        )
      }
      {hourlyWeather && hourlyWeather.length > 0 && (
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Hourly Forecast for the Next 24 Hours
          </h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2" style={{ minWidth: 'max-content' }}>
              {hourlyWeather.slice(0, 24).map((forecast, index) => (
                <div key={`${forecast.time}-${index}`} className="flex-shrink-0">
                  <SmallWeatherCard
                    forecast={forecast}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};