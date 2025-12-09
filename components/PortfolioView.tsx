import React, { useState } from 'react';
import { SmartImage } from './SmartImage';
import { X } from 'lucide-react';

type Category = 'All' | 'B/W' | 'Cool' | 'Warm' | 'Event';

interface ImageItem {
  baseName: string;
  title: string;
  category: Exclude<Category, 'All'>;
  timestamp: number;
}

const generateImages = (): ImageItem[] => {
  const images: ImageItem[] = [];

  const addImage = (prefix: string, count: number, category: Exclude<Category, 'All'>) => {
    for (let i = 1; i <= count; i++) {
      images.push({
        baseName: `${prefix} (${i})`,
        title: `${category} Collection ${i}`,
        category: category,
        timestamp: i 
      });
    }
  };

  addImage('event', 20, 'Event');
  addImage('cool', 9, 'Cool');
  addImage('warm', 23, 'Warm');
  
  images.push({
    baseName: 'warm',
    title: 'Warm Collection Special',
    category: 'Warm',
    timestamp: 24 
  });

  addImage('bw', 24, 'B/W');

  return images.sort((a, b) => b.timestamp - a.timestamp);
};

const IMAGE_FILES = generateImages();

const PortfolioItem: React.FC<{ item: ImageItem; onClick: (item: ImageItem) => void }> = ({ item, onClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      onClick={() => onClick(item)}
      className="relative group cursor-zoom-in overflow-hidden aspect-[3/4] animate-fade-in bg-zinc-100 dark:bg-zinc-900 transition-colors duration-[1000ms]"
    >
      <div className="w-full h-full transition-all duration-[1500ms] dark:shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)] dark:group-hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
        <SmartImage 
          baseName={item.baseName}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          onImageError={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
};

const Lightbox: React.FC<{ item: ImageItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-white/95 dark:bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in transition-colors duration-[500ms]"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-black dark:text-white hover:opacity-50 transition-opacity z-[110]"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="relative max-w-full max-h-full w-auto h-auto shadow-2xl dark:shadow-[0_0_100px_-20px_rgba(255,255,255,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage 
          baseName={item.baseName}
          alt={item.title}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </div>
    </div>
  );
};

export const PortfolioView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const categories: Category[] = ['All', 'B/W', 'Cool', 'Warm', 'Event'];

  const filteredImages = selectedCategory === 'All' 
    ? IMAGE_FILES 
    : IMAGE_FILES.filter(img => img.category === selectedCategory);

  return (
    <>
      <div className="h-full overflow-y-auto pb-20 no-scrollbar bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">
        <div className="px-8 pt-12 mb-8">
          <h2 className="text-4xl md:text-6xl font-serif italic text-black dark:text-white mb-8 transition-colors duration-[1000ms]">
            visual stories
          </h2>
          
          <div className="flex flex-wrap gap-6 md:gap-8 border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-colors duration-[1000ms]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-[0.2em] transition-all duration-[1000ms] relative
                  ${selectedCategory === cat 
                    ? 'text-black dark:text-white font-bold' 
                    : 'text-zinc-400 dark:text-zinc-600 hover:text-black dark:hover:text-zinc-300'
                  }
                `}
              >
                {cat}
                {selectedCategory === cat && (
                  <span className="absolute -bottom-4 left-0 w-full h-[1px] bg-black dark:bg-white animate-fade-in" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid optimized: 2 cols on mobile, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
          {filteredImages.map((item, index) => (
            <PortfolioItem 
              key={`${item.baseName}-${index}`} 
              item={item} 
              onClick={setSelectedImage}
            />
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-32 text-center text-zinc-400 dark:text-zinc-600">
            <p className="text-sm uppercase tracking-widest font-light">No images in this category yet.</p>
          </div>
        )}

        <div className="py-24 text-center">
          <a 
            href="https://www.instagram.com/emotional_studios" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-zinc-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-1"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};

