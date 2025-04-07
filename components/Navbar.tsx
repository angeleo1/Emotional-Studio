'use client';

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Client-side only components
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false })

const navItems = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'SERVICE', href: '/services' },
  { name: 'BOOKING', href: '/booking' },
  { name: 'POSE GUIDE', href: '/pose-guide' },
  { name: 'GALLERY', href: '/gallery-landing' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'SUPPORT', href: '/support' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="relative z-50">
      <nav 
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'border-black/10' : 'border-white/10'} bg-transparent`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
            <Link href="/" className="relative">
              <span 
                ref={logoRef}
                className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-herr-von transition-all duration-300 leading-none text-white hover:text-[#ff6100]"
                style={{
                  position: 'relative',
                  zIndex: 1
                }}
              >
                e.st
              </span>
            </Link>
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-base sm:text-lg tracking-wider text-white hover:text-[#ff6100] transition-colors duration-300"
              >
                MENU
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#2c1711]/95 backdrop-blur-md transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#fff0c6] hover:text-[#ff6100] transition-colors text-lg sm:text-xl font-noto-sans font-bold"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 