import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQViewProps {
  isDark?: boolean;
}

export const FAQView: React.FC<FAQViewProps> = ({ isDark = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Booking & Visit",
      items: [
        { q: "How can I make a reservation for a photo session? What is the process?", a: "You can make a reservation by clicking \"Book Now\" button. The detailed process and service information are available on our services page for your reference.\n\nIf you have any questions, feel free to DM us! We will reply as soon as possible." },
        { q: "What should I prepare before visiting your studio?", a: "Prepare the tone of the photos you want to take, your most beautiful outfit, and an excited feeling. Since we're booking only and the shooting time is only 20 minutes, being late may result in reduced shooting time." },
        { q: "What payment methods do you accept?", a: "We accept credit cards only for all services. For additional goods and services, you can purchase them on-site with credit cards as well. Please note that we operate on a booking-only basis to ensure the best experience for everyone." }
      ]
    },
    {
      category: "Photos & Editing",
      items: [
        { q: "Do you provide both color and black & white versions of the photos?", a: "Find your perfect tone! Choose one concept from Warm tone, Cool tone, or Black & White at no extra cost! (One concept per session only) Check out our services page to see the mood of each tone!" },
        { q: "Can I get the original unedited photos?", a: "You can add original digital film as an additional purchase to receive all your shots with basic retouching!" },
        { q: "Can I retouch the selected photos by myself?", a: "Basically, emotional studios will retouch your selected photos. If you want to retouch by yourself, add 'Digital original film' on your purchase then, you can edit your photos." },
        { q: "How long does it take to receive the edited photos?", a: "If you want to receive your photos on the same day, pickup is available at least 30 minutes after the shoot. However, if you have additional retouch or print services, it may take up to 1 day depending on the quantity." }
      ]
    }
  ];

  const toggleFAQ = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);
  let globalIndex = 0;

  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="mb-12 pt-8 px-4 md:px-0">
        <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 ${isDark ? 'text-white bg-zinc-800' : 'text-black bg-zinc-100'}`}>Help Centre</span>
        <h2 className={`text-4xl md:text-5xl font-serif italic mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>questions?</h2>
        <p className={`font-light max-w-xl leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Everything you need to know about your private session at emotional studios.
        </p>
      </div>

      <div className="max-w-3xl space-y-16 px-4 md:px-0">
        {faqs.map((section, sIdx) => (
          <div key={sIdx}>
            <h3 className={`text-lg font-serif italic mb-6 border-b pb-2 ${isDark ? 'text-white border-zinc-800' : 'text-black border-zinc-200'}`}>{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item) => {
                const currentIdx = globalIndex++;
                const isOpen = openIndex === currentIdx;
                return (
                  <div key={currentIdx} className="group">
                    <button 
                      onClick={() => toggleFAQ(currentIdx)}
                      className={`w-full text-left py-6 px-6 flex items-center justify-between transition-all duration-300 ${
                        isOpen 
                          ? (isDark ? 'bg-zinc-900 border-l-2 border-white' : 'bg-zinc-100 border-l-2 border-black')
                          : (isDark ? 'bg-[#111111] hover:bg-zinc-900' : 'bg-white border border-zinc-200 hover:bg-zinc-50')
                      }`}
                    >
                      <span className={`text-sm tracking-wide ${isOpen ? (isDark ? 'text-white' : 'text-black') : (isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-black')}`}>
                        {item.q}
                      </span>
                      {isOpen ? <Minus className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} /> : <Plus className={`w-4 h-4 ${isDark ? 'text-zinc-600 group-hover:text-white' : 'text-zinc-400 group-hover:text-black'}`} />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`p-6 text-sm font-light leading-relaxed whitespace-pre-wrap ${isDark ? 'bg-zinc-900/50 text-zinc-400' : 'bg-zinc-50 text-zinc-600 border-x border-b border-zinc-200'}`}>
                        {item.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-20 p-8 border text-center mx-4 md:mx-0 ${isDark ? 'border-zinc-800 bg-[#111111]' : 'border-zinc-200 bg-zinc-50'}`}>
        <p className={`text-sm mb-4 font-light ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Still have questions?</p>
        <a href="mailto:admin@emotionalstudios.com.au" className={`text-sm font-bold uppercase tracking-widest border-b pb-1 transition-all px-2 ${isDark ? 'text-white border-white hover:bg-white hover:text-black' : 'text-black border-black hover:bg-black hover:text-white'}`}>
          Email us directly
        </a>
      </div>
    </div>
  );
};
