import React from 'react';
import { View } from '../types';
import { Star, ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HomeViewProps {
  onNavigate: (view: View) => void;
  onBook: () => void;
  isDark?: boolean;
}

export const DashboardView: React.FC<HomeViewProps> = ({ onNavigate, onBook, isDark = false }) => {
  
  const handleNav = (view: View) => {
    if (onNavigate) onNavigate(view);
  };

  const reviews = [
    {
      name: "naichamusi z",
      time: "6 weeks ago",
      initial: "N",
      color: "bg-emerald-100 text-emerald-600",
      text: "Came here with my girlfriends and I'd say I never thought it would be that fun. We had some good time together and the staff are friendly and welcoming. Only if three of us can have longer photos shooting time will be much better since it's three of us."
    },
    {
      name: "Becky Song",
      time: "6 days ago",
      initial: "B",
      color: "bg-violet-100 text-violet-600",
      text: "I had the sweetest time here! I did a Christmas-themed self shoot and the studio had the perfect little props. The set-up was super easy to use, and I loved being able to control the shots myself. One of my favourite parts was getting the prints on the spot."
    },
    {
      name: "Anzila Naznin",
      time: "1 week ago",
      initial: "A",
      color: "bg-orange-100 text-orange-600",
      text: "I had such a lovely experience here! The Christmas theme was already set up beautifully, and the best part is there were no extra costs at all you just book your normal session or package and everything is ready to go. They provide props, outfits, and all the festive details, which made the whole shoot super easy and fun. The team is so welcoming and made me feel comfortable from the moment I walked in. Highly recommend!"
    }
  ];

  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* 1. HERO SECTION */}
      <div className="min-h-screen md:h-screen flex flex-col md:flex-row">
        
        {/* Left: Text Content */}
        <div className={`w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 order-2 md:order-1 transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          <div className="max-w-xl">
            
            {/* BRAND LOGO ABOVE TAGLINE */}
            <img 
               src="https://raw.githubusercontent.com/angeleo1/google-images/main/%EB%B0%95%EC%A7%84%EC%98%81%EB%8B%98%EB%A1%9C%EA%B3%A0.png" 
               alt="Brand Logo" 
               className="h-24 w-auto object-contain mb-8 animate-fade-in transition-all duration-1000"
            />

            {/* Tagline */}
            <div className={`text-xs font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in flex items-center gap-2 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
              <span className={`w-8 h-[1px] transition-all duration-1000 ${isDark ? 'bg-white' : 'bg-black'}`}></span>
              <p>Make a Melbourne a fun place</p>
            </div>
            
            {/* Custom Font Title */}
            <h1 
              className={`text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-8 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}
              style={{ fontFamily: "'CSValcon', serif" }}
            >
              emotional<br/>studios
            </h1>
            
            {/* Description */}
            <p className={`font-light text-lg md:text-xl leading-relaxed max-w-md pl-6 border-l mb-12 transition-all duration-1000 ${isDark ? 'text-zinc-400 border-zinc-600' : 'text-zinc-600 border-black'}`}>
              Private self-portrait suites. <br/>
              <span className={`font-normal ${isDark ? 'text-white' : 'text-black'}`}>No photographer.</span> Just you.
            </p>

            <div className="flex flex-col gap-4">
               <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                   onClick={onBook}
                   className={`px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-all text-center flex items-center justify-center gap-2 group ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                 >
                   Book Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => handleNav(View.PACKAGES)}
                   className={`px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all text-center border ${isDark ? 'text-white border-zinc-600 bg-zinc-900 hover:bg-zinc-800' : 'text-black border-zinc-200 hover:border-black'}`}
                 >
                   View Rates
                 </button>
               </div>
               {/* Micro Price Tag */}
               <p className="text-xs text-zinc-500 font-medium pl-1 animate-fade-in">
                  Sessions starting from only <span className={`border-b pb-0.5 ${isDark ? 'text-white border-white/20' : 'text-black border-black/20'}`}>$65</span>
               </p>
            </div>
          </div>
        </div>

        {/* Right: Vertical Image */}
        <div className={`w-full md:w-1/2 h-[60vh] md:h-screen order-1 md:order-2 relative overflow-visible transition-all duration-1000 ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
          <div className="relative w-full h-full z-10">
             <SmartImage 
               baseName="hero" 
               alt="Studio Atmosphere" 
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
             />
          </div>
        </div>
      </div>

      {/* 2. THE CONCEPT */}
      <div className={`max-w-7xl mx-auto px-8 py-32 border-t transition-all duration-1000 ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 group">
            <span className={`text-lg font-serif italic border-b pb-2 inline-block w-full transition-all duration-1000 ${isDark ? 'text-white border-zinc-700' : 'text-black border-zinc-200'}`}>01. Private Suite</span>
            <p className={`font-light leading-relaxed transition-colors duration-500 ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-black'}`}>
              A completely private room. It's just you and the camera. No photographer watching, allowing for your most authentic self.
            </p>
          </div>
          <div className="space-y-6 group">
            <span className={`text-lg font-serif italic border-b pb-2 inline-block w-full transition-all duration-1000 ${isDark ? 'text-white border-zinc-700' : 'text-black border-zinc-200'}`}>02. Wireless Shutter</span>
            <p className={`font-light leading-relaxed transition-colors duration-500 ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-black'}`}>
              We provide professional lighting and camera setup. You hold the remote. Take as many photos as you want within your time.
            </p>
          </div>
          <div className="space-y-6 group">
            <span className={`text-lg font-serif italic border-b pb-2 inline-block w-full transition-all duration-1000 ${isDark ? 'text-white border-zinc-700' : 'text-black border-zinc-200'}`}>03. Instant Result</span>
            <p className={`font-light leading-relaxed transition-colors duration-500 ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-black'}`}>
              Select your photos immediately. We print them on the spot, and digital files are sent to your phone before you leave.
            </p>
          </div>
        </div>
      </div>

      {/* 3. GOOGLE REVIEWS SECTION */}
      <div className={`py-24 px-4 transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-zinc-50'}`}>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm p-2">
               <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
            </div>
            <div>
               <h3 className={`text-lg font-bold leading-none transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>emotional studios</h3>
               <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>5.0</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#F4B400] fill-[#F4B400]" />)}
                  </div>
                  <a href="https://g.page/emotionalstudios" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 underline ml-2">See all Google reviews</a>
               </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {reviews.map((review, i) => (
               <div key={i} className={`p-6 rounded-sm transition-all duration-500 flex flex-col ${isDark ? 'bg-[#111111] border border-zinc-800 hover:bg-zinc-900' : 'bg-white border border-zinc-200 shadow-sm hover:border-black'}`}>
                  <div className="flex items-center gap-3 mb-4">
                     <div className={`w-8 h-8 rounded-full ${review.color} flex items-center justify-center flex-shrink-0 text-xs font-bold`}>{review.initial}</div>
                     <div>
                        <p className={`text-xs font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>{review.name}</p>
                        <p className="text-xs text-zinc-400">{review.time}</p>
                     </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                     {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#F4B400] fill-[#F4B400]" />)}
                  </div>
                  <p className={`text-xs leading-relaxed font-light line-clamp-6 transition-colors duration-500 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                     "{review.text}"
                  </p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
