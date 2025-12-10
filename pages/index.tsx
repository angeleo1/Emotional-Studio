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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

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
        return <DashboardView onNavigate={setCurrentView} onBook={openBooking} isDark={isDark} />;
      case View.EVENT:
        return <EventsView onBook={openBooking} isDark={isDark} />;
      case View.PORTFOLIO:
        return <PortfolioView isDark={isDark} />;
      case View.PRICE:
        return <PriceView isDark={isDark} onContact={() => setCurrentView(View.CONCIERGE)} />;
      case View.PACKAGES:
        return <PackagesView onBook={openBooking} isDark={isDark} />;
      case View.FAQ:
        return <FAQView isDark={isDark} />;
      case View.CONCIERGE:
        return <ChatView isDark={isDark} />;
      default:
        return <DashboardView onNavigate={setCurrentView} onBook={openBooking} isDark={isDark} />;
    }
  };

  return (
    <>
      <Head>
        <title>emotional studios | Self Photo Studio Melbourne</title>
        <meta name="description" content="Premium self-portrait studio in North Melbourne. Private suites, professional lighting, no photographer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`min-h-screen transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className={`flex flex-col md:flex-row h-screen overflow-hidden font-sans transition-all duration-1000 ease-in-out ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-white text-zinc-900'}`}>
          <Sidebar currentView={currentView} onViewChange={setCurrentView} onBook={openBooking} isDark={isDark} />
          
          <main className="flex-1 flex flex-col h-full relative overflow-hidden">
            {/* Minimal Header */}
            <header className="h-16 md:h-20 flex items-center px-4 md:px-8 justify-between shrink-0 bg-transparent z-10 border-none">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className={`text-[10px] md:text-xs uppercase tracking-widest font-medium transition-colors duration-1000 truncate border-l pl-3 ml-1 ${isDark ? 'text-zinc-500 border-zinc-700' : 'text-zinc-500 border-zinc-300'}`}>
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
                  className={`p-2 transition-colors duration-500 ${isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-zinc-400 hover:text-black'}`}
                  aria-label="Toggle Dark Mode"
                 >
                   {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                 </button>

                 {/* Desktop Book Now Button */}
                 <button 
                   onClick={openBooking}
                   className={`hidden md:block text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-2 md:px-6 md:py-3 transition-all duration-300 whitespace-nowrap border ${isDark ? 'border-white/30 text-white hover:bg-white hover:text-black' : 'border-zinc-200 text-black hover:bg-black hover:text-white'}`}
                 >
                   Book Now
                 </button>
              </div>
            </header>

            {/* Content Area */}
            <div id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-24 md:pb-0 relative transition-colors duration-1000 no-scrollbar">
              <div key={currentView} className="h-full w-full">
                {renderContent()}
        </div>
      </div>
          </main>
        </div>
        
        {/* MOBILE STICKY BOOKING BAR */}
        <div className={`md:hidden fixed bottom-0 left-0 w-full z-50 p-4 pb-6 bg-gradient-to-t to-transparent ${isDark ? 'from-[#050505] via-[#050505]' : 'from-white via-white'}`}>
          <button 
            onClick={openBooking}
            className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-opacity ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
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
