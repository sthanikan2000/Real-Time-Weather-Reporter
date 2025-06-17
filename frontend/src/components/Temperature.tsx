interface TemperatureProps {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
}

export default function Temperature({ temp_c, temp_f, feelslike_c, feelslike_f }: TemperatureProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Temperature</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-blue-900">{temp_c}°C</span>
          <span className="text-lg text-blue-700">({temp_f}°F)</span>
        </div>
        <div className="text-sm text-blue-600">
          <span>Feels like: {feelslike_c}°C ({feelslike_f}°F)</span>
        </div>
      </div>
    </div>
  );
}