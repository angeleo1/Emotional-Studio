import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'SERVICE', href: '/services' },
  { name: 'BOOKING', href: '/booking' },
  { name: 'POSE GUIDE', href: '/store' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'SUPPORT', href: '/support' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const bannerHeight = 32 // 이벤트 배너의 높이 (py-2 = 16px * 2)
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
      {/* Event Banner */}
      <div className={`bg-[#2C1711] text-[#FFF0C6] text-sm py-2 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="container mx-auto px-4">
          <Link 
            href="/events" 
            className="flex items-center justify-center gap-2 hover:text-[#FF6100] transition-colors"
          >
            <span className="font-medium">Ongoing Events</span>
            <span className="text-[#FF6100]">▶ ▶ ▶</span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2c1711]/95 backdrop-blur-md border-b border-[#ff6100]/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-rock-salt text-[#fff0c6]">
              Emotional Studio
            </Link>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#fff0c6] hover:text-[#ff6100] transition-colors font-noto-sans"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 absolute right-4"
      >
        <svg
          className="h-6 w-6 text-[#2C1711]"
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
        className={`fixed inset-0 z-40 bg-[#2c1711]/95 backdrop-blur-md transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#fff0c6] hover:text-[#ff6100] transition-colors text-lg font-noto-sans font-bold"
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