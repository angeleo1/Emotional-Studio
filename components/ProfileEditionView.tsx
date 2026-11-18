import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Camera, Check, Clock, Frame, Gift, Image as ImageIcon, Printer, Sparkles, X, ZoomIn } from 'lucide-react';

interface ProfileEditionViewProps {
  onBook?: () => void;
  isDark?: boolean;
}

const portraitSampleIds = [2, 3, 4, 5, 6, 1];
const portraitSamples = portraitSampleIds.map(
  (sampleId) => `/images/ProfileEdition/portrait-${String(sampleId).padStart(2, '0')}.webp`,
);

const fourCutSamples = Array.from(
  { length: 6 },
  (_, index) => `/images/ProfileEdition/four-cut-${String(index + 1).padStart(2, '0')}.webp`,
);

const inclusions = [
  {
    icon: Printer,
    title: 'Signature print set',
    description: "One four-cut portrait print and one small photo print in emotional studios' signature packaging.",
  },
  {
    icon: Frame,
    title: 'Framed portrait',
    description: 'One larger colour portrait print in a clear frame.',
  },
  {
    icon: Gift,
    title: 'Photo keyring',
    description: 'One custom keyring featuring your portrait.',
  },
  {
    icon: ImageIcon,
    title: 'Digital gallery',
    description: 'All original photos and four professionally retouched portraits.',
  },
];

const sessionSteps = [
  {
    time: '5 min',
    title: 'Welcome',
    description: "We'll show you how the session works and guide you through the consent form.",
    icon: Check,
  },
  {
    time: '10 min',
    title: 'Self-portrait shoot',
    description: 'Enjoy the studio to yourself. Try a few poses and take your photos with the remote.',
    icon: Camera,
  },
  {
    time: '5 min',
    title: 'Choose your four',
    description: "Pick the four portraits you'd like us to retouch.",
    icon: ImageIcon,
  },
  {
    time: '40 min',
    title: 'Retouching & printing',
    description: 'We edit your portraits, prepare your prints and assemble your keepsakes.',
    icon: Sparkles,
  },
];

