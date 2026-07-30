import React from 'react';
import { Sparkles } from 'lucide-react';

interface EventsViewProps {
  onBook?: () => void;
  isDark?: boolean;
}

export const EventsView: React.FC<EventsViewProps> = ({ onBook, isDark = false }) => {
  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="mb-12 pt-8 px-8">
        <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 ${isDark ? 'text-white bg-zinc-800' : 'text-black bg-zinc-100'}`}>Limited Time</span>
        <h2 className={`text-4xl md:text-5xl font-serif italic mt-4 mb-6 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
          special events
        </h2>
        <p className={`font-light max-w-xl leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Exclusive seasonal offers and promotions available at emotional studios North Melbourne.
        </p>
      </div>

      <div className="max-w-6xl px-8 pb-20">
        <div className={`flex flex-col items-center justify-center py-24 px-8 border rounded-2xl text-center ${isDark ? 'border-zinc-800 bg-[#0a0a0a]' : 'border-zinc-200 bg-white'}`}>
          <Sparkles className={`w-16 h-16 mb-6 ${isDark ? 'text-zinc-600' : 'text-zinc-300'}`} />
          <h3 className={`text-2xl font-serif italic mb-4 ${isDark ? 'text-white' : 'text-black'}`}>No events currently running</h3>
          <p className={`font-light max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            We're preparing something special for you! Please check back soon for our next exclusive event.
          </p>
        </div>
      </div>
    </div>
  );
};
