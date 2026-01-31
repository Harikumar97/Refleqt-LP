import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers, Brain, Map, Users, BarChart3,
  Database, Zap, RefreshCw, Shield, TrendingUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── System Architecture Nodes ─── */
const systemNodes = [
  { id: 'context', icon: Layers, label: 'Business Context', sub: '3-Layer Intelligence', color: '#D4652A' },
  { id: 'cdt', icon: Brain, label: 'Your CDT', sub: 'Per-Customer AI', color: '#C9A227' },
  { id: 'maps', icon: Map, label: 'Execution Maps', sub: 'Custom Strategy', color: '#2D5A4A' },
  { id: 'creators', icon: Users, label: 'Creators', sub: 'Anonymous Execution', color: '#3A5A7C' },
  { id: 'performance', icon: BarChart3, label: 'Performance', sub: 'Real-Time Attribution', color: '#D4652A' },
];

/* ─── Scroll Phases ─── */
const phases = [
  {
    title: 'Persistent Business Context',
    description: 'Three layers of intelligence — static foundation, dynamic signals, and AI-derived insights — accumulating continuously around your business.',
    details: [
      { icon: Database, label: 'Static Foundation', desc: 'Business model, ICP, brand voice' },
      { icon: Zap, label: 'Dynamic Layer', desc: 'Market signals, performance, shifts' },
      { icon: Brain, label: 'Derived Intelligence', desc: 'AI-synthesized recommendations' },
    ],
  },
  {
    title: 'Your Contextual Data Transformer',
    description: 'A dedicated AI model trained exclusively on YOUR data. Not shared prompts — a per-customer model that evolves its beliefs about your business monthly.',
    details: [
      { icon: RefreshCw, label: 'Monthly Reinforcement', desc: 'CDT retrains on new data' },
      { icon: Brain, label: 'Belief Evolution', desc: 'Probabilistic business understanding' },
      { icon: Shield, label: 'Validated Deployment', desc: 'Quality-checked before release' },
    ],
  },
  {
    title: 'Execution Maps Materialize',
    description: 'Complete marketing initiatives generated from deep business understanding. Not templates — custom-built for THIS business at THIS moment.',
    details: [
      { icon: Map, label: 'Contextualized', desc: 'Built from your CDT intelligence' },
      { icon: Zap, label: 'Signal-Driven', desc: 'Timed to market opportunities' },
      { icon: TrendingUp, label: 'Outcome-Targeted', desc: 'Success metrics pre-defined' },
    ],
  },
  {
    title: 'Anonymous Creators Execute',
    description: 'Performance-tracked human creators deliver every artifact. Reputation built on outcomes, not promises. AI assists. Quality compounds.',
    details: [
      { icon: Shield, label: 'Anonymized', desc: 'Removes bias, focuses on output' },
      { icon: TrendingUp, label: 'Performance-Tracked', desc: 'Reputation from real results' },
      { icon: Users, label: 'Tiered Creators', desc: 'Rising → Proven → Elite' },
    ],
  },
  {
    title: 'Results Compound',
    description: 'Every outcome feeds back into your Business Context. Your CDT retrains. Recommendations sharpen. The intelligence moat deepens with every cycle.',
    details: [
      { icon: BarChart3, label: 'Full Attribution', desc: 'Production → Deployment → Outcome' },
      { icon: RefreshCw, label: 'Closed Loop', desc: 'Performance trains your CDT' },
      { icon: TrendingUp, label: 'Compounding Moat', desc: '18 months = unreplicable intelligence' },
    ],
  },
];

