import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Components
import { LogoReveal } from '@/components/LogoReveal';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Sections
import { SectionHero } from '@/sections/SectionHero';
import { SectionProblem } from '@/sections/SectionProblem';
import { SectionSolution } from '@/sections/SectionSolution';
import { SectionProduct } from '@/sections/SectionProduct';
import { SectionCTA } from '@/sections/SectionCTA';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLogoReveal, setShowLogoReveal] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger after all content loads
    const handleLoad = () => {
      ScrollTrigger.refresh();
      setIsLoaded(true);
    };

    // Wait for images to load
    window.addEventListener('load', handleLoad);

    // Fallback refresh
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      setIsLoaded(true);
    }, 1000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimer);
    };
  }, []);

  useEffect(() => {
    // Disable scroll during logo reveal
    if (showLogoReveal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Refresh ScrollTrigger after logo reveal completes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogoReveal]);

  const handleLogoRevealComplete = () => {
    setShowLogoReveal(false);
  };

  return (
    <div className={`min-h-screen bg-cream transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Logo Reveal Animation */}
      {showLogoReveal && <LogoReveal onComplete={handleLogoRevealComplete} />}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section - The Emergence */}
        <SectionHero />

        {/* Problem Section - The Broken Alternatives */}
        <SectionProblem />

        {/* Solution Section - The Transformation */}
        <SectionSolution />

        {/* Product Section - The System */}
        <SectionProduct />

        {/* CTA Section - The Invitation */}
        <SectionCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
