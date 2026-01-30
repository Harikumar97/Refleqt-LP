import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check, ShoppingCart, Sparkles, PenTool, Cpu,
  TrendingUp, Users, BarChart3, Megaphone,
  Globe, Mail, ArrowUpRight, Pencil, Eye,
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

  /* Command Center refs */
  const ccRef = useRef<HTMLDivElement>(null);
  const ccHeaderRef = useRef<HTMLDivElement>(null);
  /* Three columns */
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colCenterRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  /* Three blobs (one per column) */
  const blobLRef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const blobRRef = useRef<HTMLDivElement>(null);
  /* Connectors */
  const connectorLCRef = useRef<SVGSVGElement>(null);
  const connectorCRRef = useRef<SVGSVGElement>(null);
  /* Progress */
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

      /* Initial states */
      gsap.set(ccHeaderRef.current, { opacity: 0, y: 30 });

      gsap.set(blobLRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });
      gsap.set(blobCRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });
      gsap.set(blobRRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });

      gsap.set(colLeftRef.current, { opacity: 0, x: -60, scale: 0.7 });
      gsap.set(colCenterRef.current, { opacity: 0, y: 50, scale: 0.7 });
      gsap.set(colRightRef.current, { opacity: 0, x: 60, scale: 0.7 });

      gsap.set(connectorLCRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(connectorCRRef.current, { opacity: 0, scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cc, start: 'top top', end: '+=500%',
          pin: true, scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            progressRef.current.forEach((dot, i) => {
              if (!dot) return;
              const active = (i === 0 && p < 0.38) || (i === 1 && p >= 0.38 && p < 0.68) || (i === 2 && p >= 0.68);
              dot.style.background = active ? 'rgba(212,101,42,0.7)' : 'rgba(212,101,42,0.12)';
            });
          },
        }
      });
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger);

      /* ── Header ── */
      tl.to(ccHeaderRef.current, { opacity: 1, y: 0, duration: 0.05, ease: 'power3.out' }, 0);

      /* ═══════════════════════════════════════
         PHASE 1 — LEFT: AI ideation & curation
         ═══════════════════════════════════════ */
      // Blob L morphs in
      tl.to(blobLRef.current, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(1.8)' }, 0.04);
      tl.to(blobLRef.current, { borderRadius: '32px', scaleX: 1.15, scaleY: 1.1, duration: 0.06, ease: 'elastic.out(1, 0.6)' }, 0.09);
      // Column content
      tl.to(colLeftRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.08, ease: 'back.out(1.3)' }, 0.10);
      // Blob breathes
      tl.to(blobLRef.current, { scaleX: 1.2, scaleY: 1.05, duration: 0.12, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.18);

      /* ═══════════════════════════════════════
         PHASE 2 — CENTER: Human crafting
         ═══════════════════════════════════════ */
      // Connector L→C draws on
      tl.to(connectorLCRef.current, { opacity: 1, scaleX: 1, duration: 0.06, ease: 'power2.out', transformOrigin: 'left center' }, 0.34);
      // Blob C
      tl.to(blobCRef.current, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(1.8)' }, 0.36);
      tl.to(blobCRef.current, { borderRadius: '28px', scaleX: 1.1, scaleY: 1.15, duration: 0.06, ease: 'elastic.out(1, 0.55)' }, 0.40);
      // Column content
      tl.to(colCenterRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: 'back.out(1.3)' }, 0.40);
      // Left column slightly fades/shrinks to support focus
      tl.to(colLeftRef.current, { opacity: 0.5, scale: 0.92, duration: 0.08, ease: 'power2.out' }, 0.40);
      tl.to(blobLRef.current, { opacity: 0.3, scale: 0.9, duration: 0.08 }, 0.40);

      /* ═══════════════════════════════════════
         PHASE 3 — RIGHT: Analytics & ROI
         ═══════════════════════════════════════ */
      // Connector C→R
      tl.to(connectorCRRef.current, { opacity: 1, scaleX: 1, duration: 0.06, ease: 'power2.out', transformOrigin: 'left center' }, 0.64);
      // Blob R
      tl.to(blobRRef.current, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(1.8)' }, 0.66);
      tl.to(blobRRef.current, { borderRadius: '24px', scaleX: 1.15, scaleY: 1.2, duration: 0.06, ease: 'elastic.out(1, 0.5)' }, 0.70);
      // Column content
      tl.to(colRightRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.08, ease: 'back.out(1.3)' }, 0.70);
      // Center fades back
      tl.to(colCenterRef.current, { opacity: 0.5, scale: 0.92, duration: 0.08, ease: 'power2.out' }, 0.70);
      tl.to(blobCRef.current, { opacity: 0.3, scale: 0.9, duration: 0.08 }, 0.70);

      /* ═══ FINALE: All three glow together ═══ */
      tl.to(colLeftRef.current, { opacity: 1, scale: 1, duration: 0.06 }, 0.84);
      tl.to(colCenterRef.current, { opacity: 1, scale: 1, duration: 0.06 }, 0.84);
      tl.to(blobLRef.current, { opacity: 0.7, scale: 1, duration: 0.06 }, 0.84);
      tl.to(blobCRef.current, { opacity: 0.7, scale: 1, duration: 0.06 }, 0.84);
      tl.to(blobRRef.current, { opacity: 0.7, scaleX: 1.2, scaleY: 1.25, duration: 0.06, ease: 'elastic.out(1, 0.5)' }, 0.84);

      // Hold
      tl.to({}, { duration: 0.1 });

    }, sectionRef);

    return () => { triggersRef.current.forEach(st => st.kill()); triggersRef.current = []; ctx.revert(); };
  }, []);

  /* ────────────────── RENDER ────────────────── */
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

      {/* ═══════════════════════════════════════════════════
          COMMAND CENTER — Light theme, full-width 3-column
          ═══════════════════════════════════════════════════ */}
      <div
        ref={ccRef}
        id="dashboard"
        className="min-h-screen bg-cream flex flex-col items-center justify-center overflow-hidden relative"
      >
        {/* Subtle background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id="cc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.8" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cc-grid)" className="text-refleqt-dark" />
        </svg>

        {/* Header */}
        <div ref={ccHeaderRef} className="absolute top-10 md:top-14 text-center z-20 px-6">
          <h2 className="text-headline md:text-display-sm text-refleqt-dark mb-2">How Refleqt Works</h2>
          <p className="text-body text-refleqt-gray max-w-lg mx-auto">
            Three stages. One seamless flow.
          </p>
        </div>

        {/* ── Three-column layout ── */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex items-start justify-center gap-0 md:gap-2 z-10 mt-8">

          {/* ─── LEFT COLUMN: AI Ideation & Curation ─── */}
          <div className="relative flex-1 flex flex-col items-center">
            {/* Blob */}
            <div ref={blobLRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[300px] md:w-[280px] md:h-[360px] will-change-transform pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,101,42,0.06) 0%, rgba(212,101,42,0.02) 60%, transparent 100%)' }}
            />

            <div ref={colLeftRef} className="relative z-10 flex flex-col items-center pt-4 will-change-transform">
              {/* Stage label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-refleqt-orange">01</span>
                <div className="w-6 h-px bg-refleqt-orange/30" />
                <span className="text-[10px] font-medium tracking-wider uppercase text-refleqt-gray">Ideate</span>
              </div>

              {/* AI brain pulsing */}
              <div className="relative mb-5">
                <div className="absolute -inset-5 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,101,42,0.08) 0%, transparent 70%)', animation: 'pulse-glow 3s ease-in-out infinite' }} />
                <div className="absolute -inset-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,101,42,0.04) 0%, transparent 70%)', animation: 'pulse-glow 3s ease-in-out infinite 0.5s' }} />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg border border-refleqt-orange/15 flex items-center justify-center">
                  <Cpu className="w-7 h-7 md:w-9 md:h-9 text-refleqt-orange" />
                </div>
              </div>

              {/* Curated packages */}
              <div className="grid grid-cols-2 gap-2 md:gap-2.5 w-full max-w-[220px] md:max-w-[260px]">
                {[
                  { icon: Megaphone, color: '#D4652A', label: 'Lead Gen Funnel', price: '$2,400' },
                  { icon: Sparkles, color: '#C9A227', label: 'Launch Blitz', price: '$1,800' },
                  { icon: Globe, color: '#2D5A4A', label: 'SEO Pages', price: '$3,200' },
                  { icon: Mail, color: '#3A5A7C', label: 'Email Sequence', price: '$1,400' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl p-3 border border-black/[0.04] shadow-sm flex flex-col items-center gap-1.5 will-change-transform hover:shadow-md transition-shadow">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${item.color}0D` }}>
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-[9px] md:text-[10px] text-refleqt-dark font-medium text-center leading-tight">{item.label}</span>
                      <span className="text-[10px] font-semibold text-refleqt-orange/80">{item.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Animated connection lines from AI to grid */}
              <svg className="absolute top-[88px] md:top-[108px] left-1/2 -translate-x-1/2 w-[200px] md:w-[240px] h-[30px] pointer-events-none" viewBox="0 0 240 30">
                {[40, 100, 140, 200].map((x, i) => (
                  <g key={i}>
                    <path d={`M 120 0 C ${120 + (x - 120) * 0.4} 12 ${x} 18 ${x} 30`} fill="none" stroke={`rgba(212,101,42,${0.06 + i * 0.02})`} strokeWidth="1">
                      <animate attributeName="stroke-dasharray" values="0 80;50 30;0 80" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                    </path>
                    <circle r="1.5" fill="#D4652A" opacity="0.35">
                      <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={`M 120 0 C ${120 + (x - 120) * 0.4} 12 ${x} 18 ${x} 30`} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* Label */}
              <div className="mt-5 text-center px-2">
                <p className="text-xs md:text-sm font-medium text-refleqt-dark">AI curates your marketplace</p>
                <p className="text-[10px] md:text-[11px] text-refleqt-gray mt-1 leading-relaxed">Personalized packages scoped to your business — not templates</p>
              </div>
            </div>
          </div>

          {/* ─── CONNECTOR L → C ─── */}
          <svg ref={connectorLCRef} className="hidden md:block flex-shrink-0 w-[60px] h-[200px] self-center will-change-transform" viewBox="0 0 60 200" style={{ transformOrigin: 'left center' }}>
            <path d="M 0 100 C 20 60 40 140 60 100" fill="none" stroke="rgba(212,101,42,0.12)" strokeWidth="1.5" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 0 100 C 20 140 40 60 60 100" fill="none" stroke="rgba(201,162,39,0.08)" strokeWidth="1" strokeDasharray="3 5">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2.8s" repeatCount="indefinite" />
            </path>
            <circle r="3" fill="#D4652A" opacity="0.4">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 0 100 C 20 60 40 140 60 100" />
            </circle>
            <circle r="2" fill="#C9A227" opacity="0.3">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 0 100 C 20 140 40 60 60 100" />
            </circle>
          </svg>

          {/* ─── CENTER COLUMN: Human Crafting ─── */}
          <div className="relative flex-1 flex flex-col items-center">
            <div ref={blobCRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[300px] md:w-[280px] md:h-[380px] will-change-transform pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(45,90,74,0.06) 0%, rgba(45,90,74,0.02) 60%, transparent 100%)' }}
            />

            <div ref={colCenterRef} className="relative z-10 flex flex-col items-center pt-4 will-change-transform">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-refleqt-green">02</span>
                <div className="w-6 h-px bg-refleqt-green/30" />
                <span className="text-[10px] font-medium tracking-wider uppercase text-refleqt-gray">Craft</span>
              </div>

              {/* Campaign card */}
              <div className="bg-white rounded-xl p-4 border border-black/[0.04] shadow-sm w-full max-w-[240px] md:max-w-[270px] mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-refleqt-orange/8 flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-refleqt-orange" />
                  </div>
                  <div>
                    <span className="text-[11px] text-refleqt-dark font-semibold">Lead Gen Funnel</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-refleqt-green" />
                      <span className="text-[8px] text-refleqt-green font-medium">In production</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {['Landing page', 'Ad copy × 5', 'Email drip × 3', 'CTA variants'].map((d, i) => (
                    <div key={i} className="flex items-center gap-2 py-0.5">
                      <div className="w-3.5 h-3.5 rounded flex items-center justify-center" style={{ background: i < 3 ? 'rgba(45,90,74,0.1)' : 'rgba(201,162,39,0.1)' }}>
                        {i < 3 ? <Check className="w-2 h-2 text-refleqt-green" /> : <div className="w-1 h-1 rounded-full bg-refleqt-gold" />}
                      </div>
                      <span className={`text-[10px] ${i < 3 ? 'text-refleqt-dark' : 'text-refleqt-gray'}`}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human team */}
              <div className="bg-white rounded-xl p-4 border border-black/[0.04] shadow-sm w-full max-w-[240px] md:max-w-[270px]">
                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="w-3.5 h-3.5 text-refleqt-green" />
                  <span className="text-[11px] text-refleqt-dark font-semibold">Your Team</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { role: 'Copywriter', initials: 'JM', color: '#D4652A', status: 'Writing copy', icon: Pencil },
                    { role: 'Designer', initials: 'AK', color: '#C9A227', status: 'Crafting visuals', icon: PenTool },
                    { role: 'Strategist', initials: 'RL', color: '#2D5A4A', status: 'Reviewing flow', icon: Eye },
                  ].map((p, i) => {
                    const StatusIcon = p.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border"
                          style={{ background: `${p.color}08`, borderColor: `${p.color}20`, color: p.color }}>
                          {p.initials}
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] text-refleqt-dark font-medium">{p.role}</span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <StatusIcon className="w-2 h-2" style={{ color: `${p.color}80` }} />
                            <span className="text-[8px]" style={{ color: `${p.color}90` }}>{p.status}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-refleqt-orange/[0.04] border border-refleqt-orange/10">
                  <Cpu className="w-3 h-3 text-refleqt-orange/50" />
                  <span className="text-[9px] text-refleqt-orange/60 font-medium">AI-assisted · Human-led</span>
                </div>
              </div>

              <div className="mt-5 text-center px-2">
                <p className="text-xs md:text-sm font-medium text-refleqt-dark">Real humans craft every deliverable</p>
                <p className="text-[10px] md:text-[11px] text-refleqt-gray mt-1 leading-relaxed">AI supports them, never replaces them</p>
              </div>
            </div>
          </div>

          {/* ─── CONNECTOR C → R ─── */}
          <svg ref={connectorCRRef} className="hidden md:block flex-shrink-0 w-[60px] h-[200px] self-center will-change-transform" viewBox="0 0 60 200" style={{ transformOrigin: 'left center' }}>
            <path d="M 0 100 C 20 60 40 140 60 100" fill="none" stroke="rgba(45,90,74,0.12)" strokeWidth="1.5" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 0 100 C 20 140 40 60 60 100" fill="none" stroke="rgba(58,90,124,0.08)" strokeWidth="1" strokeDasharray="3 5">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2.8s" repeatCount="indefinite" />
            </path>
            <circle r="3" fill="#2D5A4A" opacity="0.4">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 0 100 C 20 60 40 140 60 100" />
            </circle>
            <circle r="2" fill="#3A5A7C" opacity="0.3">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 0 100 C 20 140 40 60 60 100" />
            </circle>
          </svg>

          {/* ─── RIGHT COLUMN: Live Analytics & ROI ─── */}
          <div className="relative flex-1 flex flex-col items-center">
            <div ref={blobRRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[300px] md:w-[280px] md:h-[380px] will-change-transform pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(58,90,124,0.06) 0%, rgba(58,90,124,0.02) 60%, transparent 100%)' }}
            />

            <div ref={colRightRef} className="relative z-10 flex flex-col items-center pt-4 will-change-transform">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-refleqt-blue">03</span>
                <div className="w-6 h-px bg-refleqt-blue/30" />
                <span className="text-[10px] font-medium tracking-wider uppercase text-refleqt-gray">Measure</span>
              </div>

              {/* Campaign ROI card */}
              <div className="bg-white rounded-xl p-4 border border-black/[0.04] shadow-sm w-full max-w-[240px] md:max-w-[270px] mb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-refleqt-orange" />
                    <span className="text-[11px] text-refleqt-dark font-semibold">Campaign ROI</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-refleqt-green" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
                    <span className="text-[8px] text-refleqt-green font-medium">Live</span>
                  </div>
                </div>

                <div className="flex items-end gap-[3px] h-[56px] mb-3">
                  {[28, 35, 22, 42, 38, 50, 45, 55, 48, 60, 52, 65].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all" style={{
                      height: `${h}%`,
                      background: i >= 9 ? 'rgba(212,101,42,0.55)' : 'rgba(212,101,42,0.12)',
                      animation: `bar-grow 2s ease-out ${i * 0.08}s both`,
                    }} />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-refleqt-dark">4.2×</span>
                    <span className="text-[10px] text-refleqt-gray ml-1.5">ROAS</span>
                  </div>
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-refleqt-green/8">
                    <ArrowUpRight className="w-3 h-3 text-refleqt-green" />
                    <span className="text-[10px] font-semibold text-refleqt-green">+23%</span>
                  </div>
                </div>
              </div>

              {/* Micro-asset ROI */}
              <div className="bg-white rounded-xl p-4 border border-black/[0.04] shadow-sm w-full max-w-[240px] md:max-w-[270px]">
                <div className="flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-refleqt-gold" />
                  <span className="text-[11px] text-refleqt-dark font-semibold">Asset Performance</span>
                </div>

                <div className="space-y-3">
                  {[
                    { asset: 'Landing page v2', imp: '12.4K', conv: '3.8%', roi: '+$4,200', color: '#D4652A', bar: 85 },
                    { asset: 'Email drip #1', imp: '8.1K', conv: '5.2%', roi: '+$2,900', color: '#C9A227', bar: 72 },
                    { asset: 'LinkedIn ad set', imp: '22.3K', conv: '1.9%', roi: '+$3,100', color: '#2D5A4A', bar: 78 },
                    { asset: 'CTA variant B', imp: '6.7K', conv: '6.1%', roi: '+$1,800', color: '#3A5A7C', bar: 60 },
                  ].map((a, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-refleqt-dark font-medium">{a.asset}</span>
                        <span className="text-[9px] font-bold text-refleqt-green">{a.roi}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/[0.03] overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${a.bar}%`, background: a.color, opacity: 0.45,
                          animation: `bar-fill 1.5s ease-out ${i * 0.15}s both`,
                        }} />
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[8px] text-refleqt-gray">{a.imp} impressions</span>
                        <span className="text-[8px] text-refleqt-gray">{a.conv} conversion</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 text-center px-2">
                <p className="text-xs md:text-sm font-medium text-refleqt-dark">Analytics down to every asset</p>
                <p className="text-[10px] md:text-[11px] text-refleqt-gray mt-1 leading-relaxed">Campaign ROAS, micro-asset ROI — actionable, not vanity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {[0, 1, 2].map(i => (
            <div key={i} ref={el => { progressRef.current[i] = el; }}
              className="w-8 h-0.5 rounded-full transition-colors duration-300"
              style={{ background: i === 0 ? 'rgba(212,101,42,0.7)' : 'rgba(212,101,42,0.12)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
