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
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={onLoad}
      quality={75}
      priority={true}
    />
  );
} 