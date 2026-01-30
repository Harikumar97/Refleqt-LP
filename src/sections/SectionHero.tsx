import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const papersRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(silhouetteRef.current, { opacity: 0, scale: 0.8, y: 50 });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(papersRef.current?.children || [], { opacity: 0, scale: 0, rotation: -30 });

      // Create scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset when scrolling back to top
            gsap.set(silhouetteRef.current, { opacity: 0, scale: 0.8, y: 50 });
            gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30 });
            gsap.set(ctaRef.current, { opacity: 0, y: 20 });
            gsap.set(papersRef.current?.children || [], { opacity: 0, scale: 0, rotation: -30 });
          }
        }
      });

      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }

      // Phase 1: The Void (0-10%) - Text appears
      scrollTl.to(text1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out'
      }, 0);

      // Phase 2: Silhouette forms (10-25%)
      scrollTl.to(text1Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.1);
      scrollTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.12);
      
      scrollTl.to(silhouetteRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.15,
        ease: 'power2.out'
      }, 0.1);

      // Phase 3: Context accumulates (25-40%)
      scrollTl.to(text2Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.25);
      scrollTl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.27);

      // Phase 4: The Bloom (40-70%) - Papers emerge
      scrollTl.to(text3Ref.current, { opacity: 0, y: -20, duration: 0.05 }, 0.4);
      scrollTl.to(text4Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.42);

      // Papers bloom outward
      const papers = papersRef.current?.children;
      if (papers) {
        Array.from(papers).forEach((paper, i) => {
          const angle = (i / papers.length) * Math.PI * 2 - Math.PI / 2;
          const distance = 180 + Math.random() * 80;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance - 50;
          const rotation = (Math.random() - 0.5) * 40;

          scrollTl.to(paper, {
            opacity: 1,
            scale: 1,
            x,
            y,
            rotation,
            duration: 0.25,
            ease: 'power2.out'
          }, 0.45 + i * 0.02);
        });
      }

      // Phase 5: CTA appears (70-85%)
      scrollTl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power2.out'
      }, 0.7);

      // Hold until end
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

      {/* Silhouette */}
      <img
        ref={silhouetteRef}
        src="/images/silhouette-hero.png"
        alt=""
        className="absolute h-[60vh] md:h-[70vh] object-contain z-20 will-change-transform"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
      />

      {/* Floating papers */}
      <div ref={papersRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <img src="/images/paper-campaign.png" alt="" className="w-24 md:w-32 absolute" />
        <img src="/images/paper-calendar.png" alt="" className="w-20 md:w-28 absolute" />
        <img src="/images/card-lead-1.png" alt="" className="w-20 md:w-24 absolute rounded-lg shadow-card" />
        <img src="/images/card-micro-1.png" alt="" className="w-20 md:w-24 absolute rounded-lg shadow-card" />
        <img src="/images/card-website-1.png" alt="" className="w-20 md:w-24 absolute rounded-lg shadow-card" />
        <img src="/images/card-tech-1.png" alt="" className="w-20 md:w-24 absolute rounded-lg shadow-card" />
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
