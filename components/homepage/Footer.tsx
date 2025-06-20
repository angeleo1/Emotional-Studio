import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram className="w-8 h-8" />,
    url: 'https://instagram.com',
    color: 'hover:text-pink-500'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube className="w-8 h-8" />,
    url: 'https://youtube.com',
    color: 'hover:text-red-500'
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF className="w-8 h-8" />,
    url: 'https://facebook.com',
    color: 'hover:text-blue-500'
  }
];

export default function Footer() {
  return (
    <section className="relative py-8 sm:py-16 bg-[#191919]">
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="absolute -left-[200px] top-1/2 -translate-y-1/2 hidden lg:block">
          <span className="text-[17.5rem] font-herr-von text-[#FF4D00]">e.st</span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-base sm:text-xl">📍</span>
              </div>
              <div className="text-xs sm:text-sm text-white/80">123 Collins Street, Melbourne</div>
            </div>

            <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-base sm:text-xl">📞</span>
              </div>
              <div className="text-xs sm:text-sm text-white/80">+61 3 1234 5678</div>
            </div>

            <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-base sm:text-xl">✉️</span>
              </div>
              <div className="text-xs sm:text-sm text-white/80">info@emotionalstudio.com</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/10"></div>

          {/* Social Media */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative flex items-center justify-center">
                  <div className="text-white group-hover:text-[#ff6100] transition-colors duration-300">
                    {React.cloneElement(social.icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/60 tracking-wider">© 2024-2025 e.st. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
} 