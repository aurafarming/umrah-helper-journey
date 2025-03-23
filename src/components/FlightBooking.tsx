
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Bookmark, Plane, ArrowRight, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockFlights, mockAirlines, mockCities } from '@/utils/mockData';

interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  logo: string;
}

interface PriceAlert {
  id: string;
  from: string;
  to: string;
  price: number;
  date: Date;
}

const FlightBooking = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [departureCity, setDepartureCity] = useState<string>('');
  const [arrivalCity, setArrivalCity] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [savedFlights, setSavedFlights] = useLocalStorage<string[]>('savedFlights', []);
  const [priceAlerts, setPriceAlerts] = useLocalStorage<PriceAlert[]>('priceAlerts', []);
  const [cities, setCities] = useState<string[]>([]);
  const [transportOptions, setTransportOptions] = useState<any[]>([]);

  useEffect(() => {
    // In a real implementation, these would be API calls
    setFlights(mockFlights);
    setFilteredFlights(mockFlights);
    setAirlines(mockAirlines);
    setCities(mockCities);
    
    // Sample transportation options between holy cities
    setTransportOptions([
      { id: 1, type: 'Bus', from: 'Jeddah', to: 'Makkah', duration: '1h 30m', price: 10, frequency: 'Every 30 minutes' },
      { id: 2, type: 'Taxi', from: 'Jeddah', to: 'Makkah', duration: '1h', price: 50, frequency: 'On demand' },
      { id: 3, type: 'Train', from: 'Jeddah', to: 'Makkah', duration: '45m', price: 15, frequency: 'Every 1 hour' },
      { id: 4, type: 'Bus', from: 'Makkah', to: 'Madinah', duration: '5h', price: 25, frequency: 'Every 2 hours' },
      { id: 5, type: 'Taxi', from: 'Makkah', to: 'Madinah', duration: '4h', price: 120, frequency: 'On demand' },
    ]);
  }, []);

  const searchFlights = () => {
    if (!departureCity || !arrivalCity || !departureDate) {
      // Could show a toast notification here
      console.log("Please fill in all required fields");
      return;
    }
    
    let result = flights.filter(flight => 
      flight.departureCity === departureCity && 
      flight.arrivalCity === arrivalCity
    );
    
    if (selectedAirlines.length > 0) {
      result = result.filter(flight => selectedAirlines.includes(flight.airline));
    }
    
    result = result.filter(flight => flight.price <= maxPrice);
    
    setFilteredFlights(result);
  };

  const toggleSaveFlight = (flightId: string) => {
    if (savedFlights.includes(flightId)) {
      setSavedFlights(savedFlights.filter(id => id !== flightId));
    } else {
      setSavedFlights([...savedFlights, flightId]);
    }
  };

  const createPriceAlert = (flight: Flight) => {
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      from: flight.departureCity,
      to: flight.arrivalCity,
      price: flight.price * 0.9, // Alert when price is 10% lower
      date: departureDate || new Date(),
    };
    
    setPriceAlerts([...priceAlerts, newAlert]);
    // Could show a toast notification here
    console.log(`Price alert created: ${flight.departureCity} to ${flight.arrivalCity}`);
  };

  const toggleAirlineFilter = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full">
          <TabsTrigger value="flights">Flight Search</TabsTrigger>
          <TabsTrigger value="saved">Saved Flights</TabsTrigger>
          <TabsTrigger value="transport">Local Transport</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="round-trip"
                    checked={isRoundTrip}
                    onCheckedChange={setIsRoundTrip}
                  />
                  <Label htmlFor="round-trip">Round Trip</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure">From</Label>
                  <Select value={departureCity} onValueChange={setDepartureCity}>
                    <SelectTrigger id="departure">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="arrival">To</Label>
                  <Select value={arrivalCity} onValueChange={setArrivalCity}>
                    <SelectTrigger id="arrival">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="departure-date">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="departure-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {departureDate ? (
                          format(departureDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {isRoundTrip && (
                  <div className="space-y-2">
                    <Label htmlFor="return-date">Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="return-date"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {returnDate ? (
                            format(returnDate, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          disabled={(date) => 
                            date < new Date() || 
                            (departureDate ? date < departureDate : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
              
              <Button onClick={searchFlights} className="mt-6 w-full">
                Search Flights
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Panel */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Price Range (USD)</h4>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                  </div>
                  <Slider
                    value={[maxPrice]}
                    min={0}
                    max={2000}
                    step={10}
                    onValueChange={(value) => setMaxPrice(value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Airlines</h4>
                  <div className="space-y-2">
                    {airlines.map(airline => (
                      <div key={airline} className="flex items-center">
                        <Switch
                          id={`airline-${airline}`}
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={() => toggleAirlineFilter(airline)}
                          className="mr-2"
                        />
                        <Label htmlFor={`airline-${airline}`}>{airline}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Flight Listings */}
            <div className="md:col-span-3 space-y-4">
              {filteredFlights.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No flights found</h3>
                  <p className="text-muted-foreground text-center">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              ) : (
                filteredFlights.map(flight => (
                  <Card key={flight.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            <img 
                              src={flight.logo || "/placeholder.svg"} 
                              alt={flight.airline}
                              className="h-6 w-6 object-contain" 
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{flight.airline}</div>
                            <div className="text-xs text-muted-foreground">{flight.airlineCode}</div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveFlight(flight.id)}
                          className={cn(
                            savedFlights.includes(flight.id) 
                              ? "text-primary" 
                              : "text-muted-foreground"
                          )}
                        >
                          <Bookmark className={cn(
                            "h-5 w-5",
                            savedFlights.includes(flight.id) ? "fill-primary" : ""
                          )} />
                        </Button>
                      </div>
                      
                      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="text-center md:text-left">
                            <div className="text-2xl font-bold">{flight.departureTime}</div>
                            <div className="text-sm text-muted-foreground">{flight.departureCity}</div>
                          </div>
                          
                          <div className="flex flex-col items-center mx-4 my-2 md:my-0">
                            <div className="text-xs text-muted-foreground">{flight.duration}</div>
                            <div className="relative w-20 md:w-32 h-px bg-gray-300 my-2">
                              <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400" />
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                            </div>
                          </div>
                          
                          <div className="text-center md:text-left">
                            <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                            <div className="text-sm text-muted-foreground">{flight.arrivalCity}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <div className="text-2xl font-bold">${flight.price}</div>
                          <div className="text-sm text-muted-foreground">per person</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col md:flex-row gap-2 justify-end">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => createPriceAlert(flight)}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Set Price Alert
                        </Button>
                        <Button>
                          <Plane className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          {savedFlights.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bookmark className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No saved flights</h3>
                <p className="text-muted-foreground text-center mt-2">
                  Bookmark flights to save them for later
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Saved Flights</h2>
              {flights.filter(flight => savedFlights.includes(flight.id)).map(flight => (
                <Card key={flight.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                          <img 
                            src={flight.logo || "/placeholder.svg"} 
                            alt={flight.airline}
                            className="h-6 w-6 object-contain" 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{flight.airline}</div>
                          <div className="text-xs text-muted-foreground">{flight.airlineCode}</div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleSaveFlight(flight.id)}
                      >
                        <Bookmark className="h-5 w-5 fill-primary text-primary" />
                      </Button>
                    </div>
                    
                    <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold">{flight.departureTime}</div>
                          <div className="text-sm text-muted-foreground">{flight.departureCity}</div>
                        </div>
                        
                        <div className="flex flex-col items-center mx-4 my-2 md:my-0">
                          <div className="text-xs text-muted-foreground">{flight.duration}</div>
                          <div className="relative w-20 md:w-32 h-px bg-gray-300 my-2">
                            <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400" />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                          </div>
                        </div>
                        
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                          <div className="text-sm text-muted-foreground">{flight.arrivalCity}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="text-2xl font-bold">${flight.price}</div>
                        <div className="text-sm text-muted-foreground">per person</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>
                        <Plane className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Price Alerts</h3>
                {priceAlerts.length === 0 ? (
                  <Card>
                    <CardContent className="py-6">
                      <p className="text-center text-muted-foreground">No price alerts set</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {priceAlerts.map(alert => (
                      <Card key={alert.id} className="bg-primary/5 border-primary/20">
                        <CardContent className="py-4 px-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">
                                {alert.from} to {alert.to}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Alert when price drops below ${alert.price}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                For {format(new Date(alert.date), "PPP")}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setPriceAlerts(priceAlerts.filter(a => a.id !== alert.id))}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="transport" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Local Transportation Between Holy Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Route</th>
                      <th className="text-left py-3 px-4">Duration</th>
                      <th className="text-left py-3 px-4">Price (USD)</th>
                      <th className="text-left py-3 px-4">Frequency</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transportOptions.map(option => (
                      <tr key={option.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{option.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span>{option.from}</span>
                            <ArrowRight className="h-3 w-3 mx-1" />
                            <span>{option.to}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{option.duration}</td>
                        <td className="py-3 px-4">${option.price}</td>
                        <td className="py-3 px-4">{option.frequency}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Book</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Transportation Tips</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">1</span>
                    </div>
                    <p className="text-sm">The Haramain High Speed Railway connects Makkah, Madinah and Jeddah with regular service.</p>
                  </div>
                  <div className="flex">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">2</span>
                    </div>
                    <p className="text-sm">SAPTCO buses are the most economical option for intercity travel.</p>
                  </div>
                  <div className="flex">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">3</span>
                    </div>
                    <p className="text-sm">Taxis and rideshare services (Uber, Careem) are widely available but more expensive.</p>
                  </div>
                  <div className="flex">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">4</span>
                    </div>
                    <p className="text-sm">Book transportation in advance during peak Umrah seasons.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightBooking;
