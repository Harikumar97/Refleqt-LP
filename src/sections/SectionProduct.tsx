import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check, Calendar, ShoppingCart, Sparkles, PenTool,
  Users, Cpu, Send, ChevronRight, Zap, Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const campaignCards = [
  {
    id: 'lead',
    title: 'Lead Generation',
    description: 'Capture and nurture high-intent prospects',
    color: 'refleqt-orange',
    image: `${import.meta.env.BASE_URL}images/card-lead-1.png`,
  },
  {
    id: 'micro',
    title: 'Micro Campaign',
    description: 'Quick wins for immediate impact',
    color: 'refleqt-gold',
    image: `${import.meta.env.BASE_URL}images/card-micro-1.png`,
  },
  {
    id: 'website',
    title: 'Website Content',
    description: 'Complete pages that convert',
    color: 'refleqt-green',
    image: `${import.meta.env.BASE_URL}images/card-website-1.png`,
  },
  {
    id: 'technical',
    title: 'Technical Docs',
    description: 'Clear documentation for your product',
    color: 'refleqt-blue',
    image: `${import.meta.env.BASE_URL}images/card-tech-1.png`,
  },
];

/* ── Pipeline stages for the animated command center ── */
const pipelineStages = [
  { icon: ShoppingCart, label: 'Selected', color: '#D4652A' },
  { icon: Calendar,     label: 'Scheduled', color: '#C9A227' },
  { icon: PenTool,      label: 'Crafted', color: '#2D5A4A' },
  { icon: Eye,          label: 'Reviewed', color: '#3A5A7C' },
  { icon: Send,         label: 'Deployed', color: '#D4652A' },
];

const calendarDays = [
  { day: 'Mon', items: [{ color: '#D4652A40', h: 28 }] },
  { day: 'Tue', items: [{ color: '#C9A22740', h: 20 }, { color: '#2D5A4A40', h: 16 }] },
  { day: 'Wed', items: [{ color: '#D4652A40', h: 24 }] },
  { day: 'Thu', items: [{ color: '#3A5A7C40', h: 32 }] },
  { day: 'Fri', items: [{ color: '#C9A22740', h: 18 }, { color: '#D4652A40', h: 14 }] },
];

const teamNodes = [
  { label: 'Copywriter', initials: 'CW', bg: '#D4652A15', border: '#D4652A30' },
  { label: 'Designer', initials: 'DS', bg: '#C9A22715', border: '#C9A22730' },
  { label: 'Strategist', initials: 'ST', bg: '#2D5A4A15', border: '#2D5A4A30' },
];

