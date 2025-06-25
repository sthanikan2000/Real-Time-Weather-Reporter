// src/hooks/useWeatherData.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import type { WeatherState } from '../types/weather';
import type { City } from '../types/city';
import { DEFAULT_WEATHER_RESPONSE } from '../constants/weatherResponse';
import { DEFAULT_CITIES } from '../constants/city';
import { fetchWeatherData } from '../services/weatherService';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const RETRY_INTERVAL = 1 * 60 * 1000; // 1 minute

export const useWeatherData = () => {
  const [state, setState] = useState<WeatherState>({
    currentWeather: null,
    hourlyWeather: null,
    alerts: [],
    selectedCity: DEFAULT_CITIES[0], // Default to Colombo
    isLoading: true,
    isRefreshing: false,
    error: null,
    lastUpdated: null,
    retryCount: 0,
  });

  const refreshIntervalRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const isInitialLoad = useRef(true);

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Fetch weather data function
  const fetchWeather = useCallback(async (city: City, isRefresh = false) => {
    try {
      setState(prev => ({
        ...prev,
        isLoading: !isRefresh && isInitialLoad.current,
        isRefreshing: isRefresh,
        error: null,
      }));

      const response = await fetchWeatherData(city.name);
      
      setState(prev => ({
        ...prev,
        currentWeather: response.message.current,
        hourlyWeather: response.message.forecast,
        alerts: response.message.alerts || [],
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastUpdated: new Date(),
        retryCount: 0,
      }));

      isInitialLoad.current = false;

      // Set up auto-refresh interval if not already set
      if (!refreshIntervalRef.current) {
        refreshIntervalRef.current = setInterval(() => {
          fetchWeather(city, true);
        }, REFRESH_INTERVAL);
      }

    } catch (error) {
      console.error('Weather fetch error:', error);
      
      setState(prev => {
        const newRetryCount = prev.retryCount + 1;
        
        // If this is the first load and it fails, use mock data
        if (isInitialLoad.current) {
          return {
            ...prev,
            currentWeather: DEFAULT_WEATHER_RESPONSE.message.current,
            hourlyWeather: DEFAULT_WEATHER_RESPONSE.message.forecast,
            alerts: DEFAULT_WEATHER_RESPONSE.message.alerts,
            isLoading: false,
            isRefreshing: false,
            error: 'Connection issue - showing sample data',
            retryCount: newRetryCount,
          };
        }

        // For subsequent failures, keep existing data
        return {
          ...prev,
          isLoading: false,
          isRefreshing: false,
          error: 'Connection issue - showing last known data',
          retryCount: newRetryCount,
        };
      });

      isInitialLoad.current = false;

      // Set up retry timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      retryTimeoutRef.current = setTimeout(() => {
        fetchWeather(city, true);
      }, RETRY_INTERVAL);
    }
  }, []);

  // Change city handler
  const changeCity = useCallback((city: City) => {
    // Clear existing timers
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setState(prev => ({
      ...prev,
      selectedCity: city,
    }));

    // Reset initial load flag and fetch data for new city
    isInitialLoad.current = true;
    fetchWeather(city);
  }, [fetchWeather]);

  // Manual refresh handler
  const refreshWeather = useCallback(() => {
    if (!state.isRefreshing && !state.isLoading) {
      fetchWeather(state.selectedCity, true);
    }
  }, [fetchWeather, state.selectedCity, state.isRefreshing, state.isLoading]);

  // Initial load effect
  useEffect(() => {
    fetchWeather(state.selectedCity);
  }, [fetchWeather]);

  // Cleanup effect when city changes
  useEffect(() => {
    if (state.selectedCity) {
      fetchWeather(state.selectedCity);
    }
  }, [state.selectedCity.id]); // Only trigger when city ID changes

  return {
    ...state,
    refreshWeather,
    changeCity,
    availableCities: DEFAULT_CITIES,
  };
};
