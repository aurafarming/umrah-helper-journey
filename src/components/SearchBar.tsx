
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className,
  onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "relative w-full max-w-md transition-all duration-250",
        isFocused ? "scale-[1.02]" : "",
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className={cn(
            "h-4 w-4 transition-colors duration-250",
            isFocused ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        
        <input
          type="search"
          className={cn(
            "block w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-muted",
            "rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "focus:outline-none transition-all duration-250 shadow-subtle",
            isFocused ? "shadow-elevation" : ""
          )}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {searchTerm && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
