import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Zap, Brain, ArrowRight, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contextLayers = [
  {
    id: 'static',
    icon: Database,
    label: 'Static Foundation',
    items: ['Business model', 'Target audience', 'Brand voice', 'Competitive positioning'],
    color: '#D4652A',
    bgOpacity: '0.06',
  },
  {
    id: 'dynamic',
    icon: Zap,
    label: 'Dynamic Layer',
    items: ['Market signals', 'Performance feedback', 'Strategic shifts', 'Customer intelligence'],
    color: '#C9A227',
    bgOpacity: '0.05',
  },
  {
    id: 'derived',
    icon: Brain,
    label: 'Derived Intelligence',
    items: ['Audience segments', 'Channel recommendations', 'Messaging effectiveness', 'Competitive gaps'],
    color: '#2D5A4A',
    bgOpacity: '0.05',
  },
];

export function SectionSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const constructRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cdtRef = useRef<HTMLDivElement>(null);
  const connRef = useRef<SVGSVGElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(constructRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(text1Ref.current, { opacity: 0, y: 30 });
      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(text3Ref.current, { opacity: 0, y: 30 });
      layerRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, x: -30, scale: 0.9 }));
      cdtRef.current && gsap.set(cdtRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });
      connRef.current && gsap.set(connRef.current, { opacity: 0, scaleX: 0 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.5,
        }
      });

      if (scrollTl.scrollTrigger) triggersRef.current.push(scrollTl.scrollTrigger);

      /* Phase 1: Construct + text1 + layers build (0-35%) */
      scrollTl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0);
      scrollTl.to(constructRef.current, { opacity: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.03);

      // Layers stagger in
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        scrollTl.to(el, { opacity: 1, x: 0, scale: 1, duration: 0.08, ease: 'back.out(1.3)' }, 0.08 + i * 0.06);
      });

      /* Phase 2: Text change + CDT appears (35-65%) */
      scrollTl.to(text1Ref.current, { opacity: 0, y: -15, duration: 0.04 }, 0.33);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.35);

      // Connector draws
      if (connRef.current) {
        scrollTl.to(connRef.current, { opacity: 1, scaleX: 1, duration: 0.06, ease: 'power2.out', transformOrigin: 'left center' }, 0.38);
      }

      // CDT morphs in
      if (cdtRef.current) {
        scrollTl.to(cdtRef.current, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(2)' }, 0.42);
        scrollTl.to(cdtRef.current, { borderRadius: '20px', duration: 0.04, ease: 'elastic.out(1,0.6)' }, 0.47);
      }

      /* Phase 3: Text change — compounding message (65-85%) */
      scrollTl.to(text2Ref.current, { opacity: 0, y: -15, duration: 0.04 }, 0.63);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.65);

      // Pulse all layers
      layerRefs.current.forEach((el) => {
        if (el) scrollTl.to(el, { scale: 1.02, duration: 0.08, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.68);
      });

      /* Hold */
      scrollTl.to({}, { duration: 0.12 });

    }, sectionRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="section-pinned bg-cream flex items-center justify-center overflow-hidden"
    >
      {/* Text overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-24 pointer-events-none z-20">
        <div ref={text1Ref} className="text-center px-6 max-w-2xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-3">
            It starts with context.
          </h2>
          <p className="text-body-lg text-refleqt-gray">
            Three layers of intelligence that evolve with your business.
          </p>
        </div>

        <div ref={text2Ref} className="text-center px-6 absolute top-16 md:top-24 max-w-2xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-3">
            Your dedicated AI trains.
          </h2>
          <p className="text-body-lg text-refleqt-gray">
            A Contextual Data Transformer built exclusively for your business.
          </p>
        </div>

        <div ref={text3Ref} className="text-center px-6 absolute top-16 md:top-24 max-w-2xl">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-3">
            Intelligence compounds.
          </h2>
          <p className="text-subhead gradient-text">
            Not templates. Understanding.
          </p>
        </div>
      </div>

      {/* ─── Central visualization ─── */}
      <div ref={constructRef} className="relative flex items-center justify-center gap-4 md:gap-8 mt-12 md:mt-16 z-10 px-4">
        {/* Context layers stack */}
        <div className="flex flex-col gap-2.5 md:gap-3">
          {contextLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.id}
                ref={el => { layerRefs.current[i] = el; }}
                className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 md:px-5 md:py-4 border border-black/[0.04] shadow-sm will-change-transform"
                style={{ borderLeftWidth: '3px', borderLeftColor: `${layer.color}60` }}
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${layer.color}${layer.bgOpacity === '0.06' ? '0F' : '0D'}` }}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: layer.color }} />
                </div>
                <div>
                  <span className="text-[11px] md:text-sm font-semibold text-refleqt-dark block">{layer.label}</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                    {layer.items.map((item, j) => (
                      <span key={j} className="text-[9px] md:text-[10px] text-refleqt-gray">{item}{j < layer.items.length - 1 ? ' ·' : ''}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector arrow */}
        <svg
          ref={connRef}
          className="flex-shrink-0 w-10 md:w-20 h-16 pointer-events-none will-change-transform"
          viewBox="0 0 80 60"
          fill="none"
          style={{ transformOrigin: 'left center' }}
        >
          <path d="M 4 30 C 30 30 50 30 72 30" stroke="rgba(212,101,42,0.2)" strokeWidth="1.5" strokeDasharray="4 3">
            <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.5s" repeatCount="indefinite" />
          </path>
          <polygon points="70,25 80,30 70,35" fill="rgba(212,101,42,0.3)" />
          <circle r="2" fill="#D4652A" opacity="0.4">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 4 30 C 30 30 50 30 72 30" />
          </circle>
        </svg>

        {/* CDT node */}
        <div ref={cdtRef} className="flex flex-col items-center will-change-transform">
          <div className="relative">
            {/* Outer pulse */}
            <div className="absolute -inset-4 md:-inset-6 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)', animation: 'pulse-glow 3s ease-in-out infinite' }} />
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white shadow-xl border-2 border-refleqt-gold/25 rounded-2xl flex items-center justify-center">
              <Cpu className="w-7 h-7 md:w-10 md:h-10 text-refleqt-gold" />
            </div>
          </div>
          <span className="mt-2 text-[10px] md:text-sm font-semibold text-refleqt-dark">Your CDT</span>
          <span className="text-[8px] md:text-xs text-refleqt-gray">Per-Customer AI</span>
          {/* Monthly cycle indicator */}
          <div className="mt-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-refleqt-gold/8 border border-refleqt-gold/15">
            <ArrowRight className="w-2.5 h-2.5 text-refleqt-gold/60" style={{ animation: 'spin-slow 3s linear infinite' }} />
            <span className="text-[8px] md:text-[9px] text-refleqt-gold/70 font-medium">Monthly reinforcement</span>
          </div>
        </div>
      </div>
    </section>
  );
}
