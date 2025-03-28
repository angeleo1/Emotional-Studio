import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const PoseGuide: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const sliderImages = [
    '/images/2w1312.jpg',
    '/images/231123.jpg',
    '/images/sddasd.jpg',
    '/images/14tkwls.jpg',
    '/images/tkwlsekffur.jpg',
    '/images/3142.jpg',
    '/images/film.jpg',
    '/images/films.jpg',
    '/images/frames.jpg',
    '/images/dssad.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
      setIsImageLoaded(false);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const poses = [
    {
      id: 'casual',
      title: 'Casual Poses',
      description: 'Natural and relaxed poses for everyday moments',
      image: '/images/dsasd.jpg',
      tips: [
        'Keep your shoulders relaxed',
        'Look slightly away from the camera',
        'Use natural hand movements',
        'Maintain a slight smile'
      ]
    },
    {
      id: 'portrait',
      title: 'Portrait Poses',
      description: 'Classic poses that highlight your best features',
      image: '/images/4ewqd.jpg',
      tips: [
        'Position your face at a 45-degree angle',
        'Keep your chin slightly down',
        'Focus on your eyes',
        'Use soft lighting'
      ]
    },
    {
      id: 'couple',
      title: 'Couple Poses',
      description: 'Romantic and intimate poses for couples',
      image: '/images/1324fsda.jpg',
      tips: [
        'Maintain eye contact',
        'Use natural interactions',
        'Create physical connection',
        'Show genuine emotions'
      ]
    },
    {
      id: 'group',
      title: 'Group Poses',
      description: 'Dynamic poses for group photos',
      image: '/images/24edsads.jpg',
      tips: [
        'Create different heights',
        'Use natural spacing',
        'Coordinate outfits',
        'Keep everyone engaged'
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff0c6]/20">
      <Navbar />

      {/* Background Image with Ken-burns effect */}
      <div className="fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[#2c1711]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff6100]/15 to-transparent" />
        <Image
          src="/images/diego-ph-fIq0tET6llw-unsplash.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="fixed inset-0 z-[2] bg-[#fff0c6]/10 backdrop-blur-sm" />

      <main className="relative z-10 pt-48 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-rock-salt text-[#2c1711] mb-8 opacity-90">Pose Guide</h1>
            <p className="text-xl text-[#2c1711] font-medium max-w-2xl mx-auto">
              Discover our collection of professional posing tips and examples to help you look your best in photos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {poses.map((pose, index) => (
              <motion.div
                key={pose.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#ff6100]/5 hover:shadow-[#ff6100]/10 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={pose.image}
                    alt={pose.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h2 className="text-2xl font-rock-salt text-[#2c1711] mb-4">{pose.title}</h2>
                <p className="text-[#2c1711] mb-6">{pose.description}</p>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-[#2c1711]">Tips:</h3>
                  <ul className="space-y-2">
                    {pose.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <span className="text-[#ff6100]">•</span>
                        <span className="text-[#2c1711]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Image Slider Section */}
      <section className="relative h-[300px] overflow-hidden bg-black">
        <div className="absolute inset-0 flex animate-slideLeft">
          {[...sliderImages, ...sliderImages].map((image, index) => (
            <div
              key={index}
              className="relative w-[200px] h-full flex-shrink-0"
            >
              <Image
                src={image}
                alt={`Slider Image ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </section>
    </div>
  );
};

export default PoseGuide; 