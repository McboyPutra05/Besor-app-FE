import React from 'react';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import LandingHowItWorks from './components/LandingHowItWorks';
import LandingServices from './components/LandingServices';
import LandingTracking from './components/LandingTracking';
import LandingTestimonials from './components/LandingTestimonials';
import LandingFooter from './components/LandingFooter';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onGoToDashboard: () => void;
}

export default function LandingPage({
  onOpenLogin,
  onOpenRegister,
}: LandingPageProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
      {/* Top Banner & Sticky Navigation */}
      <LandingNavbar
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="w-full bg-surface flex-1" id="home">
        <LandingHero
          onOpenLogin={onOpenLogin}
          onScrollToSection={scrollToSection}
        />
        <LandingHowItWorks />
        <LandingServices />
        <LandingTracking />
        <LandingTestimonials />
      </main>

      {/* Footer */}
      <LandingFooter onScrollToSection={scrollToSection} />
    </div>
  );
}
