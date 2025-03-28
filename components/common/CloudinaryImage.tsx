import Image from 'next/image';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  onLoad,
}: CloudinaryImageProps) {
  // Cloudinary URL 생성
  const cloudinaryUrl = `https://res.cloudinary.com/dnwp85rz6/image/upload/f_auto,q_auto/${src}`;
  
  return (
    <Image
      src={cloudinaryUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={onLoad}
      quality={75}
      priority={true}
      unoptimized={true}
    />
  );
} 