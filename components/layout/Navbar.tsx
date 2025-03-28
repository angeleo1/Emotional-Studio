import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const navItems = [
    { href: '/about', label: t('nav.about') },
    { href: '/service', label: t('nav.service') },
    { href: '/booking', label: t('nav.booking') },
    { href: '/store', label: 'POSE GUIDE' },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/support', label: t('nav.support') },
  ];

  return (
    <nav className="fixed w-full bg-[#5C3A21] z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-rock-salt text-[#fff0c6]">
            Emotional Studio
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[#fff0c6] hover:text-[#ff6100] transition-colors duration-300 relative group ${
                  router.pathname === item.href ? 'text-[#ff6100]' : ''
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff6100] transition-all duration-300 ${router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6 text-[#fff0c6]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            isOpen ? 'block' : 'hidden'
          } pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[#fff0c6] hover:text-[#ff6100] transition-colors duration-300 relative group ${
                  router.pathname === item.href ? 'text-[#ff6100]' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff6100] transition-all duration-300 ${router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 