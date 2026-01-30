import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, FileText, Calendar, ArrowRight, Cpu, User, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { id: 'orange', color: 'refleqt-orange', name: 'Campaigns', icon: Sparkles },
  { id: 'gold', color: 'refleqt-gold', name: 'Strategy', icon: Target },
  { id: 'green', color: 'refleqt-green', name: 'Structure', icon: FileText },
  { id: 'blue', color: 'refleqt-blue', name: 'Execution', icon: Calendar },
];

export function SectionSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constructRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const artifactsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(constructRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(text1Ref.current, { opacity: 0, y: 30 });
      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(text3Ref.current, { opacity: 0, y: 30 });
      gsap.set(artifactsRef.current?.children || [], { opacity: 0, y: 40, scale: 0.8 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
        }
      });

      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }

      // Phase 1: Construct + text appear (0-15%)
      scrollTl.to(constructRef.current, {
        opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out'
      }, 0);

      scrollTl.to(text1Ref.current, {
        opacity: 1, y: 0, duration: 0.1, ease: 'power2.out'
      }, 0.05);

      // Phase 2: Text change (15-35%)
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.15);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.18);

      // Construct scales up slightly
      scrollTl.to(constructRef.current, {
        scale: 1.05, duration: 0.15, ease: 'power1.inOut'
      }, 0.2);

      // Phase 3: Text change (35-55%)
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.35);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.38);

      // Phase 4: Artifacts appear (55-80%)
      scrollTl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.55);

      // Construct fades slightly
      scrollTl.to(constructRef.current, {
        opacity: 0.3, scale: 0.9, duration: 0.15, ease: 'power2.in'
      }, 0.6);

      const artifacts = artifactsRef.current?.children;
      if (artifacts) {
        scrollTl.to(artifacts, {
          opacity: 1, y: 0, scale: 1, duration: 0.15, stagger: 0.02, ease: 'power2.out'
        }, 0.65);
      }

      // Hold
      scrollTl.to({}, { duration: 0.2 });

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
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:pt-32 pointer-events-none z-20">
        <div ref={text1Ref} className="text-center px-6">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-4">
            It starts with you.
          </h2>
          <p className="text-subhead text-refleqt-gray">
            Your business. Your context. Your goals.
          </p>
        </div>

        <div ref={text2Ref} className="text-center px-6 absolute top-24 md:top-32">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-4">
            Refleqt learns your business.
          </h2>
          <p className="text-subhead text-refleqt-gray">
            Not a questionnaire. An understanding.
          </p>
        </div>

        <div ref={text3Ref} className="text-center px-6 absolute top-24 md:top-32">
          <h2 className="text-display-sm md:text-display text-refleqt-dark mb-4">
            AI architects your marketing.
          </h2>
          <p className="text-subhead text-refleqt-gray">
            Tailored to your business. Not templates. Yours.
          </p>
        </div>
      </div>

      {/* Central construct - data flow visualization */}
      <div
        ref={constructRef}
        className="relative flex items-center justify-center pointer-events-none z-10"
      >
        <div className="relative w-[360px] h-[360px] md:w-[500px] md:h-[500px]">
          {/* Background hexagonal grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 500 500">
            {/* Hex grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={70 * i + 40} x2="500" y2={70 * i + 40} stroke="currentColor" strokeWidth="0.5" className="text-refleqt-dark" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`v${i}`} x1={70 * i + 40} y1="0" x2={70 * i + 40} y2="500" stroke="currentColor" strokeWidth="0.5" className="text-refleqt-dark" />
            ))}
          </svg>

          {/* Central AI hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-6 rounded-full border-2 border-refleqt-orange/15"
                style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
              />
              <div
                className="absolute -inset-12 rounded-full border border-refleqt-orange/8"
                style={{ animation: 'pulse-glow 4s ease-in-out infinite 1s' }}
              />
              {/* Core */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-lg border border-refleqt-orange/20 flex items-center justify-center">
                <Cpu className="w-8 h-8 md:w-10 md:h-10 text-refleqt-orange" />
              </div>
            </div>
          </div>

          {/* Input nodes - left side */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6 text-refleqt-dark/40" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-refleqt-dark/40" />
            </div>
          </div>

          {/* Animated flow lines - left to center */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            {/* Input flow lines */}
            <path d="M 90 220 Q 180 220 250 250" fill="none" stroke="hsl(22 68% 49% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 90 280 Q 180 280 250 250" fill="none" stroke="hsl(22 68% 49% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite" />
            </path>

            {/* Output flow lines */}
            <path d="M 250 250 Q 320 180 410 160" fill="none" stroke="hsl(22 68% 49% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 250 250 Q 340 220 410 220" fill="none" stroke="hsl(45 66% 47% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.3s" repeatCount="indefinite" />
            </path>
            <path d="M 250 250 Q 340 280 410 280" fill="none" stroke="hsl(158 34% 26% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M 250 250 Q 320 320 410 340" fill="none" stroke="hsl(207 35% 35% / 0.15)" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.9s" repeatCount="indefinite" />
            </path>

            {/* Small flowing dots on paths */}
            <circle r="3" fill="hsl(22 68% 49% / 0.3)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 90 220 Q 180 220 250 250" />
            </circle>
            <circle r="3" fill="hsl(22 68% 49% / 0.3)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 90 280 Q 180 280 250 250" />
            </circle>
            <circle r="2.5" fill="hsl(22 68% 49% / 0.25)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 250 250 Q 320 180 410 160" />
            </circle>
            <circle r="2.5" fill="hsl(45 66% 47% / 0.25)">
              <animateMotion dur="3.3s" repeatCount="indefinite" path="M 250 250 Q 340 220 410 220" />
            </circle>
            <circle r="2.5" fill="hsl(158 34% 26% / 0.25)">
              <animateMotion dur="3.6s" repeatCount="indefinite" path="M 250 250 Q 340 280 410 280" />
            </circle>
            <circle r="2.5" fill="hsl(207 35% 35% / 0.25)">
              <animateMotion dur="3.9s" repeatCount="indefinite" path="M 250 250 Q 320 320 410 340" />
            </circle>
          </svg>

          {/* Output nodes - right side */}
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center"
                >
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 text-${item.color}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transformed artifacts (appear after construct fades) */}
      <div ref={artifactsRef} className="absolute inset-0 flex items-center justify-center z-30">
        {pillars.map((item, i) => {
          const Icon = item.icon;
          const positions = [
            { x: '-120%', y: '-60%' },
            { x: '100%', y: '-50%' },
            { x: '-110%', y: '40%' },
            { x: '90%', y: '50%' },
          ];
          const pos = positions[i];

          return (
            <div
              key={item.id}
              className="absolute bg-white rounded-xl p-4 shadow-card will-change-transform"
              style={{ transform: `translate(${pos.x}, ${pos.y})` }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-${item.color}/10 mb-2`}>
                <Icon className={`w-5 h-5 text-${item.color}`} />
              </div>
              <p className="text-sm font-medium text-refleqt-dark">{item.name}</p>
            </div>
          );
        })}
      </div>

      {/* Color legend */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 z-40">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
              <Icon className={`w-4 h-4 text-${item.color}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
