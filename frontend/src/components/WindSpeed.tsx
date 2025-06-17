interface WindSpeedProps {
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  wind_degree: number;
  gust_kph?: number;
}

export default function WindSpeed({ wind_kph, wind_mph, wind_dir, wind_degree, gust_kph }: WindSpeedProps) {
  const getWindStrength = (kph: number) => {
    if (kph < 10) return { level: 'Light', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
    if (kph < 30) return { level: 'Moderate', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (kph < 50) return { level: 'Strong', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { level: 'Very Strong', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const { level, color, bg, border } = getWindStrength(wind_kph);

  return (
    <div className={`${bg} p-4 rounded-lg border ${border}`}>
      <h3 className={`text-lg font-semibold ${color} mb-2`}>Wind Speed</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-2xl font-bold ${color}`}>{wind_kph} km/h</span>
          <span className={`text-sm ${color}`}>({wind_mph} mph)</span>
        </div>
        <div className={`text-sm ${color} space-y-1`}>
          <div>Direction: {wind_dir} ({wind_degree}°)</div>
          <div>{level}</div>
          {gust_kph && gust_kph > wind_kph && (
            <div>Gusts: {gust_kph} km/h</div>
          )}
        </div>
      </div>
    </div>
  );
}