import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import Head from 'next/head'
import ContactPopup from '../components/ContactPopup'
import { FaCamera, FaHeart, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import CloudinaryImage from '../components/common/CloudinaryImage'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { gsap } from 'gsap'
// import CustomCursor from '../components/CustomCursor'
import BlendText from '../components/BlendText'

const DynamicDemoOne = dynamic(() => import("@/components/ui/demo").then(mod => mod.DemoOne), {
  ssr: false, // 이 컴포넌트를 서버에서 렌더링하지 않도록 설정
})

const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { suspense: false }
)

const Home: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [colorizedImages, setColorizedImages] = useState<{ [key: number]: boolean }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCocktail, setSelectedCocktail] = useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null)
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const fullScreenSectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isGlitchActive, setIsGlitchActive] = useState(false)
  const [turbVal, setTurbVal] = useState({ val: 0.000001 })
  const [turbValX, setTurbValX] = useState({ val: 0.000001 })

  const heroContents = [
    {
      image: '/images/hero-main-1_ob1dny.webp',
      title: 'e.st',
      subtitle: 'Creating Timeless Moments',
      showBookNow: true,
      showViewEvents: false
    },
    {
      image: '/images/service-studio-2_x3hfuh.webp',
      title: 'e.st',
      subtitle: 'Elevate Your Memories and the Studio Preserves Your Emotions',
      showBookNow: false,
      showViewEvents: true
    },
    {
      image: '/images/IMG_0190_z0su9m.webp',
      title: 'e.st',
      subtitle: 'Photographer in Action',
      showBookNow: true,
      showViewEvents: false
    }
  ]

  const cocktails = [
    {
      name: "PASSIONATE ORANGE",
      description: "A vibrant blend of fresh orange juice, passion fruit, and premium vodka, topped with a hint of mint. This refreshing cocktail captures the essence of summer in every sip.",
      image: "/images/Elegant Orange Cocktail.jpeg"
    },
    {
      name: "ECSTASY GLOW",
      description: "An enchanting mix of blue curacao, pineapple juice, and coconut rum, creating a mesmerizing purple hue. Served with a sugar rim and a slice of lime for the perfect balance of sweet and tangy.",
      image: "/images/Vibrant Purple Cocktail.jpeg"
    },
    {
      name: "RELIEF AURA",
      description: "A soothing combination of cucumber, mint, and gin, with a splash of elderflower liqueur. This refreshing cocktail is perfect for unwinding after a long day.",
      image: "/images/Springtime Cocktail Delight.jpeg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroContents.length)
      setIsImageLoaded(false)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const randomizeColor = () => {
      // 랜덤한 개수의 이미지를 선택 (1~3개)
      const numImages = Math.floor(Math.random() * 3) + 1
      const newColorizedImages: { [key: number]: boolean } = {}
      
      // 랜덤한 이미지 선택
      for (let i = 0; i < numImages; i++) {
        const randomIndex = Math.floor(Math.random() * galleryImages.length)
        newColorizedImages[randomIndex] = true
      }

      setColorizedImages(prev => ({
        ...prev,
        ...newColorizedImages
      }))

      // 랜덤한 시간 후에 다시 흑백으로 돌아가기 (1.5초 ~ 3초)
      const randomDuration = Math.random() * 1500 + 1500
      const id = setTimeout(() => {
        setColorizedImages(prev => {
          const updated = { ...prev }
          Object.keys(newColorizedImages).forEach(key => {
            delete updated[parseInt(key)]
          })
          return updated
        })
      }, randomDuration)
      setTimeoutId(id)
    }

    // 랜덤한 간격으로 효과 발생 (2초 ~ 4초)
    const randomInterval = () => {
      const nextInterval = Math.random() * 2000 + 2000
      const id = setTimeout(() => {
        randomizeColor()
        randomInterval()
      }, nextInterval)
      setTimeoutId(id)
    }

    randomInterval()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scale-100', 'opacity-100')
            entry.target.classList.remove('scale-110', 'opacity-0')
          } else {
            entry.target.classList.remove('scale-100', 'opacity-100')
            entry.target.classList.add('scale-110', 'opacity-0')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (fullScreenSectionRef.current) {
      observer.observe(fullScreenSectionRef.current)
    }

    return () => {
      if (fullScreenSectionRef.current) {
        observer.unobserve(fullScreenSectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!fullScreenSectionRef.current) return

      const section = fullScreenSectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 섹션이 뷰포트에 들어오기 시작할 때부터 끝날 때까지의 진행률 계산
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ))
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const galleryImages = [
    'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4',
    'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od',
    'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
    'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq',
    'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf',
    'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
    'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2',
    'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g',
    'v1/IMG_0190_z0su9m',
    'v1/IMG_0241_zxbg10'
  ]

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
  ]

  const handleCocktailClick = (cocktail: typeof cocktails[0]) => {
    setSelectedCocktail(cocktail)
  }

  useEffect(() => {
    if (selectedCocktail) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedCocktail])

  useEffect(() => {
    const glitchTimeline = () => {
      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        paused: true,
        onUpdate: () => {
          const filter = document.querySelector('#filter feTurbulence');
          if (filter) {
            filter.setAttribute('baseFrequency', `${turbVal.val} ${turbValX.val}`);
          }
        }
      });

      timeline
        .to(turbValX, 0.1, { val: 0.5 })
        .to(turbVal, 0.1, { val: 0.02 });
      timeline
        .set(turbValX, { val: 0.000001 })
        .set(turbVal, { val: 0.000001 });
      timeline
        .to(turbValX, 0.2, { val: 0.4 }, 0.4)
        .to(turbVal, 0.2, { val: 0.002 }, 0.4);
      timeline
        .set(turbValX, { val: 0.000001 })
        .set(turbVal, { val: 0.000001 });

      return {
        start: () => timeline.play(0),
        stop: () => timeline.pause()
      };
    };

    const btnGlitch = glitchTimeline();

    const handleMouseEnter = () => {
      setIsGlitchActive(true);
      btnGlitch.start();
    };

    const handleMouseLeave = () => {
      setIsGlitchActive(false);
      btnGlitch.stop();
    };

    const buttons = document.querySelectorAll('.glitch-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [turbVal, turbValX]);

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>e.st - Professional Photography</title>
        <meta name="description" content="Professional photography services for your special moments" />
      </Head>

      {/* 커스텀 커서 */}
      {/* <CustomCursor /> */}

      {/* Contact Button */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <div className="text-sm text-[#2C1711] font-medium">Contact Us</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-y-1/2"></div>
        </div>
        <button
          onClick={() => setIsContactOpen(true)}
          className="text-white w-14 h-14 rounded-full shadow-lg border-2 border-white hover:border-transparent transition-all duration-300 hover:scale-105 flex items-center justify-center relative group"
          style={{
            mixBlendMode: 'difference',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'transparent'
          }}
        >
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(0,255,255,0.3), rgba(183,0,255,0.3), rgba(255,0,255,0.3))',
              filter: 'blur(4px)',
              animation: 'hologram 2s linear infinite'
            }}
          />
          <div className="relative flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="relative z-10 group-hover:text-white transition-colors duration-300"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
              }}>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <main className="relative z-10 bg-black min-h-[calc(100vh-112px)]">
        <Suspense fallback={<div className="bg-black min-h-screen" />}>
          <DynamicDemoOne />
        </Suspense>
        {/* 3d블록 섹션에 View Events, Book Now 버튼 추가 */}
        
        {/* Emotional Moments Section */}
        <section className="relative py-4 sm:py-8 overflow-hidden">
          <div className="absolute inset-0 bg-[#191919]"></div>
          <div className="relative z-10 w-full">
            <div className="overflow-hidden w-full">
              <div className="flex whitespace-nowrap animate-slideLeft">
                {Array(20).fill("emotional moments").map((text, index) => (
                  <Link 
                    href="/gallery-landing" 
                    key={index} 
                    className="ml-4 sm:ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity moment-section"
                  >
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dm-serif ${[3, 8, 13, 18].includes(index) ? 'text-white' : 'text-[#FF4D00]'}`}>
                      {text}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
            {/* Gallery */}
            <div className="relative overflow-hidden -mx-[10%] sm:-mx-[20%]">
              <div className="flex animate-slideLeft">
                {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={index}
                    className="flex-none w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] relative mx-1 sm:mx-2 group"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff6100]/3 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <CloudinaryImage
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      width={400}
                      height={500}
                      className={`object-cover transition-all duration-[2000ms] group-hover:scale-[1.02] ${colorizedImages[index] ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 border border-[#ff6100]/5 group-hover:border-[#ff6100]/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#ff6100]/5" />
                    <div className="absolute -bottom-4 inset-x-4 h-12 bg-[#1a1a1a]/5 blur-xl rounded-full transform scale-x-[0.85] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Emotional Elixirs Section - emotional moments 형식으로, 배경만 주황색, 사진 흐름만 반대로 */}
        <section className="relative py-4 sm:py-8 overflow-hidden bg-[#FF4D00]">
          <div className="relative z-10 w-full">
            <div className="overflow-hidden w-full">
              <div className="flex whitespace-nowrap animate-slideRight">
                {Array(20).fill("e.st Collaboration").map((text, index) => (
                  <Link 
                    href="/gallery-landing" 
                    key={index} 
                    className="ml-4 sm:ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity elixir-section"
                  >
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dm-serif ${[3, 8, 13, 18].includes(index) ? 'text-white' : 'text-[#191919]'}`}>
                      {text}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
            {/* Gallery */}
            <div className="relative overflow-hidden -mx-[10%] sm:-mx-[20%]">
              <div className="flex animate-slideRight">
                {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={index}
                    className="flex-none w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] relative mx-1 sm:mx-2 group"
                  >
                    <CloudinaryImage
                      src={image}
                      alt={`Collaboration image ${index + 1}`}
                      width={400}
                      height={500}
                      className={`object-cover transition-all duration-[2000ms] group-hover:scale-[1.02]`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Video Section */}
        <section className="w-full h-screen relative bg-black flex items-center justify-center">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/4214.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* emotional studios text box */}
          <Link href="/pose-guide">
            <div
              style={{
                position: 'absolute',
                left: '5vw',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '90%',
                minWidth: 'auto',
                height: '110px',
                borderRadius: '2.5rem',
                background: '#fff',
                mixBlendMode: 'difference',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 5vw',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <span
                className="transparent-text emotional-studio-text"
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                POSE
              </span>
              <span
                className="transparent-text emotional-studio-text"
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1em',
                  marginLeft: '1em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                GUIDE
              </span>
            </div>
          </Link>
        </section>
        {/* Our Elixirs Section (최신 요구 반영) */}
        <section className="w-full min-h-[100vh] h-[100vh] bg-[#111] flex flex-col items-center justify-center relative overflow-hidden px-0">
          <div className="absolute inset-0 z-0" style={{background: 'linear-gradient(120deg, #111 0%, #181513 40%, #1a1816 100%)', opacity: 1}} />
          <h2 className="text-5xl sm:text-7xl font-extrabold text-center mb-6 tracking-widest neon-title z-10 relative" style={{letterSpacing:'0.08em', color:'#ff2222'}}>OUR ELIXIRS</h2>
          <div className="w-full flex flex-col items-center justify-center space-y-0 select-none z-10 relative" style={{height:'calc(100vh - 120px)'}}>
            {/* 1번째 칵테일 - 우측 무한 슬라이드 */}
            <div className="w-full overflow-hidden flex justify-start" style={{height:'24vw', minHeight:'180px', maxHeight:'340px', marginBottom:'-2vw'}}>
              <div className="w-full animate-slideRight flex">
                {[...Array(2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: 'clamp(4rem, 18vw, 15rem)',
                      color: '#ff2222',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[0])}
                  >
                    {cocktails[0].name}
                  </span>
                ))}
              </div>
            </div>
            {/* 2번째 칵테일 - 좌측 무한 슬라이드 */}
            <div className="w-full overflow-hidden flex justify-end" style={{height:'24vw', minHeight:'180px', maxHeight:'340px', marginBottom:'-2vw'}}>
              <div className="w-full animate-slideLeft flex">
                {[...Array(2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: 'clamp(4rem, 18vw, 15rem)',
                      color: '#ff00b8',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[1])}
                  >
                    {cocktails[1].name}
                  </span>
                ))}
              </div>
            </div>
            {/* 3번째 칵테일 - 우측 무한 슬라이드, 이름 AURA RELIEF로 수정 */}
            <div className="w-full overflow-hidden flex justify-start" style={{height:'24vw', minHeight:'180px', maxHeight:'340px'}}>
              <div className="w-full animate-slideRight flex">
                {[...Array(2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: 'clamp(4rem, 18vw, 15rem)',
                      color: '#7cffb2',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={()=>handleCocktailClick({...cocktails[2], name:'AURA RELIEF'})}
                  >
                    {'AURA RELIEF'}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{`
            .neon-title {
              color: #ff2222;
            }
            @keyframes slideRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            @keyframes slideLeft {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-slideRight {
              animation: slideRight 12s linear infinite;
            }
            .animate-slideLeft {
              animation: slideLeft 12s linear infinite;
            }
          `}</style>
        </section>
        {/* Cocktail Description Modal (복구된 버전) */}
        {selectedCocktail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedCocktail(null)}
            />
            <div className="relative w-full max-w-4xl mx-4 bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="relative w-full md:w-1/2 h-[320px] md:h-[500px] flex items-center justify-center bg-black">
                <Image
                  src={selectedCocktail.image}
                  alt={selectedCocktail.name}
                  fill
                  className="object-contain rounded-l-2xl"
                  priority
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-white mb-4">{selectedCocktail.name}</h3>
                <p className="text-white/80 text-lg leading-relaxed">{selectedCocktail.description}</p>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={() => setSelectedCocktail(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Footer Section */}
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
      </main>

      <svg style={{ position: 'absolute', width: 0, height: 0 }} width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="svg-sprite">
        <defs>
          <filter id="filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001 0.000001" numOctaves="1" result="warp" seed="1"></feTurbulence>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp"></feDisplacementMap>
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default Home 