// src/components/SmallWeatherCard.tsx

import type { HourlyForecast } from '../types/weather';

interface SmallWeatherCardProps {
  forecast: HourlyForecast;
  isCurrentHour?: boolean;
}

export default function SmallWeatherCard({ forecast, isCurrentHour = false }: SmallWeatherCardProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const formatDate = (timeString: string) => {
    const date = new Date(timeString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`
      flex-shrink-0 w-24 p-3 rounded-lg text-center transition-all duration-200
      ${isCurrentHour 
        ? 'bg-blue-100 border-2 border-blue-300 shadow-md' 
        : 'bg-white border border-gray-200 hover:bg-gray-300'
      }
    `}>
      <div className="space-y-2">
        {/* Date */}
        <div className="text-xs text-gray-500 font-medium">
          {formatDate(forecast.time)}
        </div>
        
        {/* Time */}
        <div className={`text-sm font-semibold ${isCurrentHour ? 'text-blue-700' : 'text-gray-700'}`}>
          {formatTime(forecast.time)}
        </div>
        
        {/* Weather Icon */}
        <div className="flex justify-center">
          <img 
            src={`https:${forecast.condition.icon}`} 
            alt={forecast.condition.text}
            className="w-8 h-8"
          />
        </div>
        
        {/* Temperature */}
        <div className="space-y-1 text-xs ">
          <div className="flex items-center justify-center gap-1">
            <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-bold text-gray-900">{Math.round(forecast.temp_c)}°</span>
            <span className="text-gray-600">C</span>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center justify-center gap-1">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7 8 4 12 4 15a8 8 0 0016 0c0-3-3-7-8-12z" />
            </svg>
            {forecast.humidity}%
          </div>
          <div className="flex items-center justify-center gap-1">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ transform: `rotate(${forecast.wind_degree}deg)` }}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {Math.round(forecast.wind_kph)} km/h
          </div>
            <div className="flex items-center justify-center gap-1">
              <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              UV {forecast.uv}
            </div>
        </div>
      </div>
    </div>
  );
}