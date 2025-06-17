export function SkeletonCard() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-24 mb-3"></div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-20"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
}

// src/components/skeletons/SkeletonWeatherCard.tsx

export function SkeletonWeatherCard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-6">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-48 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-40 mx-auto mt-1"></div>
      </div>

      {/* Weather Condition Skeleton */}
      <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>

      {/* Weather Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}