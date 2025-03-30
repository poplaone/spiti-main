
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Thermometer, Wind } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
}

const WeatherDisplay = ({ className = "" }: { className?: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Coordinates for Kaza, Spiti Valley
  const lat = 32.226;
  const lon = 78.072;
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using OpenWeatherMap free API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8d2de98e089f1c28e1a22fc19a24ef04`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Could not load weather');
        setLoading(false);
      }
    };
    
    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getWeatherIcon = () => {
    if (!weather) return <Sun className="w-4 h-4 text-yellow-300" />;
    
    const iconCode = weather.icon;
    
    if (iconCode.includes('01')) {
      return <Sun className="w-4 h-4 text-yellow-300" />;
    } else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud className="w-4 h-4 text-gray-300" />;
    } else if (iconCode.includes('09') || iconCode.includes('10')) {
      return <CloudRain className="w-4 h-4 text-blue-300" />;
    } else if (iconCode.includes('13')) {
      return <Snowflake className="w-4 h-4 text-blue-200" />;
    } else {
      return <Thermometer className="w-4 h-4 text-red-400" />;
    }
  };
  
  if (error) {
    return null; // Don't show anything if there's an error
  }
  
  if (loading) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mx-1"></div>
      </div>
    );
  }

  // For mobile, show a more compact display
  if (isMobile) {
    return (
      <div className={`flex items-center justify-center gap-1 ${className}`}>
        {getWeatherIcon()}
        <span className="text-xs font-medium text-white">{weather?.temp}°C</span>
      </div>
    );
  }
  
  // For desktop, show a more detailed display
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {getWeatherIcon()}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-white">{weather?.temp}°C</span>
          <span className="text-xs text-white/80 capitalize hidden sm:inline">{weather?.description}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/70">
          <Wind className="w-3 h-3" />
          <span>{weather?.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
