
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  Hotel, 
  Plane, 
  Package, 
  Thermometer, 
  MessageSquare, 
  Bookmark, 
  BellRing, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              "hover:bg-primary/10 focus:outline-none focus:bg-primary/10",
              active ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )}
            onClick={onClick}
          >
            <div className="h-9 w-9 flex items-center justify-center">
              {icon}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface QuickAccessToolbarProps {
  onToolSelect: (tool: string) => void;
  activeTool: string;
}

const QuickAccessToolbar: React.FC<QuickAccessToolbarProps> = ({ 
  onToolSelect, 
  activeTool 
}) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>('toolbarCollapsed', false);
  const [pinnedTools, setPinnedTools] = useLocalStorage<string[]>('pinnedTools', [
    'prayerTimes', 'hotels', 'flights', 'packages', 'weather', 'phrases'
  ]);

  const allTools = [
    { id: 'prayerTimes', label: 'Prayer Times', icon: <Clock className="h-5 w-5" /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel className="h-5 w-5" /> },
    { id: 'flights', label: 'Flights', icon: <Plane className="h-5 w-5" /> },
    { id: 'packages', label: 'Packages', icon: <Package className="h-5 w-5" /> },
    { id: 'weather', label: 'Weather', icon: <Thermometer className="h-5 w-5" /> },
    { id: 'phrases', label: 'Arabic Phrases', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn(
      "fixed left-0 top-1/3 transform -translate-y-1/3 z-50 transition-all duration-300",
      isCollapsed ? "translate-x-[-90%]" : "translate-x-0"
    )}>
      <div className="relative flex">
        <div className={cn(
          "bg-background border-r border-y rounded-r-lg shadow-md py-4",
          isCollapsed ? "pl-2 pr-10" : "px-2"
        )}>
          <div className="flex flex-col space-y-1">
            {allTools
              .filter(tool => pinnedTools.includes(tool.id))
              .map(tool => (
                <ToolbarButton
                  key={tool.id}
                  icon={tool.icon}
                  label={isCollapsed ? '' : tool.label}
                  active={activeTool === tool.id}
                  onClick={() => onToolSelect(tool.id)}
                />
              ))}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-22px] top-1/2 transform -translate-y-1/2 h-10 w-5 bg-background border border-l-0 rounded-l-none rounded-r-md"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessToolbar;
