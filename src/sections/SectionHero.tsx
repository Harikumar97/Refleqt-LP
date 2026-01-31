import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constructRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(constructRef.current, { opacity: 0, scale: 0.4 });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(coreRef.current, { scale: 0, opacity: 0 });
      ringRefs.current.forEach(r => r && gsap.set(r, { scale: 0, opacity: 0 }));

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(constructRef.current, { opacity: 0, scale: 0.4 });
            gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
            gsap.set(ctaRef.current, { opacity: 0, y: 20 });
          }
        }
      });

      if (scrollTl.scrollTrigger) triggersRef.current.push(scrollTl.scrollTrigger);

      /* Phase 1: Opening statement (0-12%) */
      scrollTl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0);

      /* Phase 2: Construct emerges + text change (12-28%) */
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.04 }, 0.12);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.14);

      scrollTl.to(constructRef.current, { opacity: 1, scale: 1, duration: 0.12, ease: 'power2.out' }, 0.12);
      scrollTl.to(coreRef.current, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(1.7)' }, 0.14);
      ringRefs.current.forEach((r, i) => {
        if (r) scrollTl.to(r, { scale: 1, opacity: 1, duration: 0.1, ease: 'power2.out' }, 0.16 + i * 0.02);
      });

      /* Phase 3: Text change (28-45%) */
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.04 }, 0.28);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.30);
      scrollTl.to(constructRef.current, { scale: 1.05, duration: 0.15, ease: 'sine.inOut' }, 0.30);

      /* Phase 4: Final statement (45-65%) */
      scrollTl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.04 }, 0.45);
      scrollTl.to(text4Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.47);
      scrollTl.to(constructRef.current, { scale: 1.12, duration: 0.15, ease: 'power1.inOut' }, 0.50);

      /* Phase 5: CTA (65-80%) */
      scrollTl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.68);

      /* Hold */
      scrollTl.to({}, { duration: 0.18 });

    }, sectionRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-cream flex items-center justify-center"
    >
      <ParticleBackground isActive={true} />

      {/* ─── Geometric construct ─── */}
      <div
        ref={constructRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
      >
        <div className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px]">
          {/* Rings */}
          {[
            { inset: '0', color: 'refleqt-orange/15', dur: '28s', dir: '' },
            { inset: '10%', color: 'refleqt-gold/12', dur: '22s', dir: 'reverse' },
            { inset: '22%', color: 'refleqt-green/10', dur: '18s', dir: '' },
          ].map((ring, i) => (
            <div
              key={i}
              ref={el => { ringRefs.current[i] = el; }}
              className={`absolute rounded-full border border-${ring.color} will-change-transform`}
              style={{
                inset: ring.inset,
                animation: `spin-slow ${ring.dur} linear infinite ${ring.dir}`,
              }}
            />
          ))}

          {/* Core pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div ref={coreRef} className="relative will-change-transform">
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-refleqt-orange/8 flex items-center justify-center"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
              >
                <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-refleqt-orange/15 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-refleqt-orange/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Subtle axis lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 440 440">
            <line x1="220" y1="60" x2="220" y2="380" stroke="currentColor" strokeDasharray="3 8" className="text-refleqt-dark" />
            <line x1="60" y1="220" x2="380" y2="220" stroke="currentColor" strokeDasharray="3 8" className="text-refleqt-dark" />
          </svg>
        </div>
      </div>

      {/* ─── Text overlays ─── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div ref={text1Ref} className="text-center px-6 max-w-3xl">
          <h1 className="text-display-sm md:text-display text-refleqt-dark mb-3">
            Every business has a story.
          </h1>
          <p className="text-subhead text-refleqt-gray">
            Most marketing ignores it.
          </p>
        </div>

        <div ref={text2Ref} className="text-center px-6 absolute max-w-3xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark">
            Refleqt listens.
          </h2>
        </div>

        <div ref={text3Ref} className="text-center px-6 absolute max-w-3xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark">
            And builds intelligence.
          </h2>
        </div>

        <div ref={text4Ref} className="text-center px-6 absolute max-w-3xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-2">
            From understanding
          </h2>
          <p className="text-subhead gradient-text">
            comes precision.
          </p>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div ref={ctaRef} className="absolute bottom-16 md:bottom-20 z-40">
        <button
          onClick={scrollToNext}
          className="group flex items-center gap-3 bg-refleqt-orange text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium btn-lift shadow-glow-orange"
        >
          See How It Works
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
