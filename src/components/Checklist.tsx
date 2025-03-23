import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Define the checklist item type
interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'documents' | 'clothing' | 'personal' | 'other';
}

// Predefined essential items
const essentialItems: ChecklistItem[] = [
  // Documents
  { id: 'passport', text: 'Valid Passport (at least 6 months validity)', completed: false, category: 'documents' },
  { id: 'visa', text: 'Umrah Visa', completed: false, category: 'documents' },
  { id: 'tickets', text: 'Flight Tickets', completed: false, category: 'documents' },
  { id: 'insurance', text: 'Travel Insurance', completed: false, category: 'documents' },
  { id: 'id-card', text: 'ID Card / Driving License', completed: false, category: 'documents' },
  { id: 'photos', text: 'Passport-sized Photos', completed: false, category: 'documents' },
  { id: 'contact-info', text: 'Emergency Contact Information', completed: false, category: 'documents' },
  
  // Clothing
  { id: 'ihram', text: 'Ihram Garments (for men)', completed: false, category: 'clothing' },
  { id: 'modest-clothing', text: 'Modest Clothing (for women)', completed: false, category: 'clothing' },
  { id: 'prayer-clothes', text: 'Prayer Clothes', completed: false, category: 'clothing' },
  { id: 'comfortable-shoes', text: 'Comfortable Walking Shoes', completed: false, category: 'clothing' },
  { id: 'socks', text: 'Socks (for hot marble floors)', completed: false, category: 'clothing' },
  { id: 'sandals', text: 'Sandals/Flip Flops', completed: false, category: 'clothing' },
  { id: 'belt-bag', text: 'Money Belt / Secure Waist Bag', completed: false, category: 'clothing' },
  
  // Personal Items
  { id: 'medications', text: 'Personal Medications', completed: false, category: 'personal' },
  { id: 'toiletries', text: 'Toiletries (unscented during Ihram)', completed: false, category: 'personal' },
  { id: 'prayer-mat', text: 'Travel Prayer Mat', completed: false, category: 'personal' },
  { id: 'quran', text: 'Pocket Quran or Quran App', completed: false, category: 'personal' },
  { id: 'dua-book', text: 'Dua Book or App', completed: false, category: 'personal' },
  { id: 'water-bottle', text: 'Reusable Water Bottle', completed: false, category: 'personal' },
  { id: 'snacks', text: 'Light Snacks', completed: false, category: 'personal' },
  
  // Other
  { id: 'power-adapter', text: 'Power Adapter/Converter', completed: false, category: 'other' },
  { id: 'phone-charger', text: 'Phone Charger/Power Bank', completed: false, category: 'other' },
  { id: 'umbrella', text: 'Umbrella/Sun Protection', completed: false, category: 'other' },
  { id: 'travel-locks', text: 'Travel Locks', completed: false, category: 'other' },
  { id: 'small-backpack', text: 'Small Backpack', completed: false, category: 'other' },
];

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('other');
  const [activeCategory, setActiveCategory] = useState<ChecklistItem['category'] | 'all'>('all');
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Load saved items from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('umrahChecklist');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Use essential items if no saved items exist
      setItems(essentialItems);
    }
  }, []);

  // Update counts and save to localStorage when items change
  useEffect(() => {
    const completed = items.filter(item => item.completed).length;
    setCompletedCount(completed);
    setTotalCount(items.length);
    
    // Save to localStorage
    localStorage.setItem('umrahChecklist', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItemText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item description",
        variant: "destructive",
      });
      return;
    }
    
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      completed: false,
      category: newItemCategory,
    };
    
    setItems([...items, newItem]);
    setNewItemText('');
    
    toast({
      title: "Item Added",
      description: "New checklist item has been added",
    });
  };

  const toggleItemCompletion = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "Checklist item has been removed",
    });
  };

  const resetChecklist = () => {
    setItems(essentialItems);
    
    toast({
      title: "Checklist Reset",
      description: "All items have been reset to default",
    });
  };

  const saveChecklist = () => {
    localStorage.setItem('umrahChecklist', JSON.stringify(items));
    
    toast({
      title: "Checklist Saved",
      description: "Your checklist has been saved successfully",
    });
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const categoryLabels = {
    documents: 'Documents',
    clothing: 'Clothing & Accessories',
    personal: 'Personal Items',
    other: 'Other Essentials',
    all: 'All Items',
  };

  const categoryColors = {
    documents: 'bg-blue-100 text-blue-800',
    clothing: 'bg-purple-100 text-purple-800',
    personal: 'bg-green-100 text-green-800',
    other: 'bg-orange-100 text-orange-800',
  };

  return (
    <Card className="floating-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-primary" />
              Travel Checklist
            </CardTitle>
            <CardDescription>
              Keep track of essential items for your Umrah journey
            </CardDescription>
          </div>
          <div className="text-center text-sm">
            <div className="text-lg font-semibold">{completedCount}/{totalCount}</div>
            <div className="text-xs text-muted-foreground">items packed</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Category filter buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(categoryLabels).map(([category, label]) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={cn(
                "text-xs",
                activeCategory === category && "bg-primary text-primary-foreground"
              )}
              onClick={() => setActiveCategory(category as any)}
            >
              {label}
            </Button>
          ))}
        </div>
        
        {/* Add new item */}
        {isEditing && (
          <div className="flex items-center gap-2 mb-4">
            <Input
              value={newItemText}
              onChange={e => setNewItemText(e.target.value)}
              placeholder="Add new item..."
              className="flex-1"
            />
            <select
              value={newItemCategory}
              onChange={e => setNewItemCategory(e.target.value as any)}
              className="px-2 py-2 rounded-md border text-sm"
            >
              <option value="documents">Documents</option>
              <option value="clothing">Clothing</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            <Button size="sm" onClick={addItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Checklist items */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {filteredItems.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No items in this category. Add some items to get started!
            </p>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg border transition-all duration-250",
                  item.completed ? "bg-secondary/50" : "hover:border-primary/30"
                )}
              >
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => toggleItemCompletion(item.id)}
                  className="data-[state=checked]:bg-green-600"
                />
                <label
                  htmlFor={item.id}
                  className={cn(
                    "flex-1 text-sm cursor-pointer",
                    item.completed && "line-through text-muted-foreground"
                  )}
                >
                  {item.text}
                </label>
                <Badge className={cn("text-xs", categoryColors[item.category])}>
                  {categoryLabels[item.category]}
                </Badge>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs"
        >
          {isEditing ? "Done Editing" : "Edit List"}
        </Button>
        <div className="flex gap-2">
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetChecklist}
              className="text-xs"
            >
              Reset to Default
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={saveChecklist}
            className="text-xs"
          >
            <Save className="h-3 w-3 mr-1" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Checklist;
