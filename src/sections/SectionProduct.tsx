import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check, ShoppingCart, Sparkles, PenTool,
  Cpu, TrendingUp, Users, BarChart3,
  Megaphone, FileText, Globe, Mail,
  ArrowUpRight, Pencil, Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const campaignCards = [
  { id: 'lead', title: 'Lead Generation', description: 'Capture and nurture high-intent prospects', color: 'refleqt-orange', image: `${import.meta.env.BASE_URL}images/card-lead-1.png` },
  { id: 'micro', title: 'Micro Campaign', description: 'Quick wins for immediate impact', color: 'refleqt-gold', image: `${import.meta.env.BASE_URL}images/card-micro-1.png` },
  { id: 'website', title: 'Website Content', description: 'Complete pages that convert', color: 'refleqt-green', image: `${import.meta.env.BASE_URL}images/card-website-1.png` },
  { id: 'technical', title: 'Technical Docs', description: 'Clear documentation for your product', color: 'refleqt-blue', image: `${import.meta.env.BASE_URL}images/card-tech-1.png` },
];

export function SectionProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const ccRef = useRef<HTMLDivElement>(null);
  const ccHeaderRef = useRef<HTMLDivElement>(null);
  const morphBlobRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const labelRef1 = useRef<HTMLDivElement>(null);
  const labelRef2 = useRef<HTMLDivElement>(null);
  const labelRef3 = useRef<HTMLDivElement>(null);
  const progressRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Marketplace ── */
      const cards = marketplaceRef.current?.querySelectorAll('.campaign-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 50 });
        const t = ScrollTrigger.create({
          trigger: marketplaceRef.current, start: 'top 75%',
          onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
          once: true,
        });
        triggersRef.current.push(t);
      }

      /* ══════════ COMMAND CENTER ══════════ */
      const cc = ccRef.current;
      if (!cc) return;

      gsap.set(ccHeaderRef.current, { opacity: 0, y: 40 });
      gsap.set(morphBlobRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });
      gsap.set(phase1Ref.current, { opacity: 0, scale: 0.5 });
      gsap.set(phase2Ref.current, { opacity: 0, scale: 0.5, y: 40 });
      gsap.set(phase3Ref.current, { opacity: 0, scale: 0.5, y: 40 });
      gsap.set(labelRef1.current, { opacity: 0, y: 24 });
      gsap.set(labelRef2.current, { opacity: 0, y: 24 });
      gsap.set(labelRef3.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cc, start: 'top top', end: '+=400%',
          pin: true, scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            progressRef.current.forEach((dot, i) => {
              if (!dot) return;
              const active = (i === 0 && p < 0.35) || (i === 1 && p >= 0.35 && p < 0.65) || (i === 2 && p >= 0.65);
              dot.style.background = active ? 'rgba(212,101,42,0.6)' : 'rgba(255,255,255,0.1)';
            });
          },
        }
      });
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger);

      /* — Header — */
      tl.to(ccHeaderRef.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0);

      /* ═══ PHASE 1: AI populates your marketplace (0.06 → 0.32) ═══ */
      tl.to(morphBlobRef.current, { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(1.6)' }, 0.06);
      tl.to(morphBlobRef.current, { borderRadius: '28px', scaleX: 1.8, scaleY: 0.85, duration: 0.08, ease: 'power2.inOut' }, 0.13);
      tl.to(phase1Ref.current, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(1.2)' }, 0.17);
      tl.to(labelRef1.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.20);

      /* — Phase 1 out — */
      tl.to(phase1Ref.current, { opacity: 0, scale: 0.8, y: -30, duration: 0.05, ease: 'power3.in' }, 0.30);
      tl.to(labelRef1.current, { opacity: 0, y: -16, duration: 0.03 }, 0.30);

      /* ═══ PHASE 2: Human-crafted, not AI slop (0.33 → 0.62) ═══ */
      tl.to(morphBlobRef.current, { borderRadius: '32px', scaleX: 2.0, scaleY: 1.2, duration: 0.08, ease: 'elastic.out(1, 0.55)' }, 0.33);
      tl.to(phase2Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.07, ease: 'back.out(1.2)' }, 0.37);
      tl.to(labelRef2.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.40);

      /* — Phase 2 out — */
      tl.to(phase2Ref.current, { opacity: 0, scale: 0.8, y: -30, duration: 0.05, ease: 'power3.in' }, 0.60);
      tl.to(labelRef2.current, { opacity: 0, y: -16, duration: 0.03 }, 0.60);

      /* ═══ PHASE 3: Live analytics & micro-asset ROI (0.63 → 0.92) ═══ */
      tl.to(morphBlobRef.current, { borderRadius: '24px', scaleX: 2.4, scaleY: 1.3, duration: 0.1, ease: 'elastic.out(1, 0.5)' }, 0.63);
      tl.to(phase3Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.07, ease: 'back.out(1.2)' }, 0.67);
      tl.to(labelRef3.current, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.70);

      /* — Final pulse — */
      tl.to(morphBlobRef.current, { scale: 1.6, opacity: 0.35, duration: 0.06, ease: 'power1.out' }, 0.90);
      tl.to(morphBlobRef.current, { scale: 1.5, opacity: 0.5, duration: 0.04, ease: 'power1.inOut' }, 0.96);
      tl.to({}, { duration: 0.04 });

    }, sectionRef);

    return () => { triggersRef.current.forEach(st => st.kill()); triggersRef.current = []; ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="product" className="bg-cream">

      {/* ═══  MARKETPLACE  ═══ */}
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
              <div key={card.id}
                className={`campaign-card group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${selectedCard === card.id ? 'ring-2 ring-refleqt-orange scale-105' : ''}`}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}>
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

      {/* ═══  COMMAND CENTER  ═══ */}
      <div ref={ccRef} id="dashboard" className="min-h-screen bg-refleqt-dark flex flex-col items-center justify-center overflow-hidden relative">

        {/* Header */}
        <div ref={ccHeaderRef} className="absolute top-12 md:top-16 text-center z-20 px-6">
          <h2 className="text-headline md:text-display-sm text-cream mb-3">Your Command Center</h2>
          <p className="text-body text-gray-500 max-w-lg mx-auto">
            Scroll to see how Refleqt works for you.
          </p>
        </div>

        {/* Morphing blob */}
        <div ref={morphBlobRef}
          className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at 35% 35%, rgba(212,101,42,0.07) 0%, rgba(201,162,39,0.04) 45%, rgba(45,90,74,0.03) 75%, transparent 100%)',
            border: '1px solid rgba(255,255,255,0.03)',
          }}
        />

        {/* ─── PHASE 1: AI-populated personalized marketplace ─── */}
        <div ref={phase1Ref} className="absolute z-10 flex flex-col items-center will-change-transform">
          <div className="relative mb-8">
            {/* Central AI brain */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full border border-refleqt-orange/10" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }} />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-refleqt-orange/10 border border-refleqt-orange/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 md:w-7 md:h-7 text-refleqt-orange" />
                </div>
              </div>
            </div>

            {/* Curated items fanning out below AI */}
            <div className="flex gap-3 md:gap-4">
              {[
                { icon: Megaphone, color: '#D4652A', label: 'Lead Gen Funnel', price: '$2,400' },
                { icon: Sparkles, color: '#C9A227', label: 'Launch Blitz', price: '$1,800' },
                { icon: Globe, color: '#2D5A4A', label: 'SEO Pages', price: '$3,200' },
                { icon: Mail, color: '#3A5A7C', label: 'Email Sequence', price: '$1,400' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-[#161616] rounded-xl p-3 border border-white/[0.04] flex flex-col items-center gap-2 w-[76px] md:w-[88px] will-change-transform">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}12`, border: `1px solid ${item.color}20` }}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[9px] md:text-[10px] text-gray-400 font-medium text-center leading-tight">{item.label}</span>
                    <span className="text-[10px] md:text-[11px] font-semibold text-cream/70">{item.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Animated connection lines from AI to items */}
            <svg className="absolute top-14 left-1/2 -translate-x-1/2 w-[320px] md:w-[380px] h-[40px] pointer-events-none" viewBox="0 0 380 40">
              {[60, 140, 240, 320].map((x, i) => (
                <g key={i}>
                  <path d={`M 190 0 Q ${190 + (x - 190) * 0.3} 20 ${x} 40`} fill="none" stroke={`rgba(212,101,42,${0.08 + i * 0.02})`} strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="0 100;60 40;0 100" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </path>
                  <circle r="2" fill="#D4652A" opacity="0.4">
                    <animateMotion dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" path={`M 190 0 Q ${190 + (x - 190) * 0.3} 20 ${x} 40`} />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          <div ref={labelRef1} className="text-center">
            <p className="text-sm md:text-base font-medium text-cream/80">AI curates your marketplace</p>
            <p className="text-[11px] md:text-xs text-gray-600 mt-1.5 max-w-xs">Personalized campaign packages, priced and scoped to your business — not generic templates</p>
          </div>
        </div>

        {/* ─── PHASE 2: Human-crafted deliverables ─── */}
        <div ref={phase2Ref} className="absolute z-10 flex flex-col items-center will-change-transform">
          <div className="relative mb-8">
            <div className="flex items-center gap-5 md:gap-8">
              {/* The campaign being worked on */}
              <div className="bg-[#161616] rounded-xl p-4 border border-white/[0.04] w-[140px] md:w-[160px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-refleqt-orange/10 flex items-center justify-center">
                    <Megaphone className="w-3.5 h-3.5 text-refleqt-orange" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium">Lead Gen Funnel</span>
                </div>
                {/* Deliverable list */}
                <div className="space-y-2">
                  {['Landing page', 'Ad copy × 5', 'Email drip × 3', 'CTA variants'].map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full" style={{ background: i < 3 ? '#2D5A4A' : '#C9A22740' }} />
                      <span className="text-[9px] text-gray-500">{d}</span>
                      {i < 3 && <Check className="w-2.5 h-2.5 text-refleqt-green ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Flowing connection */}
              <svg width="48" height="60" className="flex-shrink-0">
                <path d="M 4 30 C 16 10 32 50 44 30" fill="none" stroke="rgba(45,90,74,0.2)" strokeWidth="1.5">
                  <animate attributeName="stroke-dasharray" values="0 80;80 0;0 80" dur="3s" repeatCount="indefinite" />
                </path>
                <circle r="2.5" fill="#2D5A4A" opacity="0.5">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 4 30 C 16 10 32 50 44 30" />
                </circle>
              </svg>

              {/* Human crafters */}
              <div className="bg-[#161616] rounded-xl p-4 border border-white/[0.04]">
                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="w-3.5 h-3.5 text-refleqt-green" />
                  <span className="text-[11px] text-gray-300 font-medium">Human team</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { role: 'Copywriter', initials: 'JM', color: '#D4652A', status: 'Writing' },
                    { role: 'Designer', initials: 'AK', color: '#C9A227', status: 'Designing' },
                    { role: 'Strategist', initials: 'RL', color: '#2D5A4A', status: 'Reviewing' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold border"
                        style={{ background: `${p.color}10`, borderColor: `${p.color}25`, color: `${p.color}` }}>
                        {p.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400">{p.role}</span>
                        <span className="text-[8px] font-medium" style={{ color: `${p.color}90` }}>{p.status}</span>
                      </div>
                      {i === 0 && <Pencil className="w-2.5 h-2.5 text-gray-600 ml-1" />}
                      {i === 1 && <PenTool className="w-2.5 h-2.5 text-gray-600 ml-1" />}
                      {i === 2 && <Eye className="w-2.5 h-2.5 text-gray-600 ml-1" />}
                    </div>
                  ))}
                </div>
                {/* AI assist badge — small, supportive, not dominant */}
                <div className="mt-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-refleqt-orange/5 border border-refleqt-orange/10">
                  <Cpu className="w-2.5 h-2.5 text-refleqt-orange/60" />
                  <span className="text-[8px] text-refleqt-orange/50 font-medium">AI-assisted, human-led</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={labelRef2} className="text-center">
            <p className="text-sm md:text-base font-medium text-cream/80">Real humans craft every deliverable</p>
            <p className="text-[11px] md:text-xs text-gray-600 mt-1.5 max-w-xs">Expert copywriters, designers, and strategists — AI supports them, never replaces them</p>
          </div>
        </div>

        {/* ─── PHASE 3: Live campaign analytics & micro-asset ROI ─── */}
        <div ref={phase3Ref} className="absolute z-10 flex flex-col items-center will-change-transform">
          <div className="relative mb-8">
            <div className="flex gap-3 md:gap-4">
              {/* Campaign-level metrics */}
              <div className="bg-[#161616] rounded-xl p-4 border border-white/[0.04] w-[170px] md:w-[200px]">
                <div className="flex items-center gap-1.5 mb-3">
                  <BarChart3 className="w-3.5 h-3.5 text-refleqt-orange" />
                  <span className="text-[11px] text-gray-300 font-medium">Campaign ROI</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-refleqt-green" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
                </div>

                {/* Mini chart — animated bars */}
                <div className="flex items-end gap-1 h-[52px] mb-3">
                  {[28, 35, 22, 42, 38, 50, 45, 55, 48, 60].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{
                      height: `${h}%`,
                      background: i >= 7 ? 'rgba(212,101,42,0.5)' : 'rgba(212,101,42,0.15)',
                      animation: `bar-grow 2s ease-out ${i * 0.1}s both`,
                    }} />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg md:text-xl font-semibold text-cream">4.2×</span>
                    <span className="text-[10px] text-gray-600 ml-1">ROAS</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-refleqt-green">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="text-[10px] font-medium">+23%</span>
                  </div>
                </div>
              </div>

              {/* Micro-asset ROI breakdown */}
              <div className="bg-[#161616] rounded-xl p-4 border border-white/[0.04] w-[200px] md:w-[240px]">
                <div className="flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-refleqt-gold" />
                  <span className="text-[11px] text-gray-300 font-medium">Asset Performance</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { asset: 'Landing page v2', impressions: '12.4K', conv: '3.8%', roi: '+$4,200', color: '#D4652A', bar: 85 },
                    { asset: 'Email drip #1', impressions: '8.1K', conv: '5.2%', roi: '+$2,900', color: '#C9A227', bar: 72 },
                    { asset: 'LinkedIn ad set', impressions: '22.3K', conv: '1.9%', roi: '+$3,100', color: '#2D5A4A', bar: 78 },
                    { asset: 'CTA variant B', impressions: '6.7K', conv: '6.1%', roi: '+$1,800', color: '#3A5A7C', bar: 60 },
                  ].map((a, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-gray-400">{a.asset}</span>
                        <span className="text-[9px] font-semibold text-refleqt-green">{a.roi}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${a.bar}%`,
                          background: a.color,
                          opacity: 0.5,
                          animation: `bar-fill 1.5s ease-out ${i * 0.15}s both`,
                        }} />
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[8px] text-gray-600">{a.impressions} imp</span>
                        <span className="text-[8px] text-gray-600">{a.conv} conv</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={labelRef3} className="text-center">
            <p className="text-sm md:text-base font-medium text-cream/80">Real-time analytics, down to every asset</p>
            <p className="text-[11px] md:text-xs text-gray-600 mt-1.5 max-w-xs">Campaign ROAS, micro-asset ROI, conversion rates — distilled and actionable, not vanity metrics</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {[0, 1, 2].map(i => (
            <div key={i} ref={el => { progressRef.current[i] = el; }}
              className="w-6 h-0.5 rounded-full transition-colors duration-300"
              style={{ background: i === 0 ? 'rgba(212,101,42,0.6)' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
