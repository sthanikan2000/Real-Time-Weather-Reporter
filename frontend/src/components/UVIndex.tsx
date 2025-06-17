interface UVIndexProps {
  uv: number;
}

export default function UVIndex({ uv }: UVIndexProps) {
  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { 
      level: 'Low', 
      description: 'Minimal protection required',
      color: 'text-green-700', 
      bg: 'bg-green-50', 
      border: 'border-green-200' 
    };
    if (uvIndex <= 5) return { 
      level: 'Moderate', 
      description: 'Some protection required',
      color: 'text-yellow-700', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200' 
    };
    if (uvIndex <= 7) return { 
      level: 'High', 
      description: 'Protection essential',
      color: 'text-orange-700', 
      bg: 'bg-orange-50', 
      border: 'border-orange-200' 
    };
    if (uvIndex <= 10) return { 
      level: 'Very High', 
      description: 'Extra protection needed',
      color: 'text-red-700', 
      bg: 'bg-red-50', 
      border: 'border-red-200' 
    };
    return { 
      level: 'Extreme', 
      description: 'Avoid sun exposure',
      color: 'text-purple-700', 
      bg: 'bg-purple-50', 
      border: 'border-purple-200' 
    };
  };

  const { level, description, color, bg, border } = getUVLevel(uv);

  return (
    <div className={`${bg} p-4 rounded-lg border ${border}`}>
      <h3 className={`text-lg font-semibold ${color} mb-2`}>UV Index</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-3xl font-bold ${color}`}>{uv}</span>
          <span className={`text-sm font-medium ${color}`}>{level}</span>
        </div>
        <div className={`text-sm ${color}`}>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}