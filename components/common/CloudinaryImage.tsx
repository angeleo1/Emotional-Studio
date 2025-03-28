import { CldImage } from 'next-cloudinary';

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
  console.log('Cloudinary Image Source:', src);
  console.log('Cloudinary Cloud Name:', cloudName);

  return (
    <CldImage
      src={`${cloudName}/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
      onLoad={onLoad}
      format="auto"
      quality="auto"
      crop="fill"
      gravity="auto"
    />
  );
} 