
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Thermometer, Wind } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  location?: string;
  feelsLike?: number;
}

const WeatherDisplay = ({ className = "" }: { className?: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Lahaul and Spiti district coordinates
  const lat = 32.6192;
  const lon = 77.3784;
  
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
      console.log('Weather data:', data); // Verify coordinates in log
      
      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        location: 'Lahaul-Spiti'
      });
      
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Could not load weather');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Initial fetch
    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getWeatherIcon = () => {
    if (!weather) return <Sun className="w-5 h-5 text-yellow-300" />;
    
    const iconCode = weather.icon;
    
    if (iconCode.includes('01')) {
      return <Sun className="w-5 h-5 text-yellow-300" />;
    } else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud className="w-5 h-5 text-gray-300" />;
    } else if (iconCode.includes('09') || iconCode.includes('10')) {
      return <CloudRain className="w-5 h-5 text-blue-300" />;
    } else if (iconCode.includes('13')) {
      return <Snowflake className="w-5 h-5 text-blue-200" />;
    } else {
      return <Thermometer className="w-5 h-5 text-red-400" />;
    }
  };
  
  if (error) {
    return null; // Don't show anything if there's an error
  }
  
  if (loading && !weather) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 relative animate-spin">
          <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white/30 border-b-white/70"></div>
          <div className="absolute inset-2 rounded-full border-1 border-l-transparent border-white/50"></div>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    fetchWeather();
    toast({
      title: "Weather Updated",
      description: "Latest weather data for Lahaul-Spiti has been fetched",
    });
  };

  // For mobile, show an elegant and compact display
  if (isMobile) {
    return (
      <div 
        onClick={handleRefresh}
        className={`group flex items-center justify-center gap-1.5 backdrop-blur-0 px-2.5 py-1.5 rounded-full 
        border border-white/20 shadow-sm hover:border-white/40 transition-all duration-300 
        animate-fade-in-up hover:scale-105 cursor-pointer ${className}`}
      >
        <div className="transform transition-all duration-300 group-hover:rotate-12">
          {getWeatherIcon()}
        </div>
        <span className="text-xs font-bold text-white/90 group-hover:text-white transition-colors">{weather?.temp}°C</span>
        <span className="text-[10px] text-white/60 hidden xs:inline group-hover:text-white/90 transition-colors">Lahaul-Spiti</span>
      </div>
    );
  }
  
  // For desktop, show a more interactive and detailed display with more transparency
  return (
    <div 
      onClick={handleRefresh}
      className={`bg-transparent border border-white/20 hover:border-white/40 rounded-lg 
      overflow-hidden cursor-pointer transition-all duration-300 shadow-lg backdrop-blur-0
      hover:shadow-xl animate-fade-in-up transform hover:scale-[1.02] ${className}`}
    >
      <div className="p-2.5 pt-2.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full transform transition-transform duration-500 hover:rotate-12">
            {getWeatherIcon()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white/90 transition-colors hover:text-white">{weather?.temp}°C</span>
              <span className="text-xs text-white/70 transition-colors hover:text-white/90">Feels: {weather?.feelsLike}°C</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/60 transition-colors hover:text-white/80">
              <span>Lahaul-Spiti</span>
              <span className="mx-1">•</span>
              <div className="flex items-center gap-1 opacity-70">
                <Wind className="w-3 h-3" />
                <span>{weather?.windSpeed} m/s</span>
              </div>
            </div>
            {lastUpdated && (
              <div className="text-[10px] text-white/40 mt-0.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                Updated: {lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
