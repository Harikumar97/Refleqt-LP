import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Users, Cpu, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    id: 'agencies',
    title: 'AGENCIES',
    subtitle: 'Expensive. Slow. They never quite "get" you.',
    icon: DollarSign,
    color: 'text-refleqt-gold',
    bgColor: 'bg-refleqt-gold/10',
    description: 'Heavy chains of invoices, endless calendar pages, and the weight of misalignment.',
  },
  {
    id: 'freelancers',
    title: 'FREELANCERS',
    subtitle: 'Inconsistent. Scattered. You become the project manager.',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Multiple voices, conflicting styles, and chaos that consumes your time.',
  },
  {
    id: 'ai-tools',
    title: 'AI TOOLS',
    subtitle: 'Fast but hollow. No memory. No strategy. Just output.',
    icon: Cpu,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    description: 'Glitches, resets, and content that lacks soul or continuity.',
  },
  {
    id: 'diy',
    title: 'DIY',
    subtitle: 'You have a business to run. Marketing keeps slipping.',
    icon: Briefcase,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    description: 'Pulled in every direction, fading into the background of your own priorities.',
  },
];

export function SectionProblem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      
      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        once: true
      });
      triggersRef.current.push(headerTrigger);

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 40 });
        
        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out'
            });
          },
          once: true
        });
        triggersRef.current.push(cardsTrigger);
      }

      // Question animation
      gsap.set(questionRef.current, { opacity: 0, scale: 0.9 });
      
      const questionTrigger = ScrollTrigger.create({
        trigger: questionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(questionRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        once: true
      });
      triggersRef.current.push(questionTrigger);

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
      id="problem"
      className="min-h-screen bg-cream py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <p className="text-body-lg text-refleqt-gray mb-4">
            But you've tried marketing before.
          </p>
          <h2 className="text-headline md:text-display-sm text-refleqt-dark">
            It didn't look like this.
          </h2>
        </div>

        {/* Problem Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="group relative bg-white rounded-xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${problem.bgColor} mb-4`}>
                  <Icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-refleqt-dark mb-2">
                  {problem.title}
                </h3>
                
                <p className={`text-sm md:text-base ${problem.color} font-medium mb-3`}>
                  {problem.subtitle}
                </p>
                
                <p className="text-sm text-refleqt-gray leading-relaxed">
                  {problem.description}
                </p>

                {/* Hover gradient */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${problem.bgColor}`} style={{ zIndex: -1 }} />
              </div>
            );
          })}
        </div>

        {/* The Question */}
        <div ref={questionRef} className="text-center">
          <h2 className="text-headline md:text-display-sm text-refleqt-dark mb-6">
            What if there was another way?
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-refleqt-orange to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
