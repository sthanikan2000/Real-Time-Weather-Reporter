// src/components/WeatherCondition.tsx
import { Cloud, Sun, CloudRain, Snowflake, Zap } from 'lucide-react';

interface WeatherConditionProps {
  condition: {
    text: string;
    icon: string;
  };
}

export default function WeatherCondition({ condition }: WeatherConditionProps) {
  // Function to get appropriate background gradient based on weather condition
  const getWeatherGradient = (conditionText: string) => {
    const text = conditionText.toLowerCase();
    
    if (text.includes('sunny') || text.includes('clear')) {
      return 'from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100';
    } else if (text.includes('cloud') || text.includes('overcast')) {
      return 'from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100';
    } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
      return 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100';
    } else if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
      return 'from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100';
    } else if (text.includes('thunder') || text.includes('storm')) {
      return 'from-purple-50 to-gray-50 hover:from-purple-100 hover:to-gray-100';
    } else if (text.includes('mist') || text.includes('fog') || text.includes('haze')) {
      return 'from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100';
    }
    
    return 'from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100';
  };

  // Function to get appropriate border color
  const getBorderColor = (conditionText: string) => {
    const text = conditionText.toLowerCase();
    
    if (text.includes('sunny') || text.includes('clear')) {
      return 'border-yellow-100 hover:border-yellow-200';
    } else if (text.includes('cloud') || text.includes('overcast')) {
      return 'border-gray-100 hover:border-gray-200';
    } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
      return 'border-blue-100 hover:border-blue-200';
    } else if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
      return 'border-cyan-100 hover:border-cyan-200';
    } else if (text.includes('thunder') || text.includes('storm')) {
      return 'border-purple-100 hover:border-purple-200';
    }
    
    return 'border-blue-100 hover:border-blue-200';
  };

  // Function to get fallback icon based on condition
  const getFallbackIcon = (conditionText: string) => {
    const text = conditionText.toLowerCase();
    
    if (text.includes('sunny') || text.includes('clear')) {
      return <Sun className="w-16 h-16 text-yellow-500" />;
    } else if (text.includes('cloud') || text.includes('overcast')) {
      return <Cloud className="w-16 h-16 text-gray-500" />;
    } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
      return <CloudRain className="w-16 h-16 text-blue-500" />;
    } else if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
      return <Snowflake className="w-16 h-16 text-cyan-500" />;
    } else if (text.includes('thunder') || text.includes('storm')) {
      return <Zap className="w-16 h-16 text-purple-500" />;
    }
    
    return <Cloud className="w-16 h-16 text-gray-500" />;
  };

  const gradientClass = getWeatherGradient(condition.text);
  const borderClass = getBorderColor(condition.text);

  return (
    <div className={`group relative bg-gradient-to-br ${gradientClass} p-6 rounded-lg border ${borderClass} transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-102 h-full`}>
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Current weather conditions
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">Condition</h3>
        <div className="p-2 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors duration-300">
          <Cloud className="w-6 h-6 text-gray-600 group-hover:text-gray-700" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Weather Icon */}
        <div className="relative">
          <img
            src={condition.icon}
            alt={condition.text}
            className="h-24 w-24 mx-auto transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                target.style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'flex items-center justify-center';
                fallbackDiv.innerHTML = getFallbackIcon(condition.text).props.children || '';
                parent.appendChild(fallbackDiv);
              }
            }}
          />
        </div>

        {/* Weather Description */}
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 group-hover:text-gray-800 leading-tight">
            {condition.text}
          </p>
          <p className="text-sm text-gray-600 group-hover:text-gray-700 mt-1">
            Current conditions
          </p>
        </div>

        {/* Decorative Element */}
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full group-hover:via-gray-400 transition-colors duration-300"></div>
      </div>
    </div>
  );
}