import React from 'react';
import { Clock, Video, Image, Martini } from 'lucide-react';

export const PriceView: React.FC = () => {
  const sessions = [
    {
      name: "1-person",
      price: "$65",
      features: [
        "4x6\" prints of 2 selected photos",
        "Digital original file"
      ]
    },
    {
      name: "2-people",
      price: "$120",
      features: [
        "4x6\" prints of 4 selected photos",
        "Digital original file"
      ]
    },
    {
      name: "3-people",
      price: "$150",
      features: [
        "4x6\" prints of 6 selected photos",
        "Digital original file"
      ]
    },
    {
      name: "4-people",
      price: "$180",
      features: [
        "4x6\" prints of 8 selected photos",
        "Digital original file"
      ]
    }
  ];

  const addOns = [
    {
      category: "Photos",
      items: [
        { name: "4x6\" Print", price: "$5" },
        { name: "4x6\" Frame", price: "$10" },
        { name: "8x10\" Print", price: "$10" },
        { name: "8x10\" Frame", price: "$15" }
      ]
    },
    {
      category: "Photo Book",
      items: [
        { name: "Photo Book A", price: "$40" },
        { name: "Photo Book B (with slip case)", price: "$100" },
        { name: "Photo Calendar", price: "$25" }
      ]
    },
    {
      category: "Goods",
      items: [
        { name: "Key Ring", price: "$10" },
        { name: "Magnet", price: "$15" },
        { name: "Photo Mug (Heat Activated)", price: "$20" },
        { name: "Photo Globe", price: "$25" }
      ]
    },
    {
      category: "Others",
      items: [
        { name: "Digital Original Film", price: "$20" },
        { name: "Additional Retouched Photo", price: "$10" }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">
      <div className="mb-12 pt-8">
        <span className="text-xs text-black dark:text-white uppercase tracking-widest font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1">Rates</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-black dark:text-white mt-4 mb-6 transition-colors duration-[1000ms]">
          standard sessions
        </h2>
        <p className="text-zinc-600 dark:text-zinc-500 font-light max-w-xl leading-relaxed transition-colors duration-[1000ms]">
          Our core self-portrait experience. Simple pricing based on your group size.
        </p>
      </div>

      <div className="max-w-7xl mx-auto pb-20">
        
        {/* 1. SESSION BASICS (CENTERED) */}
        <div className="flex flex-col items-center justify-center mb-24 bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-sm">
          <h3 className="text-lg font-serif italic text-black dark:text-white mb-8 border-b border-zinc-200 dark:border-none pb-2 inline-block">
            Session Basics (Included)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="flex flex-col items-center text-center gap-2">
              <Clock className="w-6 h-6 text-black dark:text-white mb-2" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-1">20 Mins</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">Private photo session time</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Image className="w-6 h-6 text-black dark:text-white mb-2" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-1">Moodboard</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">Inspiration photo provided</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Martini className="w-6 h-6 text-black dark:text-white mb-2" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-1">Elixir</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">Concentrate welcome drink</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Video className="w-6 h-6 text-black dark:text-white mb-2" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-1">Timelapse</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">Sketch video of your shoot</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SPLIT LAYOUT: PRICING (LEFT) vs ADD-ONS (RIGHT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
          
          {/* LEFT: PRICING TIERS */}
          <div className="space-y-12">
            <h3 className="text-2xl font-serif italic text-black dark:text-white mb-8 text-center md:text-left">Session Pricing</h3>
            <div className="space-y-10">
              {sessions.map((session) => (
                <div key={session.name} className="group border-b border-zinc-200 dark:border-none pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-black dark:hover:bg-zinc-900 transition-colors duration-300">
                  <div>
                    <div className="flex items-baseline gap-6 mb-2">
                      <h4 className="text-3xl font-serif text-black dark:text-white group-hover:italic transition-all">{session.name}</h4>
                      <span className="text-2xl font-light text-zinc-600 dark:text-zinc-400">{session.price}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    {session.features.map((feature, idx) => (
                      <p key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 font-light">
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="border-b border-zinc-200 dark:border-none pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h4 className="text-3xl font-serif text-black dark:text-white mb-1">Large group</h4>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light">*Minimum 2 sessions required</p>
                  <a href="mailto:admin@emotionalstudios.com.au" className="text-sm font-bold text-black dark:text-white border-b border-black dark:border-white hover:opacity-50 transition-opacity">Contact us for large group sessions</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ADD-ONS */}
          <div>
             <div className="md:sticky md:top-0">
               <h3 className="text-2xl font-serif italic text-black dark:text-white mb-10 text-center md:text-left">Add Ons</h3>
               <div className="space-y-12">
                  {addOns.map((section) => (
                    <div key={section.category}>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-zinc-400 dark:text-zinc-500">
                        {section.category}
                      </h4>
                      <ul className="space-y-4">
                        {section.items.map((item) => (
                          <li key={item.name} className="flex justify-between items-center text-sm border-b border-zinc-100 dark:border-none pb-2">
                            <span className="text-zinc-800 dark:text-zinc-300 font-light">{item.name}</span>
                            <span className="text-black dark:text-white font-medium">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

