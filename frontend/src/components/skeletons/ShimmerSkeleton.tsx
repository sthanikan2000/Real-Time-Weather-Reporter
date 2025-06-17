function ShimmerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      {children}
    </div>
  );
}

export function ShimmerTemperature() {
  return (
    <ShimmerCard>
      <div className="h-6 bg-gray-300 rounded w-24 mb-3"></div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-36"></div>
      </div>
    </ShimmerCard>
  );
}

export function ShimmerHumidity() {
  return (
    <ShimmerCard>
      <div className="h-6 bg-gray-300 rounded w-20 mb-3"></div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-14"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </ShimmerCard>
  );
}

export function ShimmerWindSpeed() {
  return (
    <ShimmerCard>
      <div className="h-6 bg-gray-300 rounded w-24 mb-3"></div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-20"></div>
          <div className="h-5 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="space-y-1">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
    </ShimmerCard>
  );
}

export function ShimmerUVIndex() {
  return (
    <ShimmerCard>
      <div className="h-6 bg-gray-300 rounded w-20 mb-3"></div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-8"></div>
          <div className="h-5 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-40"></div>
      </div>
    </ShimmerCard>
  );
}

export function ShimmerWeatherCard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Header Skeleton */}
      <div className="text-center mb-6">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <div className="h-5 bg-gray-300 rounded w-48 mx-auto"></div>
        </div>
        <div className="relative overflow-hidden mt-1">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <div className="h-4 bg-gray-300 rounded w-40 mx-auto"></div>
        </div>
      </div>

      {/* Weather Condition Skeleton */}
      <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>
      </div>

      {/* Weather Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShimmerTemperature />
        <ShimmerHumidity />
        <ShimmerWindSpeed />
        <ShimmerUVIndex />
      </div>
    </div>
  );
}