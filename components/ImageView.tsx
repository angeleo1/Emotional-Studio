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
}

const PackageCategory: React.FC<{ cat: CategoryData, onBook?: () => void }> = ({ cat, onBook }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="mb-8 border-b border-zinc-200 dark:border-none pb-8 flex flex-col md:flex-row gap-8 items-start transition-colors duration-[1000ms]">
      
      <div className={`w-full md:w-72 aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative flex-shrink-0 transition-all duration-[1500ms] dark:shadow-[0_0_60px_-10px_rgba(255,255,255,0.15)] ${imageError ? 'hidden' : 'block'}`}>
          <SmartImage
            baseName={cat.imageBase}
            alt={cat.title}
            className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
            onImageError={() => setImageError(true)}
          />
      </div>

      <div className="flex-1 pt-2">
        <h3 className="text-4xl font-serif italic text-black dark:text-white mb-4 transition-colors duration-[1000ms]">{cat.title}</h3>
        <p className="text-zinc-500 text-sm font-light tracking-wide mb-6 max-w-sm">{cat.description}</p>
        
        <div className="grid grid-cols-1 gap-6">
          {cat.items.map((item) => (
            <div 
              key={item.name} 
              className="p-6 border border-zinc-200 dark:border-none bg-white dark:bg-[#111111] hover:border-black dark:hover:bg-zinc-900 transition-all duration-500"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-serif text-black dark:text-white transition-colors duration-[1000ms]">{item.name}</h4>
                <div className="text-right">
                   {item.oldPrice && (
                     <span className="block text-zinc-400 dark:text-zinc-600 text-sm line-through decoration-red-500 decoration-1 decoration-slice">
                       ${item.oldPrice}
                     </span>
                   )}
                   <span className="text-2xl font-light text-black dark:text-white transition-colors duration-[1000ms]">${item.price}</span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 font-bold">
                {item.personCount}
              </p>

              <ul className="space-y-3 mb-8">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-light">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400 dark:text-zinc-600" />
                    <span className="text-zinc-700 dark:text-zinc-300 transition-colors duration-[1000ms]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onBook}
                className="block w-full py-3 text-center text-xs font-bold uppercase tracking-[0.2em] bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
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

export const PackagesView: React.FC<PackagesViewProps> = ({ onBook }) => {
  const categories: CategoryData[] = [
    {
      title: "Couple",
      imageBase: "Couple",
      description: "Just the two of you.",
      items: [
        {
          name: "Couple Suite",
          price: "159",
          oldPrice: "200",
          personCount: "For 2 People Only",
          features: [
            "Two 4x6\" Prints",
            "Two 4x6\" Frames",
            "Elixir Experience",
            "Time-Lapse Video",
            "Two Key Rings",
            "Digital Original Film"
          ]
        }
      ]
    },
    {
      title: "Maternity",
      imageBase: "Maternity", 
      description: "Record a journey with your baby.",
      items: [
        {
          name: "Plan A",
          price: "109",
          oldPrice: "120",
          personCount: "For One Person",
          features: [
            "Two 4x6\" Prints",
            "Photo Calendar",
            "Photo Mug",
            "Time-Lapse Video",
            "4x6\" Frame",
            "*Add Person: $30"
          ]
        },
        {
          name: "Plan B",
          price: "499",
          oldPrice: "",
          personCount: "For One Person",
          features: [
            "Two 4x6\" Prints",
            "Photo Calendar",
            "Photo Book B",
            "Time-Lapse Video",
            "4x6\" Frame",
            "Mini Photo Cards",
            "*6 Sessions Provided",
            "*Add One Extra Person: Free"
          ]
        }
      ]
    },
    {
      title: "Body Profile",
      imageBase: "Body profile", 
      description: "Capture your strength and beauty.",
      items: [
        {
          name: "Standard",
          price: "99",
          oldPrice: "110",
          personCount: "For One Person",
          features: [
            "Two 4x6\" Prints",
            "8x10\" Print",
            "Digital Original Film",
            "Time-Lapse Video",
            "8x10\" Frame",
            "*Add Person: $30"
          ]
        }
      ]
    },
    {
      title: "Pet",
      imageBase: "Pet", 
      description: "Create unforgettable memories with your pet.",
      items: [
        {
          name: "Plan A",
          price: "109",
          oldPrice: "125",
          personCount: "For One Person",
          features: [
            "Two 4x6\" Prints",
            "Photo Book A",
            "Magnet",
            "Time-Lapse Video",
            "4x6\" Frame",
            "*Add Person: $30"
          ]
        },
        {
          name: "Plan B",
          price: "109",
          oldPrice: "120",
          personCount: "For One Person",
          features: [
            "Two 4x6\" Prints",
            "Photo Mug",
            "Photo Globe",
            "Time-Lapse Video",
            "Key Ring",
            "*Add Person: $30"
          ]
        }
      ]
    },
    {
      title: "Family",
      imageBase: "Family",
      description: "Timeless portraits for the whole family.",
      items: [
        {
          name: "Family Suite",
          price: "279",
          oldPrice: "335",
          personCount: "Minimum 3 People",
          features: [
            "4x6\" Print Per Person",
            "8x10\" Print",
            "Photo Calendar",
            "Photo Book B",
            "Time-Lapse Video",
            "8x10\" Frame",
            "Magnet",
            "Digital Original Film",
            "*Add Person: $30",
            "*Add 30mins: $50"
          ]
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar bg-white dark:bg-[#050505] transition-colors duration-[1000ms]">
      <div className="mb-16 pt-8">
        <span className="text-xs text-black dark:text-white uppercase tracking-widest font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1">Investments</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-black dark:text-white mt-4 mb-6 transition-colors duration-[1000ms]">
          packages
        </h2>
        <p className="text-zinc-600 dark:text-zinc-500 font-light max-w-xl leading-relaxed transition-colors duration-[1000ms]">
          Choose the perfect session type for your needs. All packages include a private suite experience.
        </p>
      </div>

      <div className="space-y-24 max-w-5xl">
        {categories.map((cat) => (
          <PackageCategory key={cat.title} cat={cat} onBook={onBook} />
        ))}
      </div>
    </div>
  );
};

