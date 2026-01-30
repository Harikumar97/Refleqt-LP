import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ArrowRight, Sparkles, BarChart3, Megaphone, PenTool, Lightbulb, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const orbitNodes = [
  { icon: Sparkles, label: 'AI', delay: 0 },
  { icon: BarChart3, label: 'Analytics', delay: 1 },
  { icon: Megaphone, label: 'Campaigns', delay: 2 },
  { icon: PenTool, label: 'Content', delay: 3 },
  { icon: Lightbulb, label: 'Strategy', delay: 4 },
  { icon: Target, label: 'Targeting', delay: 5 },
];

export function SectionHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constructRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(constructRef.current, { opacity: 0, scale: 0.6 });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(constructRef.current, { opacity: 0, scale: 0.6 });
            gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
            gsap.set(ctaRef.current, { opacity: 0, y: 20 });
          }
        }
      });

      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }

      // Phase 1: Text appears (0-10%)
      scrollTl.to(text1Ref.current, {
        opacity: 1, y: 0, duration: 0.1, ease: 'power2.out'
      }, 0);

      // Phase 2: Construct forms + text change (10-25%)
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.1);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.12);
      scrollTl.to(constructRef.current, {
        opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out'
      }, 0.1);

      // Phase 3: Text change (25-40%)
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.25);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.27);

      // Phase 4: Text change (40-70%)
      scrollTl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.4);
      scrollTl.to(text4Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.42);

      // Construct pulses larger
      scrollTl.to(constructRef.current, {
        scale: 1.1, duration: 0.2, ease: 'power1.inOut'
      }, 0.45);

      // Phase 5: CTA appears (70-85%)
      scrollTl.to(ctaRef.current, {
        opacity: 1, y: 0, duration: 0.1, ease: 'power2.out'
      }, 0.7);

      // Hold
      scrollTl.to({}, { duration: 0.15 });

    }, sectionRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToSolution = () => {
    const element = document.getElementById('problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-cream flex items-center justify-center"
    >
      <ParticleBackground isActive={true} />

      {/* Orbital construct - sits behind text */}
      <div
        ref={constructRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
      >
        <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border border-refleqt-orange/20"
            style={{ animation: 'spin-slow 30s linear infinite' }}
          />

          {/* Middle ring */}
          <div
            className="absolute inset-8 md:inset-12 rounded-full border border-refleqt-gold/20"
            style={{ animation: 'spin-slow 24s linear infinite reverse' }}
          />

          {/* Inner ring */}
          <div
            className="absolute inset-16 md:inset-24 rounded-full border border-refleqt-green/20"
            style={{ animation: 'spin-slow 18s linear infinite' }}
          />

          {/* Center pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-refleqt-orange/10 flex items-center justify-center"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-refleqt-orange/20 flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-refleqt-orange/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Orbiting nodes */}
          {orbitNodes.map((node, i) => {
            const Icon = node.icon;
            const angle = (i / orbitNodes.length) * 360;
            const radius = 'calc(50% - 8px)';
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-0 h-0"
                style={{
                  animation: `spin-slow ${20 + i * 2}s linear infinite`,
                  animationDelay: `${-node.delay * 3}s`,
                }}
              >
                <div
                  className="absolute flex flex-col items-center gap-1"
                  style={{
                    transform: `translateY(-${i % 2 === 0 ? '160px' : '140px'}) translateX(-50%)`,
                  }}
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/80 shadow-sm border border-black/5 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      animation: `counter-spin ${20 + i * 2}s linear infinite`,
                      animationDelay: `${-node.delay * 3}s`,
                    }}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-refleqt-orange/70" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Subtle connecting lines (dashed) */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 480 480">
            <line x1="240" y1="80" x2="240" y2="400" stroke="currentColor" strokeDasharray="4 8" className="text-refleqt-dark" />
            <line x1="80" y1="240" x2="400" y2="240" stroke="currentColor" strokeDasharray="4 8" className="text-refleqt-dark" />
            <line x1="127" y1="127" x2="353" y2="353" stroke="currentColor" strokeDasharray="4 8" className="text-refleqt-dark" />
            <line x1="353" y1="127" x2="127" y2="353" stroke="currentColor" strokeDasharray="4 8" className="text-refleqt-dark" />
          </svg>
        </div>
      </div>

      {/* Text overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div ref={text1Ref} className="text-center px-6">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-4">
            Every business has a story.
          </h2>
          <p className="text-subhead text-refleqt-gray">
            Most marketing ignores it.
          </p>
        </div>

        <div ref={text2Ref} className="text-center px-6 absolute">
          <h2 className="text-display-sm md:text-display text-refleqt-dark">
            Refleqt listens.
          </h2>
        </div>

        <div ref={text3Ref} className="text-center px-6 absolute">
          <h2 className="text-display-sm md:text-display text-refleqt-dark">
            And understands.
          </h2>
        </div>

        <div ref={text4Ref} className="text-center px-6 absolute">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-2">
            From understanding...
          </h2>
          <p className="text-subhead gradient-text">
            comes creation.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="absolute bottom-20 md:bottom-24 z-40">
        <button
          onClick={scrollToSolution}
          className="group flex items-center gap-3 bg-refleqt-orange text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium btn-lift shadow-glow-orange"
        >
          See What Refleqt Recommends
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
