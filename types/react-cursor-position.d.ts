declare module 'react-cursor-position' {
  import { ComponentType, ReactNode } from 'react';

  interface CursorPositionProps {
    children: ReactNode;
  }

  const CursorPosition: ComponentType<CursorPositionProps>;
  export default CursorPosition;
} 