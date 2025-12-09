import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [hasOpened, setHasOpened] = useState(false);

  // Once opened, keep iframe loaded
  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    }
  }, [isOpen]);

  return (
    <>
      {/* Preload iframe in background (hidden) */}
      {hasOpened && (
        <div 
          className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div className={`bg-white dark:bg-zinc-900 w-full h-full md:max-w-4xl md:h-[90vh] relative shadow-2xl flex flex-col rounded-sm overflow-hidden transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Booking Session</span>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Iframe for SimplyBook.me - stays loaded once opened */}
            <div className="flex-1 w-full bg-white relative">
              <iframe 
                src="https://emotionalstudios.simplybook.me/v2/" 
                title="Booking Widget"
                className="w-full h-full border-0"
                allow="payment"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
