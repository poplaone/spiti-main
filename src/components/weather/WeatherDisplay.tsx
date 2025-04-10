
import React, { useState, useEffect, useRef, memo } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Thermometer, Wind } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  location?: string;
  feelsLike?: number;
  timestamp?: number;
}

// Improve performance with local storage caching
const WEATHER_CACHE_KEY = 'spiti-weather-cache';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

const WeatherDisplay = memo(({ className = "" }: { className?: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const fetchInProgress = useRef(false);
  
  // Lahaul and Spiti district coordinates
  const lat = 32.6192;
  const lon = 77.3784;
  
  const getCachedWeather = () => {
    try {
      const cachedData = localStorage.getItem(WEATHER_CACHE_KEY);
      if (!cachedData) return null;
      
      const parsedData = JSON.parse(cachedData) as WeatherData & { timestamp: number };
      const now = Date.now();
      
      // Check if cache is expired
      if (now - parsedData.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(WEATHER_CACHE_KEY);
        return null;
      }
      
      return parsedData;
    } catch (err) {
      console.error('Error reading weather cache:', err);
      return null;
    }
  };
  
  const saveWeatherCache = (data: WeatherData) => {
    try {
      const cacheData = {
        ...data,
        timestamp: Date.now()
      };
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Error saving weather cache:', err);
    }
  };
  
  const fetchWeather = async (forceFetch = false) => {
    // Prevent multiple simultaneous fetches
    if (fetchInProgress.current) return;
    
    try {
      // Check cache first unless force fetching
      if (!forceFetch) {
        const cachedData = getCachedWeather();
        if (cachedData) {
          setWeather(cachedData);
          setLastUpdated(new Date(cachedData.timestamp));
          setLoading(false);
          return;
        }
      }
      
      fetchInProgress.current = true;
      setLoading(true);
      
      // Using OpenWeatherMap free API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8d2de98e089f1c28e1a22fc19a24ef04`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      const weatherData = {
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        location: 'Lahaul-Spiti'
      };
      
      // Update state and cache
      setWeather(weatherData);
      saveWeatherCache(weatherData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Could not load weather');
      setLoading(false);
    } finally {
      fetchInProgress.current = false;
    }
  };
  
  // Initial fetch on component mount
  useEffect(() => {
    fetchWeather();
    
    // Refresh weather data every 30 minutes but only when tab is visible
    const checkAndRefresh = () => {
      if (document.visibilityState === 'visible') {
        fetchWeather();
      }
    };
    
    // Set up interval only when page is visible
    const intervalId = setInterval(checkAndRefresh, 30 * 60 * 1000);
    
    // Listen for visibility changes to optimize background tab behavior
    document.addEventListener('visibilitychange', checkAndRefresh);
    
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', checkAndRefresh);
    };
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
  
  const handleRefresh = () => {
    fetchWeather(true);
    toast({
      title: "Weather Updated",
      description: "Latest weather data for Lahaul-Spiti has been fetched",
    });
  };
  
  if (error) {
    return null; // Don't show anything if there's an error
  }
  
  if (loading && !weather) {
    // Simplified loading indicator for better performance
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-6 h-6 opacity-60 animate-pulse rounded-full bg-white/30"></div>
      </div>
    );
  }

  // For mobile, show an elegant and compact display
  if (isMobile) {
    return (
      <div 
        onClick={handleRefresh}
        className={`group flex items-center justify-center gap-1.5 backdrop-blur-0 px-2.5 py-1.5 rounded-full 
        border border-white/20 shadow-sm hover:border-white/40 transition-all duration-300 
        hover:scale-105 cursor-pointer ${className}`}
      >
        <div className="transform transition-all duration-300 group-hover:rotate-12">
          {getWeatherIcon()}
        </div>
        <span className="text-xs font-bold text-white/90 group-hover:text-white transition-colors">{weather?.temp}°C</span>
        <span className="text-[10px] text-white/60 hidden xs:inline group-hover:text-white/90 transition-colors">Lahaul-Spiti</span>
      </div>
    );
  }
  
  // For desktop, show a more interactive and detailed display
  return (
    <div 
      onClick={handleRefresh}
      className={`bg-transparent border border-white/20 hover:border-white/40 rounded-lg 
      overflow-hidden cursor-pointer transition-all duration-300 shadow-lg backdrop-blur-0
      hover:shadow-xl transform hover:scale-[1.02] ${className}`}
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
});

WeatherDisplay.displayName = 'WeatherDisplay';
export default WeatherDisplay;
