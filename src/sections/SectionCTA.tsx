import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function SectionCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 50 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 0.5,
        }
      });

      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }

      scrollTl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0);

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
      id="cta"
      className="min-h-screen bg-cream flex items-center justify-center py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Content */}
        <div ref={contentRef} className="will-change-transform">
          <h2 className="text-headline md:text-display text-refleqt-dark mb-6">
            See what Refleqt recommends for your business.
          </h2>

          <div className="space-y-3 mb-10">
            <p className="text-body-lg text-refleqt-gray">
              Complete our intake. About 15 minutes.
            </p>
            <p className="text-body-lg text-refleqt-gray">
              No commitment. No sales call.
            </p>
            <p className="text-subhead gradient-text">
              Discover what's possible.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-6">
            <Button
              size="lg"
              className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white px-8 md:px-12 py-6 text-lg font-medium btn-lift shadow-glow-orange animate-pulse-glow"
            >
              Start Your Intake
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Secondary CTA */}
          <button className="inline-flex items-center gap-2 text-refleqt-gray hover:text-refleqt-dark transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Questions? Talk to our team</span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-gray-200">
          <p className="text-sm text-refleqt-gray mb-4">Trusted by growing businesses</p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {['TechStart', 'GrowthCo', 'ScaleUp', 'Innovate'].map((company) => (
              <span key={company} className="text-lg font-light text-refleqt-dark">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
