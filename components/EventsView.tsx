import React from 'react';
import { Gift, Clock, Image as ImageIcon, Frame, PartyPopper, AlertCircle, Calendar, User } from 'lucide-react';

interface EventsViewProps {
  onBook?: () => void;
  isDark?: boolean;
}

export const EventsView: React.FC<EventsViewProps> = ({ onBook, isDark = false }) => {
  const perks = [
    {
      icon: Clock,
      title: 'Free 10-Minute Extra Time',
      description: 'Enjoy an additional 10 minutes on us to capture more perfect moments',
    },
    {
      icon: ImageIcon,
      title: 'Custom Birthday Photo Card',
      description: 'Personalised photo card in your preferred colour to take home',
    },
    {
      icon: Frame,
      title: 'Special Clear Birthday Frame',
      description: 'Elegant clear frame to display your favourite shot (upgrades available)',
    },
    {
      icon: PartyPopper,
      title: 'Number Helium Balloon',
      description: 'Custom age balloon for that extra celebration touch',
    },
  ];

  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="mb-12 pt-8 px-8">
        <span className={`text-xs uppercase tracking-[0.25em] font-bold px-4 py-1.5 rounded-full ${isDark ? 'text-amber-200 bg-amber-500/10 border border-amber-400/20' : 'text-amber-800 bg-amber-50 border border-amber-200'}`}>Birthday Special</span>
        <h2 className={`text-4xl md:text-5xl font-serif italic mt-4 mb-6 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Birthday Month Event
        </h2>
        <p className={`font-light max-w-xl leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
          Celebrating a birthday this month? We&apos;ve prepared a special gift package to make your day even more memorable at Emotional Studios North Melbourne.
        </p>
      </div>

      <div className="max-w-6xl px-8 pb-20">
        <div className={`rounded-3xl overflow-hidden border ${isDark ? 'border-amber-500/10 bg-gradient-to-br from-stone-900/80 to-stone-950' : 'border-amber-100 bg-gradient-to-br from-amber-50/60 to-stone-50'}`}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
              <img
                src="/images/Event/final2.png"
                alt="Birthday Month Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/75 via-black/15 to-transparent md:from-black/45 md:via-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:w-3/4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-200/20">
                  <Gift className="w-4 h-4 text-amber-200" />
                  <span className="text-[11px] font-semibold text-amber-50 tracking-[0.15em] uppercase">Included Perks</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col">
              <div className="mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-stone-800/60 text-stone-400 border border-stone-700/50' : 'bg-stone-100 text-stone-600 border border-stone-200/70'}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase">Every Month</span>
                </div>
                <h3 className={`text-2xl md:text-3xl font-serif italic mb-4 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Who&apos;s Eligible
                </h3>
                <div className={`rounded-2xl border ${isDark ? 'bg-stone-900/40 border-stone-800/70' : 'bg-white/80 border-amber-100/80 shadow-sm'}`}>
                  <div className={`flex items-center gap-4 p-5 border-b border-dashed ${isDark ? 'border-stone-700/60' : 'border-amber-100'}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-700 border border-amber-100'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        Anyone celebrating a birthday in the current month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-stone-800/60 text-stone-400 border border-stone-700/50' : 'bg-stone-50 text-stone-500 border border-stone-200/80'}`}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className={`font-medium text-sm mb-1 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>Upon arrival</p>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        Please show an ID confirming your birth date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className={`text-2xl md:text-3xl font-serif italic mb-5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Your Birthday Perks
                </h3>
                <div className="space-y-3">
                  {perks.map((perk, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01] ${isDark ? 'bg-stone-900/40 border border-stone-800/70 hover:bg-stone-900/70 hover:border-amber-500/20' : 'bg-white border border-amber-100/70 hover:border-amber-200 hover:shadow-sm'}`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/15 text-amber-300' : 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-700'}`}>
                        <perk.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-0.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>{perk.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{perk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-auto p-5 rounded-2xl border ${isDark ? 'bg-amber-500/5 border-amber-500/15' : 'bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-100'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                  <div>
                    <p className={`font-semibold mb-1.5 ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>Balloon Pre-Arrangement</p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-amber-100/70' : 'text-amber-800'}`}>
                      Please contact us via DM or email <strong>prior to your booking date</strong> so we can have your custom number helium balloon prepared for your session.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {onBook && (
                  <button
                    onClick={onBook}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] text-white bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 hover:from-stone-900 hover:via-amber-800 hover:to-stone-900 shadow-amber-900/10 hover:shadow-amber-900/20"
                  >
                    <Gift className="w-4 h-4" />
                    Book Your Birthday Session
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
