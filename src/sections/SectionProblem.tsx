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
    color: '#C9A227',
    description: 'Heavy retainers, endless meetings, and the weight of misalignment. Your context gets lost in their process.',
  },
  {
    id: 'freelancers',
    title: 'FREELANCERS',
    subtitle: 'Inconsistent. Scattered. You become the PM.',
    icon: Users,
    color: '#7C5BBF',
    description: 'Multiple voices, conflicting styles, and coordination overhead that consumes your time.',
  },
  {
    id: 'ai-tools',
    title: 'AI TOOLS',
    subtitle: 'Fast but hollow. No memory. No strategy.',
    icon: Cpu,
    color: '#3A5A7C',
    description: 'Generic output with no context persistence. Every session starts from zero.',
  },
  {
    id: 'diy',
    title: 'DIY',
    subtitle: 'You have a business to run.',
    icon: Briefcase,
    color: '#6B6B6B',
    description: 'Marketing keeps slipping down the priority list while competitors move.',
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
      gsap.set(headerRef.current, { opacity: 0, y: 25 });

      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        },
        once: true,
      });
      triggersRef.current.push(headerTrigger);

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 35, scale: 0.96 });
        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5, stagger: 0.1,
              ease: 'power2.out',
            });
          },
          once: true,
        });
        triggersRef.current.push(cardsTrigger);
      }

      gsap.set(questionRef.current, { opacity: 0, y: 20 });
      const questionTrigger = ScrollTrigger.create({
        trigger: questionRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(questionRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        },
        once: true,
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
    <section ref={sectionRef} id="problem" className="min-h-screen bg-cream py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <p className="text-body-lg text-refleqt-gray mb-3">
            You've tried marketing before.
          </p>
          <h2 className="text-headline md:text-display-sm text-refleqt-dark">
            It didn't look like this.
          </h2>
        </div>

        {/* Problem Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="group relative bg-white rounded-xl p-5 md:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 border border-black/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${problem.color}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: problem.color }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.15em] mb-1" style={{ color: problem.color }}>
                      {problem.title}
                    </h3>
                    <p className="text-base md:text-lg font-medium text-refleqt-dark mb-2">
                      {problem.subtitle}
                    </p>
                    <p className="text-sm text-refleqt-gray leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Question */}
        <div ref={questionRef} className="text-center">
          <h2 className="text-headline md:text-display-sm text-refleqt-dark mb-5">
            What if there was another way?
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-refleqt-orange to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
