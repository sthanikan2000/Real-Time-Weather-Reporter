// Updated UVIndex Component with Tooltip
interface UVIndexProps {
  uv: number;
}

export default function UVIndex({ uv }: UVIndexProps) {
  const getUVLevel = (uvIndex: number) => {
    if (uvIndex < 3) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100', recommendation: 'No protection needed' };
    if (uvIndex < 6) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100', recommendation: 'Some protection required' };
    if (uvIndex < 8) return { level: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100', recommendation: 'Protection essential' };
    if (uvIndex < 11) return { level: 'Very High', color: 'text-red-600', bgColor: 'bg-red-100', recommendation: 'Extra protection needed' };
    return { level: 'Extreme', color: 'text-purple-600', bgColor: 'bg-purple-100', recommendation: 'Avoid sun exposure' };
  };

  const uvInfo = getUVLevel(uv);

  return (
    <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-100 hover:from-yellow-100 hover:to-orange-100 hover:border-yellow-200 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 h-full">
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Ultraviolet radiation intensity from the sun (0-12+ scale)
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">UV Index</h3>
        <div className="p-2 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors duration-300">
          <svg className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800">{uv}</span>
          <span className="text-lg text-gray-600 group-hover:text-gray-700">UV</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${uvInfo.bgColor} ${uvInfo.color}`}>
            {uvInfo.level}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(uv / 12 * 100, 100)}%` }}
          ></div>
        </div>

        <div className="text-xs text-gray-600 group-hover:text-gray-700">
          {uvInfo.recommendation}
        </div>
      </div>
    </div>
  );
}
