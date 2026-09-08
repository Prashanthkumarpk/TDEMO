import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SystemLandscape } from '@/components/three/SystemLandscape';
import { useAppStore } from '@/store/appStore';

const NARRATIVE_LINES = [
  'Enterprise systems should not feel distant from the people who depend on them.',
  '',
  'The next generation of work will not begin with searching through applications.',
  'It will begin with intent.',
  '',
  'An employee will ask.',
  'An agent will understand.',
  'Enterprise knowledge will respond.',
  'Governed systems will act.',
  '',
  'This is more than a chatbot.',
  'This is a new interaction layer for the intelligent enterprise.',
];

export function FinalMessage() {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const { enterPresentationMode } = useAppStore();

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding"
      aria-label="The future is agentic"
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0 opacity-60" aria-hidden="true">
        <ErrorBoundary fallback={<div className="w-full h-full bg-gradient-radial from-primary/10 to-transparent" />}>
          <Suspense fallback={null}>
            <SystemLandscape />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60 z-10 pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
        {NARRATIVE_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className={
              line === ''
                ? 'h-4'
                : i === 0
                ? 'text-text-secondary text-lg leading-relaxed'
                : i >= 6 && i <= 9
                ? 'text-lg font-medium text-text-primary'
                : i >= 11
                ? 'text-text-secondary text-lg'
                : 'text-base text-text-secondary'
            }
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="pt-12"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold gradient-text mb-6">
            THE FUTURE IS AGENTIC.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="space-y-2"
        >
          <p className="text-lg font-semibold text-text-primary">MSG GLOBAL SOLUTIONS</p>
          <p className="text-text-secondary">Your Partner for the Agentic Enterprise</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex items-center justify-center gap-4 pt-4"
        >
          <div className="h-px w-16 bg-border" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-text-secondary">INNOVA SPARK</span>
          <div className="h-px w-16 bg-border" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-xs font-mono uppercase tracking-[0.2em] text-primary"
        >
          TECH INTERRUPT
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-10"
        >
          <button
            onClick={enterPresentationMode}
            className="px-8 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all glow-pulse shadow-lg shadow-primary/30"
          >
            Start Presentation
          </button>
          <a
            href="#hero"
            className="px-8 py-3 glass border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary font-medium rounded-xl transition-all"
          >
            Back to Top
          </a>
        </motion.div>
      </div>
    </section>
  );
}
