
import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Clock, User, Book, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#', icon: Home },
  { name: 'Prayer Times', href: '#prayer-times', icon: Clock },
  { name: 'Umrah Guide', href: '#umrah-guide', icon: Book },
  { name: 'Travel Planning', href: '#travel-planning', icon: MapPin },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.getBoundingClientRect().height;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling when clicking navigation items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
        
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-350",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex-center">
            <span className="text-white font-medium">U</span>
          </div>
          <span className="font-display font-medium text-lg">UmrahAssist</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "nav-link",
                activeSection === item.href.substring(1) ? "active" : ""
              )}
            >
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        
        {/* Search Bar - Desktop Only */}
        <div className="hidden md:block">
          <SearchBar 
            placeholder="Search features, guides..." 
            className="w-64"
            onSearch={(term) => console.log('Search term:', term)}
          />
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md px-4 py-4 shadow-subtle",
          "transition-all duration-350 overflow-hidden md:hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4">
          {/* Mobile Search */}
          <SearchBar 
            placeholder="Search features, guides..." 
            className="w-full"
            onSearch={(term) => console.log('Search term:', term)}
          />
          
          {/* Mobile Nav Items */}
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
