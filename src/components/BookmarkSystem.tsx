
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bookmark, Hotel, Plane, Package, X, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockHotels, mockFlights, mockPackages } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const BookmarkSystem = () => {
  const [savedHotels] = useLocalStorage<string[]>('savedHotels', []);
  const [savedFlights] = useLocalStorage<string[]>('savedFlights', []);
  const [savedPackages] = useLocalStorage<string[]>('savedPackages', []);
  const [upcomingTrip, setUpcomingTrip] = useLocalStorage<any | null>('upcomingTrip', null);

  const totalSaved = savedHotels.length + savedFlights.length + savedPackages.length;
  
  // Get the actual data from mock data
  const hotels = mockHotels.filter(hotel => savedHotels.includes(hotel.id));
  const flights = mockFlights.filter(flight => savedFlights.includes(flight.id));
  const packages = mockPackages.filter(pkg => savedPackages.includes(pkg.id));

  const scheduleTrip = (type: string, id: string) => {
    let item = null;
    
    if (type === 'hotel') {
      item = mockHotels.find(hotel => hotel.id === id);
    } else if (type === 'flight') {
      item = mockFlights.find(flight => flight.id === id);
    } else if (type === 'package') {
      item = mockPackages.find(pkg => pkg.id === id);
    }
    
    if (item) {
      setUpcomingTrip({
        type,
        item,
        dateAdded: new Date().toISOString(),
      });
      
      // Could show toast notification here
      console.log(`Added ${type} to your upcoming trip`);
    }
  };

  const clearUpcomingTrip = () => {
    setUpcomingTrip(null);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All ({totalSaved})</TabsTrigger>
          <TabsTrigger value="hotels">Hotels ({savedHotels.length})</TabsTrigger>
          <TabsTrigger value="flights">Flights ({savedFlights.length})</TabsTrigger>
          <TabsTrigger value="packages">Packages ({savedPackages.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {upcomingTrip && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Your Upcoming Trip</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={clearUpcomingTrip}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Added on {new Date(upcomingTrip.dateAdded).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  {upcomingTrip.type === 'hotel' && <Hotel className="h-5 w-5 mr-2 text-primary" />}
                  {upcomingTrip.type === 'flight' && <Plane className="h-5 w-5 mr-2 text-primary" />}
                  {upcomingTrip.type === 'package' && <Package className="h-5 w-5 mr-2 text-primary" />}
                  <span className="font-medium capitalize">{upcomingTrip.type} Booking</span>
                </div>
                
                {upcomingTrip.type === 'hotel' && (
                  <div className="space-y-2">
                    <div className="font-medium">{upcomingTrip.item.name}</div>
                    <div className="text-sm text-muted-foreground">{upcomingTrip.item.location}</div>
                    <div className="text-sm">${upcomingTrip.item.price} per night</div>
                  </div>
                )}
                
                {upcomingTrip.type === 'flight' && (
                  <div className="space-y-2">
                    <div className="font-medium">{upcomingTrip.item.airline}</div>
                    <div className="flex items-center text-sm">
                      <span>{upcomingTrip.item.departureCity}</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>{upcomingTrip.item.arrivalCity}</span>
                    </div>
                    <div className="text-sm">${upcomingTrip.item.price}</div>
                  </div>
                )}
                
                {upcomingTrip.type === 'package' && (
                  <div className="space-y-2">
                    <div className="font-medium">{upcomingTrip.item.title}</div>
                    <div className="text-sm text-muted-foreground">by {upcomingTrip.item.provider}</div>
                    <div className="text-sm">${upcomingTrip.item.price} per person</div>
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Modify</Button>
                  <Button size="sm" className="flex-1">Confirm</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {totalSaved === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No saved items</h3>
                <p className="text-muted-foreground text-center mt-2 max-w-sm">
                  Start by saving hotels, flights, or packages from their respective sections
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {savedHotels.length > 0 && (
                <div>
                  <div className="flex items-center mb-4">
                    <Hotel className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Saved Hotels</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotels.map(hotel => (
                      <Card key={hotel.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <img 
                            src={hotel.image || "/placeholder.svg"} 
                            alt={hotel.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="font-medium">{hotel.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{hotel.location}</div>
                          <div className="text-sm mt-1">${hotel.price} per night</div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm"
                              onClick={() => scheduleTrip('hotel', hotel.id)}
                              disabled={upcomingTrip?.type === 'hotel' && upcomingTrip?.item.id === hotel.id}
                            >
                              {upcomingTrip?.type === 'hotel' && upcomingTrip?.item.id === hotel.id ? (
                                'Added to Trip'
                              ) : (
                                <>
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Add to Trip
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {savedFlights.length > 0 && (
                <div>
                  <div className="flex items-center mb-4">
                    <Plane className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Saved Flights</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {flights.map(flight => (
                      <Card key={flight.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{flight.airline}</div>
                              <div className="text-xs text-muted-foreground">{flight.airlineCode}</div>
                            </div>
                            <div className="text-lg font-bold">${flight.price}</div>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-center">
                              <div className="text-lg font-medium">{flight.departureTime}</div>
                              <div className="text-sm text-muted-foreground">{flight.departureCity}</div>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">{flight.duration}</div>
                              <div className="relative w-20 h-px bg-gray-300 my-2">
                                <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400" />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stops`}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-lg font-medium">{flight.arrivalTime}</div>
                              <div className="text-sm text-muted-foreground">{flight.arrivalCity}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm"
                              onClick={() => scheduleTrip('flight', flight.id)}
                              disabled={upcomingTrip?.type === 'flight' && upcomingTrip?.item.id === flight.id}
                            >
                              {upcomingTrip?.type === 'flight' && upcomingTrip?.item.id === flight.id ? (
                                'Added to Trip'
                              ) : (
                                <>
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Add to Trip
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {savedPackages.length > 0 && (
                <div>
                  <div className="flex items-center mb-4">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Saved Packages</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {packages.map(pkg => (
                      <Card key={pkg.id}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="aspect-video md:aspect-square bg-muted">
                            <img 
                              src={pkg.image || "/placeholder.svg"} 
                              alt={pkg.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          <div className="md:col-span-3 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{pkg.title}</div>
                                <div className="text-sm text-muted-foreground">by {pkg.provider}</div>
                              </div>
                              <div className="text-lg font-bold">${pkg.price}</div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              <div>
                                <div className="text-xs text-muted-foreground">Duration</div>
                                <div className="text-sm">{pkg.duration}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Accommodation</div>
                                <div className="text-sm">{pkg.accommodation.hotelName}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Meals</div>
                                <div className="text-sm">{pkg.meals}</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button 
                                size="sm"
                                onClick={() => scheduleTrip('package', pkg.id)}
                                disabled={upcomingTrip?.type === 'package' && upcomingTrip?.item.id === pkg.id}
                              >
                                {upcomingTrip?.type === 'package' && upcomingTrip?.item.id === pkg.id ? (
                                  'Added to Trip'
                                ) : (
                                  <>
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Add to Trip
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hotels">
          <div className="space-y-4 mt-4">
            {savedHotels.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Hotel className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No saved hotels</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Browse hotels and save your favorites for later
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map(hotel => (
                  <Card key={hotel.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img 
                        src={hotel.image || "/placeholder.svg"} 
                        alt={hotel.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{hotel.location}</div>
                      <div className="text-sm mt-1">${hotel.price} per night</div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          size="sm"
                          onClick={() => scheduleTrip('hotel', hotel.id)}
                          disabled={upcomingTrip?.type === 'hotel' && upcomingTrip?.item.id === hotel.id}
                        >
                          {upcomingTrip?.type === 'hotel' && upcomingTrip?.item.id === hotel.id ? (
                            'Added to Trip'
                          ) : (
                            <>
                              <Calendar className="h-4 w-4 mr-1" />
                              Add to Trip
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="flights">
          <div className="space-y-4 mt-4">
            {savedFlights.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Plane className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No saved flights</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Browse flights and save your favorites for later
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flights.map(flight => (
                  <Card key={flight.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{flight.airline}</div>
                          <div className="text-xs text-muted-foreground">{flight.airlineCode}</div>
                        </div>
                        <div className="text-lg font-bold">${flight.price}</div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-center">
                          <div className="text-lg font-medium">{flight.departureTime}</div>
                          <div className="text-sm text-muted-foreground">{flight.departureCity}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground">{flight.duration}</div>
                          <div className="relative w-20 h-px bg-gray-300 my-2">
                            <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400" />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stops`}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-medium">{flight.arrivalTime}</div>
                          <div className="text-sm text-muted-foreground">{flight.arrivalCity}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          size="sm"
                          onClick={() => scheduleTrip('flight', flight.id)}
                          disabled={upcomingTrip?.type === 'flight' && upcomingTrip?.item.id === flight.id}
                        >
                          {upcomingTrip?.type === 'flight' && upcomingTrip?.item.id === flight.id ? (
                            'Added to Trip'
                          ) : (
                            <>
                              <Calendar className="h-4 w-4 mr-1" />
                              Add to Trip
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="packages">
          <div className="space-y-4 mt-4">
            {savedPackages.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Package className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No saved packages</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Browse packages and save your favorites for later
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {packages.map(pkg => (
                  <Card key={pkg.id}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="aspect-video md:aspect-square bg-muted">
                        <img 
                          src={pkg.image || "/placeholder.svg"} 
                          alt={pkg.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="md:col-span-3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{pkg.title}</div>
                            <div className="text-sm text-muted-foreground">by {pkg.provider}</div>
                          </div>
                          <div className="text-lg font-bold">${pkg.price}</div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                            <div className="text-sm">{pkg.duration}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Accommodation</div>
                            <div className="text-sm">{pkg.accommodation.hotelName}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Meals</div>
                            <div className="text-sm">{pkg.meals}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            size="sm"
                            onClick={() => scheduleTrip('package', pkg.id)}
                            disabled={upcomingTrip?.type === 'package' && upcomingTrip?.item.id === pkg.id}
                          >
                            {upcomingTrip?.type === 'package' && upcomingTrip?.item.id === pkg.id ? (
                              'Added to Trip'
                            ) : (
                              <>
                                <Calendar className="h-4 w-4 mr-1" />
                                Add to Trip
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookmarkSystem;
