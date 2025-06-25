// src/components/SmallWeatherCard.tsx

import type { HourlyForecast } from '../types/weather';

interface SmallWeatherCardProps {
  forecast: HourlyForecast;
}

export default function SmallWeatherCard({ forecast}: SmallWeatherCardProps) {
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
    <div className="
      flex-shrink-0 w-48 p-3 rounded-lg text-center transition-all duration-200 bg-white border border-gray-200 hover:bg-gray-300 hover:scale-105 hover:shadow-lg cursor-pointer h-full">
      <div className="space-y-2">
        {/* Date */}
        <div className="text-xs text-gray-500 font-medium">
          {formatDate(forecast.time)}
        </div>
        
        {/* Time */}
        <div className={`text-sm font-semibold ${'text-gray-700'}`}>
          {formatTime(forecast.time)}
        </div>
        
        {/* Weather Icon */}
        <div className="flex justify-center">
          <img 
            src={`https:${forecast.condition.icon}`} 
            alt={forecast.condition.text}
            className="w-16 h-16 m-1"
          />
                   
        </div>
        <div className="text-base font-semibold text-gray-600">
          {forecast.condition.text}
        </div>

        {/* Temperature */}
        <div className="space-y-1 text-xs ">
          <div className="flex ml-4 items-center gap-1">
            <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-gray-800 font-semibold">{forecast.temp_c}°C</span>
            <span className="text-gray-500">({forecast.temp_f}°F)</span>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex ml-4 items-center gap-1">
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
            <span className='text-gray-800 font-semibold'>{forecast.wind_kph} km/h</span>
            <span className="text-gray-600">({forecast.wind_mph} mph)</span>
          </div>
          <div className="flex ml-4 items-center gap-1">
            <svg className="w-3 h-3 text-indigo-600 group-hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
            </svg>
            <span className='text-gray-800 font-semibold'>{forecast.precip_mm} mm</span>
            <span className="text-gray-600">({forecast.precip_in} in)</span>
          </div>
          <div className="flex ml-4 items-center gap-1">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7 8 4 12 4 15a8 8 0 0016 0c0-3-3-7-8-12z" />
            </svg>
            <span className='text-gray-800 font-semibold'>{forecast.humidity}%</span>
          </div>
          <div className="flex ml-4 items-center gap-1">
            <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className='text-gray-800 font-semibold'>{forecast.uv}</span>
            <span className="text-gray-600">UV</span>
          </div>
        </div>
      </div>
    </div>
  );
}