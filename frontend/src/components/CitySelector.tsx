// src/components/CitySelector.tsx
import { useState, useRef, useEffect } from 'react';
import type { City } from '../types/weather';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
  disabled?: boolean;
}

export default function CitySelector({ cities, selectedCity, onCityChange, disabled = false }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: City) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-center">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <div className="font-medium text-gray-900">{selectedCity.name}</div>
            <div className="text-sm text-gray-500">{selectedCity.region}, {selectedCity.country}</div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                    selectedCity.id === city.id ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.region}, {city.country}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No cities found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}