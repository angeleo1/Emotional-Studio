import React, { ReactNode } from 'react';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = '', ...props }) => {
  const glassStyle = {
    boxShadow: "0 6px 6px #111, 0 0 20px #111",
    background: '#111',
    ...props.style,
  };

  return (
    <div className={`glass-container ${className}`} {...props}>
      <div className="glass-filter"></div>
      <div className="glass-overlay"></div>
      <div className="glass-specular"></div>
      <div className="glass-content">{children}</div>
    </div>
  );
};

export default GlassContainer; 