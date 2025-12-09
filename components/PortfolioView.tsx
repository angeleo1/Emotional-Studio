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

interface PortfolioViewProps {
  isDark?: boolean;
}

const generateImages = (): ImageItem[] => {
  const images: ImageItem[] = [];
  const addImage = (prefix: string, count: number, category: Exclude<Category, 'All'>) => {
    for (let i = 1; i <= count; i++) {
      images.push({ baseName: `${prefix} (${i})`, title: `${category} Collection ${i}`, category, timestamp: i });
    }
  };
  addImage('event', 20, 'Event');
  addImage('cool', 9, 'Cool');
  addImage('warm', 23, 'Warm');
  images.push({ baseName: 'warm', title: 'Warm Collection Special', category: 'Warm', timestamp: 24 });
  addImage('bw', 24, 'B/W');
  return images.sort((a, b) => b.timestamp - a.timestamp);
};

const IMAGE_FILES = generateImages();

const PortfolioItem: React.FC<{ item: ImageItem; onClick: (item: ImageItem) => void; isDark: boolean }> = ({ item, onClick, isDark }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div 
      onClick={() => onClick(item)}
      className={`relative group cursor-zoom-in overflow-hidden aspect-[3/4] animate-fade-in transition-all duration-1000 ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}
    >
      <SmartImage 
        baseName={item.baseName}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        onImageError={() => setIsVisible(false)}
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
      <div className="relative max-w-full max-h-full w-auto h-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <SmartImage baseName={item.baseName} alt={item.title} className="max-h-[90vh] max-w-[90vw] object-contain" />
      </div>
    </div>
  );
};

export const PortfolioView: React.FC<PortfolioViewProps> = ({ isDark = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const categories: Category[] = ['All', 'B/W', 'Cool', 'Warm', 'Event'];
  const filteredImages = selectedCategory === 'All' ? IMAGE_FILES : IMAGE_FILES.filter(img => img.category === selectedCategory);

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
          {filteredImages.map((item, index) => (
            <PortfolioItem key={`${item.baseName}-${index}`} item={item} onClick={setSelectedImage} isDark={isDark} />
          ))}
        </div>

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
