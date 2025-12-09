import React from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Hidden preloaded iframe - always loaded in background */}
      <iframe 
        src="https://emotionalstudios.simplybook.me/v2/" 
        title="Booking Preload"
        className="fixed -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        loading="eager"
        tabIndex={-1}
      />

      {/* Modal Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 transition-all duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      >
        <div 
          className={`bg-white w-full h-full md:max-w-4xl md:h-[90vh] relative shadow-2xl flex flex-col rounded-sm overflow-hidden transition-transform duration-200 ${isOpen ? 'scale-100' : 'scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-zinc-100 bg-white">
            <span className="text-xs font-bold uppercase tracking-widest text-black">Booking Session</span>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Iframe for SimplyBook.me */}
          <div className="flex-1 w-full bg-white relative">
            {isOpen && (
              <iframe 
                src="https://emotionalstudios.simplybook.me/v2/" 
                title="Booking Widget"
                className="w-full h-full border-0"
                allow="payment"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
