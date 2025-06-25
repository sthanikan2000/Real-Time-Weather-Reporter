// Precipitation Component
interface PrecipitationProps {
  precip_mm: number;
  precip_in: number;
}

export default function Precipitation({ precip_mm, precip_in }: PrecipitationProps) {
  const getPrecipitationLevel = (precip: number) => {
    // console.log("Calculating precipitation level for:", precip);
    if (precip === 0) return { level: 'None', color: 'text-gray-600', bgColor: 'bg-gray-100', description: 'No precipitation' };
    if (precip < 2.5) return { level: 'Light', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Light precipitation' };
    if (precip < 10) return { level: 'Moderate', color: 'text-indigo-600', bgColor: 'bg-indigo-100', description: 'Moderate precipitation' };
    if (precip < 50) return { level: 'Heavy', color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Heavy precipitation' };
    return { level: 'Very Heavy', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Very heavy precipitation' };
  };

  const precipInfo = getPrecipitationLevel(precip_mm);
//   console.log("Precipitation Info:", precipInfo);

  return (
    <div className="group relative bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-200 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 h-full">
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Amount of rain, snow, or other precipitation that has fallen
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">Precipitation</h3>
        <div className="p-2 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
          <svg className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800">{precip_mm}</span>
          <span className="text-lg text-gray-600 group-hover:text-gray-700">mm</span>
          <span className="text-sm text-gray-500 group-hover:text-gray-600">({precip_in} in)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${precipInfo.bgColor} ${precipInfo.color}`}>
            {precipInfo.level}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-300 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(precip_mm / 50 * 100, 100)}%` }}
          ></div>
        </div>

        <div className="text-xs text-gray-600 group-hover:text-gray-700">
          {precipInfo.description}
        </div>
      </div>
    </div>
  );
}
