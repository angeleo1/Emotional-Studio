import React, { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';

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
    
    // 데스크탑 우선 로직 - 모바일 리다이렉트를 지연시킴
    const checkAndRedirect = () => {
      try {
        // 데스크탑 우선: 더 큰 화면에서만 모바일로 리다이렉트
        // 480px 이하에서만 모바일로 리다이렉트 (더 작은 모바일 기기만)
        if (window.innerWidth <= 480) {
          // 지연된 리다이렉트로 SEO 크롤러가 데스크탑 버전을 먼저 인덱싱할 수 있도록 함
          setTimeout(() => {
            window.location.href = '/mobile';
          }, 1000);
          return;
        }
        
      } catch (error) {
        console.error('Mobile detection error:', error);
        // 에러 시에는 리다이렉트하지 않음 (데스크탑 버전 유지)
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