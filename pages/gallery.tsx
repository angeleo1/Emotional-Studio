import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'landscape', name: 'Landscape' },
    { id: 'still-life', name: 'Still Life' },
  ];

  const galleryImages: GalleryImage[] = [
    { src: '/images/0f9f9c7f-0182-46a8-856b-23fe948d7c5c.jpg', alt: 'Gallery image 1', category: 'portrait' },
    { src: '/images/93604fc7-7652-49aa-be76-15898c012176.jpg', alt: 'Gallery image 2', category: 'landscape' },
    { src: '/images/19f91264-41e6-454a-a4cb-007a97003550.jpg', alt: 'Gallery image 3', category: 'still-life' },
    { src: '/images/b53d49fc-f701-4806-8060-d37768c5b328.jpg', alt: 'Gallery image 4', category: 'portrait' },
    { src: '/images/374a1414-94ed-47a0-94d3-9d56780fd243.jpg', alt: 'Gallery image 5', category: 'landscape' },
    { src: '/images/IMG_0179.jpg', alt: 'Gallery image 6', category: 'still-life' },
    { src: '/images/IMG_0241.jpg', alt: 'Gallery image 7', category: 'portrait' },
    { src: '/images/b92e53e6-436a-471c-b077-7cac4113e46e.jpg', alt: 'Gallery image 8', category: 'landscape' },
    { src: '/images/bad178c7-1de1-4fa3-9576-5fa0ca04b9db.jpg', alt: 'Gallery image 9', category: 'still-life' },
    { src: '/images/e2cb65ef-30e1-427e-8f22-48e660ea8e4f.jpg', alt: 'Gallery image 10', category: 'portrait' },
    { src: '/images/919adfeb-b341-4006-8f21-576a1871f48e.jpg', alt: 'Gallery image 11', category: 'landscape' },
    { src: '/images/19f91264-41e6-454a-a4cb-007a97003550.jpg', alt: 'Gallery image 12', category: 'still-life' },
  ];

  useEffect(() => {
    setImages(galleryImages);
  }, []);

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/241421124.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-orange-500/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-rock-salt tracking-wider hover:text-gray-300 transition-colors text-[#fff0c6] [text-shadow:0_0_2px_#fff]">
              EMOTIONAL STUDIO
            </Link>
            <nav className="hidden md:flex space-x-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-sm tracking-wider transition-colors ${
                    selectedCategory === category.id
                      ? 'text-white border-b border-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Category Selector */}
          <div className="md:hidden mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white border border-white/10 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-[#2a2a2a]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-light mb-2">{image.alt}</h3>
                    <p className="text-sm text-gray-300">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 Recorders Inc. All rights reserved.</p>
            <p className="mt-2">All images are protected by copyright law.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 