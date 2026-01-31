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
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: 0.5,
        }
      });

      if (scrollTl.scrollTrigger) triggersRef.current.push(scrollTl.scrollTrigger);

      scrollTl.to(contentRef.current, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
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
      className="min-h-screen bg-cream flex items-center justify-center py-20 md:py-28"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div ref={contentRef} className="will-change-transform">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-refleqt-orange mb-4">Get Started</p>

          <h2 className="text-headline md:text-display text-refleqt-dark mb-6">
            See what Refleqt recommends for your business.
          </h2>

          <div className="space-y-2 mb-10">
            <p className="text-body-lg text-refleqt-gray">
              Complete our intake. No commitment. No sales call.
            </p>
            <p className="text-subhead gradient-text">
              Discover what's possible.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-5">
            <Button
              size="lg"
              className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white px-8 md:px-12 py-6 text-lg font-medium btn-lift shadow-glow-orange"
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

          {/* Moat indicator */}
          <div className="mt-16 md:mt-20 pt-6 border-t border-black/[0.06]">
            <p className="text-xs text-refleqt-gray mb-3">The compounding advantage</p>
            <div className="flex items-center justify-center gap-6 md:gap-10">
              {[
                { time: 'Month 0', state: 'Basic context' },
                { time: 'Month 6', state: 'Rich intelligence' },
                { time: 'Month 18', state: 'Unreplicable moat' },
              ].map((stage, i) => (
                <div key={i} className="text-center">
                  <span className="text-[10px] md:text-xs font-semibold text-refleqt-dark block">{stage.time}</span>
                  <span className="text-[9px] md:text-[10px] text-refleqt-gray">{stage.state}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 mx-auto max-w-xs h-1 rounded-full bg-black/[0.03] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-refleqt-orange/20 via-refleqt-gold/40 to-refleqt-orange/70" style={{ width: '100%', animation: 'bar-fill 3s ease-out both' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
