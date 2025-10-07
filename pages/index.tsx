import React, { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import { isMobileDevice } from '../utils/deviceDetection';

// 에러 바운더리 컴포넌트
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-2xl mb-4">emotional studios</h1>
            <p className="mb-4">Something went wrong. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white text-black rounded"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // 즉시 모바일 체크 및 리다이렉트
    const checkAndRedirect = () => {
      try {
        // 정확한 모바일 감지 사용
        if (isMobileDevice()) {
          window.location.href = '/mobile';
          return;
        }
        
      } catch (error) {
        console.error('Mobile detection error:', error);
        // 에러 시에도 모바일로 가정하고 리다이렉트
        window.location.href = '/mobile';
      }
    };
    
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      checkAndRedirect();
    }
  }, []);

  // 클라이언트 사이드가 아니거나 모바일인 경우 로딩 화면
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl">emotional studios</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // 데스크탑용 인트로 애니메이션
  return <IntroAnimation onFinish={() => {}} />;
} 