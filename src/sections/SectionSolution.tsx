import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, FileText, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const splashColors = [
  { id: 'orange', color: 'refleqt-orange', name: 'Campaigns', icon: Sparkles },
  { id: 'gold', color: 'refleqt-gold', name: 'Strategy', icon: Target },
  { id: 'green', color: 'refleqt-green', name: 'Structure', icon: FileText },
  { id: 'blue', color: 'refleqt-blue', name: 'Execution', icon: Calendar },
];

export function SectionSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const splashesRef = useRef<HTMLDivElement>(null);
  const artifactsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(profileRef.current, { opacity: 0, x: -100 });
      gsap.set(text1Ref.current, { opacity: 0, y: 30 });
      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(text3Ref.current, { opacity: 0, y: 30 });
      gsap.set(splashesRef.current?.children || [], { opacity: 0, scale: 0, rotation: -20 });
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

      // Phase 1: Profile emerges (0-15%)
      scrollTl.to(profileRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.15,
        ease: 'power2.out'
      }, 0);

      scrollTl.to(text1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out'
      }, 0.05);

      // Phase 2: First splash (15-35%)
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.15);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.18);

      // Splashes emerge
      const splashes = splashesRef.current?.children;
      if (splashes) {
        Array.from(splashes).forEach((splash, i) => {
          const directions = [
            { x: -80, y: -100, rotation: -15 },
            { x: 60, y: -80, rotation: 10 },
            { x: -60, y: 80, rotation: -10 },
            { x: 80, y: 60, rotation: 15 },
          ];
          const dir = directions[i % directions.length];

          scrollTl.to(splash, {
            opacity: 1,
            scale: 1,
            x: dir.x,
            y: dir.y,
            rotation: dir.rotation,
            duration: 0.15,
            ease: 'power2.out'
          }, 0.2 + i * 0.03);
        });
      }

      // Phase 3: Full composition (35-55%)
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.35);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.38);

      // Phase 4: Transformation to artifacts (55-80%)
      scrollTl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.55);

      // Splashes fade, artifacts appear
      if (splashes) {
        scrollTl.to(splashes, {
          opacity: 0,
          scale: 0.8,
          duration: 0.15,
          ease: 'power2.in'
        }, 0.6);
      }

      const artifacts = artifactsRef.current?.children;
      if (artifacts) {
        scrollTl.to(artifacts, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          stagger: 0.02,
          ease: 'power2.out'
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

      {/* Profile silhouette */}
      <div className="relative flex items-center justify-center">
        <img
          ref={profileRef}
          src="/images/profile-side.png"
          alt=""
          className="h-[50vh] md:h-[60vh] object-contain z-10 will-change-transform"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }}
        />

        {/* Paint splashes */}
        <div ref={splashesRef} className="absolute inset-0 flex items-center justify-center z-20">
          <img
            src="/images/splash-orange.png"
            alt=""
            className="w-32 md:w-48 absolute will-change-transform"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(212, 101, 42, 0.4))' }}
          />
          <img
            src="/images/splash-gold.png"
            alt=""
            className="w-28 md:w-40 absolute will-change-transform"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(201, 162, 39, 0.4))' }}
          />
          <img
            src="/images/splash-green.png"
            alt=""
            className="w-32 md:w-44 absolute will-change-transform"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(45, 90, 74, 0.4))' }}
          />
          <img
            src="/images/splash-blue.png"
            alt=""
            className="w-28 md:w-40 absolute will-change-transform"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(58, 90, 124, 0.4))' }}
          />
        </div>

        {/* Transformed artifacts (appear after splashes) */}
        <div ref={artifactsRef} className="absolute inset-0 flex items-center justify-center z-30">
          {splashColors.map((item, i) => {
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
                className={`absolute bg-white rounded-xl p-4 shadow-card will-change-transform`}
                style={{
                  transform: `translate(${pos.x}, ${pos.y})`,
                }}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-${item.color}/10 mb-2`}>
                  <Icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <p className="text-sm font-medium text-refleqt-dark">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color legend */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 z-40">
        {splashColors.map((item) => {
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
