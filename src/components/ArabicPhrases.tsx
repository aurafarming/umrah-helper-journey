import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Volume2, 
  Star, 
  Bookmark, 
  Clock, 
  MessageSquare, 
  ShoppingBag, 
  MapPin, 
  Hotel,
  Users,
  Utensils,
  HelpCircle,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockPhrases } from '@/utils/mockData';

interface ArabicPhrase {
  id: string;
  category: string;
  english: string;
  arabic: string;
  transliteration: string;
  useful: boolean;
}

const categories = [
  { id: 'greetings', name: 'Greetings', icon: <Users className="h-4 w-4" /> },
  { id: 'religious', name: 'Religious', icon: <Heart className="h-4 w-4" /> },
  { id: 'transportation', name: 'Transportation', icon: <MapPin className="h-4 w-4" /> },
  { id: 'accommodation', name: 'Accommodation', icon: <Hotel className="h-4 w-4" /> },
  { id: 'food', name: 'Food & Dining', icon: <Utensils className="h-4 w-4" /> },
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 'conversation', name: 'Conversation', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'emergency', name: 'Emergency', icon: <HelpCircle className="h-4 w-4" /> },
];

const ArabicPhrases = () => {
  const [phrases, setPhrases] = useState<ArabicPhrase[]>(mockPhrases);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedPhrases, setSavedPhrases] = useLocalStorage<string[]>('savedPhrases', []);
  const [recentPhrases, setRecentPhrases] = useLocalStorage<string[]>('recentPhrases', []);

  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         phrase.arabic.includes(searchTerm) ||
                         phrase.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || phrase.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const savedPhrasesData = phrases.filter(phrase => savedPhrases.includes(phrase.id));
  const recentPhrasesData = phrases.filter(phrase => recentPhrases.includes(phrase.id))
    .sort((a, b) => {
      return recentPhrases.indexOf(a.id) - recentPhrases.indexOf(b.id);
    });

  const toggleSavePhrase = (phraseId: string) => {
    if (savedPhrases.includes(phraseId)) {
      setSavedPhrases(savedPhrases.filter(id => id !== phraseId));
    } else {
      setSavedPhrases([...savedPhrases, phraseId]);
    }
  };

  const markAsRecent = (phraseId: string) => {
    const newRecent = [
      phraseId, 
      ...recentPhrases.filter(id => id !== phraseId)
    ].slice(0, 10);
    
    setRecentPhrases(newRecent);
  };

  const playAudio = (text: string, language: string) => {
    console.log(`Playing audio for: ${text} in ${language}`);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'arabic' ? 'ar-SA' : 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="phrases" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="phrases">Phrases & Translation</TabsTrigger>
          <TabsTrigger value="saved">Saved Phrases</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="phrases" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for phrases in English or Arabic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={activeCategory === 'all' ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => setActiveCategory('all')}
            >
              All
            </Badge>
            
            {categories.map(category => (
              <Badge 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"} 
                className="cursor-pointer flex items-center"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="ml-1">{category.name}</span>
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredPhrases.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No phrases found</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Try searching with different keywords or browse by category
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPhrases.map(phrase => (
                <Card 
                  key={phrase.id} 
                  className={cn(
                    "hover:shadow-sm transition-shadow",
                    phrase.useful ? "border-primary/20" : ""
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          {categories.find(c => c.id === phrase.category)?.name}
                          {phrase.useful && (
                            <Badge variant="outline" className="ml-2 text-primary border-primary/30 text-[10px]">
                              Frequently Used
                            </Badge>
                          )}
                        </div>
                        <div className="font-medium">{phrase.english}</div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleSavePhrase(phrase.id)}
                        className={cn(
                          savedPhrases.includes(phrase.id) 
                            ? "text-primary" 
                            : "text-muted-foreground"
                        )}
                      >
                        <Bookmark className={cn(
                          "h-4 w-4",
                          savedPhrases.includes(phrase.id) ? "fill-primary" : ""
                        )} />
                      </Button>
                    </div>
                    
                    <div 
                      className="mt-3 p-3 bg-muted/30 rounded-md"
                      onClick={() => markAsRecent(phrase.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-arabic text-right text-lg" dir="rtl">{phrase.arabic}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(phrase.arabic, 'arabic');
                          }}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-muted-foreground text-sm mt-1 italic">
                        {phrase.transliteration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Saved Phrases</h2>
            {savedPhrasesData.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSavedPhrases([])}
              >
                Clear All
              </Button>
            )}
          </div>
          
          {savedPhrasesData.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Bookmark className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No saved phrases</h3>
                <p className="text-muted-foreground text-center mt-2">
                  Bookmark your favorite phrases for quick access
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {savedPhrasesData.map(phrase => (
                <Card key={phrase.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          {categories.find(c => c.id === phrase.category)?.name}
                        </div>
                        <div className="font-medium">{phrase.english}</div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleSavePhrase(phrase.id)}
                      >
                        <Bookmark className="h-4 w-4 fill-primary text-primary" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 p-3 bg-muted/30 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="font-arabic text-right text-lg" dir="rtl">{phrase.arabic}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => playAudio(phrase.arabic, 'arabic')}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-muted-foreground text-sm mt-1 italic">
                        {phrase.transliteration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <h2 className="text-xl font-bold">Recently Viewed</h2>
          </div>
          
          {recentPhrasesData.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No recent phrases</h3>
                <p className="text-muted-foreground text-center mt-2">
                  Phrases you view will appear here for quick access
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {recentPhrasesData.map(phrase => (
                <Card key={phrase.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          {categories.find(c => c.id === phrase.category)?.name}
                        </div>
                        <div className="font-medium">{phrase.english}</div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleSavePhrase(phrase.id)}
                        className={cn(
                          savedPhrases.includes(phrase.id) 
                            ? "text-primary" 
                            : "text-muted-foreground"
                        )}
                      >
                        <Bookmark className={cn(
                          "h-4 w-4",
                          savedPhrases.includes(phrase.id) ? "fill-primary" : ""
                        )} />
                      </Button>
                    </div>
                    
                    <div className="mt-3 p-3 bg-muted/30 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="font-arabic text-right text-lg" dir="rtl">{phrase.arabic}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => playAudio(phrase.arabic, 'arabic')}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-muted-foreground text-sm mt-1 italic">
                        {phrase.transliteration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArabicPhrases;
