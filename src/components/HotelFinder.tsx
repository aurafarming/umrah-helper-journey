
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Star, Bookmark, MapPin, Shield, Wifi, Coffee } from 'lucide-react';
import SearchBar from './SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { mockHotels } from '@/utils/mockData';

interface Hotel {
  id: string;
  name: string;
  location: string;
  distanceToHaram: number;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

const HotelFinder = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [distance, setDistance] = useState<number>(5);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [savedHotels, setSavedHotels] = useLocalStorage<string[]>('savedHotels', []);
  const [compareList, setCompareList] = useLocalStorage<string[]>('compareHotels', []);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // Using mock data for demonstration
    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
  }, []);

  useEffect(() => {
    let result = hotels.filter(hotel => 
      hotel.price >= priceRange[0] && 
      hotel.price <= priceRange[1] &&
      hotel.distanceToHaram <= distance
    );

    if (selectedAmenities.length > 0) {
      result = result.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Sort hotels
    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      result.sort((a, b) => a.distanceToHaram - b.distanceToHaram);
    }

    setFilteredHotels(result);
  }, [hotels, priceRange, distance, selectedAmenities, sortBy]);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredHotels(hotels);
      return;
    }
    
    const searchResults = hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(term.toLowerCase()) || 
      hotel.location.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredHotels(searchResults);
  };

  const toggleSaveHotel = (hotelId: string) => {
    if (savedHotels.includes(hotelId)) {
      setSavedHotels(savedHotels.filter(id => id !== hotelId));
    } else {
      setSavedHotels([...savedHotels, hotelId]);
    }
  };

  const toggleCompareHotel = (hotelId: string) => {
    if (compareList.includes(hotelId)) {
      setCompareList(compareList.filter(id => id !== hotelId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, hotelId]);
      } else {
        // Could show toast notification - "Can only compare up to 3 hotels"
        console.log("Can only compare up to 3 hotels");
      }
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchBar 
          placeholder="Search hotels by name or location" 
          onSearch={handleSearch}
          className="w-full md:max-w-md"
        />
        
        <div className="flex flex-wrap gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="distance">Distance to Haram</SelectItem>
            </SelectContent>
          </Select>
          
          {compareList.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowComparison(!showComparison)}
            >
              Compare ({compareList.length})
            </Button>
          )}
        </div>
      </div>
      
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
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="mt-2"
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Distance to Haram (km)</h4>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 km</span>
                <span>{distance} km</span>
              </div>
              <Slider
                value={[distance]}
                min={0.1}
                max={10}
                step={0.1}
                onValueChange={(value) => setDistance(value[0])}
                className="mt-2"
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {['Wifi', 'Breakfast', 'Airport Shuttle', 'Prayer Room', 'Restaurant'].map(amenity => (
                  <Badge 
                    key={amenity}
                    variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hotel Listings or Comparison View */}
        <div className="md:col-span-3 space-y-4">
          {showComparison ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Hotel Comparison</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)}>
                    Back to listings
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {compareList.map(hotelId => {
                    const hotel = hotels.find(h => h.id === hotelId);
                    if (!hotel) return null;
                    
                    return (
                      <Card key={hotel.id} className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="aspect-video bg-muted rounded-md overflow-hidden">
                            <img 
                              src={hotel.image || "/placeholder.svg"} 
                              alt={hotel.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Price:</span>
                              <span className="text-sm">${hotel.price}/night</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Distance:</span>
                              <span className="text-sm">{hotel.distanceToHaram} km</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Rating:</span>
                              <span className="text-sm flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "w-3 h-3", 
                                      i < Math.floor(hotel.rating) 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                ))}
                                <span className="ml-1">{hotel.rating}</span>
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Amenities:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {hotel.amenities.map(amenity => (
                                  <Badge key={amenity} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => toggleCompareHotel(hotel.id)}
                          >
                            Remove from comparison
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredHotels.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                  <p className="text-muted-foreground text-center">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              ) : (
                filteredHotels.map(hotel => (
                  <Card key={hotel.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="aspect-video md:aspect-square bg-muted overflow-hidden">
                        <img 
                          src={hotel.image || "/placeholder.svg"} 
                          alt={hotel.name}
                          className="w-full h-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{hotel.name}</h3>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleSaveHotel(hotel.id)}
                              className={cn(
                                savedHotels.includes(hotel.id) 
                                  ? "text-primary" 
                                  : "text-muted-foreground"
                              )}
                            >
                              <Bookmark className={cn(
                                "h-5 w-5",
                                savedHotels.includes(hotel.id) ? "fill-primary" : ""
                              )} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {hotel.distanceToHaram} km to Haram
                          </Badge>
                          
                          <Badge variant="secondary" className="flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {hotel.rating} ({hotel.reviews.length} reviews)
                          </Badge>
                          
                          {hotel.amenities.slice(0, 3).map(amenity => (
                            <Badge key={amenity} variant="outline">
                              {amenity === 'Wifi' && <Wifi className="h-3 w-3 mr-1" />}
                              {amenity === 'Breakfast' && <Coffee className="h-3 w-3 mr-1" />}
                              {amenity === 'Prayer Room' && <Shield className="h-3 w-3 mr-1" />}
                              {amenity}
                            </Badge>
                          ))}
                          
                          {hotel.amenities.length > 3 && (
                            <Badge variant="outline">
                              +{hotel.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-4 flex flex-col md:flex-row justify-between md:items-end">
                          <div>
                            <span className="block text-2xl font-bold">${hotel.price}</span>
                            <span className="text-sm text-muted-foreground">per night</span>
                          </div>
                          
                          <div className="flex space-x-2 mt-4 md:mt-0">
                            <Button 
                              variant="outline"
                              onClick={() => toggleCompareHotel(hotel.id)}
                              className={cn(
                                compareList.includes(hotel.id) 
                                  ? "bg-primary/10 border-primary text-primary" 
                                  : ""
                              )}
                            >
                              {compareList.includes(hotel.id) ? "Remove from compare" : "Compare"}
                            </Button>
                            <Button>View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelFinder;
