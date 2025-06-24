import React from 'react';
import { LoaderCircleIcon, type LucideProps } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

type SpinnerProps = LucideProps & {
  size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({ className, size = 48, ...props }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={cn('animate-spin', className)}
      {...props}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="23"
          y="6"
          width="4"
          height="10"
          rx="2"
          fill="#FF6100"
          opacity={(i + 1) / 12}
          transform={`rotate(${i * 30} 25 25)`}
        />
      ))}
    </svg>
  </div>
);

export default Spinner; 