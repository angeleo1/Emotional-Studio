import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative z-50">
      {/* Desktop Navigation */}
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'border-black/10' : 'border-white/10'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-28">
            <Link href="/" className="relative">
              <span className="text-[8rem] font-herr-von text-white hover:text-[#ff6100] transition-colors duration-300 leading-none">
                e.st
              </span>
            </Link>
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <button className="text-white mix-blend-exclusion text-lg tracking-wider">
                  MENU
                </button>
                <div className="absolute top-full right-0 w-48 bg-black/20 backdrop-blur-md rounded-lg mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-white mix-blend-exclusion hover:bg-black/30 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 absolute right-4 top-4 rounded-full"
      >
        <svg
          className="h-6 w-6 text-white mix-blend-exclusion"
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="flex flex-col space-y-6 bg-black/20 backdrop-blur-md px-8 py-6 rounded-2xl">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-white mix-blend-exclusion hover:opacity-70 transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 