export function SectionProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connRefs = useRef<(SVGSVGElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const feedbackRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Initial states */
      gsap.set(headerRef.current, { opacity: 0, y: 20 });
      textRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 25 }));
      nodeRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scale: 0, borderRadius: '50%' }));
      glowRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scale: 0 }));
      connRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scaleX: 0 }));
      detailRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 20 }));
      feedbackRef.current && gsap.set(feedbackRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            progressRef.current.forEach((dot, i) => {
              if (!dot) return;
              const phaseStart = i * 0.19;
              const active = p >= phaseStart && p < phaseStart + 0.19;
              const past = p >= phaseStart + 0.19;
              dot.style.background = active ? '#D4652A' : past ? 'rgba(212,101,42,0.5)' : 'rgba(212,101,42,0.12)';
              dot.style.transform = active ? 'scaleX(2.5)' : 'scaleX(1)';
            });
          },
        },
      });
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger);

      /* Header */
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.03, ease: 'power3.out' }, 0);

      /* ═══ Phase helper ═══ */
      const phase = (idx: number, start: number) => {
        const node = nodeRefs.current[idx];
        const glow = glowRefs.current[idx];
        const text = textRefs.current[idx];
        const detail = detailRefs.current[idx];
        const conn = idx > 0 ? connRefs.current[idx - 1] : null;
        const prevText = idx > 0 ? textRefs.current[idx - 1] : null;
        const prevDetail = idx > 0 ? detailRefs.current[idx - 1] : null;

        /* Fade out previous text + detail */
        if (prevText) tl.to(prevText, { opacity: 0, y: -15, duration: 0.025 }, start);
        if (prevDetail) tl.to(prevDetail, { opacity: 0, y: -10, duration: 0.025 }, start);

        /* Dim previous nodes */
        if (idx > 0) {
          for (let j = 0; j < idx; j++) {
            const prevGlow = glowRefs.current[j];
            if (prevGlow) tl.to(prevGlow, { opacity: 0.15, scale: 0.8, duration: 0.03 }, start + 0.01);
          }
        }

        /* Draw connector */
        if (conn) {
          tl.to(conn, { opacity: 1, scaleX: 1, duration: 0.04, ease: 'power2.out', transformOrigin: 'left center' }, start + 0.01);
        }

        /* Node morphs in */
        if (node) {
          tl.to(node, { opacity: 1, scale: 1, duration: 0.04, ease: 'back.out(2)' }, start + 0.03);
          tl.to(node, { borderRadius: '16px', duration: 0.03, ease: 'elastic.out(1,0.6)' }, start + 0.06);
        }

        /* Glow pulses */
        if (glow) {
          tl.to(glow, { opacity: 0.6, scale: 1, duration: 0.04, ease: 'power2.out' }, start + 0.04);
          tl.to(glow, { scale: 1.15, duration: 0.06, ease: 'sine.inOut', yoyo: true, repeat: 1 }, start + 0.07);
        }

        /* Text fades in */
        if (text) tl.to(text, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, start + 0.05);

        /* Detail cards stagger in */
        if (detail) tl.to(detail, { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' }, start + 0.07);
      };

      /* Execute phases */
      phase(0, 0.02);
      phase(1, 0.19);
      phase(2, 0.38);
      phase(3, 0.57);
      phase(4, 0.76);

      /* ═══ Finale: Feedback loop + all glow ═══ */
      if (feedbackRef.current) {
        tl.to(feedbackRef.current, { opacity: 1, duration: 0.04 }, 0.88);
      }
      /* Re-illuminate all glows */
      glowRefs.current.forEach((g, i) => {
        if (g) tl.to(g, { opacity: 0.4, scale: 1, duration: 0.03 }, 0.90);
      });

      /* Hold */
      tl.to({}, { duration: 0.06 });

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
      id="product"
      className="section-pinned bg-cream flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="sys-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.6" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sys-grid)" className="text-refleqt-dark" />
      </svg>

      {/* ─── Header ─── */}
      <div ref={headerRef} className="absolute top-8 md:top-12 text-center z-30 px-6">
        <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-refleqt-orange mb-2">System Architecture</p>
        <h2 className="text-headline md:text-display-sm text-refleqt-dark">How Refleqt Works</h2>
      </div>

      {/* ─── Phase Texts ─── */}
      <div className="absolute top-24 md:top-32 left-0 right-0 z-20 px-6">
        {phases.map((p, i) => (
          <div
            key={i}
            ref={el => { textRefs.current[i] = el; }}
            className="absolute inset-x-0 text-center px-6"
          >
            <h3 className="text-xl md:text-3xl font-light text-refleqt-dark mb-2">{p.title}</h3>
            <p className="text-sm md:text-base text-refleqt-gray max-w-xl mx-auto leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          SYSTEM DIAGRAM — Horizontal Node Flow
          ═══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3 md:px-12 mt-20 md:mt-12">
        {/* Feedback arc SVG — curves above the nodes */}
        <svg
          ref={feedbackRef}
          className="absolute -top-8 md:-top-12 left-[8%] right-[8%] h-10 md:h-14 pointer-events-none will-change-transform"
          viewBox="0 0 900 50"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 860 45 C 860 5 450 -8 40 45"
            stroke="rgba(212,101,42,0.18)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
          </path>
          <circle r="2.5" fill="#D4652A" opacity="0.35">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 860 45 C 860 5 450 -8 40 45" />
          </circle>
          <text x="450" y="15" textAnchor="middle" fill="rgba(212,101,42,0.35)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2">
            FEEDBACK LOOP
          </text>
        </svg>

        {/* Node row with inline connectors */}
        <div className="flex items-start justify-center">
          {systemNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex items-center">
                {/* ─── Node ─── */}
                <div className="flex flex-col items-center relative">
                  {/* Glow */}
                  <div
                    ref={el => { glowRefs.current[i] = el; }}
                    className="absolute -inset-3 md:-inset-5 rounded-3xl will-change-transform pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${node.color}18 0%, transparent 70%)` }}
                  />
                  {/* Node box */}
                  <div
                    ref={el => { nodeRefs.current[i] = el; }}
                    className="relative w-12 h-12 md:w-[68px] md:h-[68px] bg-white shadow-lg border-2 flex items-center justify-center will-change-transform z-10"
                    style={{ borderColor: `${node.color}30` }}
                  >
                    <Icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: node.color }} />
                  </div>
                  {/* Label */}
                  <span className="mt-1.5 text-[8px] md:text-[11px] font-semibold text-refleqt-dark text-center leading-tight whitespace-nowrap">{node.label}</span>
                  <span className="text-[7px] md:text-[9px] text-refleqt-gray text-center leading-tight">{node.sub}</span>
                </div>

                {/* ─── Connector to next node ─── */}
                {i < systemNodes.length - 1 && (
                  <svg
                    ref={el => { connRefs.current[i] = el; }}
                    className="flex-shrink-0 w-6 md:w-14 h-10 pointer-events-none will-change-transform mx-0.5 md:mx-1"
                    viewBox="0 0 80 40"
                    fill="none"
                    style={{ transformOrigin: 'left center' }}
                  >
                    <path d="M 4 20 L 76 20" stroke={`${systemNodes[i + 1].color}25`} strokeWidth="1.5" strokeDasharray="4 3">
                      <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <polygon points="72,16 80,20 72,24" fill={`${systemNodes[i + 1].color}35`} />
                    <circle r="2" fill={systemNodes[i + 1].color} opacity="0.45">
                      <animateMotion dur="1.8s" repeatCount="indefinite" path="M 4 20 L 76 20" />
                    </circle>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Phase Detail Cards ─── */}
      <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-20 px-4 md:px-8">
        {phases.map((p, i) => (
          <div
            key={i}
            ref={el => { detailRefs.current[i] = el; }}
            className="absolute inset-x-0 flex justify-center"
          >
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl">
              {p.details.map((d, j) => {
                const DIcon = d.icon;
                return (
                  <div key={j} className="flex items-start gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-black/[0.04] shadow-sm">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${systemNodes[i].color}0D` }}>
                      <DIcon className="w-4 h-4" style={{ color: systemNodes[i].color }} />
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs font-semibold text-refleqt-dark block">{d.label}</span>
                      <span className="text-[9px] md:text-[10px] text-refleqt-gray">{d.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Progress ─── */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {phases.map((_, i) => (
          <div
            key={i}
            ref={el => { progressRef.current[i] = el; }}
            className="w-6 h-1 rounded-full transition-all duration-300"
            style={{ background: i === 0 ? '#D4652A' : 'rgba(212,101,42,0.12)' }}
          />
        ))}
      </div>
    </section>
  );
}
