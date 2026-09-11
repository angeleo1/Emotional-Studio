import React, { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';

interface EventPopupProps {
  isDark?: boolean;
  onClose: () => void;
  onGoToEvent: () => void;
}

const STORAGE_KEY = 'es_birthday_popup_dismissed_until';

export const EventPopup: React.FC<EventPopupProps> = ({ isDark = false, onClose, onGoToEvent }) => {
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const until = parseInt(raw, 10);
        if (!isNaN(until) && Date.now() < until) {
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setShouldShow(true);
    const t = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShouldShow(false);
      onClose();
    }, 280);
  };

  const handleDismissForDay = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    } catch {
      /* ignore */
    }
    handleClose();
  };

  const handleGoToEvent = () => {
    handleClose();
    setTimeout(onGoToEvent, 220);
  };

  if (!mounted || !shouldShow) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className={`relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ease-out ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <div className={`relative ${isDark ? 'bg-[#111111] border border-amber-500/10' : 'bg-white border border-amber-100'}`}>
          <button
            onClick={handleClose}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white backdrop-blur' : 'bg-white/75 text-stone-500 hover:bg-white hover:text-stone-800 backdrop-blur border border-stone-200/70'}`}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900">
            <img
              src="/images/Event/final2.png"
              alt="Birthday Month Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/25 border border-amber-200/30 backdrop-blur mb-3">
                <Gift className="w-3 h-3 text-amber-100" />
                <span className="text-[10px] font-semibold text-amber-50 tracking-[0.15em] uppercase">Birthday Special</span>
              </div>
              <h3 className="text-2xl font-serif italic text-white leading-tight">
                Birthday Month Event
              </h3>
            </div>
          </div>

          <div className="p-5 space-y-4 bg-gradient-to-b from-transparent to-amber-50/40 dark:to-amber-500/[0.03]">
            <button
              onClick={handleGoToEvent}
              className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                text-black dark:text-white
                bg-white/10 dark:bg-white/5
                backdrop-blur-2xl
                border border-black/10 dark:border-white/15
                shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_32px_-8px_rgba(0,0,0,0.15)]
                hover:bg-white/25 dark:hover:bg-white/[0.08] hover:border-black/20 dark:hover:border-white/25
                hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_16px_48px_-12px_rgba(0,0,0,0.2)]
                hover:scale-[1.015] active:scale-[0.985]
                after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/35 after:via-transparent after:to-transparent after:opacity-60 dark:after:from-white/10 after:pointer-events-none"
            >
              View Event Details
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleDismissForDay}
                className={[
                  'relative overflow-hidden flex-1 text-xs font-medium tracking-wide py-2.5 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-xl border shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/20 after:via-transparent after:to-transparent after:opacity-50 dark:after:from-white/5 after:pointer-events-none',
                  isDark
                    ? 'text-stone-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border-white/10 hover:border-white/20'
                    : 'text-stone-600 hover:text-stone-900 bg-black/[0.03] hover:bg-black/[0.07] border-black/10 hover:border-black/20'
                ].join(' ')}
              >
                Don&apos;t show today
              </button>
              <button
                onClick={handleClose}
                className={[
                  'relative overflow-hidden flex-1 text-xs font-medium tracking-wide py-2.5 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-xl border shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/20 after:via-transparent after:to-transparent after:opacity-50 dark:after:from-white/5 after:pointer-events-none',
                  isDark
                    ? 'text-stone-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border-white/10 hover:border-white/20'
                    : 'text-stone-600 hover:text-stone-900 bg-black/[0.03] hover:bg-black/[0.07] border-black/10 hover:border-black/20'
                ].join(' ')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
