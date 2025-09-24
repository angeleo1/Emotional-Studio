import Head from 'next/head'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useRef, useEffect, useState } from 'react'
import { NextPage } from 'next';
import Link from 'next/link';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const sections = [
  {
    title: 'Self Photo Studio',
    image: '/images/aboutus1.png',
    desc: 'Step into a space designed for self-expression and creativity. Our self photo studio offers a comfortable, private environment where you can capture your true self, experiment with different moods, and create lasting memories. Whether you come alone or with friends, every session is a unique journey of discovery and fun.'
  },
  {
    title: 'Why emotional?',
    image: '/images/aboutus2.jpg',
    desc: `At Emotional Studio, we believe that photography is more than just taking pictures—it's about capturing the essence of your emotions. Our team is dedicated to making you feel at ease, encouraging genuine smiles and authentic moments. We strive to create an atmosphere where every shot tells a heartfelt story.`
  },
  {
    title: 'The Records',
    image: '/images/aboutus3.png',
    desc: `Every photograph taken here becomes part of a larger narrative. Our growing archive is a visual diary, chronicling the laughter, tears, and milestones of our community. We cherish these records as a testament to the beauty and diversity of human experience.`
  },
  {
    title: 'Our Projects',
    image: '/images/aboutus4.jpg',
    desc: `Welcome to emotional studios, where we believe in capturing the most authentic and personal moments of your life in Melbourne. Our first project, emotional studios, was designed to be a private and free-spirited space where you can document your most cherished memories. We invite you to explore your emotions and create lasting, happy memories with us.

As part of our mission to 'Make Melbourne a fun place', we're already hard at work on our second project. Stay tuned—it's coming soon, and we can't wait to share it with you.`
  },
]

function MobileGalleryStyleSquigglyAnimation({ color = '#FF6100' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 모바일용 크기
    const SIZE = 200;
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 12; // 모바일용으로 줄임
      constructor() {
        this.initPoints();
      }
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: Math.random() * SIZE,
            y: Math.random() * SIZE,
            vx: (Math.random() - 0.5) * 2, // 모바일용으로 속도 줄임
            vy: (Math.random() - 0.5) * 2,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 3; // 모바일용으로 줄임
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 3;
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
        ctx.lineWidth = 1.5; // 모바일용으로 줄임
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 0; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 15; // 모바일용으로 줄임
          const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 15;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        ctx.stroke();
      }
    }
    let lines: SquigglyLine[] = [];
    for (let i = 0; i < 3; i++) { // 모바일용으로 줄임
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
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

const MobileAbout: NextPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <Head>
        <title>About Us | Emotional Studio</title>
        <meta name="description" content="Learn more about Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium mobile-text-responsive"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            About Us
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          <div className="max-w-md mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* 글래스모피즘 배경 */}
                <div className={`absolute inset-0 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ${
                  index % 2 === 0 ? 'bg-white/15' : 'bg-white/8'
                }`}></div>
                
                {/* 컨텐츠 */}
                <div className="relative p-6">
                  {/* 이미지 컨테이너 */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={400}
                    height={300}
                      className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                    {/* 이미지 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                  {/* 제목 */}
                <h2 
                    className="text-xl font-bold mb-4 text-center mobile-text-responsive"
                  style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
                >
                    {section.title === 'Self Photo Studio' && (
                      <>
                        <span className="text-white/90">Self </span>
                        <span className="text-[#FF6100] bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] bg-clip-text text-transparent">Photo</span>
                        <span className="text-white/90"> Studio</span>
                      </>
                    )}
                    {section.title === 'Why emotional?' && (
                      <>
                        <span className="text-[#FF6100] bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] bg-clip-text text-transparent">Why</span>
                        <span className="text-white/90"> emotional?</span>
                      </>
                    )}
                    {section.title === 'The Records' && (
                      <>
                        <span className="text-white/90">The </span>
                        <span className="text-[#FF6100] bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] bg-clip-text text-transparent">Records</span>
                      </>
                    )}
                    {section.title === 'Our Projects' && (
                      <>
                        <span className="text-[#FF6100] bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] bg-clip-text text-transparent">Our</span>
                        <span className="text-white/90"> Projects</span>
                      </>
                    )}
                </h2>
                
                  {/* 설명 텍스트 */}
                  <p className="text-white/70 leading-relaxed text-sm text-center font-light" style={{ whiteSpace: 'pre-wrap' }}>
                  {section.desc}
                </p>
                </div>
              </motion.div>
            ))}

            {/* SNS 아이콘들 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="group relative"
            >
              {/* 글래스모피즘 배경 */}
              <div className="absolute inset-0 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl bg-white/15"></div>
              
              {/* 컨텐츠 */}
              <div className="relative p-6">
                {/* 이미지 컨테이너 */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/aboutus5.png"
                    alt="Connect with Us"
                    width={400}
                    height={300}
                    className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* 이미지 오버레이 그라데이션 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* 제목 */}
                <h2 
                  className="text-xl font-bold mb-4 text-center mobile-text-responsive"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                  <span className="text-white/90">Connect with </span>
                  <span className="text-[#FF6100] bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] bg-clip-text text-transparent">Us</span>
                </h2>
                
                {/* 설명 텍스트 */}
                <p className="text-white/70 leading-relaxed text-sm text-center font-light mb-6">
                  Stay connected and be part of our journey! Follow us on social media for the latest updates, behind-the-scenes glimpses, and exclusive offers. We love engaging with our community and sharing the stories that make Emotional Studio a truly special place.
                </p>

                {/* SNS 아이콘들 */}
                <div className="flex justify-center gap-8">
                  <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                    <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                    </div>
                    <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                    </div>
                    <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                    </div>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61580301939061" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                    <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                  </a>
                  <a href="https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1?exSource=https://www.xiaohongshu.com/explore" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                    <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                      <img src="/images/rednote.png" alt="Red Note" className="w-full h-full object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(1000%) hue-rotate(20deg) brightness(100%) contrast(100%)' }} />
                    </div>
                    <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                      <img src="/images/rednote.png" alt="Red Note" className="w-full h-full object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)' }} />
                    </div>
                    <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                      <img src="/images/rednote.png" alt="Red Note" className="w-full h-full object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(7500%) hue-rotate(300deg) brightness(100%) contrast(100%)' }} />
                    </div>
                  </a>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <MobileContactButton />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
};

export default MobileAbout; 