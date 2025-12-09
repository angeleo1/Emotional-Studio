import React, { useState, useEffect } from 'react';

// GitHub Raw Image Base URL
const GITHUB_BASE = "https://raw.githubusercontent.com/angeleo1/google-images/main/";

interface SmartImageProps {
  baseName: string; 
  alt: string;
  className?: string;
  onImageError?: () => void;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({ baseName, alt, className = '', onImageError, priority = false }) => {
  const extensions = ['.jpeg', '.jpg', '.png'];
  const [extIndex, setExtIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setExtIndex(0);
    setHasError(false);
    setIsLoaded(false); 
  }, [baseName]);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      setExtIndex(prev => prev + 1);
    } else {
      setHasError(true);
      if (onImageError) {
        onImageError();
      }
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (hasError) {
    return null;
  }

  const currentFileName = `${baseName}${extensions[extIndex]}`;
  const src = `${GITHUB_BASE}${encodeURIComponent(currentFileName)}`;

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onError={handleError}
      onLoad={handleLoad}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
};

