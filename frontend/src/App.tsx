// src/App.tsx
import { Cloud, Globe } from 'lucide-react';
import { useWeatherData } from './hooks/useWeatherData';
import CitySelector from './components/CitySelector';
import WeatherCard from './components/WeatherCard';
// import { getWeatherTheme } from './utils/weatherBackgrounds';
// import { useState, useEffect } from 'react';

function App(){
  const {
    currentWeather,
    hourlyWeather,
    alerts,
    selectedCity,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refreshWeather,
    changeCity,
    availableCities,
  } = useWeatherData();
  // console.log("App Component Rendered:",currentWeather);

  // const [theme, setTheme] = useState({
  //   background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  //   text: 'text-gray-800',
  // });

  // useEffect(() => {
  //   if (currentWeather) {
  //     const weatherCondition = {
  //       text: currentWeather.condition.text,
  //       icon: currentWeather.condition.icon,
  //     };
  //     const newTheme = getWeatherTheme(weatherCondition);

  //     setTheme({
  //       background: newTheme.gradient,
  //       text: newTheme.textColor,
  //     });
  //   }
    
  // }, [currentWeather]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-500 via-yellow-50 to-blue-300`}>
      <div className="container mx-auto px-8 py-8 max-w-8xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="h-24 w-24 text-blue-500 mr-3" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              Weather Sri Lanka
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Real-time weather information for Sri Lankan cities
          </p>
        </header>

        {/* City Selector */}
        <div className="mb-6">
          <CitySelector
            cities={availableCities}
            selectedCity={selectedCity}
            onCityChange={changeCity}
            disabled={isLoading}
          />
        </div>

        {/* Connection Error Banner */}
        {error && error.includes('Connection issue') && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-red-400 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Connection Issue
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Unable to fetch fresh weather data from the server. 
                  {error.includes('sample data') 
                    ? ' Showing sample data instead.' 
                    : ' Displaying last known data.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Alerts (if any) */}
        {alerts.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">
              Weather Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-white rounded-md p-4 border-l-4 border-orange-400">
                  <h4 className="font-medium text-orange-800 mb-1">
                    {alert.headline}
                  </h4>
                  {alert.urgency && (
                    <p className="text-sm text-orange-700">
                      Urgency: {alert.urgency}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Weather Card */}
        <WeatherCard
          location={selectedCity}
          current={currentWeather}
          hourlyWeather={hourlyWeather}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          error={error}
          onRefresh={refreshWeather}
        />

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Globe className="h-4 w-4 mr-1" />
            <span className="mr-2">Global weather data | Powered by</span>
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              WeatherAPI.com
            </a>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;