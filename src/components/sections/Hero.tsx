import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Layers } from 'lucide-react';
import { HeroScene } from '@/components/three/HeroScene';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useAppStore } from '@/store/appStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const { enterPresentationMode } = useAppStore();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      aria-label="SAP Agentic Command Center hero"
    >
      {/* Three.js background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ErrorBoundary fallback={
          <div className="w-full h-full bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        }>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-12">
        {/* Eyebrow tags */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-6"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary glass px-3 py-1.5 rounded-full border border-border">
            TECH INTERRUPT
          </span>
          <span className="text-primary">·</span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary glass px-3 py-1.5 rounded-full border border-primary/30">
            TI IDEA
          </span>
          <span className="text-primary">·</span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary glass px-3 py-1.5 rounded-full border border-border">
            INNOVA SPARK
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold leading-tight mb-2">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary">
              SAP Agentic
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
              Command Center
            </span>
          </h1>
          <div className="text-xs font-mono tracking-[0.3em] text-primary/70 uppercase mt-2 mb-6">
            SACC · INNOVA SAPARK
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-text-secondary font-light mb-3 leading-relaxed"
        >
          One Conversation.
          <span className="text-text-primary font-medium"> Every SAP System.</span>
          <span className="text-primary font-semibold"> Intelligent Action.</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm text-text-secondary opacity-70 mb-8"
        >
          From SAP complexity to conversational clarity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <button
            onClick={enterPresentationMode}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-xl transition-all glow-pulse shadow-lg shadow-primary/25"
            aria-label="Start presentation mode"
          >
            <Play size={16} />
            Start Presentation
          </button>
          <a
            href="#demo"
            className="flex items-center gap-2 px-6 py-3 glass border border-border hover:border-primary/40 text-text-primary font-medium rounded-xl transition-all"
          >
            Experience the Demo
            <ChevronRight size={16} />
          </a>
          <a
            href="#architecture"
            className="flex items-center gap-2 px-6 py-3 glass border border-border hover:border-info/40 text-text-secondary hover:text-text-primary font-medium rounded-xl transition-all"
          >
            <Layers size={16} />
            Explore Architecture
          </a>
        </motion.div>

        {/* System status strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {[
            { label: 'Teams Agent', status: 'Online', color: 'text-success' },
            { label: 'SAP Connectivity', status: 'Connected', color: 'text-success' },
            { label: 'PRD', status: '3 Issues', color: 'text-danger' },
            { label: 'QAS', status: 'Warning', color: 'text-warning' },
            { label: 'DEV', status: 'Healthy', color: 'text-success' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')} ${!reducedMotion ? 'animate-pulse' : ''}`} />
              <span>{item.label}</span>
              <span className={item.color + ' font-medium'}>{item.status}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-text-secondary opacity-50 tracking-wider">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-secondary/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
