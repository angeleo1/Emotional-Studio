import React from 'react';
import { Gift, Star, Check, Heart, Calendar, Clock, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';

const GITHUB_BASE = "https://raw.githubusercontent.com/angeleo1/google-images/main/";

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

      <div className="space-y-16 max-w-6xl px-8 pb-20">
        {/* EVENT: FREE 4-CUT */}
        <div className={`border overflow-hidden transition-all duration-1000 ${isDark ? 'border-zinc-800 bg-[#0a0a0a]' : 'border-zinc-200 bg-white'}`}>
          <div className={`p-8 md:p-12 border-b text-center ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
            <h3 className={`text-3xl font-serif italic mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Free 4-Cut Event</h3>
            <p className={`font-light max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Leave a Google review after your session and receive complimentary 4-cut photos. Quantity matches your group size (for reviewers only).
            </p>
          </div>
          <div className="flex flex-col md:flex-row h-auto md:h-96">
            <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-r ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
              <div className="space-y-4">
                {[
                  { icon: Star, title: "Leave a Review", desc: "Write a simple review on Google Maps about your experience." },
                  { icon: Gift, title: "Get Free Prints", desc: "Receive free 4-cut photo strips immediately." },
                  { icon: Check, title: "Quantity", desc: "For reviewers only: matches your group size (e.g. 2 people = 2 strips)." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <item.icon className={`w-5 h-5 mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <div>
                      <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</h4>
                      <p className={`text-sm font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a 
                href="https://g.page/emotionalstudios/review" target="_blank" rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-colors ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Write a Review
              </a>
            </div>
            <div className={`w-full md:w-1/2 relative flex items-center justify-center ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
              <img 
                src="/images/Event/3-Cut Photo strip.png" 
                alt="Free 3-Cut Event" 
                className="w-full h-full object-contain p-4" 
                loading="eager" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
