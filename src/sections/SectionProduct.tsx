import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Calendar, BarChart3, Share2, ShoppingCart } from 'lucide-react';
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

const dashboardMetrics = [
  { label: 'Impressions', value: '124.5K', change: '+12%' },
  { label: 'Engagement', value: '8.2K', change: '+24%' },
  { label: 'Conversions', value: '342', change: '+18%' },
];

export function SectionProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marketplace section
      const marketplaceCards = marketplaceRef.current?.querySelectorAll('.campaign-card');
      if (marketplaceCards) {
        gsap.set(marketplaceCards, { opacity: 0, y: 50 });
        
        const marketplaceTrigger = ScrollTrigger.create({
          trigger: marketplaceRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(marketplaceCards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out'
            });
          },
          once: true
        });
        triggersRef.current.push(marketplaceTrigger);
      }

      // Dashboard section
      const dashboardElements = dashboardRef.current?.querySelectorAll('.dashboard-element');
      if (dashboardElements) {
        gsap.set(dashboardElements, { opacity: 0, y: 30 });
        
        const dashboardTrigger = ScrollTrigger.create({
          trigger: dashboardRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(dashboardElements, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out'
            });
          },
          once: true
        });
        triggersRef.current.push(dashboardTrigger);
      }

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
      className="bg-cream"
    >
      {/* Marketplace Section */}
      <div ref={marketplaceRef} className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-headline md:text-display-sm text-refleqt-dark mb-4">
              Your Marketplace
            </h2>
            <p className="text-body-lg text-refleqt-gray max-w-2xl mx-auto">
              Campaigns built for YOUR business. Browse what's recommended, select what fits your moment.
            </p>
          </div>

          {/* Campaign Cards Grid */}
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
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className={`inline-block w-2 h-2 rounded-full bg-${card.color} mb-2`} />
                  <h3 className="text-lg font-semibold text-refleqt-dark mb-1">{card.title}</h3>
                  <p className="text-sm text-refleqt-gray">{card.description}</p>
                </div>
                
                {selectedCard === card.id && (
                  <div className="absolute inset-0 bg-refleqt-orange/10 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <Check className="w-6 h-6 text-refleqt-orange" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selection CTA */}
          <div className="text-center">
            <Button
              className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white px-8 py-3 btn-lift"
              disabled={!selectedCard}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedCard ? 'Add to Calendar' : 'Select a Campaign'}
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div ref={dashboardRef} id="dashboard" className="py-24 md:py-32 bg-refleqt-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-headline md:text-display-sm text-cream mb-4">
              Your Command Center
            </h2>
            <p className="text-body-lg text-gray-400 max-w-2xl mx-auto">
              Everything visible. Nothing hidden. Track production, monitor performance, deploy on your terms.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="dashboard-element bg-[#1A1A1A] rounded-2xl p-6 md:p-8 border border-gray-800">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-refleqt-orange/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-refleqt-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Dashboard</h3>
                  <p className="text-sm text-gray-500">Real-time overview</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-refleqt-green" />
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {dashboardMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="dashboard-element bg-[#252525] rounded-xl p-4"
                >
                  <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl md:text-3xl font-semibold text-white">{metric.value}</span>
                    <span className="text-sm text-refleqt-green mb-1">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Queue */}
            <div className="dashboard-element bg-[#252525] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-refleqt-gold" />
                  Content Queue
                </h4>
                <span className="text-sm text-gray-500">3 items</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { title: 'Q1 Lead Generation Campaign', status: 'In Production', color: 'refleqt-orange' },
                  { title: 'Product Launch Micro-Campaign', status: 'QA Review', color: 'refleqt-gold' },
                  { title: 'Technical Documentation Update', status: 'Ready', color: 'refleqt-green' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-300 text-sm">{item.title}</span>
                    <span className={`text-xs px-2 py-1 rounded bg-${item.color}/20 text-${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Connections */}
            <div className="dashboard-element flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Connected Channels:</span>
                <div className="flex gap-2">
                  {['LinkedIn', 'Twitter', 'Meta'].map((channel) => (
                    <div
                      key={channel}
                      className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
              <Button size="sm" className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white">
                Deploy All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
