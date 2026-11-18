import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { allImagesLatestFirst } from './GalleryContent';
import { ArrowRight, X } from 'lucide-react';

type Category = 'All' | 'B/W' | 'Cool' | 'Warm' | 'Studio' | 'Event' | 'Pet Portraits' | 'Profile';

interface ImageItem {
  src: string;
  title: string;
  category: Exclude<Category, 'All'>;
  timestamp: number;
}

interface PortfolioViewProps {
  isDark?: boolean;
}

const buildImagesFromGallery = (): ImageItem[] => {
  const getCategoryFromPath = (path: string): Exclude<Category, 'All'> | null => {
    if (path.includes('/BW/')) return 'B/W';
    if (path.includes('/COOL/')) return 'Cool';
    if (path.includes('/WARM/')) return 'Warm';
    if (path.includes('/STUDIO/')) return 'Studio';
    if (path.includes('/Event/')) return 'Event';
    if (path.includes('/Pet portraits/')) return 'Pet Portraits';
    if (path.includes('/ProfileEdition/')) return 'Profile';
    return null;
  };

  const images: ImageItem[] = [];

  allImagesLatestFirst.forEach((src, index) => {
    const category = getCategoryFromPath(src);
    if (!category) return;

    images.push({
      src,
      title: `${category} Collection ${index + 1}`,
      category,
      timestamp: index,
    });
  });

  return images;
};

const IMAGE_FILES = buildImagesFromGallery();
const CATEGORIES: Category[] = ['All', 'B/W', 'Cool', 'Warm', 'Studio', 'Event', 'Pet Portraits', 'Profile'];

const getCategoryPreviews = (random = false): Record<string, ImageItem> => {
  const previews: Record<string, ImageItem> = {};

  CATEGORIES.filter((category): category is Exclude<Category, 'All'> => category !== 'All').forEach((category) => {
    const categoryImages = IMAGE_FILES.filter((image) => image.category === category);
    if (categoryImages.length === 0) return;

    const index = random ? Math.floor(Math.random() * categoryImages.length) : 0;
    previews[category] = categoryImages[index];
  });

  return previews;
};

const PortfolioItem: React.FC<{ item: ImageItem; onClick: (item: ImageItem) => void; isDark: boolean }> = ({ item, onClick, isDark }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div 
      onClick={() => onClick(item)}
      className={`relative group cursor-zoom-in overflow-hidden aspect-[3/4] animate-fade-in transition-all duration-1000 ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        unoptimized={item.src.includes('/ProfileEdition/')}
        className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${
          item.category === 'Profile' ? 'origin-top scale-y-[1.025]' : ''
        }`}
        onError={() => setIsVisible(false)}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </div>
  );
};

