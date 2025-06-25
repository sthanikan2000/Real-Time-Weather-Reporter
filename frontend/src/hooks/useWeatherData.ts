// src/hooks/useWeatherData.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import type { WeatherState } from '../types/weather';
import type { City } from '../types/city';
import { DEFAULT_CITIES } from '../constants/city';
import { fetchWeatherData } from '../services/weatherService';

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes - weatherapi.com updates every 15 minutes
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
  const isInitializedRef = useRef(false);

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

  // Clear existing timers helper
  const clearTimers = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  // Set up auto-refresh interval
  const setupRefreshInterval = useCallback((city: City) => {
    clearTimers();
    refreshIntervalRef.current = setInterval(() => {
      fetchWeather(city, true);
    }, REFRESH_INTERVAL);
  }, [clearTimers]);

  // Fetch weather data function
  const fetchWeather = useCallback(async (city: City, isRefresh = false) => {
    try {
      setState(prev => ({
        ...prev,
        isLoading: !isRefresh && !isInitializedRef.current,
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

      // Set up auto-refresh only after successful fetch and only once
      if (!refreshIntervalRef.current) {
        setupRefreshInterval(city);
      }

    } catch (error) {
      console.error('Weather fetch error:', error);
      
      setState(prev => {
        const newRetryCount = prev.retryCount + 1;
        
        return {
          ...prev,
          isLoading: false,
          isRefreshing: false,
          error: `Failed to load weather data (attempt ${newRetryCount})`,
          retryCount: newRetryCount,
        };
      });

      // Set up retry timeout with exponential backoff (max 5 minutes)
      const retryDelay = Math.min(RETRY_INTERVAL * Math.pow(2, state.retryCount), 5 * 60 * 1000);
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      retryTimeoutRef.current = setTimeout(() => {
        fetchWeather(city, true);
      }, retryDelay);
    }
  }, [setupRefreshInterval, state.retryCount]);

  // Change city handler
  const changeCity = useCallback((city: City) => {
    // Don't change if it's the same city
    if (state.selectedCity.id === city.id) {
      return;
    }

    // Clear existing timers
    clearTimers();

    setState(prev => ({
      ...prev,
      selectedCity: city,
      isLoading: true,
      error: null,
      retryCount: 0,
    }));

    // Fetch data for new city
    fetchWeather(city);
  }, [state.selectedCity.id, clearTimers, fetchWeather]);

  // Manual refresh handler
  const refreshWeather = useCallback(() => {
    if (!state.isRefreshing && !state.isLoading) {
      fetchWeather(state.selectedCity, true);
    }
  }, [fetchWeather, state.selectedCity, state.isRefreshing, state.isLoading]);

  // Initial load effect - only runs once
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      fetchWeather(state.selectedCity);
    }
  }, []); // Empty dependency array ensures this only runs once

  return {
    ...state,
    refreshWeather,
    changeCity,
    availableCities: DEFAULT_CITIES,
  };
};