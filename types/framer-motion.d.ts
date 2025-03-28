import { HTMLMotionProps } from 'framer-motion'

declare module 'framer-motion' {
  export interface MotionProps extends HTMLMotionProps<'div'> {
    className?: string
  }
  
  export interface MotionAnchorProps extends HTMLMotionProps<'a'> {
    className?: string
    href?: string
    target?: string
    rel?: string
  }
} 