// src/utils/weatherBackgrounds.ts

export interface WeatherTheme {
  gradient: string;
  overlay: string;
  animation: string;
  textColor: string;
  cardBg: string;
  cardBorder: string;
  cardHover: string;
  accentColor: string;
  iconColor: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
}

// Helper function to determine if it's night time
const isNightTime = (): boolean => {
  const hour = new Date().getHours();
  return hour < 6 || hour > 18;
};

// Helper function to get weather category from condition text
const getWeatherCategory = (condition: WeatherCondition): string => {
  const text = condition.text.toLowerCase();
  
  if (text.includes('sunny') || text.includes('clear')) {
    return isNightTime() ? 'clear-night' : 'sunny';
  }
  
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return 'rainy';
  }
  
  if (text.includes('thunder') || text.includes('storm')) {
    return 'stormy';
  }
  
  if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
    return 'snowy';
  }
  
  if (text.includes('fog') || text.includes('mist') || text.includes('haze')) {
    return 'foggy';
  }
  
  if (text.includes('cloud') || text.includes('overcast')) {
    return 'cloudy';
  }
  
  // Default case
  return isNightTime() ? 'clear-night' : 'sunny';
};

// Main function to get weather theme
export const getWeatherTheme = (condition: WeatherCondition): WeatherTheme => {
  const category = getWeatherCategory(condition);
  
  const themes: Record<string, WeatherTheme> = {
    sunny: {
      gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      overlay: 'bg-gradient-to-t from-yellow-100/20 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-white',
      cardBg: 'bg-white/90 backdrop-blur-sm',
      cardBorder: 'border-yellow-200/50',
      cardHover: 'hover:bg-white/95 hover:shadow-xl hover:shadow-yellow-200/30',
      accentColor: 'text-yellow-600',
      iconColor: 'text-yellow-500'
    },
    
    clear_night: {
      gradient: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
      overlay: 'bg-gradient-to-t from-indigo-800/30 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-white',
      cardBg: 'bg-white/10 backdrop-blur-md border-white/20',
      cardBorder: 'border-purple-300/30',
      cardHover: 'hover:bg-white/20 hover:shadow-xl hover:shadow-purple-500/20',
      accentColor: 'text-purple-300',
      iconColor: 'text-purple-400'
    },
    
    cloudy: {
      gradient: 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600',
      overlay: 'bg-gradient-to-t from-gray-300/20 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-white',
      cardBg: 'bg-white/85 backdrop-blur-sm',
      cardBorder: 'border-gray-300/50',
      cardHover: 'hover:bg-white/90 hover:shadow-xl hover:shadow-gray-300/30',
      accentColor: 'text-gray-600',
      iconColor: 'text-gray-500'
    },
    
    rainy: {
      gradient: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800',
      overlay: 'bg-gradient-to-t from-blue-600/20 to-transparent',
      animation: 'animate-bounce',
      textColor: 'text-white',
      cardBg: 'bg-white/80 backdrop-blur-md',
      cardBorder: 'border-blue-400/50',
      cardHover: 'hover:bg-white/85 hover:shadow-xl hover:shadow-blue-400/30',
      accentColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    
    stormy: {
      gradient: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
      overlay: 'bg-gradient-to-t from-purple-900/40 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-white',
      cardBg: 'bg-white/75 backdrop-blur-md',
      cardBorder: 'border-purple-500/50',
      cardHover: 'hover:bg-white/80 hover:shadow-xl hover:shadow-purple-500/40',
      accentColor: 'text-purple-600',
      iconColor: 'text-purple-500'
    },
    
    snowy: {
      gradient: 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300',
      overlay: 'bg-gradient-to-t from-white/30 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/90 backdrop-blur-sm',
      cardBorder: 'border-blue-200/60',
      cardHover: 'hover:bg-white/95 hover:shadow-xl hover:shadow-blue-200/40',
      accentColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    
    foggy: {
      gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
      overlay: 'bg-gradient-to-t from-gray-200/40 to-transparent',
      animation: 'animate-pulse',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/70 backdrop-blur-lg',
      cardBorder: 'border-gray-400/40',
      cardHover: 'hover:bg-white/80 hover:shadow-xl hover:shadow-gray-400/30',
      accentColor: 'text-gray-600',
      iconColor: 'text-gray-500'
    }
  };
  
  return themes[category] || themes.sunny;
};

// Function to get animated background elements
export const getAnimatedElements = (condition: WeatherCondition): string => {
  const category = getWeatherCategory(condition);
  
  const elements: Record<string, string> = {
    sunny: `
      <div class="absolute top-10 right-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-32 w-12 h-12 bg-yellow-400/15 rounded-full animate-pulse animation-delay-1000"></div>
      <div class="absolute top-20 right-52 w-8 h-8 bg-yellow-500/10 rounded-full animate-pulse animation-delay-2000"></div>
    `,
    
    clear_night: `
      <div class="absolute top-10 right-10 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
      <div class="absolute top-20 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
      <div class="absolute top-32 right-16 w-1 h-1 bg-white/50 rounded-full animate-pulse animation-delay-2000"></div>
      <div class="absolute top-16 right-48 w-1 h-1 bg-white/45 rounded-full animate-pulse animation-delay-3000"></div>
    `,
    
    cloudy: `
      <div class="absolute top-8 right-12 w-16 h-8 bg-white/20 rounded-full animate-pulse"></div>
      <div class="absolute top-16 right-28 w-12 h-6 bg-white/15 rounded-full animate-pulse animation-delay-1000"></div>
      <div class="absolute top-24 right-8 w-20 h-10 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
    `,
    
    rainy: `
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-10 left-10 w-0.5 h-4 bg-blue-300/60 animate-bounce"></div>
        <div class="absolute top-8 left-20 w-0.5 h-3 bg-blue-400/50 animate-bounce animation-delay-200"></div>
        <div class="absolute top-12 left-32 w-0.5 h-5 bg-blue-300/40 animate-bounce animation-delay-400"></div>
        <div class="absolute top-6 left-44 w-0.5 h-4 bg-blue-500/50 animate-bounce animation-delay-600"></div>
      </div>
    `,
    
    stormy: `
      <div class="absolute top-12 right-16 w-24 h-12 bg-purple-500/10 rounded-lg animate-pulse"></div>
      <div class="absolute top-20 right-32 w-16 h-8 bg-purple-600/15 rounded-lg animate-pulse animation-delay-500"></div>
      <div class="absolute top-8 right-48 w-20 h-10 bg-purple-400/10 rounded-lg animate-pulse animation-delay-1000"></div>
    `,
    
    snowy: `
      <div class="absolute top-4 left-8 w-2 h-2 bg-white/80 rounded-full animate-bounce"></div>
      <div class="absolute top-8 left-16 w-1 h-1 bg-white/60 rounded-full animate-bounce animation-delay-300"></div>
      <div class="absolute top-12 left-24 w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce animation-delay-600"></div>
      <div class="absolute top-6 left-32 w-1 h-1 bg-white/50 rounded-full animate-bounce animation-delay-900"></div>
    `,
    
    foggy: `
      <div class="absolute top-16 right-20 w-32 h-16 bg-gray-300/20 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute top-24 right-40 w-24 h-12 bg-gray-400/15 rounded-full blur-sm animate-pulse animation-delay-1000"></div>
      <div class="absolute top-32 right-12 w-28 h-14 bg-gray-300/10 rounded-full blur-sm animate-pulse animation-delay-2000"></div>
    `
  };
  
  return elements[category] || elements.sunny;
};

// Helper function to get card-specific styling
export const getCardTheme = (condition: WeatherCondition, baseCard: string = ''): string => {
  const theme = getWeatherTheme(condition);
  return `${baseCard} ${theme.cardBg} ${theme.cardBorder} ${theme.cardHover} border transition-all duration-300`;
};

// Helper function to get text styling based on weather
export const getTextTheme = (condition: WeatherCondition, baseText: string = ''): string => {
  const theme = getWeatherTheme(condition);
  return `${baseText} ${theme.textColor}`;
};

// Helper function to get accent color for icons and highlights
export const getAccentTheme = (condition: WeatherCondition): string => {
  const theme = getWeatherTheme(condition);
  return theme.accentColor;
};

// Helper function to get icon color
export const getIconTheme = (condition: WeatherCondition): string => {
  const theme = getWeatherTheme(condition);
  return theme.iconColor;
};