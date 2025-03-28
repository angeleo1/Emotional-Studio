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
  const isHomePage = router.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const bannerHeight = 40 // 배너 높이
      if (offset > bannerHeight) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative z-50">
      {/* Event Banner - Only on Home Page */}
      {isHomePage && (
        <div className={`fixed top-0 left-0 right-0 bg-[#ff6100] text-white h-10 text-center text-sm font-medium z-[100] transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <Link href="/events" className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <span>🎉 Ongoing Event</span>
              <span className="text-[#fff0c6]">▶▶▶</span>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className={`fixed left-0 right-0 z-50 bg-[#2C1711] ${isHomePage ? (scrolled ? 'top-0' : 'top-10') : 'top-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-rock-salt text-[#fff0c6]">
              Emotional Studio
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`text-[#fff0c6] hover:text-[#ff6100] transition-colors duration-300 relative group ${router.pathname === item.href ? 'text-[#ff6100]' : ''}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff6100] transition-all duration-300 ${router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden p-2 absolute right-4 ${isHomePage ? (scrolled ? 'top-4' : 'top-14') : 'top-4'}`}
      >
        <svg
          className="h-6 w-6 text-[#fff0c6]"
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
        className={`fixed inset-0 z-40 bg-[#2C1711] transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`text-[#fff0c6] hover:text-[#ff6100] transition-colors duration-300 relative group ${router.pathname === item.href ? 'text-[#ff6100]' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff6100] transition-all duration-300 ${router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 