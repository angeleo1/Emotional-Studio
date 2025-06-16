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
  { name: 'SERVICES', href: '/services' },
  { name: 'BOOKING', href: '/booking' },
  { name: 'GALLERY', href: '/gallery-landing' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'SUPPORT', href: '/support' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div 
        ref={logoRef}
        style={{
          position: 'fixed',
          top: '-6rem',
          left: '5vw',
          zIndex: 9999,
          mixBlendMode: 'difference',
          color: '#ffffff',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
        onClick={() => window.location.href = '/'}
      >
        <div 
          className="inline-block"
          style={{
            padding: '0.5rem',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.transform = 'scale(1.05)';
              parent.style.color = '#ffffff';
              parent.style.filter = 'hue-rotate(180deg) brightness(1.2)';
              parent.style.textShadow = `
                0 0 10px rgba(255, 255, 255, 0.8),
                0 0 20px rgba(0, 255, 255, 0.6),
                0 0 30px rgba(183, 0, 255, 0.4),
                0 0 40px rgba(255, 0, 255, 0.4)
              `;
            }
          }}
          onMouseLeave={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.transform = 'scale(1)';
              parent.style.color = '#ffffff';
              parent.style.filter = 'none';
              parent.style.textShadow = 'none';
            }
          }}
        >
          <style>
            {`
              .logo-text {
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .logo-text:hover {
                filter: hue-rotate(180deg) brightness(1.2);
              }
            `}
          </style>
          <span 
            className="text-[235px] tracking-wider font-herr logo-text" 
            style={{ 
              fontFamily: 'Herr Von Muellerhoff, cursive', 
              fontWeight: '595', 
              WebkitTextStroke: '0.5px currentColor',
              letterSpacing: '0.05em',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            e.st
          </span>
        </div>
      </div>

      <div className="relative z-50">
        <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-transparent`} style={{ mixBlendMode: 'difference' }}>
          <div className="flex items-center justify-end h-28 w-full relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex flex-col items-center justify-center group focus:outline-none"
              style={{
                right: '6rem',
                top: '2.2rem',
                position: 'fixed',
                mixBlendMode: 'difference',
                color: '#ffffff',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget;
                btn.style.transform = 'scale(1.05)';
                btn.style.color = '#ffffff';
                btn.style.filter = 'hue-rotate(180deg) brightness(1.2)';
                btn.style.textShadow = `
                  0 0 10px rgba(255, 255, 255, 0.8),
                  0 0 20px rgba(0, 255, 255, 0.6),
                  0 0 30px rgba(183, 0, 255, 0.4),
                  0 0 40px rgba(255, 0, 255, 0.4)
                `;
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget;
                btn.style.transform = 'scale(1)';
                btn.style.color = '#ffffff';
                btn.style.filter = 'none';
                btn.style.textShadow = 'none';
              }}
            >
              {/* Hamburger lines */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(0,255,255,0.3), rgba(183,0,255,0.3), rgba(255,0,255,0.3))',
                  filter: 'blur(4px)',
                  animation: 'hologram 2s linear infinite',
                  zIndex: 1
                }}
              />
              <div className="relative flex flex-col justify-center items-center w-8 h-8 z-10">
                <span
                  className={`block w-8 h-1 bg-white rounded transition-all duration-400 ease-in-out
                    ${isOpen ? 'rotate-45 translate-y-3' : 'group-hover:rotate-45 group-hover:translate-y-3'}`}
                  style={{ marginBottom: '6px' }}
                />
                <span
                  className={`block w-8 h-1 bg-white rounded transition-all duration-400 ease-in-out
                    ${isOpen ? 'opacity-0' : 'group-hover:opacity-0'}`}
                  style={{ marginBottom: '6px' }}
                />
                <span
                  className={`block w-8 h-1 bg-white rounded transition-all duration-400 ease-in-out
                    ${isOpen ? '-rotate-45 -translate-y-3' : 'group-hover:-rotate-45 group-hover:-translate-y-3'}`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Full Screen Menu Overlay */}
        {mounted && (
          <AnimatePresence>
            {isOpen && (
              <MotionDiv
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8 relative" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: '42.5vw' }}>
                  <div className="flex flex-col items-center space-y-8">
                    {navItems.map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href}
                        className="text-white text-2xl tracking-wider transition-all duration-300 text-center group"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 0,
                          padding: 0,
                          boxShadow: 'none',
                          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textShadow = '0 0 8px #fff, 0 0 16px #0ff, 0 0 24px #b70fff';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.filter = 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #0ff)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textShadow = 'none';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.filter = 'none';
                        }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group transition-all duration-300 bg-transparent"
                    style={{
                      boxShadow: 'none',
                      backdropFilter: 'blur(6px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = '0 0 16px 0 rgba(0,255,255,0.15)';
                      e.currentTarget.style.transform = 'translateX(-50%) scale(1.08)';
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) {
                        svg.style.filter = [
                          'drop-shadow(0 0 12px #fff)',
                          'drop-shadow(0 0 24px #0ff)',
                          'drop-shadow(0 0 32px #b70fff)'
                        ].join(' ');
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) {
                        svg.style.filter = 'none';
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white transition-colors duration-300"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  )
} 