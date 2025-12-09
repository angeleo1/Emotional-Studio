import React from 'react';
import Image from 'next/image';
import { Gift, Star, Mail, Check, Sparkles } from 'lucide-react';

interface EventsViewProps {
  onBook?: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onBook }) => {
  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">
      <div className="mb-12 pt-8 px-8">
        <span className="text-xs text-black dark:text-white uppercase tracking-widest font-bold bg-zinc-100 dark:bg-zinc-900 px-2 py-1">Limited Time</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-black dark:text-white mt-4 mb-6 transition-colors duration-[1000ms]">
          special events
        </h2>
        <p className="text-zinc-600 dark:text-zinc-500 font-light max-w-xl leading-relaxed">
          Exclusive seasonal offers and promotions available at emotional studios North Melbourne.
        </p>
      </div>

      <div className="space-y-16 max-w-6xl px-8 pb-20">
        
        {/* EVENT 1: CHRISTMAS SPECIAL */}
        <div className="border border-zinc-200 dark:border-none bg-white dark:bg-[#111111] overflow-hidden flex flex-col md:flex-row transition-colors duration-[1000ms]">
          
          <div className="w-full md:w-1/2 p-8 md:p-12 order-2 md:order-1 flex flex-col justify-center">
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h3 className="text-3xl font-serif italic text-black dark:text-white mb-2">Christmas Special Event</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Gift className="w-4 h-4" /> Christmas sessions are now open!
                </p>
              </div>
            </div>

            <p className="text-black dark:text-white font-medium mb-6 leading-relaxed">
              Book any session or package — Christmas theme is automatically included at no extra cost!
            </p>

            <div className="space-y-6 mb-8 bg-zinc-50 dark:bg-zinc-900/30 p-6 border border-zinc-100 dark:border-none">
               <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                 <Sparkles className="w-3 h-3" /> What you'll get
               </p>
               <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm font-light text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>Christmas-themed studio with festive props & outfits</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-light text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>Limited edition Christmas frames & cuts</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-light text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>Surprise Christmas gift box + cards</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-light text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>All standard session benefits included</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-4 py-3 self-start">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Sessions starting from only $65!</span>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
                * Limited spots available. Just show up and shoot — everything is ready for you! 🎅
              </p>
            </div>
            
            <div className="mt-8">
               <button 
                onClick={onBook}
                className="block w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Book Christmas Session
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-96 md:h-auto relative bg-zinc-100 dark:bg-zinc-900 order-1 md:order-2">
             <Image 
               src="/images/Event/Xmas Poster.png"
               alt="Christmas Event Main" 
               fill
               className="object-contain"
               priority
              />
          </div>
        </div>

        {/* EVENT 2: FREE 4-CUT PHOTO */}
        <div className="border border-zinc-200 dark:border-none bg-white dark:bg-[#111111] overflow-hidden transition-colors duration-[1000ms]">
          
          <div className="p-8 md:p-12 border-b border-zinc-100 dark:border-none text-center">
            <h3 className="text-3xl font-serif italic text-black dark:text-white mb-4">Free 4-Cut Photos</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto">
              Leave a Google review after your session and receive complimentary 4-cut photos to take home.
            </p>
          </div>

           <div className="flex flex-col md:flex-row h-auto md:h-96">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-r border-zinc-100 dark:border-none">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Star className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-1">Leave a Review</h4>
                      <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">Write a simple review on Google Maps about your experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Gift className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-1">Get Free Prints</h4>
                      <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">Receive free 4-cut photo strips immediately.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-1">Quantity</h4>
                      <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">Matches your group size (e.g. 2 people = 2 strips).</p>
                    </div>
                  </div>
                </div>
                
                <a 
                   href="https://g.page/emotionalstudios/review"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-8 flex items-center justify-center gap-2 w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-colors"
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
              <div className="w-full md:w-1/2 bg-zinc-100 dark:bg-zinc-900 relative">
                 <div className="w-full h-full flex gap-0">
                    <div className="w-1/2 h-full relative">
                       <Image src="/images/Event/4-Cut.png" alt="4-Cut Example 1" fill className="object-contain p-4" priority />
                    </div>
                    <div className="w-1/2 h-full relative">
                       <Image src="/images/Event/4-Cut White.jpg" alt="4-Cut Example 2" fill className="object-contain p-4" priority />
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

