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
          <div className="flex items-center justify-between h-28">
            <Link href="/" className="relative">
              <span 
                ref={logoRef}
                className="text-[8rem] font-herr-von transition-all duration-300 leading-none text-white hover:text-[#ff6100]"
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
                className="text-lg tracking-wider text-white hover:text-[#ff6100] transition-colors duration-300"
              >
                MENU
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay - Only render on client side */}
      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <MotionDiv
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <div className="flex flex-col space-y-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className="text-white text-2xl tracking-wider hover:text-[#ff6100] transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      )}
    </div>
  )
} 