export function SectionProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Marketplace cards stagger in ── */
      const cards = marketplaceRef.current?.querySelectorAll('.campaign-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 50 });
        const t = ScrollTrigger.create({
          trigger: marketplaceRef.current,
          start: 'top 75%',
          onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
          once: true,
        });
        triggersRef.current.push(t);
      }

      /* ── Command center elements stagger in ── */
      const els = commandRef.current?.querySelectorAll('.cc-anim');
      if (els) {
        gsap.set(els, { opacity: 0, y: 36 });
        const t = ScrollTrigger.create({
          trigger: commandRef.current,
          start: 'top 72%',
          onEnter: () => gsap.to(els, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out' }),
          once: true,
        });
        triggersRef.current.push(t);
      }
    }, sectionRef);

    return () => { triggersRef.current.forEach(st => st.kill()); triggersRef.current = []; ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="product" className="bg-cream">

      {/* ═══════════  MARKETPLACE  ═══════════ */}
      <div ref={marketplaceRef} className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-headline md:text-display-sm text-refleqt-dark mb-4">Your Marketplace</h2>
            <p className="text-body-lg text-refleqt-gray max-w-2xl mx-auto">
              Campaigns built for YOUR business. Browse what's recommended, select what fits your moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {campaignCards.map((card) => (
              <div
                key={card.id}
                className={`campaign-card group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${
                  selectedCard === card.id ? 'ring-2 ring-refleqt-orange scale-105' : ''
                }`}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className={`inline-block w-2 h-2 rounded-full bg-${card.color} mb-2`} />
                  <h3 className="text-lg font-semibold text-refleqt-dark mb-1">{card.title}</h3>
                  <p className="text-sm text-refleqt-gray">{card.description}</p>
                </div>
                {selectedCard === card.id && (
                  <div className="absolute inset-0 bg-refleqt-orange/10 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg"><Check className="w-6 h-6 text-refleqt-orange" /></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white px-8 py-3 btn-lift" disabled={!selectedCard}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedCard ? 'Add to Calendar' : 'Select a Campaign'}
            </Button>
          </div>
        </div>
      </div>

      {/* ═══════════  COMMAND CENTER  ═══════════ */}
      <div ref={commandRef} id="dashboard" className="py-24 md:py-32 bg-refleqt-dark overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16 md:mb-20 cc-anim">
            <h2 className="text-headline md:text-display-sm text-cream mb-4">Your Command Center</h2>
            <p className="text-body-lg text-gray-400 max-w-2xl mx-auto">
              Watch campaigns come alive. From selection to deployment — every step, animated in real time.
            </p>
          </div>

          {/* ── Animated Pipeline ── */}
          <div className="cc-anim mb-16 md:mb-20">
            <div className="relative flex items-center justify-between max-w-3xl mx-auto px-2">
              {/* Connecting line behind stages */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                {/* Animated pulse traveling the line */}
                <circle r="4" fill="#D4652A" opacity="0.6">
                  <animate attributeName="cx" values="10%;90%;10%" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="50%;50%;50%" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle r="8" fill="#D4652A" opacity="0.15">
                  <animate attributeName="cx" values="10%;90%;10%" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="50%;50%;50%" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>

              {pipelineStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border transition-all"
                      style={{
                        background: `${stage.color}12`,
                        borderColor: `${stage.color}30`,
                        animation: `pulse-glow 3s ease-in-out infinite ${i * 0.6}s`,
                      }}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stage.color }} />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide uppercase">{stage.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Two-column: Calendar + Team ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10">

            {/* ── Dynamic Calendar ── */}
            <div className="cc-anim bg-[#141414] rounded-2xl p-5 md:p-6 border border-white/[0.04]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-refleqt-gold" />
                  <span className="text-sm font-medium text-white">Campaign Calendar</span>
                </div>
                <span className="text-[11px] text-gray-600">This week</span>
              </div>

              <div className="flex gap-2">
                {calendarDays.map((d, di) => (
                  <div key={di} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-gray-600 font-medium">{d.day}</span>
                    <div className="w-full rounded-lg bg-white/[0.03] p-1.5 flex flex-col gap-1 min-h-[80px]">
                      {d.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="w-full rounded-md"
                          style={{
                            height: item.h,
                            background: item.color,
                            animation: `calendar-pulse 3s ease-in-out infinite ${di * 0.3 + ii * 0.5}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tiny animated ticker */}
              <div className="mt-4 flex items-center gap-2 overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-refleqt-green" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
                <div className="text-[11px] text-gray-500 whitespace-nowrap" style={{ animation: 'ticker-scroll 12s linear infinite' }}>
                  Lead Gen Campaign scheduled for Tuesday &nbsp;·&nbsp; Micro Campaign draft ready &nbsp;·&nbsp; Website content in review &nbsp;·&nbsp; Tech docs deployed
                </div>
              </div>
            </div>

            {/* ── Team + AI Collaboration ── */}
            <div className="cc-anim bg-[#141414] rounded-2xl p-5 md:p-6 border border-white/[0.04]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-refleqt-green" />
                  <span className="text-sm font-medium text-white">Your Team</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-refleqt-green" />
                  <span className="text-[11px] text-gray-500">All active</span>
                </div>
              </div>

              {/* Team nodes with connecting lines to central AI */}
              <div className="relative flex items-center justify-center py-6">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 160">
                  {/* Lines from each team node to the AI center */}
                  <path d="M 80 50 Q 160 50 200 80" fill="none" stroke="rgba(212,101,42,0.12)" strokeWidth="1.5" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 80 110 Q 160 110 200 80" fill="none" stroke="rgba(201,162,39,0.12)" strokeWidth="1.5" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="2.4s" repeatCount="indefinite" />
                  </path>
                  <path d="M 80 80 L 200 80" fill="none" stroke="rgba(45,90,74,0.12)" strokeWidth="1.5" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.8s" repeatCount="indefinite" />
                  </path>
                  {/* Lines from AI to output */}
                  <path d="M 200 80 Q 280 50 340 60" fill="none" stroke="rgba(212,101,42,0.1)" strokeWidth="1.5" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 200 80 Q 280 110 340 100" fill="none" stroke="rgba(212,101,42,0.1)" strokeWidth="1.5" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2.3s" repeatCount="indefinite" />
                  </path>
                  {/* Flowing dots */}
                  <circle r="2" fill="#D4652A" opacity="0.4">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80 50 Q 160 50 200 80" />
                  </circle>
                  <circle r="2" fill="#C9A227" opacity="0.4">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 80 110 Q 160 110 200 80" />
                  </circle>
                  <circle r="2" fill="#2D5A4A" opacity="0.4">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 80 80 L 200 80" />
                  </circle>
                </svg>

                {/* Team avatars — left */}
                <div className="flex flex-col gap-3 z-10">
                  {teamNodes.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold border"
                        style={{ background: t.bg, borderColor: t.border, color: t.border.replace('30', '') }}
                      >
                        {t.initials}
                      </div>
                      <span className="text-[11px] text-gray-500 hidden md:block">{t.label}</span>
                    </div>
                  ))}
                </div>

                {/* Central AI node */}
                <div className="mx-12 md:mx-16 z-10">
                  <div className="relative">
                    <div
                      className="absolute -inset-3 rounded-full border border-refleqt-orange/10"
                      style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                    />
                    <div className="w-14 h-14 rounded-2xl bg-refleqt-orange/10 border border-refleqt-orange/20 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-refleqt-orange" />
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-refleqt-orange font-medium tracking-wider uppercase whitespace-nowrap">AI Engine</span>
                  </div>
                </div>

                {/* Output — right */}
                <div className="flex flex-col gap-3 z-10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-refleqt-orange/50" />
                    <span className="text-[11px] text-gray-500">Campaigns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-refleqt-gold/50" />
                    <span className="text-[11px] text-gray-500">Deployments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Live Activity Feed ── */}
          <div className="cc-anim bg-[#141414] rounded-2xl p-5 md:p-6 border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-refleqt-orange" />
              <span className="text-sm font-medium text-white">Live Activity</span>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Lead Gen Campaign moved to production', accent: '#D4652A', time: '2m ago' },
                { text: 'AI generated 3 headline variants for Micro Campaign', accent: '#C9A227', time: '8m ago' },
                { text: 'Designer reviewed Website Content assets', accent: '#2D5A4A', time: '14m ago' },
                { text: 'Technical Docs deployed to knowledge base', accent: '#3A5A7C', time: '1h ago' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0"
                  style={{ animation: `feed-slide-in 0.5s ease-out ${i * 0.12}s both` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.accent }} />
                  <span className="text-sm text-gray-400 flex-1">{item.text}</span>
                  <span className="text-[10px] text-gray-600 flex-shrink-0">{item.time}</span>
                  <ChevronRight className="w-3 h-3 text-gray-700" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
