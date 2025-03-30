
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Thermometer, Wind } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  windSpeed: number;
  location?: string;
  feelsLike?: number; // Added for "feels like" temperature
}

const WeatherDisplay = ({ className = "" }: { className?: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Coordinates for central Spiti Valley
  // Note: OpenWeatherMap free API might not have precise data for remote Himalayan regions
  const lat = 32.2430;
  const lon = 78.0341;
  
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
        console.log('Weather data:', data); // Log to verify correct location
        
        setWeather({
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          // Override location name from API since it may be inaccurate
          location: 'Spiti Valley'
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
  
  if (loading) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mx-1"></div>
      </div>
    );
  }

  // For mobile, show a more compact but stylish display
  if (isMobile) {
    return (
      <div className={`flex items-center justify-center gap-1 bg-spiti-forest/30 backdrop-blur-sm px-2 py-1 rounded-full animate-fade-in-up ${className}`}>
        {getWeatherIcon()}
        <span className="text-xs font-bold text-white">{weather?.temp}°C</span>
        <span className="text-[10px] text-white/80 hidden xs:inline">Spiti</span>
      </div>
    );
  }
  
  // For desktop, show a more detailed and visually appealing display
  return (
    <Card className={`bg-spiti-forest/40 backdrop-blur-sm border-none shadow-lg overflow-hidden animate-fade-in-up ${className}`}>
      <CardContent className="p-2 md:p-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-spiti-blue/60 to-spiti-lightblue/40 p-2 rounded-full">
            {getWeatherIcon()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-bold text-white">{weather?.temp}°C</span>
              <span className="text-xs text-white/80">Feels: {weather?.feelsLike}°C</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/70">
              <span>Spiti Valley</span>
              <span className="mx-1">•</span>
              <Wind className="w-3 h-3" />
              <span>{weather?.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
