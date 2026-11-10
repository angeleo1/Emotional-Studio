import React, { useState, useEffect, useRef } from 'react';

import { View } from '../types';

import NextImage from 'next/image';
import { Star, ArrowRight, MapPin } from 'lucide-react';

import { GoogleReviews } from './GoogleReviews';



interface HomeViewProps {
  onNavigate: (view: View) => void;
  onBook: () => void;
  isDark?: boolean;
}

export const HERO_BASES = [
  'September Main (2)',
  'September Main (3)',
  'September Main (4)',
  'September Main (5)',
  'September Main (6)',
  'September Main (7)',
  'September Main (8)',
  'September Main (9)',
  'September Main',
];

// Already-optimised assets — served as-is (no second optimisation pass).
const HERO_SRCS = HERO_BASES.map(n => encodeURI(`/images/Home/${n}.webp`));

const HERO_BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

const HERO_INTERVAL_MS = 7000;
const HERO_FADE_MS = 2200;

export const DashboardView: React.FC<HomeViewProps> = ({ onNavigate, onBook, isDark = false }) => {
  const [isMounted, setIsMounted] = useState(false);
  // Cursor points at the active position inside the (append-only) sequence.
  const [cursor, setCursor] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const seqRef = useRef<number[]>([]);
  const cursorRef = useRef(0);
  const prevTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A fully random permutation of every hero index.
  const buildPermutation = (excludeFirst?: number): number[] => {
    const arr = HERO_BASES.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (excludeFirst !== undefined && arr[0] === excludeFirst && arr.length > 1) {
      const swapIdx = Math.floor(Math.random() * (arr.length - 1)) + 1;
      [arr[0], arr[swapIdx]] = [arr[swapIdx], arr[0]];
    }
    return arr;
  };

  // #1 First image: reuse the one preloaded at HTML parse time so only that
  // single file is fetched for the first paint.
  useEffect(() => {
    const w = window as any;
    const start =
      Number.isInteger(w.__heroIdx) && w.__heroIdx >= 0 && w.__heroIdx < HERO_BASES.length
        ? w.__heroIdx
        : Math.floor(Math.random() * HERO_BASES.length);

    const seed = buildPermutation();
    const pos = seed.indexOf(start);
    if (pos > 0) {
      [seed[0], seed[pos]] = [seed[pos], seed[0]];
    }

    seqRef.current = seed;
    cursorRef.current = 0;
    setCursor(0);
    setIsMounted(true);
  }, []);

  // #2 Advance every 7s. Only prev / active / next are ever mounted.
  useEffect(() => {
    if (!isMounted || seqRef.current.length < 2) return;

    const id = setInterval(() => {
      const nextCursor = cursorRef.current + 1;

      while (seqRef.current.length <= nextCursor + 1) {
        seqRef.current = seqRef.current.concat(
          buildPermutation(seqRef.current[seqRef.current.length - 1])
        );
      }

      cursorRef.current = nextCursor;
      setCursor(nextCursor);
      setShowPrev(true);

      if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
      prevTimerRef.current = setTimeout(() => setShowPrev(false), HERO_FADE_MS + 200);
    }, HERO_INTERVAL_MS);

    return () => {
      clearInterval(id);
      if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
    };
  }, [isMounted]);

  // #3 Mount the upcoming slide only after the first one has settled, so it
  // never competes with the critical first paint. It then stays mounted and
  // rolls forward, so each next slide is always already fetched.
  useEffect(() => {
    if (!isMounted) return;
    const t = setTimeout(() => setShowNext(true), 1800);
    return () => clearTimeout(t);
  }, [isMounted]);

  // Positions (not image indexes) are used as React keys: a position always
  // points at the same image, which lets the browser run a real crossfade.
  const seq = seqRef.current;
  const activeIdx: number | undefined = isMounted ? seq[cursor] : undefined;
  const prevIdx: number | undefined = isMounted && showPrev && cursor > 0 ? seq[cursor - 1] : undefined;
  const nextIdx: number | undefined = isMounted && showNext ? seq[cursor + 1] : undefined;

  const heroSlides = [
    prevIdx !== undefined ? { key: `p${cursor - 1}`, idx: prevIdx, active: false } : null,
    activeIdx !== undefined ? { key: `p${cursor}`, idx: activeIdx, active: true } : null,
    nextIdx !== undefined ? { key: `p${cursor + 1}`, idx: nextIdx, active: false } : null,
  ].filter((s): s is { key: string; idx: number; active: boolean } => s !== null);

  const handleNav = (view: View) => {

    if (onNavigate) onNavigate(view);

  };







  return (

    <div className="h-full overflow-y-auto pb-20 no-scrollbar bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">

      {/* 1. HERO SECTION */}

      <div className="min-h-screen md:h-screen flex flex-col md:flex-row">

        

        {/* Left: Text Content */}

        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 order-2 md:order-1 bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">

          <div className="max-w-xl">

            

            {/* BRAND LOGO ABOVE TAGLINE - No dark:invert to keep original color in dark mode */}

            <img 

               src="/images/brand-logo.webp" 

               alt="Brand Logo" 

               className="h-24 w-auto object-contain mb-8 animate-fade-in transition-all duration-[1000ms]"

            />



            {/* Tagline - DARK MODE LINE HIDDEN */}

            <div className="text-black dark:text-white text-xs font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in flex items-center gap-2">

              <span className="w-8 h-[1px] bg-black dark:hidden transition-all duration-[1000ms]"></span>

              <p>Make Melbourne a fun place</p>

            </div>

            

            {/* Custom Font Title */}

            <h1 className="text-6xl md:text-8xl font-valcon text-black dark:text-white leading-[0.9] tracking-tighter mb-8 transition-colors duration-[1000ms]">

              emotional<br/>studios

            </h1>

            

            {/* Description - DARK MODE LINE HIDDEN */}

            <p className="text-zinc-600 dark:text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-md pl-6 border-l border-black dark:border-0 dark:hidden dark:pl-0 mb-12 transition-all duration-[1000ms]">

              Private self-portrait suite. <br/>

              <span className="text-black dark:text-white font-normal">No photographer.</span> Just you.

            </p>

            {/* Dark mode specific text wrapper to ensure no border */}

            <p className="hidden dark:block text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-md mb-12 transition-all duration-[1000ms]">

              Private self-portrait suite. <br/>

              <span className="text-white font-normal">No photographer.</span> Just you.

            </p>



            <div className="flex flex-col gap-4">

               <div className="flex flex-col sm:flex-row gap-4">

                 <button 
                   onClick={onBook}
                   className="relative overflow-hidden px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-center flex items-center justify-center gap-2 group
                     text-black dark:text-white
                     bg-white/10 dark:bg-white/5
                     backdrop-blur-2xl
                     border border-black/10 dark:border-white/15
                     shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_32px_-8px_rgba(0,0,0,0.15)]
                     hover:bg-white/25 dark:hover:bg-white/[0.08] hover:border-black/20 dark:hover:border-white/25
                     hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_16px_48px_-12px_rgba(0,0,0,0.2)]
                     hover:scale-[1.02] active:scale-[0.98]
                     after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/40 after:via-transparent after:to-transparent after:opacity-50 dark:after:from-white/10 after:pointer-events-none"
                 >
                   Book Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>

                 <button 

                   onClick={() => handleNav(View.PACKAGES)}

                   className="relative overflow-hidden px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-center
                     text-black/80 dark:text-white/80
                     bg-white/5 dark:bg-black/20
                     backdrop-blur-xl
                     border border-black/10 dark:border-white/10
                     shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_4px_20px_-8px_rgba(0,0,0,0.08)]
                     hover:text-black dark:hover:text-white hover:bg-white/15 dark:hover:bg-black/30 hover:border-black/20 dark:hover:border-white/20
                     hover:scale-[1.02] active:scale-[0.98]
                     after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/25 after:via-transparent after:to-transparent after:opacity-50 dark:after:from-white/5 after:pointer-events-none"

                 >

                   View Rates

                 </button>

               </div>

               {/* Micro Price Tag */}
               <div className="flex flex-col gap-2 pl-1 animate-fade-in mt-8">
                  <p className="text-xs text-zinc-500 font-medium">
                    Sessions starting from only <span className="text-black dark:text-white border-b border-black/20 dark:border-white/20 pb-0.5">$65</span>
                  </p>
                  <p className="text-xs text-zinc-500 font-medium">*Booking Only</p>
               </div>

            </div>

          </div>

        </div>



        {/* Right: Vertical Slideshow — only prev / active / next are mounted */}

        <div className="w-full md:w-1/2 h-[60vh] md:h-screen order-1 md:order-2 relative bg-zinc-100 dark:bg-zinc-900 overflow-visible transition-colors duration-[1000ms]">

          <div className="relative w-full h-full transition-all duration-[1500ms] dark:shadow-[0_0_160px_-30px_rgba(255,255,255,0.22)] z-10 overflow-hidden">
            {heroSlides.map(slide => (
              <NextImage
                key={slide.key}
                src={HERO_SRCS[slide.idx]}
                alt={`Studio Atmosphere ${slide.idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
                fetchPriority={slide.active ? 'high' : 'low'}
                loading={slide.active ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                placeholder="blur"
                blurDataURL={HERO_BLUR}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  zIndex: slide.active ? 2 : 0,
                  opacity: slide.active ? 1 : 0,
                  userSelect: 'none',
                  transition: `opacity ${HERO_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  willChange: 'opacity',
                  pointerEvents: slide.active ? 'auto' : 'none',
                }}
              />
            ))}
          </div>

        </div>

      </div>



      {/* 2. THE CONCEPT */}
      <div className="max-w-7xl mx-auto px-8 py-32 border-t border-zinc-100 dark:border-none transition-colors duration-[1000ms]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 group">
            <span className="text-black dark:text-white text-lg font-serif italic border-b border-zinc-200 dark:border-none pb-2 inline-block w-full transition-colors duration-[1000ms]">01. Private Suite</span>
            <p className="text-zinc-600 dark:text-zinc-500 font-light leading-relaxed group-hover:text-black dark:group-hover:text-zinc-300 transition-colors">
              A completely private room. It's just you and the mirror. No photographer watching, allowing for your most authentic self.
            </p>
          </div>
          <div className="space-y-6 group">
            <span className="text-black dark:text-white text-lg font-serif italic border-b border-zinc-200 dark:border-none pb-2 inline-block w-full transition-colors duration-[1000ms]">02. Wireless Shutter</span>
            <p className="text-zinc-600 dark:text-zinc-500 font-light leading-relaxed group-hover:text-black dark:group-hover:text-zinc-300 transition-colors">
              We provide professional lighting and camera setup. You hold the remote. Take as many photos as you want within your time.
            </p>
          </div>
          <div className="space-y-6 group">
            <span className="text-black dark:text-white text-lg font-serif italic border-b border-zinc-200 dark:border-none pb-2 inline-block w-full transition-colors duration-[1000ms]">03. Instant Result</span>
            <p className="text-zinc-600 dark:text-zinc-500 font-light leading-relaxed group-hover:text-black dark:group-hover:text-zinc-300 transition-colors">
              Select your photos immediately. We print them on the spot, and digital files are sent to your phone before you leave.
            </p>
          </div>
        </div>
      </div>

      {/* 2.5. YOUR STORY, YOUR WAY */}
      <div className="bg-zinc-50 dark:bg-[#0a0a0a] py-24 px-4 transition-colors duration-[1000ms]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-zinc-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Your Story, Your Way</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors duration-[1000ms]">
              Capture the Real You
            </h3>
            <p className="max-w-2xl mx-auto mt-6 text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Forget awkward poses and forced smiles. Our studio is your private playground. Whether it's chaotic fun with friends, a sweet moment with your partner, or just you embracing your best self—it's all about capturing genuine moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 group">
              <div className="w-full aspect-[2/3] mx-auto rounded-lg overflow-hidden relative bg-zinc-100 dark:bg-zinc-900/50">
                <img src="/images/Gallery/BW/2025/BW (6).jpeg" alt="Friends having fun in the studio" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-black dark:text-white pt-4">Friends & Laughter</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light px-4">
                Goof around, try silly poses, and capture the chaos. It's your time to shine together.
              </p>
            </div>
            <div className="space-y-4 group">
              <div className="w-full aspect-[2/3] mx-auto rounded-lg overflow-hidden relative bg-zinc-100 dark:bg-zinc-900/50">
                <img src="/images/Gallery/Event/2026/Valentines/Extra Retouched (2).jpg" alt="Couple sharing a moment in the studio" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-black dark:text-white pt-4">Couples & Connection</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light px-4">
                From shy smiles to big laughs. Create authentic memories without anyone watching.
              </p>
            </div>
            <div className="space-y-4 group">
              <div className="w-full aspect-[2/3] mx-auto rounded-lg overflow-hidden relative bg-zinc-100 dark:bg-zinc-900/50">
                <img src="/images/Gallery/COOL/2026/0311 COOL/Extra Retouched2 (6).jpg" alt="Person posing in the studio" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-black dark:text-white pt-4">Just For You</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light px-4">
                Update your profile picture, celebrate a milestone, or just have fun being yourself.
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* 3. GOOGLE REVIEWS SECTION */}
      <div className="bg-white dark:bg-[#050505] py-24 px-8 transition-colors duration-[1000ms] border-t border-zinc-50 dark:border-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h3 className="text-4xl md:text-5xl font-sans font-bold text-black dark:text-white transition-colors duration-[1000ms]">
                Reviews on Google
              </h3>
              <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">5.0</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#F4B400] fill-[#F4B400]" />)}
                  </div>
                  <a href="https://g.page/emotionalstudios" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 underline ml-2">88 Google reviews</a>
               </div>
            </div>
          </div>

          {/* Custom Google Reviews Component */}
          <div className="w-full">
            <GoogleReviews isDark={isDark} />
          </div>
        </div>
      </div>

      {/* 4. LOCATION SECTION */}
      <div className="bg-white dark:bg-[#050505] py-24 px-4 transition-colors duration-[1000ms] border-t border-zinc-50 dark:border-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center transition-colors">
                  <MapPin className="w-5 h-5 text-[#FF6100]" />
                </div>
                <h2 className="text-zinc-400 text-[10px] font-bold tracking-[0.4em] uppercase">Find us</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-sans font-bold text-black dark:text-white transition-colors duration-[1000ms]">
                Studio Location
              </h3>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4">
                2/566 Queensberry Street,<br />
                North Melbourne, VIC 3051
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Emotional+Studios+North+Melbourne"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF6100] text-xs font-bold tracking-widest uppercase group hover:gap-3 transition-all"
              >
                Get Directions <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Map Frame */}
          <div className="w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/5 relative group">
            <iframe 
              src="https://maps.google.com/maps?q=Emotional+Studios+North+Melbourne&t=&z=18&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Emotional Studio Location"
              className="grayscale-[0.2] contrast-[1.1] dark:invert dark:hue-rotate-180 dark:brightness-95 transition-all duration-700"
            />
            {/* Optional Overlay to catch accidental scrolling, can be removed if direct interaction is preferred */}
            <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </div>

  );

};
