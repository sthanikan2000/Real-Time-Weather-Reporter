// src/components/LoadingSpinner.tsx

import { ShimmerWeatherCard } from './skeletons/ShimmerSkeleton';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ShimmerWeatherCard />
    </div>
  );
}

// Alternative: Simple spinner (if you want to keep the original)
export function SimpleSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-lg text-gray-600">Loading weather data...</p>
    </div>
  );
}