import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check, Calendar, ShoppingCart, Sparkles, PenTool,
  Users, Cpu, Send, Zap,
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

  /* ── Command Center refs ── */
  const ccRef = useRef<HTMLDivElement>(null);
  const ccHeaderRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);   // selection → schedule
  const phase2Ref = useRef<HTMLDivElement>(null);   // crafting
  const phase3Ref = useRef<HTMLDivElement>(null);   // deploy
  const morphBlobRef = useRef<HTMLDivElement>(null); // central morphing blob
  const labelRef1 = useRef<HTMLDivElement>(null);
  const labelRef2 = useRef<HTMLDivElement>(null);
  const labelRef3 = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Marketplace cards ── */
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

      /* ══════════ COMMAND CENTER — Morphing scroll timeline ══════════ */
      const cc = ccRef.current;
      if (!cc) return;

      // Initial states
      gsap.set(ccHeaderRef.current, { opacity: 0, y: 40 });
      gsap.set(morphBlobRef.current, { opacity: 0, scale: 0, borderRadius: '50%' });
      gsap.set(phase1Ref.current, { opacity: 0, scale: 0.6 });
      gsap.set(phase2Ref.current, { opacity: 0, scale: 0.6, y: 30 });
      gsap.set(phase3Ref.current, { opacity: 0, scale: 0.6, y: 30 });
      gsap.set(labelRef1.current, { opacity: 0, y: 20 });
      gsap.set(labelRef2.current, { opacity: 0, y: 20 });
      gsap.set(labelRef3.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cc,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 0.6,
        }
      });
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger);

      /* ── Phase 0 (0-8%): Header fades in ── */
      tl.to(ccHeaderRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0);

      /* ── Phase 1 (8-30%): Blob morphs in as circle → campaign cards morph from blob ── */
      // Blob appears as small circle
      tl.to(morphBlobRef.current, {
        opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(1.4)',
      }, 0.08);

      // Blob morphs from circle to rounded rectangle
      tl.to(morphBlobRef.current, {
        borderRadius: '24px', scaleX: 1.6, scaleY: 0.9,
        duration: 0.08, ease: 'power2.inOut',
      }, 0.16);

      // Phase 1 content fades in (campaign selection mini-cards)
      tl.to(phase1Ref.current, {
        opacity: 1, scale: 1, duration: 0.06, ease: 'power2.out',
      }, 0.2);
      tl.to(labelRef1.current, { opacity: 1, y: 0, duration: 0.04 }, 0.22);

      /* ── Phase 2 (30-55%): Selection morphs into Calendar+Crafting ── */
      // Phase 1 morphs out
      tl.to(phase1Ref.current, {
        opacity: 0, scale: 0.85, y: -20, duration: 0.06, ease: 'power2.in',
      }, 0.30);
      tl.to(labelRef1.current, { opacity: 0, y: -10, duration: 0.03 }, 0.30);

      // Blob morphs to wider shape
      tl.to(morphBlobRef.current, {
        borderRadius: '28px', scaleX: 2.2, scaleY: 1.1,
        duration: 0.1, ease: 'elastic.out(1, 0.6)',
      }, 0.34);

      // Phase 2 content rises into view
      tl.to(phase2Ref.current, {
        opacity: 1, scale: 1, y: 0, duration: 0.08, ease: 'power3.out',
      }, 0.38);
      tl.to(labelRef2.current, { opacity: 1, y: 0, duration: 0.04 }, 0.40);

      /* ── Phase 3 (55-80%): Crafting morphs into Deployment ── */
      tl.to(phase2Ref.current, {
        opacity: 0, scale: 0.85, y: -20, duration: 0.06, ease: 'power2.in',
      }, 0.55);
      tl.to(labelRef2.current, { opacity: 0, y: -10, duration: 0.03 }, 0.55);

      // Blob morphs to dispersed shape
      tl.to(morphBlobRef.current, {
        borderRadius: '50%', scaleX: 1.4, scaleY: 1.4,
        duration: 0.12, ease: 'elastic.out(1, 0.5)',
      }, 0.59);

      // Phase 3 content
      tl.to(phase3Ref.current, {
        opacity: 1, scale: 1, y: 0, duration: 0.08, ease: 'power3.out',
      }, 0.64);
      tl.to(labelRef3.current, { opacity: 1, y: 0, duration: 0.04 }, 0.66);

      /* ── Phase 4 (80-100%): Everything pulses then holds ── */
      tl.to(morphBlobRef.current, {
        scale: 1.5, opacity: 0.4, duration: 0.1, ease: 'power1.inOut',
      }, 0.82);
      tl.to(morphBlobRef.current, {
        scale: 1.3, opacity: 0.6, duration: 0.08, ease: 'power1.inOut',
      }, 0.90);

      // Hold
      tl.to({}, { duration: 0.1 });

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
              <div key={card.id}
                className={`campaign-card group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${selectedCard === card.id ? 'ring-2 ring-refleqt-orange scale-105' : ''}`}
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

      {/* ═══════════  COMMAND CENTER — MORPHING  ═══════════ */}
      <div
        ref={ccRef}
        id="dashboard"
        className="min-h-screen bg-refleqt-dark flex flex-col items-center justify-center overflow-hidden relative"
      >
        {/* Header */}
        <div ref={ccHeaderRef} className="absolute top-12 md:top-16 text-center z-20 px-6">
          <h2 className="text-headline md:text-display-sm text-cream mb-3">Your Command Center</h2>
          <p className="text-body text-gray-500 max-w-lg mx-auto">
            Scroll to watch your campaign journey unfold.
          </p>
        </div>

        {/* Central morphing blob — the shape that transitions between phases */}
        <div
          ref={morphBlobRef}
          className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at 40% 40%, rgba(212,101,42,0.08) 0%, rgba(201,162,39,0.05) 40%, rgba(45,90,74,0.04) 70%, transparent 100%)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        />

        {/* ── Phase 1: Campaign Selection ── */}
        <div ref={phase1Ref} className="absolute z-10 flex flex-col items-center">
          <div className="flex gap-3 md:gap-4 mb-6">
            {[
              { icon: Sparkles, color: '#D4652A', label: 'Lead Gen' },
              { icon: Zap, color: '#C9A227', label: 'Micro' },
              { icon: PenTool, color: '#2D5A4A', label: 'Content' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 will-change-transform">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border will-change-transform"
                    style={{
                      background: `${c.color}10`,
                      borderColor: `${c.color}25`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: c.color }} />
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">{c.label}</span>
                </div>
              );
            })}
          </div>
          <div ref={labelRef1} className="text-center">
            <p className="text-sm font-medium text-cream/80">Campaigns selected</p>
            <p className="text-[11px] text-gray-600 mt-1">Tailored to your business profile</p>
          </div>
        </div>

        {/* ── Phase 2: Calendar + Human Crafting ── */}
        <div ref={phase2Ref} className="absolute z-10 flex flex-col items-center">
          <div className="flex items-center gap-6 md:gap-10 mb-6">
            {/* Mini calendar */}
            <div className="bg-[#181818] rounded-xl p-3 border border-white/[0.04] will-change-transform">
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-refleqt-gold" />
                <span className="text-[10px] text-gray-400 font-medium">Schedule</span>
              </div>
              <div className="flex gap-1">
                {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[8px] text-gray-600">{d}</span>
                    <div className="w-6 h-12 rounded bg-white/[0.02] flex flex-col gap-0.5 p-0.5">
                      {i % 2 === 0 && <div className="w-full h-3 rounded-sm" style={{ background: '#D4652A25' }} />}
                      {i % 3 === 0 && <div className="w-full h-2 rounded-sm" style={{ background: '#C9A22720' }} />}
                      {i === 2 && <div className="w-full h-4 rounded-sm" style={{ background: '#2D5A4A20' }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow arrow */}
            <svg width="40" height="24" className="text-gray-700">
              <path d="M 4 12 Q 20 4 36 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <circle r="2" fill="#D4652A" opacity="0.5">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 4 12 Q 20 4 36 12" />
              </circle>
            </svg>

            {/* Human crafters */}
            <div className="bg-[#181818] rounded-xl p-3 border border-white/[0.04] will-change-transform">
              <div className="flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5 text-refleqt-green" />
                <span className="text-[10px] text-gray-400 font-medium">Crafting</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { initials: 'CW', bg: '#D4652A12', border: '#D4652A30' },
                  { initials: 'DS', bg: '#C9A22712', border: '#C9A22730' },
                  { initials: 'ST', bg: '#2D5A4A12', border: '#2D5A4A30' },
                ].map((t, i) => (
                  <div key={i} className="relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border"
                      style={{ background: t.bg, borderColor: t.border, color: t.border.replace('30', '80') }}
                    >
                      {t.initials}
                    </div>
                    {/* AI sparkle overlay */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-refleqt-orange/20 flex items-center justify-center">
                      <Cpu className="w-1.5 h-1.5 text-refleqt-orange" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={labelRef2} className="text-center">
            <p className="text-sm font-medium text-cream/80">Scheduled & crafted by humans + AI</p>
            <p className="text-[11px] text-gray-600 mt-1">Every deliverable handcrafted, AI-augmented</p>
          </div>
        </div>

        {/* ── Phase 3: Deployment Dispersal ── */}
        <div ref={phase3Ref} className="absolute z-10 flex flex-col items-center">
          <div className="relative w-[280px] h-[180px] md:w-[360px] md:h-[220px] mb-6">
            {/* Central AI node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-refleqt-orange/10 border border-refleqt-orange/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 md:w-7 md:h-7 text-refleqt-orange" />
              </div>
            </div>

            {/* Dispersal SVG — organic curves radiating outward */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 220">
              {/* Organic curves from center to each channel */}
              <path d="M 180 110 C 140 60 80 40 40 50" fill="none" stroke="rgba(212,101,42,0.15)" strokeWidth="1.5">
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 180 110 C 220 50 280 30 320 45" fill="none" stroke="rgba(201,162,39,0.15)" strokeWidth="1.5">
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2.3s" repeatCount="indefinite" />
              </path>
              <path d="M 180 110 C 130 150 70 170 30 175" fill="none" stroke="rgba(45,90,74,0.15)" strokeWidth="1.5">
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2.6s" repeatCount="indefinite" />
              </path>
              <path d="M 180 110 C 240 160 300 175 340 170" fill="none" stroke="rgba(58,90,124,0.15)" strokeWidth="1.5">
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2.1s" repeatCount="indefinite" />
              </path>

              {/* Dispersing dots along curves */}
              <circle r="3" fill="#D4652A" opacity="0.5">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 180 110 C 140 60 80 40 40 50" />
              </circle>
              <circle r="3" fill="#C9A227" opacity="0.5">
                <animateMotion dur="2.3s" repeatCount="indefinite" path="M 180 110 C 220 50 280 30 320 45" />
              </circle>
              <circle r="3" fill="#2D5A4A" opacity="0.5">
                <animateMotion dur="2.6s" repeatCount="indefinite" path="M 180 110 C 130 150 70 170 30 175" />
              </circle>
              <circle r="3" fill="#3A5A7C" opacity="0.5">
                <animateMotion dur="2.1s" repeatCount="indefinite" path="M 180 110 C 240 160 300 175 340 170" />
              </circle>

              {/* Secondary trailing dots */}
              <circle r="2" fill="#D4652A" opacity="0.2">
                <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 180 110 C 140 60 80 40 40 50" />
              </circle>
              <circle r="2" fill="#C9A227" opacity="0.2">
                <animateMotion dur="2.3s" begin="0.6s" repeatCount="indefinite" path="M 180 110 C 220 50 280 30 320 45" />
              </circle>
              <circle r="2" fill="#2D5A4A" opacity="0.2">
                <animateMotion dur="2.6s" begin="0.7s" repeatCount="indefinite" path="M 180 110 C 130 150 70 170 30 175" />
              </circle>
              <circle r="2" fill="#3A5A7C" opacity="0.2">
                <animateMotion dur="2.1s" begin="0.5s" repeatCount="indefinite" path="M 180 110 C 240 160 300 175 340 170" />
              </circle>
            </svg>

            {/* Channel endpoints */}
            {[
              { icon: Send, label: 'LinkedIn', x: 'left-0 top-4', color: '#D4652A' },
              { icon: Send, label: 'Twitter', x: 'right-0 top-2', color: '#C9A227' },
              { icon: Send, label: 'Email', x: 'left-0 bottom-2', color: '#2D5A4A' },
              { icon: Send, label: 'Website', x: 'right-0 bottom-4', color: '#3A5A7C' },
            ].map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div key={i} className={`absolute ${ch.x} flex items-center gap-1.5`}>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center border"
                    style={{ background: `${ch.color}10`, borderColor: `${ch.color}20` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: ch.color }} />
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium hidden md:block">{ch.label}</span>
                </div>
              );
            })}
          </div>
          <div ref={labelRef3} className="text-center">
            <p className="text-sm font-medium text-cream/80">Deployed everywhere, simultaneously</p>
            <p className="text-[11px] text-gray-600 mt-1">One click. All channels. Your brand, consistent.</p>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          <div className="w-6 h-0.5 rounded-full bg-refleqt-orange/40 cc-progress-dot" />
          <div className="w-6 h-0.5 rounded-full bg-white/10 cc-progress-dot" />
          <div className="w-6 h-0.5 rounded-full bg-white/10 cc-progress-dot" />
        </div>
      </div>
    </section>
  );
}
