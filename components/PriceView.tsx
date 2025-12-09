import React from 'react';
import { Clock, Video, Image, Martini } from 'lucide-react';

interface PriceViewProps {
  isDark?: boolean;
}

export const PriceView: React.FC<PriceViewProps> = ({ isDark = false }) => {
  const sessions = [
    { name: "1-person", price: "$65", features: ["4x6\" prints of 2 selected photos", "Digital original file"] },
    { name: "2-people", price: "$120", features: ["4x6\" prints of 4 selected photos", "Digital original file"] },
    { name: "3-people", price: "$150", features: ["4x6\" prints of 6 selected photos", "Digital original file"] },
    { name: "4-people", price: "$180", features: ["4x6\" prints of 8 selected photos", "Digital original file"] }
  ];

  const addOns = [
    { category: "Photos", items: [{ name: "4x6\" Print", price: "$5" }, { name: "4x6\" Frame", price: "$10" }, { name: "8x10\" Print", price: "$10" }, { name: "8x10\" Frame", price: "$15" }] },
    { category: "Photo Book", items: [{ name: "Photo Book A", price: "$40" }, { name: "Photo Book B (with slip case)", price: "$100" }, { name: "Photo Calendar", price: "$25" }] },
    { category: "Goods", items: [{ name: "Key Ring", price: "$10" }, { name: "Magnet", price: "$15" }, { name: "Photo Mug (Heat Activated)", price: "$20" }, { name: "Photo Globe", price: "$25" }] },
    { category: "Others", items: [{ name: "Digital Original Film", price: "$20" }, { name: "Additional Retouched Photo", price: "$10" }] }
  ];

  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="mb-12 pt-8">
        <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 ${isDark ? 'text-white bg-zinc-800' : 'text-black bg-zinc-100'}`}>Rates</span>
        <h2 className={`text-4xl md:text-5xl font-serif italic mt-4 mb-6 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
          standard sessions
        </h2>
        <p className={`font-light max-w-xl leading-relaxed transition-colors duration-1000 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Our core self-portrait experience. Simple pricing based on your group size.
        </p>
      </div>

      <div className="max-w-7xl mx-auto pb-20">
        {/* 1. SESSION BASICS */}
        <div className={`flex flex-col items-center justify-center mb-24 p-8 rounded-sm ${isDark ? 'bg-[#0a0a0a] border border-zinc-800' : 'bg-zinc-50'}`}>
          <h3 className={`text-lg font-serif italic mb-8 border-b pb-2 inline-block ${isDark ? 'text-white border-zinc-700' : 'text-black border-zinc-200'}`}>
            Session Basics (Included)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { icon: Clock, title: "20 Mins", desc: "Private photo session time" },
              { icon: Image, title: "Moodboard", desc: "Inspiration photo provided" },
              { icon: Martini, title: "Elixir", desc: "Concentrate welcome drink" },
              { icon: Video, title: "Timelapse", desc: "Sketch video of your shoot" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <item.icon className={`w-6 h-6 mb-2 ${isDark ? 'text-white' : 'text-black'}`} />
                <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</p>
                <p className={`text-xs font-light ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`border-t my-16 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}></div>

        {/* 2. SPLIT LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
          {/* LEFT: PRICING TIERS */}
          <div className="space-y-12">
            <div className="mb-8">
              <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 ${isDark ? 'text-white bg-zinc-800' : 'text-black bg-zinc-100'}`}>Pricing</span>
              <h3 className={`text-3xl font-serif italic mt-4 text-center md:text-left ${isDark ? 'text-white' : 'text-black'}`}>Session Pricing</h3>
            </div>
            <div className="space-y-10">
              {sessions.map((session) => (
                <div key={session.name} className={`group border-b pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors duration-300 ${isDark ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-200 hover:border-black'}`}>
                  <div className="flex items-baseline gap-6 mb-2">
                    <h4 className={`text-3xl font-serif group-hover:italic transition-all ${isDark ? 'text-white' : 'text-black'}`}>{session.name}</h4>
                    <span className={`text-2xl font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{session.price}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    {session.features.map((feature, idx) => (
                      <p key={idx} className={`text-sm font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{feature}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div className={`border-b pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <h4 className={`text-3xl font-serif mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Large group</h4>
                <div className="text-left sm:text-right">
                  <p className={`text-sm font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>*Minimum 2 sessions required</p>
                  <a href="mailto:admin@emotionalstudios.com.au" className={`text-sm font-bold border-b hover:opacity-50 transition-opacity ${isDark ? 'text-white border-white' : 'text-black border-black'}`}>Contact us for large group sessions</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ADD-ONS */}
          <div className="md:sticky md:top-0">
            <h3 className={`text-2xl font-serif italic mb-10 text-center md:text-left ${isDark ? 'text-white' : 'text-black'}`}>Add Ons</h3>
            <div className="space-y-12">
              {addOns.map((section) => (
                <div key={section.category}>
                  <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{section.category}</h4>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name} className={`flex justify-between items-center text-sm border-b pb-2 ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                        <span className={`font-light ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{item.name}</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{item.price}</span>
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
  );
};
