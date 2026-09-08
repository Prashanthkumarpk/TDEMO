import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Challenge } from '@/components/sections/Challenge';
import { Idea } from '@/components/sections/Idea';
import { Demo } from '@/components/sections/Demo';
import { UseCases } from '@/components/sections/UseCases';
import { AgenticWorkflow } from '@/components/sections/AgenticWorkflow';
import { Architecture } from '@/components/sections/Architecture';
import { Security } from '@/components/sections/Security';
import { BusinessValue } from '@/components/sections/BusinessValue';
import { Personas } from '@/components/sections/Personas';
import { WhyMsg } from '@/components/sections/WhyMsg';
import { FinalMessage } from '@/components/sections/FinalMessage';
import { PresentationMode } from '@/components/presentation/PresentationMode';
import { useAppStore } from '@/store/appStore';

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="text-sm font-medium text-text-primary">SAP Agentic Command Center</div>
          <div className="text-xs text-text-secondary">INNOVA SPARK · MSG Global Solutions · TECH INTERRUPT</div>
        </div>
        <div className="text-xs text-text-secondary opacity-50 text-center">
          Hackathon Demo — All data is fictional mock data. No real SAP systems or credentials are used.
        </div>
      </div>
    </footer>
  );
}

export function App() {
  const { isPresentationMode, setActiveSection } = useAppStore();

  // Track active section for nav
  useEffect(() => {
    const sections = ['hero', 'challenge', 'idea', 'demo', 'use-cases', 'agentic-workflow', 'architecture', 'security', 'business-value', 'personas', 'why-msg', 'final'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [setActiveSection]);

  return (
    <>
      <AnimatePresence>
        {isPresentationMode && <PresentationMode key="presentation" />}
      </AnimatePresence>

      <div className={isPresentationMode ? 'hidden' : undefined}>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Challenge />
          <Idea />
          <Demo />
          <UseCases />
          <AgenticWorkflow />
          <Architecture />
          <Security />
          <BusinessValue />
          <Personas />
          <WhyMsg />
          <FinalMessage />
        </main>
        <Footer />
      </div>
    </>
  );
}