export const ProfileEditionView: React.FC<ProfileEditionViewProps> = ({ onBook, isDark = false }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePortrait((current) => (current + 1) % portraitSamples.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
  <div className={`h-full overflow-y-auto pb-24 no-scrollbar ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-stone-900'}`}>
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
      <section className="grid items-stretch gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-0">
        <div className={`relative mx-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-[1.5rem] xl:mx-0 xl:rounded-none ${isDark ? 'bg-zinc-900' : 'bg-stone-100'}`}>
          {portraitSamples.map((portrait, index) => (
            <button
              key={portrait}
              type="button"
              aria-label={`View portrait example ${index + 1} full size`}
              aria-hidden={index !== activePortrait}
              tabIndex={index === activePortrait ? 0 : -1}
              onClick={() => setSelectedPhoto({ src: portrait, alt: 'Korean-style colour self-portrait session example' })}
              className={`absolute inset-0 h-full w-full cursor-zoom-in transition-opacity duration-1000 ${
                index === activePortrait ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Image
                src={portrait}
                alt="Korean-style colour self-portrait session example"
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                unoptimized
                sizes="(max-width: 768px) 100vw, 52vw"
                className="object-contain"
              />
            </button>
          ))}
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-3 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-white backdrop-blur-sm md:bottom-6 md:right-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {portraitSamples.map((portrait, index) => (
                  <button
                    key={portrait}
                    type="button"
                    aria-label={`Show portrait ${index + 1}`}
                    aria-pressed={index === activePortrait}
                    onClick={() => setActivePortrait(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activePortrait ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="View current portrait full size"
                onClick={() => setSelectedPhoto({
                  src: portraitSamples[activePortrait],
                  alt: 'Korean-style colour self-portrait session example',
                })}
                className="rounded-full border border-white/50 bg-white/10 p-2 backdrop-blur-sm transition hover:bg-white/25"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="hidden font-mono text-[10px] tracking-widest sm:block">
                {String(activePortrait + 1).padStart(2, '0')} / {String(portraitSamples.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className={`flex flex-col justify-center px-1 py-5 md:px-8 md:py-10 xl:px-14 ${isDark ? 'bg-[#101010]' : 'bg-[#f8f6f2]'}`}>
          <p className={`mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
            <span>The Portrait Edition</span>
            <span className={`rounded-full border px-2 py-1 text-[8px] leading-none tracking-[0.18em] ${isDark ? 'border-amber-300/40 bg-amber-300/10' : 'border-amber-700/25 bg-amber-100'}`}>
              New
            </span>
          </p>
          <h1 className="max-w-2xl font-serif text-5xl italic leading-[0.98] tracking-tight md:text-7xl">
            ME, ON<br />MY TERMS
          </h1>
          <p className={`mt-5 max-w-md text-base font-light leading-7 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            A Korean-style colour self-portrait session. Choose your colour, take the remote and make a portrait that feels like you.
          </p>

          <div className={`mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y py-5 text-[10px] uppercase tracking-[0.16em] ${isDark ? 'border-white/15 text-stone-300' : 'border-stone-300 text-stone-600'}`}>
            <span className="font-serif text-3xl normal-case tracking-normal">$179</span>
            <span>1 person</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />60 minutes</span>
          </div>
          <p className={`mt-5 text-sm font-light leading-7 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            Four portraits, retouched with care, then brought together with a framed print and signature keepsakes.
          </p>

          <div className={`mt-6 border-l-2 px-4 py-2 ${isDark ? 'border-amber-300 bg-white/[0.03]' : 'border-amber-800 bg-white'}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-xl">Light version</h2>
              <span className={`font-serif text-xl ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>$119</span>
            </div>
            <p className={`mt-2 text-sm font-light leading-6 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Four professionally retouched profile portraits, delivered as digital files.
            </p>
            <p className={`mt-1 text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              Photo merchandise and physical prints are not included.
            </p>
          </div>

          {onBook && (
            <button
              onClick={onBook}
              className={`mt-7 inline-flex w-fit items-center gap-3 rounded-full px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:translate-x-1 ${isDark ? 'bg-white text-black hover:bg-amber-100' : 'bg-stone-900 text-white hover:bg-amber-800'}`}
            >
              Book The Portrait Edition
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="mb-8 flex items-end justify-between gap-4 border-b pb-4">
          <div>
            <p className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>Made to take home</p>
            <h2 className="font-serif text-3xl italic md:text-4xl">What's included</h2>
          </div>
          <span className={`hidden text-xs uppercase tracking-widest sm:block ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Four keepsakes, one session</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {inclusions.map((item) => (
            <article key={item.title} className={`min-h-48 border p-5 md:p-6 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-stone-200 bg-stone-50/70'}`}>
              <item.icon className={`mb-6 h-5 w-5 ${isDark ? 'text-amber-300' : 'text-amber-800'}`} strokeWidth={1.5} />
              <h3 className="mb-2 font-serif text-xl">{item.title}</h3>
              <p className={`text-sm font-light leading-6 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="mb-8 border-b pb-4">
          <p className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>A little time, all yours</p>
          <h2 className="font-serif text-3xl italic md:text-4xl">Your session</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {sessionSteps.map((step, index) => (
            <article key={step.title} className={`relative border p-5 md:p-6 ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
              <div className="mb-8 flex items-center justify-between">
                <span className={`font-serif text-3xl ${isDark ? 'text-white/30' : 'text-stone-300'}`}>0{index + 1}</span>
                <step.icon className={`h-5 w-5 ${isDark ? 'text-amber-300' : 'text-amber-800'}`} strokeWidth={1.5} />
              </div>
              <p className={`mb-2 text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{step.time}</p>
              <h3 className="mb-2 font-serif text-xl">{step.title}</h3>
              <p className={`text-sm font-light leading-6 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{step.description}</p>
            </article>
          ))}
        </div>

        <div className={`mt-4 grid gap-4 border p-5 md:grid-cols-2 md:p-6 ${isDark ? 'border-amber-200/15 bg-amber-200/[0.04]' : 'border-amber-200 bg-amber-50/70'}`}>
          <p className={`text-sm leading-6 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
            Retouching follows your preferences and can include skin tone correction and adjustments to facial and body proportions.
          </p>
          <p className={`text-sm leading-6 md:border-l md:pl-6 ${isDark ? 'border-white/15 text-stone-400' : 'border-amber-200 text-stone-600'}`}>
            The session is 60 minutes. Please allow up to 90 minutes in total if retouching takes longer or the studio is busy.
          </p>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="mb-8 border-b pb-4">
          <p className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>A glimpse of your edition</p>
          <h2 className="font-serif text-3xl italic md:text-4xl">Portraits, your way</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {portraitSamples.map((portrait, index) => (
            <div key={portrait} className={`grid grid-cols-2 gap-2 border p-2 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-stone-200 bg-stone-50'}`}>
              {[portrait, fourCutSamples[portraitSampleIds[index] - 1]].map((src, imageIndex) => {
                const alt = imageIndex === 0 ? 'Colour portrait example' : 'Four-cut portrait print example';

                return (
                <button
                  key={src}
                  type="button"
                  aria-label={`View ${alt} full size`}
                  onClick={() => setSelectedPhoto({ src, alt })}
                  className="relative aspect-[2/3] cursor-zoom-in overflow-hidden bg-white"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="(max-width: 640px) 45vw, (max-width: 1280px) 22vw, 15vw"
                    className="object-contain"
                  />
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/55 p-1.5 text-white">
                    <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {onBook && (
        <div className={`mt-16 flex flex-col items-center gap-4 border-t py-12 text-center ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
          <p className={`font-serif text-2xl italic ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>Ready to meet your portrait?</p>
          <button
            onClick={onBook}
            className={`inline-flex items-center gap-3 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${isDark ? 'bg-white text-black hover:bg-amber-100' : 'bg-stone-900 text-white hover:bg-amber-800'}`}
          >
            Book The Portrait Edition
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
    {selectedPhoto && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={selectedPhoto.alt}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      >
        <button
          type="button"
          aria-label="Close photo preview"
          onClick={() => setSelectedPhoto(null)}
          className="absolute inset-0 bg-black/90"
        />
        <div className="pointer-events-none relative z-10 h-[88vh] w-[92vw] max-w-5xl overflow-hidden">
          <Image
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            fill
            unoptimized
            sizes="92vw"
                    className="object-contain"
          />
        </div>
        <button
          type="button"
          aria-label="Close photo preview"
          onClick={() => setSelectedPhoto(null)}
          className="absolute right-5 top-5 z-20 rounded-full border border-white/25 bg-black/50 p-3 text-white backdrop-blur"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )}
  </div>
  );
};
