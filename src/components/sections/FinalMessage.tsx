import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SystemLandscape } from '@/components/three/SystemLandscape';
import { useAppStore } from '@/store/appStore';

const NARRATIVE = [
  { text: 'Enterprise systems should not feel distant from the people who depend on them.', style: 'text-text-secondary text-lg', delay: 0 },
  { text: '', style: 'h-3', delay: 0 },
  { text: 'The next generation of work will not begin with searching through applications.', style: 'text-text-secondary text-base', delay: 0.1 },
  { text: 'It will begin with intent.', style: 'text-text-primary font-medium text-lg', delay: 0.2 },
  { text: '', style: 'h-3', delay: 0 },
  { text: 'An employee will ask.', style: 'text-xl font-semibold text-text-primary', delay: 0.3, glow: true },
  { text: 'An agent will understand.', style: 'text-xl font-semibold', delay: 0.4, color: '#C52A5C', glow: true },
  { text: 'Enterprise knowledge will respond.', style: 'text-xl font-semibold', delay: 0.5, color: '#A01441', glow: true },
  { text: 'Governed systems will act.', style: 'text-xl font-semibold', delay: 0.6, color: '#6D0D2E', glow: true },
  { text: '', style: 'h-3', delay: 0 },
  { text: 'This is more than a chatbot.', style: 'text-text-secondary text-base', delay: 0.7 },
  { text: 'This is a new interaction layer for the intelligent enterprise.', style: 'text-text-primary font-medium text-lg', delay: 0.8 },
];

export function FinalMessage() {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 });
  const { enterPresentationMode } = useAppStore();

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding"
      aria-label="The future is agentic"
    >
      {/* 3D system landscape */}
      <div className="absolute inset-0 z-0 opacity-35" aria-hidden="true">
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={null}>
            <SystemLandscape />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Layered overlays for drama */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(7,8,12,0.3) 0%, rgba(7,8,12,0.75) 60%, rgba(7,8,12,0.97) 100%)' }}
        aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #07080C)' }}
        aria-hidden="true" />

      {/* Central crimson spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(160,20,65,0.08) 0%, transparent 60%)', filter: 'blur(40px)' }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Narrative lines */}
        <div className="space-y-1 mb-16">
          {NARRATIVE.map((line, i) => (
            line.text === '' ? (
              <div key={i} className={line.style} />
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: line.delay }}
                className={line.style}
                style={line.color ? {
                  color: line.color,
                  textShadow: line.glow ? `0 0 30px ${line.color}80, 0 0 60px ${line.color}40` : undefined,
                } : line.glow ? {
                  textShadow: '0 0 30px rgba(247,247,248,0.3)',
                } : {}}
              >
                {line.text}
              </motion.p>
            )
          ))}
        </div>

        {/* THE FUTURE IS AGENTIC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.0 }}
          className="mb-12"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight"
            style={{
              background: 'linear-gradient(120deg, #F7F7F8 0%, #E05080 30%, #A01441 60%, #C52A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 30px rgba(160,20,65,0.5)) drop-shadow(0 0 60px rgba(160,20,65,0.25))',
            }}
          >
            THE FUTURE IS AGENTIC.
          </h2>
        </motion.div>

        {/* Company attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="space-y-2 mb-8"
        >
          <p
            className="text-xl font-heading font-semibold"
            style={{ color: '#F7F7F8', textShadow: '0 0 20px rgba(247,247,248,0.2)' }}
          >
            MSG GLOBAL SOLUTIONS
          </p>
          <p className="text-text-secondary">Your Partner for the Agentic Enterprise</p>
        </motion.div>

        {/* Divider with team name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex items-center justify-center gap-5 mb-2"
        >
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(160,20,65,0.5))' }} />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-text-secondary">INNOVA SPARK</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(160,20,65,0.5))' }} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="text-xs font-mono uppercase tracking-[0.25em] mb-14"
          style={{ color: 'rgba(160,20,65,0.8)' }}
        >
          TECH INTERRUPT
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={enterPresentationMode}
            className="px-8 py-3 text-white font-semibold rounded-xl transition-all text-sm"
            style={{
              background: 'linear-gradient(135deg, #A01441 0%, #C52A5C 100%)',
              boxShadow: '0 0 30px rgba(160,20,65,0.5), 0 0 60px rgba(160,20,65,0.2)',
            }}
          >
            Start Presentation
          </button>
          <a
            href="#hero"
            className="px-8 py-3 font-medium rounded-xl transition-all text-sm text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            Back to Top
          </a>
        </motion.div>
      </div>
    </section>
  );
}
