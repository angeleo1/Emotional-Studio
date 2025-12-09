import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface PackageItem {
  name: string;
  price: string;
  oldPrice?: string;
  personCount: string;
  features: string[];
}

interface CategoryData {
  title: string;
  imageBase: string;
  description: string;
  items: PackageItem[];
}

interface PackagesViewProps {
  onBook?: () => void;
  isDark?: boolean;
}

const PackageCategory: React.FC<{ cat: CategoryData; onBook?: () => void; isDark: boolean }> = ({ cat, onBook, isDark }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`mb-8 border-b pb-8 flex flex-col md:flex-row gap-8 items-start transition-all duration-1000 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className={`w-full md:w-72 aspect-[3/4] overflow-hidden relative flex-shrink-0 transition-all duration-1000 ${imageError ? 'hidden' : 'block'} ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
        <SmartImage baseName={cat.imageBase} alt={cat.title} className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-500" onImageError={() => setImageError(true)} />
      </div>

      <div className="flex-1 pt-2">
        <h3 className={`text-4xl font-serif italic mb-4 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>{cat.title}</h3>
        <p className={`text-sm font-light tracking-wide mb-6 max-w-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{cat.description}</p>
        
        <div className="grid grid-cols-1 gap-6">
          {cat.items.map((item) => (
            <div key={item.name} className={`p-6 border transition-all duration-500 ${isDark ? 'border-zinc-800 bg-[#0a0a0a] hover:bg-zinc-900' : 'border-zinc-200 bg-white hover:border-black'}`}>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className={`text-xl font-serif transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>{item.name}</h4>
                <div className="text-right">
                  {item.oldPrice && <span className={`block text-sm line-through decoration-red-500 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>${item.oldPrice}</span>}
                  <span className={`text-2xl font-light transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>${item.price}</span>
                </div>
              </div>
              <p className={`text-[10px] uppercase tracking-widest mb-6 font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{item.personCount}</p>

              <ul className="space-y-3 mb-8">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-light">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />
                    <span className={`transition-colors duration-1000 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onBook}
                className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'bg-zinc-800 text-white hover:bg-white hover:text-black' : 'bg-zinc-100 text-black hover:bg-black hover:text-white'}`}
              >
                Book {cat.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PackagesView: React.FC<PackagesViewProps> = ({ onBook, isDark = false }) => {
  const categories: CategoryData[] = [
    { title: "Couple", imageBase: "Couple", description: "Just the two of you.", items: [{ name: "Couple Suite", price: "159", oldPrice: "200", personCount: "For 2 People Only", features: ["Two 4x6\" Prints", "Two 4x6\" Frames", "Elixir Experience", "Time-Lapse Video", "Two Key Rings", "Digital Original Film"] }] },
    { title: "Maternity", imageBase: "Maternity", description: "Record a journey with your baby.", items: [{ name: "Plan A", price: "109", oldPrice: "120", personCount: "For One Person", features: ["Two 4x6\" Prints", "Photo Calendar", "Photo Mug", "Time-Lapse Video", "4x6\" Frame", "*Add Person: $30"] }, { name: "Plan B", price: "499", personCount: "For One Person", features: ["Two 4x6\" Prints", "Photo Calendar", "Photo Book B", "Time-Lapse Video", "4x6\" Frame", "Mini Photo Cards", "*6 Sessions Provided", "*Add One Extra Person: Free"] }] },
    { title: "Body Profile", imageBase: "Body profile", description: "Capture your strength and beauty.", items: [{ name: "Standard", price: "99", oldPrice: "110", personCount: "For One Person", features: ["Two 4x6\" Prints", "8x10\" Print", "Digital Original Film", "Time-Lapse Video", "8x10\" Frame", "*Add Person: $30"] }] },
    { title: "Pet", imageBase: "Pet", description: "Create unforgettable memories with your pet.", items: [{ name: "Plan A", price: "109", oldPrice: "125", personCount: "For One Person", features: ["Two 4x6\" Prints", "Photo Book A", "Magnet", "Time-Lapse Video", "4x6\" Frame", "*Add Person: $30"] }, { name: "Plan B", price: "109", oldPrice: "120", personCount: "For One Person", features: ["Two 4x6\" Prints", "Photo Mug", "Photo Globe", "Time-Lapse Video", "Key Ring", "*Add Person: $30"] }] },
    { title: "Family", imageBase: "Family", description: "Timeless portraits for the whole family.", items: [{ name: "Family Suite", price: "279", oldPrice: "335", personCount: "Minimum 3 People", features: ["4x6\" Print Per Person", "8x10\" Print", "Photo Calendar", "Photo Book B", "Time-Lapse Video", "8x10\" Frame", "Magnet", "Digital Original Film", "*Add Person: $30", "*Add 30mins: $50"] }] }
  ];

  return (
    <div className={`h-full overflow-y-auto pb-20 no-scrollbar transition-all duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="mb-16 pt-8 pl-24">
        <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 ${isDark ? 'text-white bg-zinc-800' : 'text-black bg-zinc-100'}`}>Investments</span>
        <h2 className={`text-4xl md:text-5xl font-serif italic mt-4 mb-6 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>packages</h2>
        <p className={`font-light max-w-xl leading-relaxed transition-colors duration-1000 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Choose the perfect session type for your needs. All packages include a private suite experience.
        </p>
      </div>

      <div className="space-y-24 max-w-5xl">
        {categories.map((cat) => <PackageCategory key={cat.title} cat={cat} onBook={onBook} isDark={isDark} />)}
      </div>
    </div>
  );
};
