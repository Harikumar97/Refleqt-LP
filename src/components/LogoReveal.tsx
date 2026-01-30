import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LogoRevealProps {
  onComplete: () => void;
}

export function LogoReveal({ onComplete }: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          setTimeout(onComplete, 500);
        }
      });

      // Frame 2: Line appears (0.5s)
      tl.fromTo(lineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.5
      );

      // Frame 3: Left text materializes (1.0s)
      tl.fromTo(leftTextRef.current?.querySelectorAll('.letter') || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        1.0
      );

      // Frame 4: Pulse travels down line (1.5s)
      tl.fromTo(pulseRef.current,
        { y: '-100%', opacity: 1 },
        { y: '100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' },
        1.5
      );

      // Frame 5: Right (mirrored) text appears (2.0s)
      tl.fromTo(rightTextRef.current?.querySelectorAll('.letter') || [],
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        2.0
      );

      // Frame 6: Line fades to separator, logo settles (2.5s)
      tl.to(lineRef.current,
        { opacity: 0.3, duration: 0.3, ease: 'power2.out' },
        2.5
      );

      // Frame 7: Background fades to cream (3.0s)
      tl.to(containerRef.current,
        { backgroundColor: '#F5F3EF', duration: 0.5, ease: 'power2.inOut' },
        3.0
      );

      tl.to([leftTextRef.current, rightTextRef.current, lineRef.current],
        { color: '#1A1A1A', duration: 0.3, ease: 'power2.out' },
        3.0
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-refleqt-dark transition-colors"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="relative flex items-center">
        {/* Left text: "refl" */}
        <div ref={leftTextRef} className="flex text-white text-5xl md:text-7xl font-light tracking-wider">
          {'refl'.split('').map((letter, i) => (
            <span key={i} className="letter opacity-0">
              {letter}
            </span>
          ))}
        </div>

        {/* Mirror line */}
        <div
          ref={lineRef}
          className="relative mx-2 md:mx-4 w-px h-16 md:h-20 bg-white origin-top"
          style={{ transform: 'scaleY(0)' }}
        >
          {/* Pulse effect */}
          <div
            ref={pulseRef}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-8 bg-white/60 blur-sm opacity-0"
          />
        </div>

        {/* Right text: "eqt" (mirrored styling) */}
        <div ref={rightTextRef} className="flex text-white text-5xl md:text-7xl font-light tracking-wider">
          {'eqt'.split('').map((letter, i) => (
            <span key={i} className="letter opacity-0">
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator (appears at end) */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          isComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-sm text-refleqt-gray tracking-wide">Scroll to begin</p>
        <div className="mt-2 w-px h-8 bg-refleqt-gray/40 mx-auto animate-bounce" />
      </div>
    </div>
  );
}
