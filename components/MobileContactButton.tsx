import React, { useState } from 'react';
import MobileContactModal from './MobileContactModal';

export default function MobileContactButton() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* 우하단 문의하기 아이콘 */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="w-10 h-10 rounded-full svg-glitch-wrapper text-white"
          onClick={() => setIsContactOpen(true)}
        >
          <div className="base-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
            </svg>
          </div>
          <div className="glitch-layer one">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
            </svg>
          </div>
          <div className="glitch-layer two">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
            </svg>
          </div>
        </button>
      </div>

      {/* 문의하기 모달 */}
      <MobileContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
} 