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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error('Cloudinary cloud name is not configured');
    return null;
  }

  // Cloudinary URL 생성
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${src}`;
  
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
    />
  );
} 