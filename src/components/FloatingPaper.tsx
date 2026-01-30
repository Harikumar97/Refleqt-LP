import { forwardRef } from 'react';
import gsap from 'gsap';

interface FloatingPaperProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const FloatingPaper = forwardRef<HTMLImageElement, FloatingPaperProps>(
  ({ src, alt, className = '', style, delay = 0 }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`absolute will-change-transform gpu-accelerate ${className}`}
        style={{
          ...style,
          animationDelay: `${delay}s`,
        }}
        onLoad={(e) => {
          // Add subtle floating animation
          gsap.to(e.currentTarget, {
            y: '+=15',
            rotation: '+=3',
            duration: 4 + Math.random() * 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }}
      />
    );
  }
);

FloatingPaper.displayName = 'FloatingPaper';
