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
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Temperature</h3>
        <div className="p-2 bg-orange-100 rounded-full">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">{temp_c}°</span>
          <span className="text-lg text-gray-600">C</span>
          <span className="text-sm text-gray-500">({temp_f}°F)</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
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
// This component displays the temperature in both Celsius and Fahrenheit, along with a visual representation of the temperature range.
// It includes a gradient background and an icon to enhance the visual appeal.
// The temperature is displayed prominently, with a smaller text for the feels-like temperature.
// The gradient bar visually represents the temperature, transitioning from blue (cool) to yellow (warm) to red (hot).
// The width of the gradient bar is calculated based on the temperature, ensuring it stays within a reasonable range (10% to 90%).