interface HumidityProps {
  humidity: number;
}

export default function Humidity({ humidity }: HumidityProps) {
  const getHumidityLevel = (humidity: number) => {
    if (humidity < 30) return { level: 'Low', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (humidity > 70) return { level: 'High', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
    return { level: 'Comfortable', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' };
  };

  const { level, color, bg, border } = getHumidityLevel(humidity);

  return (
    <div className={`${bg} p-4 rounded-lg border ${border}`}>
      <h3 className={`text-lg font-semibold ${color} mb-2`}>Humidity</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-3xl font-bold ${color}`}>{humidity}%</span>
        </div>
        <div className={`text-sm ${color}`}>
          <span>{level}</span>
        </div>
      </div>
    </div>
  );
}