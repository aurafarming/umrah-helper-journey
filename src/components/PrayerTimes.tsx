import React, { useState, useEffect } from 'react';
import { MapPin, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { fetchPrayerTimes, type PrayerTime } from '@/utils/prayerTimesAPI';
import { cn } from '@/lib/utils';

const PrayerTimes: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location and fetch prayer times
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        setLoading(true);
        
        // Use browser geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Get location name using reverse geocoding
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  const city = data.address.city || data.address.town || data.address.village || 'Unknown City';
                  const country = data.address.country || 'Unknown Country';
                  
                  setLocation({
                    latitude,
                    longitude,
                    name: `${city}, ${country}`
                  });
                } else {
                  setLocation({
                    latitude,
                    longitude,
                    name: 'Current Location'
                  });
                }
              } catch (error) {
                console.error('Error fetching location name:', error);
                setLocation({
                  latitude,
                  longitude,
                  name: 'Current Location'
                });
              }
              
              // Fetch prayer times
              try {
                const times = await fetchPrayerTimes(latitude, longitude);
                setPrayerTimes(times);
                setError(null);
              } catch (error) {
                console.error('Error fetching prayer times:', error);
                setError('Failed to fetch prayer times. Please try again.');
                toast({
                  title: "Error",
                  description: "Failed to fetch prayer times. Please try again.",
                  variant: "destructive",
                });
              }
              
              setLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              setError('Location access denied. Please enable location services to get accurate prayer times.');
              setLoading(false);
              toast({
                title: "Location Error",
                description: "Please enable location services to get accurate prayer times.",
                variant: "destructive",
              });
            }
          );
        } else {
          setError('Geolocation is not supported by your browser.');
          setLoading(false);
          toast({
            title: "Browser Error",
            description: "Geolocation is not supported by your browser.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error in getUserLocation:', error);
        setError('An unexpected error occurred. Please try again.');
        setLoading(false);
      }
    };
    
    getUserLocation();
  }, []);
  
  // Update prayer times every minute to keep the "time remaining" accurate
  useEffect(() => {
    if (prayerTimes.length === 0 || !location) return;
    
    const intervalId = setInterval(async () => {
      try {
        const times = await fetchPrayerTimes(location.latitude, location.longitude);
        setPrayerTimes(times);
      } catch (error) {
        console.error('Error updating prayer times:', error);
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, [prayerTimes, location]);

  // Handle manual refresh
  const handleRefresh = async () => {
    if (!location) return;
    
    try {
      setLoading(true);
      const times = await fetchPrayerTimes(location.latitude, location.longitude);
      setPrayerTimes(times);
      setError(null);
      setLoading(false);
      toast({
        title: "Updated",
        description: "Prayer times have been updated.",
      });
    } catch (error) {
      console.error('Error refreshing prayer times:', error);
      setError('Failed to refresh prayer times. Please try again.');
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to refresh prayer times. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="floating-card animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Prayer Times
            </CardTitle>
            {location ? (
              <CardDescription className="flex items-center mt-1">
                <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                {location.name}
              </CardDescription>
            ) : (
              <CardDescription>Fetching location...</CardDescription>
            )}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={cn(
              "h-4 w-4", 
              loading ? "animate-spin text-primary" : "text-muted-foreground"
            )} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {error ? (
          <div className="text-center py-4">
            <p className="text-sm text-destructive">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={handleRefresh}
            >
              Try Again
            </Button>
          </div>
        ) : loading ? (
          // Skeleton loading state
          <div className="space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        ) : (
          // Prayer times display
          <div className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div 
                key={prayer.name} 
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg transition-all duration-250",
                  prayer.isNext ? prayer.color || "bg-primary/10" : "hover:bg-secondary"
                )}
              >
                <div className="flex items-center space-x-2">
                  <div className="font-medium">{prayer.name}</div>
                  {prayer.isNext && (
                    <Badge variant="outline" className="animate-pulse-subtle border-primary text-primary">
                      Next
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{prayer.time}</span>
                  {prayer.isNext && prayer.timeRemaining && (
                    <Badge variant="secondary" className="text-xs">
                      in {prayer.timeRemaining}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">Data from Aladhan.com</span>
        <Button variant="link" size="sm" className="text-primary text-xs p-0">
          Change Calculation Method
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrayerTimes;
