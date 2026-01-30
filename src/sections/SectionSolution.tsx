import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, FileText, Calendar, Cpu, User, Building2 } from 'lucide-react';

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
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(constructRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(text1Ref.current, { opacity: 0, y: 30 });
      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(text3Ref.current, { opacity: 0, y: 30 });

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

      // Phase 2: Text change (15-40%)
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.15);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.18);

      scrollTl.to(constructRef.current, {
        scale: 1.05, duration: 0.2, ease: 'power1.inOut'
      }, 0.2);

      // Phase 3: Text change (40-65%)
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.4);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.43);

      // Hold
      scrollTl.to({}, { duration: 0.35 });

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
        className="relative flex items-center justify-center pointer-events-none z-10 mt-16 md:mt-20"
      >
        <div className="relative w-[340px] h-[280px] md:w-[520px] md:h-[340px]">
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 520 340">
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={56 * i + 30} x2="520" y2={56 * i + 30} stroke="currentColor" strokeWidth="0.5" className="text-refleqt-dark" />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={60 * i + 20} y1="0" x2={60 * i + 20} y2="340" stroke="currentColor" strokeWidth="0.5" className="text-refleqt-dark" />
            ))}
          </svg>

          {/* Input nodes - left side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                <User className="w-5 h-5 md:w-6 md:h-6 text-refleqt-dark/40" />
              </div>
              <span className="text-xs text-refleqt-gray hidden md:block">Your Profile</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-refleqt-dark/40" />
              </div>
              <span className="text-xs text-refleqt-gray hidden md:block">Your Business</span>
            </div>
          </div>

          {/* Central AI hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div
                className="absolute -inset-5 rounded-full border-2 border-refleqt-orange/10"
                style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
              />
              <div
                className="absolute -inset-10 rounded-full border border-refleqt-orange/5"
                style={{ animation: 'pulse-glow 4s ease-in-out infinite 1s' }}
              />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg border border-refleqt-orange/20 flex items-center justify-center">
                <Cpu className="w-7 h-7 md:w-9 md:h-9 text-refleqt-orange" />
              </div>
            </div>
          </div>

          {/* Output nodes - right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs text-refleqt-gray hidden md:block text-right">{item.name}</span>
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                    <Icon className={`w-4 h-4 md:w-5 md:h-5 text-${item.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated flow lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 340" preserveAspectRatio="none">
            {/* Input to center */}
            <path d="M 80 140 Q 170 140 260 170" fill="none" stroke="hsl(22 68% 49% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 80 200 Q 170 200 260 170" fill="none" stroke="hsl(22 68% 49% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite" />
            </path>

            {/* Center to outputs */}
            <path d="M 260 170 Q 340 110 420 100" fill="none" stroke="hsl(22 68% 49% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 260 170 Q 350 150 420 148" fill="none" stroke="hsl(45 66% 47% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.3s" repeatCount="indefinite" />
            </path>
            <path d="M 260 170 Q 350 190 420 196" fill="none" stroke="hsl(158 34% 26% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M 260 170 Q 340 230 420 244" fill="none" stroke="hsl(207 35% 35% / 0.12)" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.9s" repeatCount="indefinite" />
            </path>

            {/* Flowing dots */}
            <circle r="2.5" fill="hsl(22 68% 49% / 0.3)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 80 140 Q 170 140 260 170" />
            </circle>
            <circle r="2.5" fill="hsl(22 68% 49% / 0.3)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 80 200 Q 170 200 260 170" />
            </circle>
            <circle r="2" fill="hsl(22 68% 49% / 0.2)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 260 170 Q 340 110 420 100" />
            </circle>
            <circle r="2" fill="hsl(45 66% 47% / 0.2)">
              <animateMotion dur="3.3s" repeatCount="indefinite" path="M 260 170 Q 350 150 420 148" />
            </circle>
            <circle r="2" fill="hsl(158 34% 26% / 0.2)">
              <animateMotion dur="3.6s" repeatCount="indefinite" path="M 260 170 Q 350 190 420 196" />
            </circle>
            <circle r="2" fill="hsl(207 35% 35% / 0.2)">
              <animateMotion dur="3.9s" repeatCount="indefinite" path="M 260 170 Q 340 230 420 244" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
