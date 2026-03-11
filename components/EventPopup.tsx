import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Clock, Sparkles } from 'lucide-react';

interface EventPopupProps {
  onBook: () => void;
  onViewEvent?: () => void;
}

export const EventPopup: React.FC<EventPopupProps> = ({ onBook, onViewEvent }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Force show for testing if needed, but normally check localStorage
    const dontShowToday = localStorage.getItem('hideEventPopupUntil');
    const isHiddenForToday = dontShowToday && new Date().getTime() < parseInt(dontShowToday);

    if (!isHiddenForToday) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show popup after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleHideToday = () => {
    // Set expiry time to midnight of the next day
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    localStorage.setItem('hideEventPopupUntil', tomorrow.getTime().toString());
    handleClose();
  };

  const handleBookClick = () => {
    handleClose();
    onBook();
  };

  const handleViewEventClick = () => {
    handleClose();
    onViewEvent?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-[100] w-[340px] hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: 50, scale: 0.9, rotate: -2 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 200,
              mass: 1.2
            }}
            className="relative bg-white/[0.02] dark:bg-black/[0.05] backdrop-blur-[60px] overflow-hidden rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1),inset_0_0_0_1.5px_rgba(255,255,255,0.7)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4),inset_0_0_0_1.5px_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/10"
          >
            {/* Ultra Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/5 to-transparent pointer-events-none" />

            {/* Header Area */}
            <div className="p-8 pb-4 relative z-10">
              <div className="mb-6">
                <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#FF6100] mb-1.5 drop-shadow-sm">Special Offer</p>
                <h2 className="text-3xl font-sans font-bold text-black dark:text-white leading-none tracking-tight drop-shadow-sm">
                  March Event
                </h2>
              </div>
              
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 dark:bg-white/[0.02] rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md border border-white/60 dark:border-white/10">
                <img
                  src="/images/Event/Marchevent.png"
                  alt="Offer"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 pt-2 relative z-10">
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between py-2 border-b border-black/10 dark:border-white/10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Benefit 01</span>
                  <span className="text-xs font-bold text-black dark:text-white">10% OFF</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400">Benefit 02</span>
                  <span className="text-xs font-bold text-black dark:text-white">+10 Extra Mins</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={handleViewEventClick}
                  className="w-full bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white py-3.5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] border-2 border-zinc-900/20 dark:border-white/20 hover:bg-zinc-900/20 dark:hover:bg-white/20 transition-all active:scale-[0.98]"
                >
                  View Event
                </button>
                <button
                  onClick={handleBookClick}
                  className="w-full bg-zinc-950 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] transition-all active:scale-[0.98] shadow-xl shadow-black/20 dark:shadow-white/10"
                >
                  Claim Now
                </button>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={handleHideToday}
                  className="text-[9px] text-zinc-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  Don't show today
                </button>
                <button
                  onClick={handleClose}
                  className="text-[9px] text-zinc-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 
