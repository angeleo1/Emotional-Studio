import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardView } from '../components/DashboardView'; 
import { PortfolioView } from '../components/PortfolioView'; 
import { ChatView } from '../components/ChatView';
import { PackagesView } from '../components/ImageView'; 
import { PriceView } from '../components/PriceView';
import { EventsView } from '../components/EventsView';
import { FAQView } from '../components/FAQView';
import { View } from '../types';
import { Moon, Sun } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';
import Head from 'next/head';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  // Apply dark mode to html and body elements
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      html.style.backgroundColor = '#050505';
      html.style.colorScheme = 'dark';
      body.style.backgroundColor = '#050505';
      body.style.color = '#ffffff';
    } else {
      html.classList.remove('dark');
      html.style.backgroundColor = '#ffffff';
      html.style.colorScheme = 'light';
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#18181b';
    }
  }, [isDarkMode]);

  // Scroll to top whenever view changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <DashboardView onNavigate={setCurrentView} onBook={openBooking} />;
      case View.EVENT:
        return <EventsView onBook={openBooking} />;
      case View.PORTFOLIO:
        return <PortfolioView />;
      case View.PRICE:
        return <PriceView />;
      case View.PACKAGES:
        return <PackagesView onBook={openBooking} />;
      case View.FAQ:
        return <FAQView />;
      case View.CONCIERGE:
        return <ChatView />;
      default:
        return <DashboardView onNavigate={setCurrentView} onBook={openBooking} />;
    }
  };

  return (
    <>
      <Head>
        <title>emotional studios | Self Photo Studio Melbourne</title>
        <meta name="description" content="Premium self-portrait studio in North Melbourne. Private suites, professional lighting, no photographer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen">
        <div className="flex flex-col md:flex-row h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans transition-colors duration-[1000ms] ease-in-out">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} onBook={openBooking} />
          
          <main className="flex-1 flex flex-col h-full relative overflow-hidden">
            {/* Minimal Header */}
            <header className="h-16 md:h-20 flex items-center px-4 md:px-8 justify-between shrink-0 bg-transparent z-10 border-none">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-medium transition-colors duration-[1000ms] truncate border-l border-zinc-300 dark:border-zinc-700 pl-3 ml-1">
                  {currentView === View.HOME && 'NORTH MELBOURNE • Est. 2025'}
                  {currentView === View.EVENT && 'Special Promotions'}
                  {currentView === View.PORTFOLIO && 'Selected Works'}
                  {currentView === View.PRICE && 'Standard Sessions'}
                  {currentView === View.PACKAGES && 'Special Packages'}
                  {currentView === View.FAQ && 'Common Questions'}
                  {currentView === View.CONCIERGE && 'Enquiries'}
                </span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 pl-4 shrink-0">
                 {/* Theme Toggle */}
                 <button 
                  onClick={toggleTheme}
                  className="p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-500"
                  aria-label="Toggle Dark Mode"
                 >
                   {isDarkMode ? <Sun className="w-4 h-4 animate-pulse" /> : <Moon className="w-4 h-4" />}
                 </button>

                 {/* Desktop Book Now Button */}
                 <button 
                   onClick={openBooking}
                   className="hidden md:block text-[10px] md:text-xs font-bold uppercase tracking-widest border border-zinc-200 dark:border-white/20 px-3 py-2 md:px-6 md:py-3 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 whitespace-nowrap"
                 >
                   Book Now
                 </button>
              </div>
            </header>

            {/* Content Area */}
            <div id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-24 md:pb-0 relative transition-colors duration-[1000ms] no-scrollbar">
              <div key={currentView} className="h-full w-full">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
        
        {/* MOBILE STICKY BOOKING BAR */}
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-[#050505] dark:via-[#050505] pb-6">
          <button 
            onClick={openBooking}
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-opacity"
          >
            Book Session
          </button>
        </div>

        {/* Booking Widget Overlay */}
        <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      </div>
    </>
  );
}
