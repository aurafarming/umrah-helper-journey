
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Thermometer, Droplets, Wind, Sun, Cloud, CloudRain, CloudSnow, CloudFog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockWeatherData } from '@/utils/mockData';

interface WeatherData {
  city: string;
  country: string;
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
  forecast: {
    date: string;
    day: string;
    tempMax: number;
    tempMin: number;
    description: string;
    icon: string;
  }[];
  clothing: {
    season: string;
    recommendations: string[];
    tips: string[];
  };
}

const WeatherInfo = () => {
  const [city, setCity] = useState<string>("Makkah");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    const data = mockWeatherData.find(data => data.city === city);
    setWeatherData(data || null);
  }, [city]);

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case 'sunny':
        return <Sun className="h-10 w-10 text-yellow-400" />;
      case 'partly-cloudy':
        return <Cloud className="h-10 w-10 text-gray-400" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-10 w-10 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="h-10 w-10 text-blue-200" />;
      case 'fog':
        return <CloudFog className="h-10 w-10 text-gray-300" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-400" />;
    }
  };

  if (!weatherData) return null;

  return (
    <div className="w-full">
      <div className="mb-4">
        <Label htmlFor="city" className="mb-2 block">Select Location</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger id="city" className="w-full md:w-[180px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Makkah">Makkah</SelectItem>
            <SelectItem value="Madinah">Madinah</SelectItem>
            <SelectItem value="Jeddah">Jeddah</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="weather">Current & Forecast</TabsTrigger>
          <TabsTrigger value="clothing">Clothing Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weather">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Current Weather</CardTitle>
                <CardDescription>{weatherData.city}, {weatherData.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  {getWeatherIcon(weatherData.current.icon)}
                  <div className="mt-2 text-2xl font-bold">{weatherData.current.temp}°C</div>
                  <div className="text-muted-foreground">{weatherData.current.description}</div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-muted-foreground">
                        <Thermometer className="h-4 w-4 mr-1" />
                        <span className="text-xs">Feels Like</span>
                      </div>
                      <div className="text-sm font-medium mt-1">{weatherData.current.feelsLike}°C</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-muted-foreground">
                        <Droplets className="h-4 w-4 mr-1" />
                        <span className="text-xs">Humidity</span>
                      </div>
                      <div className="text-sm font-medium mt-1">{weatherData.current.humidity}%</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center text-muted-foreground">
                        <Wind className="h-4 w-4 mr-1" />
                        <span className="text-xs">Wind</span>
                      </div>
                      <div className="text-sm font-medium mt-1">{weatherData.current.windSpeed} km/h</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg",
                        index === 0 ? "bg-primary/10" : "hover:bg-muted/50"
                      )}
                    >
                      <div className="text-sm font-medium mb-2">{day.day}</div>
                      <div className="text-xs text-muted-foreground mb-2">{day.date}</div>
                      {getWeatherIcon(day.icon)}
                      <div className="mt-2 flex justify-between w-full">
                        <span className="text-sm">{day.tempMin}°</span>
                        <span className="text-sm font-medium">{day.tempMax}°</span>
                      </div>
                      <div className="text-xs text-center mt-1">{day.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clothing">
          <Card>
            <CardHeader>
              <CardTitle>
                Clothing Recommendations for {weatherData.city}
              </CardTitle>
              <CardDescription>
                Current season: {weatherData.clothing.season}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">What to Pack</h3>
                  <ul className="space-y-2">
                    {weatherData.clothing.recommendations.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Weather Tips</h3>
                  <ul className="space-y-2">
                    {weatherData.clothing.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center mr-2 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                        </div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  Remember that while inside the Haram area and during prayers, men should wear modest Islamic attire 
                  (white ihram for tawaf and sa'i), and women should wear loose, non-transparent clothing that covers 
                  the body except face and hands.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeatherInfo;
