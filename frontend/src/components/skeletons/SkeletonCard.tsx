export function SkeletonCard() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <div className="h-12 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-8"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
          
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-2 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}