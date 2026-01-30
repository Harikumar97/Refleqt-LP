import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Show navigation after logo reveal (4s delay)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      } ${hasScrolled ? 'glass shadow-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-xl md:text-2xl font-light tracking-wider text-refleqt-dark hover:opacity-70 transition-opacity"
          >
            <span>refl</span>
            <span className="w-px h-5 md:h-6 bg-refleqt-dark/30" />
            <span>eqt</span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('solution')}
              className="text-sm text-refleqt-gray hover:text-refleqt-dark transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('product')}
              className="text-sm text-refleqt-gray hover:text-refleqt-dark transition-colors"
            >
              Marketplace
            </button>
            <button
              onClick={() => scrollToSection('dashboard')}
              className="text-sm text-refleqt-gray hover:text-refleqt-dark transition-colors"
            >
              Dashboard
            </button>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection('cta')}
            className="bg-refleqt-orange hover:bg-refleqt-orange/90 text-white px-4 md:px-6 btn-lift text-sm"
          >
            Start Intake
          </Button>
        </div>
      </div>
    </nav>
  );
}
