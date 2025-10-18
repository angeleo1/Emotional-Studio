import React, { useEffect } from 'react';

interface CircleExpandLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const CircleExpandLoader: React.FC<CircleExpandLoaderProps> = ({
  isVisible,
  onComplete,
  duration = 1000
}) => {
  useEffect(() => {
    if (isVisible && onComplete) {
      // 즉시 완료 - 애니메이션 없음
      onComplete();
    }
  }, [isVisible, onComplete]);

  // 로더 UI 완전히 제거 - 즉시 전환
  return null;
};

export default CircleExpandLoader;
