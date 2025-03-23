
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PrayerTimes from '@/components/PrayerTimes';
import UmrahGuide from '@/components/UmrahGuide';
import Checklist from '@/components/Checklist';
import SearchBar from '@/components/SearchBar';
import { createScrollObserver } from '@/utils/animations';

const Index = () => {
  // Initialize scroll animations
  useEffect(() => {
    const observer = createScrollObserver();
    return () => {
      if (observer) {
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:pt-32 md:pb-24">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Your Complete Umrah Assistant
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Simplify your spiritual journey with prayer times, step-by-step guides, and essential planning tools.
            </p>
          </div>
          
          <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <SearchBar 
              placeholder="Search for guides, tools, or features..." 
              className="w-full max-w-xl"
              onSearch={(term) => console.log('Search term:', term)}
            />
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="floating-card h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-tr from-primary/10 to-primary/30 rounded-t-xl flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 shadow-subtle flex items-center justify-center">
                    <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 14a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path d="M12 2v2"></path>
                        <path d="M12 22v-2"></path>
                        <path d="M4.93 4.93l1.41 1.41"></path>
                        <path d="M17.66 17.66l1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M22 12h-2"></path>
                        <path d="M6.34 17.66l-1.41 1.41"></path>
                        <path d="M19.07 4.93l-1.41 1.41"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">Prayer Times</h3>
                  <p className="text-muted-foreground text-sm">
                    Get accurate prayer times based on your location in Saudi Arabia with multiple calculation methods.
                  </p>
                </div>
                <div className="p-4 border-t">
                  <a href="#prayer-times" className="text-primary text-sm font-medium hover:underline">
                    View Prayer Times →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="floating-card h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-tr from-accent/10 to-accent/30 rounded-t-xl flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 shadow-subtle flex items-center justify-center">
                    <div className="bg-accent/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">Umrah Guide</h3>
                  <p className="text-muted-foreground text-sm">
                    Step-by-step instructions for all Umrah rituals with tips and common mistakes to avoid.
                  </p>
                </div>
                <div className="p-4 border-t">
                  <a href="#umrah-guide" className="text-primary text-sm font-medium hover:underline">
                    View Umrah Guide →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="floating-card h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-tr from-purple-100 to-purple-300 rounded-t-xl flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 shadow-subtle flex items-center justify-center">
                    <div className="bg-purple-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">Travel Checklist</h3>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive checklist for documents, clothing, and personal items needed for your Umrah journey.
                  </p>
                </div>
                <div className="p-4 border-t">
                  <a href="#travel-planning" className="text-primary text-sm font-medium hover:underline">
                    View Checklist →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prayer Times Section */}
      <section id="prayer-times" className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Prayer Times
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Never Miss a Prayer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Accurate prayer times based on your current location with multiple calculation methods.
            </p>
          </div>
          
          <div className="max-w-md mx-auto animate-on-scroll">
            <PrayerTimes />
          </div>
        </div>
      </section>
      
      {/* Umrah Guide Section */}
      <section id="umrah-guide" className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-3">
              Rituals Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Step-by-Step Umrah Guide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete instructions for performing Umrah rituals correctly according to the Sunnah.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <UmrahGuide />
          </div>
        </div>
      </section>
      
      {/* Travel Planning Section */}
      <section id="travel-planning" className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
              Travel Planning
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Prepare for Your Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential tools to help you prepare for your Umrah trip, from packing to documentation.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <Checklist />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-white flex-center">
                  <span className="text-gray-900 font-medium">U</span>
                </div>
                <span className="font-display font-medium text-lg">UmrahAssist</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Simplifying your Umrah journey with essential tools and guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#prayer-times" className="text-gray-400 hover:text-white transition-colors">Prayer Times</a></li>
                <li><a href="#umrah-guide" className="text-gray-400 hover:text-white transition-colors">Umrah Guide</a></li>
                <li><a href="#travel-planning" className="text-gray-400 hover:text-white transition-colors">Travel Planning</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contribute</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} UmrahAssist. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
