// Updated Humidity Component with Tooltip
interface HumidityProps {
  humidity: number;
}

export default function Humidity({ humidity }: HumidityProps) {
  const getHumidityLevel = (humidity: number) => {
    if (humidity < 30) return { level: 'Low', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (humidity < 60) return { level: 'Comfortable', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (humidity < 80) return { level: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Very High', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const humidityInfo = getHumidityLevel(humidity);

  return (
    <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-200 transition-all duration-300 cursor-pointer">
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Amount of water vapor in the air as a percentage
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">Humidity</h3>
        <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
          <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7 8 4 12 4 15a8 8 0 0016 0c0-3-3-7-8-12z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800">{humidity}</span>
          <span className="text-lg text-gray-600 group-hover:text-gray-700">%</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${humidityInfo.bgColor} ${humidityInfo.color}`}>
            {humidityInfo.level}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-300 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${humidity}%` }}
          ></div>
        </div>

        <div className="text-xs text-gray-500 group-hover:text-gray-600">
          Ideal range: 40-60%
        </div>
      </div>
    </div>
  );
}