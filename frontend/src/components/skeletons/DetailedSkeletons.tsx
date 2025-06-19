import { SkeletonCard } from "./SkeletonCard";
export function WeatherCardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="animate-pulse">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="h-8 bg-gray-300 rounded w-64 flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>

        {/* Weather Condition */}
        <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        {/* Hourly Forecast Skeleton */}
        {/* <div className="mt-6">
          <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...Array(24)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-24 p-3 bg-gray-50 rounded-lg">
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-12 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded mx-auto"></div>
                  <div className="h-5 bg-gray-300 rounded w-8 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-6 mx-auto"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded w-8 mx-auto"></div>
                    <div className="h-2 bg-gray-300 rounded w-6 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export function HourlyForcastSkeleton() {
  return (
    <div className="mt-6">
      <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[...Array(24)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-24 p-3 bg-gray-50 rounded-lg">
            <div className="animate-pulse space-y-2">
              <div className="h-3 bg-gray-300 rounded w-12 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
              <div className="w-8 h-8 bg-gray-300 rounded mx-auto"></div>
              <div className="h-5 bg-gray-300 rounded w-8 mx-auto"></div>
              <div className="h-3 bg-gray-300 rounded w-6 mx-auto"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-300 rounded w-8 mx-auto"></div>
                <div className="h-2 bg-gray-300 rounded w-6 mx-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}