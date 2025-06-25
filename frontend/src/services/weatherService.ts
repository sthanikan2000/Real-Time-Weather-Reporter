// src/services/weatherService.ts
import type { WeatherResponse } from '../types/weather';

const BASE_URL = import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH : 'http://localhost:3000';
const REQUEST_TIMEOUT = 10000; // 10 seconds

class WeatherServiceError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'WeatherServiceError';
    this.statusCode = statusCode;
  }
}

// Create a fetch wrapper with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = REQUEST_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchWeatherData = async (location: string): Promise<WeatherResponse> => {
  try {
    const url = `${BASE_URL}/api/forecast?location=${encodeURIComponent(location)}`;
    
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherServiceError('Location not found', 404);
      } else if (response.status === 429) {
        throw new WeatherServiceError('Too many requests. Please try again later.', 429);
      } else if (response.status >= 500) {
        throw new WeatherServiceError('Server error. Please try again later.', response.status);
      } else {
        throw new WeatherServiceError(`Request failed with status ${response.status}`, response.status);
      }
    }

    const data: WeatherResponse = await response.json();
    
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      throw new WeatherServiceError('Invalid response format');
    }

    if (data.error) {
      throw new WeatherServiceError(data.message as unknown as string || 'API returned an error');
    }

    if (!data.message || !data.message.current || !data.message.forecast) {
      throw new WeatherServiceError('Incomplete weather data received');
    }

    return data;
  } catch (error) {
    if (error instanceof WeatherServiceError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new WeatherServiceError('Network error. Please check your internet connection.');
    }

    // Handle abort errors (timeout)
    if (typeof error === 'object' && error !== null && 'name' in error && (error as { name?: string }).name === 'AbortError') {
      throw new WeatherServiceError('Request timeout. Please try again.');
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      throw new WeatherServiceError('Invalid response format from server.');
    }

    // Generic error fallback
    throw new WeatherServiceError('An unexpected error occurred. Please try again.');
  }
};

// Health check function to test API availability
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/health`, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
};

// Get available cities from the API (if supported)
export const fetchAvailableCities = async (): Promise<string[]> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/api/cities`);
    if (response.ok) {
      const cities = await response.json();
      return Array.isArray(cities) ? cities : [];
    }
    return [];
  } catch {
    return [];
  }
};