const Lightbox: React.FC<{ item: ImageItem | null; onClose: () => void; isDark: boolean }> = ({ item, onClose, isDark }) => {
  if (!item) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center p-4 animate-fade-in ${isDark ? 'bg-black/95' : 'bg-white/95'}`}
      onClick={onClose}
    >
      <button onClick={onClose} className={`absolute top-6 right-6 p-2 hover:opacity-50 transition-opacity z-[110] ${isDark ? 'text-white' : 'text-black'}`}>
        <X className="w-8 h-8" />
      </button>
      <div className="relative max-w-full max-h-full w-auto h-auto overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={item.src}
          alt={item.title}
          width={1000}
          height={1500}
          unoptimized={item.src.includes('/ProfileEdition/')}
          className={`max-h-[90vh] max-w-[90vw] object-contain ${
            item.category === 'Profile' ? 'origin-top scale-y-[1.025]' : ''
          }`}
        />
      </div>
    </div>
  );
};

export const PortfolioView: React.FC<PortfolioViewProps> = ({ isDark = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [categoryPreviews, setCategoryPreviews] = useState(() => getCategoryPreviews());
  const [failedPreviews, setFailedPreviews] = useState<Record<string, string[]>>({});
  const categories = CATEGORIES;
  const filteredImages = selectedCategory === 'All' ? IMAGE_FILES : IMAGE_FILES.filter(img => img.category === selectedCategory);

  useEffect(() => {
    setCategoryPreviews(getCategoryPreviews(true));
  }, []);

  const replaceFailedPreview = (category: string, failedSrc: string) => {
    const failedForCategory = [...(failedPreviews[category] || []), failedSrc];
    const alternatives = IMAGE_FILES.filter(
      (image) => image.category === category && !failedForCategory.includes(image.src),
    );

    setFailedPreviews((current) => ({
      ...current,
      [category]: [...new Set([...(current[category] || []), failedSrc])],
    }));

    if (alternatives.length > 0) {
      const replacement = alternatives[Math.floor(Math.random() * alternatives.length)];
      setCategoryPreviews((current) => ({ ...current, [category]: replacement }));
    }
  };

  return (
    <>
      <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="px-8 pt-12 mb-8">
          <h2 className={`text-4xl md:text-6xl font-serif italic mb-8 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
            visual stories
          </h2>
          
          <div className={`flex flex-wrap gap-6 md:gap-8 border-b pb-4 transition-colors duration-1000 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 relative
                  ${selectedCategory === cat 
                    ? (isDark ? 'text-white font-bold' : 'text-black font-bold')
                    : (isDark ? 'text-zinc-600 hover:text-zinc-300' : 'text-zinc-400 hover:text-black')}
                `}
              >
                {cat}
                {selectedCategory === cat && <span className={`absolute -bottom-4 left-0 w-full h-[1px] animate-fade-in ${isDark ? 'bg-white' : 'bg-black'}`} />}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === 'All' ? (
          <div className={`mx-auto max-w-6xl divide-y px-4 md:px-8 ${isDark ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
            {categories.filter((category) => category !== 'All').map((category, index) => {
              const item = categoryPreviews[category];
              const count = IMAGE_FILES.filter((image) => image.category === category).length;
              if (!item) return null;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`group grid w-full grid-cols-[96px_1fr_auto] items-center gap-4 py-4 text-left transition-colors md:grid-cols-[180px_1fr_auto] md:gap-8 md:py-5 ${
                    isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-zinc-50'
                  }`}
                >
                  <span className={`relative block aspect-[3/4] w-24 shrink-0 overflow-hidden bg-stone-100 md:w-[180px] ${isDark ? 'bg-zinc-900' : ''}`}>
                    <Image
                      src={item.src}
                      alt={`${category} collection`}
                      fill
                      unoptimized
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 96px, 180px"
                      onError={() => replaceFailedPreview(category, item.src)}
                    />
                  </span>
                  <span>
                    <span className={`mb-1 block text-[9px] uppercase tracking-[0.2em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Collection {String(index + 1).padStart(2, '0')} · {count} portraits
                    </span>
                    <span className={`block font-serif text-xl md:text-3xl ${isDark ? 'text-white' : 'text-black'}`}>
                      {category}
                    </span>
                  </span>
                  <span className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] transition-colors ${
                    isDark ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-400 group-hover:text-black'
                  }`}>
                    <span className="hidden sm:inline">Explore</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
            {filteredImages.map((item) => (
              <PortfolioItem key={item.src} item={item} onClick={setSelectedImage} isDark={isDark} />
            ))}
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className={`py-32 text-center ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
            <p className="text-sm uppercase tracking-widest font-light">No images in this category yet.</p>
          </div>
        )}

        <div className="py-24 text-center">
          <a 
            href="https://www.instagram.com/emotional_studios" target="_blank" rel="noopener noreferrer"
            className={`inline-block text-xs uppercase tracking-[0.2em] transition-colors border-b border-transparent pb-1 ${isDark ? 'text-zinc-400 hover:text-white hover:border-white' : 'text-zinc-400 hover:text-black hover:border-black'}`}
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} isDark={isDark} />
    </>
  );
};
