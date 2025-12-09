import React from 'react';
import { View } from '../types';
import { Camera, CreditCard, MessageCircle, HelpCircle, Tag, Sparkles, Instagram } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onBook: () => void;
  isDark?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onBook, isDark = false }) => {
  // Navigation Order Updated: Home -> Price -> Packages -> Portfolio -> Events -> Help -> Contact
  const navItems = [
    { id: View.HOME, label: 'home', icon: null }, 
    { id: View.PRICE, label: 'price', icon: Tag },
    { id: View.PACKAGES, label: 'packages', icon: CreditCard },
    { id: View.PORTFOLIO, label: 'portfolio', icon: Camera },
    { id: View.EVENT, label: 'events', icon: Sparkles },
    { id: View.FAQ, label: 'help', icon: HelpCircle },
    { id: View.CONCIERGE, label: 'contact', icon: MessageCircle },
  ];

  return (
    // DARK MODE: border-r-0 to prevent white line artifact
    <div className={`w-full md:w-64 border-r flex flex-col h-auto md:h-full sticky top-0 z-50 transition-colors duration-[1000ms] ${isDark ? 'bg-[#050505] border-r-0' : 'bg-zinc-50 border-zinc-200'}`}>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 pt-8 space-y-1 overflow-x-auto md:overflow-x-visible flex md:flex-col gap-0 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-4 px-4 py-4 transition-all duration-[1000ms] w-full whitespace-nowrap md:whitespace-normal group relative
                ${isActive 
                  ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                  : (isDark ? 'text-zinc-500 hover:text-white hover:bg-zinc-900' : 'text-zinc-500 hover:text-black hover:bg-zinc-200')}
              `}
            >
              {item.id === View.HOME ? (
                <img 
                  src="https://raw.githubusercontent.com/angeleo1/google-images/main/%EB%B0%95%EC%A7%84%EC%98%81%EB%8B%98%EB%A1%9C%EA%B3%A0.png" 
                  alt="Home" 
                  className={`w-5 h-5 object-contain transition-all duration-[1000ms] ${isDark ? 'invert' : ''} ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                />
              ) : (
                Icon && <Icon className={`w-4 h-4 transition-colors duration-[1000ms] ${isActive ? (isDark ? 'text-black' : 'text-white') : 'text-zinc-400 group-hover:text-zinc-600'}`} />
              )}
              
              <span className={`text-xs uppercase tracking-[0.15em] font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer CTA & Socials */}
      <div className="hidden md:block p-4 space-y-4">
        <button 
          onClick={onBook}
          className={`flex items-center justify-center gap-2 w-full px-4 py-4 transition-all duration-[1000ms] text-[10px] uppercase tracking-[0.2em] font-bold ${isDark ? 'border-none bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800' : 'border border-zinc-200 text-zinc-500 hover:border-black hover:text-black hover:bg-white'}`}
        >
          Book Now
        </button>
        
        <div className="flex justify-center gap-4 items-center">
          <a 
            href="https://www.instagram.com/emotional_studios" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-black'}`}
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1?xsec_token=ABty5-U0GFkHoXWTNHOnT_50Oaik1J4-CIMOOYUL6Bqtg=&xsec_source=pc_search" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`opacity-60 hover:opacity-100 transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-black'}`}
            title="Xiaohongshu"
          >
            <img 
              src="https://raw.githubusercontent.com/angeleo1/google-images/main/xiaohongshu.png?v=1" 
              alt="Xiaohongshu" 
              className={`w-5 h-5 object-contain transition-all ${isDark ? 'invert' : ''}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span style="font-size:10px; font-weight:bold;">RED</span>';
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

