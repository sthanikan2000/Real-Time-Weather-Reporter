// Updated Temperature Component with Tooltip
interface TemperatureProps {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
}

export default function Temperature({
  temp_c,
  temp_f,
  feelslike_c,
  feelslike_f
}: TemperatureProps) {
  return (
    <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100 hover:from-orange-100 hover:to-red-100 hover:border-orange-200 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 h-full">
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Current air temperature and how it feels to your body
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">Temperature</h3>
        <div className="p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
          <svg className="w-6 h-6 text-orange-600 group-hover:text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800">{temp_c}°</span>
          <span className="text-lg text-gray-600 group-hover:text-gray-700">C</span>
          <span className="text-sm text-gray-500 group-hover:text-gray-600">({temp_f}°F)</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-700">
          <span>Feels like:</span>
          <span className="font-medium">{feelslike_c}°C ({feelslike_f}°F)</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(Math.max((temp_c + 10) / 50 * 100, 10), 90)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
