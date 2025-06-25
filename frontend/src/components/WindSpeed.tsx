// Updated WindSpeed Component with Tooltip
interface WindSpeedProps {
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  wind_degree: number;
  gust_kph: number;
  gust_mph: number;
} 

export default function WindSpeed({
  wind_kph,
  wind_mph,
  wind_dir,
  wind_degree,
  gust_kph,
  gust_mph
}: WindSpeedProps) {
  const getWindScale = (speed: number) => {
    if (speed < 12) return { scale: 'Light', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (speed < 20) return { scale: 'Gentle', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (speed < 29) return { scale: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (speed < 39) return { scale: 'Fresh', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (speed < 50) return { scale: 'Strong', color: 'text-red-600', bgColor: 'bg-red-100' };
    return { scale: 'Very Strong', color: 'text-purple-600', bgColor: 'bg-purple-100' };
  };

  const windInfo = getWindScale(wind_kph);

  return (
    <div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-lg border border-gray-100 hover:from-gray-100 hover:to-slate-100 hover:border-gray-200 transition-all duration-300 cursor-pointer  hover:shadow-lg hover:scale-105 h-full">
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Wind speed, direction, and intensity from weather station
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">Wind Speed</h3>
        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transform: `rotate(${wind_degree}deg)` }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800">{wind_kph}</span>
          <span className="text-lg text-gray-600 group-hover:text-gray-700">km/h</span>
          <span className="text-sm text-gray-500 group-hover:text-gray-600">({wind_mph} mph)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${windInfo.bgColor} ${windInfo.color}`}>
            {windInfo.scale}
          </span>
          <span className="text-sm text-gray-600 group-hover:text-gray-700">
            {wind_dir} ({wind_degree}°)
          </span>
        </div>

        {gust_kph && gust_kph > wind_kph && (
          <div className="text-sm text-gray-600 group-hover:text-gray-700">
            <span className="font-medium">Gusts:</span> {gust_kph} km/h ({gust_mph} mph)
          </div>
        )}

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-gray-400 to-gray-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(wind_kph / 50 * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}