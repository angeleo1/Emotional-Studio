import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useRef, useEffect } from 'react'

const sections = [
  {
    title: 'Self Photo Studio',
    image: '/images/aboutus1.png',
    desc: 'Step into a space designed for self-expression and creativity. Our self photo studio offers a comfortable, private environment where you can capture your true self, experiment with different moods, and create lasting memories. Whether you come alone or with friends, every session is a unique journey of discovery and fun.'
  },
  {
    title: 'Why emotional?',
    image: '/images/aboutus2.png',
    desc: `At Emotional Studio, we believe that photography is more than just taking pictures—it's about capturing the essence of your emotions. Our team is dedicated to making you feel at ease, encouraging genuine smiles and authentic moments. We strive to create an atmosphere where every shot tells a heartfelt story.`
  },
  {
    title: 'The Records',
    image: '/images/aboutus3.png',
    desc: `Every photograph taken here becomes part of a larger narrative. Our growing archive is a visual diary, chronicling the laughter, tears, and milestones of our community. We cherish these records as a testament to the beauty and diversity of human experience.`
  },
  {
    title: 'Our Projects',
    image: '/images/aboutus4.png',
    desc: `We are constantly exploring new creative projects and collaborations, from themed photo events to artistic exhibitions. Our studio is a hub for innovation, where ideas come to life and boundaries are pushed. Join us as we continue to expand the possibilities of visual storytelling.`
  },
  {
    title: 'Connect with Us',
    image: '/images/aboutus5.png',
    desc: `Stay connected and be part of our journey! Follow us on social media for the latest updates, behind-the-scenes glimpses, and exclusive offers. We love engaging with our community and sharing the stories that make Emotional Studio a truly special place.`
  },
]

function GalleryStyleSquigglyAnimation({ color = '#FF6100' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 고정 크기
    const SIZE = 320;
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 15;
      constructor() {
        this.initPoints();
      }
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: Math.random() * SIZE,
            y: Math.random() * SIZE,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 4;
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 4;
          if (point.x < 0) { point.x = 0; point.vx *= -1; }
          else if (point.x > SIZE) { point.x = SIZE; point.vx *= -1; }
          if (point.y < 0) { point.y = 0; point.vy *= -1; }
          else if (point.y > SIZE) { point.y = SIZE; point.vy *= -1; }
        });
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 0; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 20;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 20;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        ctx.stroke();
      }
    }
    let lines: SquigglyLine[] = [];
    for (let i = 0; i < 5; i++) {
      lines.push(new SquigglyLine());
    }
    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [color]);
  return (
    <div style={{ width: 320, height: 320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} width={320} height={320} style={{ display: 'block', background: 'transparent', pointerEvents: 'none', width: 320, height: 320 }} />
    </div>
  );
}

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Emotional Studio</title>
        <meta name="description" content="Learn more about Emotional Studio and our photography services" />
      </Head>
      {/* 좌측 하단 스크롤(화살표+텍스트) UI */}
      <div className="fixed left-6 bottom-[9.25rem] flex flex-col items-center z-20 select-none pointer-events-none">
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-down mb-8">
          <path d="M14 4V44" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M6 36L14 44L22 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="mt-2 text-white text-[1.1rem] tracking-widest font-semibold" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
          Scroll
        </span>
        <style jsx>{`
          @keyframes bounce-down {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(8px); }
            40% { transform: translateY(16px); }
            60% { transform: translateY(8px); }
            80% { transform: translateY(0); }
          }
          .animate-bounce-down {
            animation: bounce-down 1.5s infinite;
          }
        `}</style>
                    </div>
      <div style={{ minHeight: '100vh', background: '#111', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 0 4rem 0' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          {sections.map((section, i) => {
            const isReverse = i === 1 || i === 3;
            return (
              <>
                <div
                  key={section.title}
                  className={`about-section-row${isReverse ? ' reverse' : ''}`}
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: isReverse ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5rem',
                    margin: 0,
                    padding: 0,
                    borderBottom: 'none',
                    width: '100%',
                    background: (i === 0 || i === 2 || i === 4) ? '#242424' : '#181818',
                  }}
                >
                  <div className="about-img-col" style={{ flex: 1, display: 'flex', justifyContent: isReverse ? 'flex-end' : 'flex-start', alignItems: 'center', marginLeft: isReverse ? 0 : '-8rem', marginRight: isReverse ? '-8rem' : 0 }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: 900, height: '80vh', borderRadius: 32, overflow: 'hidden', boxShadow: '0 8px 40px #000a', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image src={section.image} alt={section.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="about-text-col" style={{ flex: 1, textAlign: isReverse ? 'right' : 'left', minWidth: 0, position: 'relative', marginRight: isReverse ? 0 : '-5rem', marginLeft: isReverse ? '-5rem' : 0 }}>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(4rem, 10vw, 8rem)',
                        lineHeight: 1.1,
                        fontWeight: 400,
                        fontStyle: 'normal',
                        color: '#fff',
                        margin: 0,
                        padding: 0,
                        position: 'absolute',
                        top: '-13rem',
                        left: 0,
                        width: '100%',
                        zIndex: 2,
                        textAlign: isReverse ? 'right' : 'left',
                      }}
                    >
                      {section.title.split(/(\s+)/).map((word, idx) => {
                        const highlightWords = ['photo', 'why', 'records', 'our', 'us'];
                        if (highlightWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase())) {
                          return <span key={idx} style={{ fontStyle: 'italic', color: '#ff6100' }}>{word}</span>;
                        }
                        return word;
                      })}
                    </h2>
                    <div style={{ fontSize: '1.7rem', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.8, color: '#eee', maxWidth: 700, marginTop: '5rem', position: 'relative', top: '5rem' }}>{section.desc}</div>
                    {i === sections.length-1 && (
                      <div style={{ display: 'flex', gap: '2.5rem', marginTop: '9.5rem' }}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
                          <div className="base-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
                          <div className="base-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
                          <div className="base-icon">
                            <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {i < sections.length-1 && <GalleryStyleSquigglyAnimation color={i===0||i===2?"#fff":"#FF6100"} />}
              </>
            );
          })}
        </div>
      </div>
    </>
  )
}