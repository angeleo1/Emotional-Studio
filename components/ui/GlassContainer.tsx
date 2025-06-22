import React, { ReactNode } from 'react';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`glass-container ${className}`} {...props}>
      <div className="glass-filter"></div>
      <div className="glass-overlay"></div>
      <div className="glass-specular"></div>
      {children}
    </div>
  );
};

export default GlassContainer; 