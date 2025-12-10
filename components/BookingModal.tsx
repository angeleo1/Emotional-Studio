import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full h-full md:max-w-4xl md:h-[90vh] relative shadow-2xl flex flex-col rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-100 bg-white shrink-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black">Book Session</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* SimplyBook.me iframe */}
        <div className="flex-1 w-full bg-white relative overflow-hidden">
          <iframe 
            src="https://emotionalstudios.simplybook.me/v2/" 
            title="Book Session"
            className="w-full h-full border-0"
            allow="payment; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          />
        </div>
      </div>
    </div>
  );
};
