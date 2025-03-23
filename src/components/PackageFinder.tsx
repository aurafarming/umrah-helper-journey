
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, Star, Clock, Bookmark, MapPin, ArrowRightLeft, Plane, Hotel, Utensils, Bus } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { mockPackages } from '@/utils/mockData';

interface UmrahPackage {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  rating: number;
  price: number;
  duration: string;
  amenities: string[];
  accommodation: {
    hotelName: string;
    location: string;
    distanceToHaram: number;
    stars: number;
  };
  meals: string;
  transport: string;
  guideLanguages: string[];
  inclusions: string[];
  exclusions: string[];
  image: string;
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

const PackageFinder = () => {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<UmrahPackage[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [duration, setDuration] = useState<string>("any");
  const [sortBy, setSortBy] = useState<string>("price");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [savedPackages, setSavedPackages] = useLocalStorage<string[]>('savedPackages', []);
  const [compareList, setCompareList] = useLocalStorage<string[]>('comparePackages', []);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would be an API call
    setPackages(mockPackages);
    setFilteredPackages(mockPackages);
  }, []);

  useEffect(() => {
    let result = packages.filter(pkg => 
      pkg.price >= priceRange[0] && 
      pkg.price <= priceRange[1]
    );
    
    if (duration !== "any") {
      result = result.filter(pkg => {
        const days = parseInt(pkg.duration.split(' ')[0]);
        if (duration === "short") return days <= 10;
        if (duration === "medium") return days > 10 && days <= 15;
        if (duration === "long") return days > 15;
        return true;
      });
    }
    
    // Sort packages
    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "duration") {
      result.sort((a, b) => {
        const daysA = parseInt(a.duration.split(' ')[0]);
        const daysB = parseInt(b.duration.split(' ')[0]);
        return daysA - daysB;
      });
    }
    
    setFilteredPackages(result);
  }, [packages, priceRange, duration, sortBy]);

  const toggleSavePackage = (packageId: string) => {
    if (savedPackages.includes(packageId)) {
      setSavedPackages(savedPackages.filter(id => id !== packageId));
    } else {
      setSavedPackages([...savedPackages, packageId]);
    }
  };

  const toggleComparePackage = (packageId: string) => {
    if (compareList.includes(packageId)) {
      setCompareList(compareList.filter(id => id !== packageId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, packageId]);
      } else {
        // Could show toast here
        console.log("Can only compare up to 3 packages at once");
      }
    }
  };

  const searchPackages = () => {
    // In a real implementation, this would make an API call with the departureDate
    // For now, we'll just filter our existing data
    console.log(`Searching for packages with departure date: ${departureDate}`);
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Umrah Packages</CardTitle>
          <CardDescription>Compare all-inclusive Umrah packages from verified providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure-date">Preferred Departure</Label>
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
                      <span className="text-muted-foreground">Select date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Any duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any duration</SelectItem>
                  <SelectItem value="short">Up to 10 days</SelectItem>
                  <SelectItem value="medium">11-15 days</SelectItem>
                  <SelectItem value="long">More than 15 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="duration">Duration: Short to Long</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={searchPackages} className="w-full">
                Search Packages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
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
                  max={5000}
                  step={100}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
          
          {compareList.length > 0 && (
            <div className="sticky top-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowComparison(!showComparison)}
              >
                Compare Packages ({compareList.length})
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-6">
          {showComparison ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Package Comparison</CardTitle>
                <Button variant="ghost" onClick={() => setShowComparison(false)}>
                  Back to Packages
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Feature</th>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <th key={pkg.id} className="text-left py-3 px-4">
                              {pkg.title}
                              <div className="text-xs text-muted-foreground font-normal mt-1">
                                by {pkg.provider}
                              </div>
                            </th>
                          ) : null;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Price</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-price`} className="py-3 px-4">
                              <span className="font-bold">${pkg.price}</span> per person
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Duration</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-duration`} className="py-3 px-4">
                              {pkg.duration}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Accommodation</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-accommodation`} className="py-3 px-4">
                              <div>{pkg.accommodation.hotelName}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {pkg.accommodation.distanceToHaram}km to Haram
                              </div>
                              <div className="flex mt-1">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "w-3 h-3", 
                                      i < pkg.accommodation.stars 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                ))}
                              </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Meals</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-meals`} className="py-3 px-4">
                              {pkg.meals}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Transport</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-transport`} className="py-3 px-4">
                              {pkg.transport}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Guide Languages</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-languages`} className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {pkg.guideLanguages.map(lang => (
                                  <Badge key={lang} variant="outline" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Rating</td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-rating`} className="py-3 px-4">
                              <div className="flex items-center">
                                <span className="font-medium mr-1">{pkg.rating.toFixed(1)}</span>
                                <div className="flex">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={cn(
                                        "w-3 h-3", 
                                        i < Math.floor(pkg.rating) 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-gray-300"
                                      )} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({pkg.reviews.length})
                                </span>
                              </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 px-4"></td>
                        {compareList.map(packageId => {
                          const pkg = packages.find(p => p.id === packageId);
                          return pkg ? (
                            <td key={`${pkg.id}-actions`} className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleComparePackage(pkg.id)}
                                >
                                  Remove
                                </Button>
                                <Button size="sm">Book Now</Button>
                              </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredPackages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No packages found</h3>
                  <p className="text-muted-foreground text-center">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              ) : (
                filteredPackages.map(pkg => (
                  <Card key={pkg.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="aspect-video md:aspect-square bg-muted overflow-hidden">
                        <img 
                          src={pkg.image || "/placeholder.svg"} 
                          alt={pkg.title}
                          className="w-full h-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{pkg.title}</h3>
                            <div className="flex items-center mt-1">
                              <div className="h-6 w-6 rounded bg-gray-100 mr-2 flex items-center justify-center">
                                <img 
                                  src={pkg.providerLogo || "/placeholder.svg"} 
                                  alt={pkg.provider}
                                  className="h-4 w-4 object-contain" 
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">{pkg.provider}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleSavePackage(pkg.id)}
                              className={cn(
                                savedPackages.includes(pkg.id) 
                                  ? "text-primary" 
                                  : "text-muted-foreground"
                              )}
                            >
                              <Bookmark className={cn(
                                "h-5 w-5",
                                savedPackages.includes(pkg.id) ? "fill-primary" : ""
                              )} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          <div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1 text-primary" />
                              <span className="font-medium">{pkg.duration}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Accommodation</div>
                            <div className="flex items-center mt-1">
                              <Hotel className="h-4 w-4 mr-1 text-primary" />
                              <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "w-3 h-3", 
                                      i < pkg.accommodation.stars 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Location</div>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1 text-primary" />
                              <span className="font-medium">{pkg.accommodation.distanceToHaram}km to Haram</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                            <div className="flex items-center mt-1">
                              <span className="font-medium mr-1">{pkg.rating.toFixed(1)}</span>
                              <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "w-3 h-3", 
                                      i < Math.floor(pkg.rating) 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm font-medium mb-1">Includes</div>
                            <div className="space-y-1">
                              {pkg.inclusions.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                  </div>
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                              {pkg.inclusions.length > 3 && (
                                <div className="text-xs text-primary">+{pkg.inclusions.length - 3} more</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="text-sm font-medium mb-1">Key Features</div>
                            <div className="flex flex-wrap gap-1">
                              {pkg.amenities.map(amenity => (
                                <Badge key={amenity} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:items-end justify-end">
                            <div className="text-3xl font-bold">${pkg.price}</div>
                            <div className="text-sm text-muted-foreground">per person</div>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button 
                                variant="outline"
                                onClick={() => toggleComparePackage(pkg.id)}
                                className={cn(
                                  compareList.includes(pkg.id) 
                                    ? "bg-primary/10 border-primary text-primary" 
                                    : ""
                                )}
                              >
                                <ArrowRightLeft className="h-4 w-4 mr-2" />
                                {compareList.includes(pkg.id) ? "Remove" : "Compare"}
                              </Button>
                              <Button>Book Now</Button>
                            </div>
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

export default PackageFinder;
