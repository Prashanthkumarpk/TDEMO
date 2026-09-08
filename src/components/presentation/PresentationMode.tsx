import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { PRESENTATION_SCENES } from '@/data/presentation';

export function PresentationMode() {
  const {
    isPresentationMode,
    currentScene,
    exitPresentationMode,
    nextScene,
    prevScene,
    goToScene,
    showSpeakerNotes,
    toggleSpeakerNotes,
  } = useAppStore();

  const [transitioning, setTransitioning] = useState(false);
  const totalScenes = PRESENTATION_SCENES.length;
  const scene = PRESENTATION_SCENES[currentScene];

  const handleNext = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    nextScene();
    setTimeout(() => setTransitioning(false), 400);
  }, [nextScene, transitioning]);

  const handlePrev = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    prevScene();
    setTimeout(() => setTransitioning(false), 400);
  }, [prevScene, transitioning]);

  // Keyboard navigation
  useEffect(() => {
    if (!isPresentationMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitPresentationMode();
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
      else if (e.key === 'n' || e.key === 'N') toggleSpeakerNotes();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isPresentationMode, exitPresentationMode, handleNext, handlePrev, toggleSpeakerNotes]);

  // Prevent scroll while in presentation mode
  useEffect(() => {
    if (isPresentationMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isPresentationMode]);

  if (!isPresentationMode || !scene) return null;

  const progress = ((currentScene + 1) / totalScenes) * 100;

  return (
    <div className="presentation-mode flex flex-col" role="dialog" aria-modal="true" aria-label="Presentation mode">
      {/* Progress bar */}
      <div className="h-0.5 bg-surface w-full" aria-hidden="true">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <span className="text-sm font-medium text-text-secondary hidden sm:block">SAP Agentic Command Center</span>
          <span className="text-xs text-text-secondary opacity-50">·</span>
          <span className="text-xs font-mono text-text-secondary">INNOVA SPARK</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-text-secondary">
            {String(currentScene + 1).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
          </span>
          <button
            onClick={toggleSpeakerNotes}
            className={`p-1.5 rounded-lg transition-colors ${showSpeakerNotes ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary glass'}`}
            aria-label="Toggle speaker notes"
            aria-pressed={showSpeakerNotes}
          >
            <FileText size={14} />
          </button>
          <button
            onClick={exitPresentationMode}
            className="p-1.5 glass rounded-lg text-text-secondary hover:text-text-primary transition-colors border border-border"
            aria-label="Exit presentation mode (Escape)"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex relative overflow-hidden grid-bg">
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 text-center relative">
          {/* Scene dots */}
          <div className="absolute top-6 flex items-center gap-1.5" aria-label="Scene navigation">
            {PRESENTATION_SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToScene(i)}
                className={`rounded-full transition-all ${i === currentScene ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to scene ${i + 1}`}
                aria-current={i === currentScene ? 'step' : undefined}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="max-w-4xl"
            >
              {/* Scene index */}
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6 opacity-80">
                Scene {currentScene + 1} — INNOVA SPARK
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                {scene.heading.includes('Agentic') || scene.heading.includes('Future') || scene.heading.includes('wins')
                  ? <>
                      {scene.heading.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="gradient-text">{scene.heading.split(' ').slice(-1)[0]}</span>
                    </>
                  : scene.heading
                }
              </h1>

              {/* Subheading */}
              {scene.subheading && (
                <p className="text-xl sm:text-2xl text-text-secondary font-light leading-relaxed">
                  {scene.subheading}
                </p>
              )}

              {/* Navigation hint */}
              <div className="flex items-center justify-center gap-4 mt-12 text-xs text-text-secondary opacity-40">
                <kbd className="glass border border-border px-2 py-1 rounded font-mono">←</kbd>
                <span>Navigate</span>
                <kbd className="glass border border-border px-2 py-1 rounded font-mono">→</kbd>
                <span>|</span>
                <kbd className="glass border border-border px-2 py-1 rounded font-mono">Space</kbd>
                <span>Next</span>
                <span>|</span>
                <kbd className="glass border border-border px-2 py-1 rounded font-mono">N</kbd>
                <span>Notes</span>
                <span>|</span>
                <kbd className="glass border border-border px-2 py-1 rounded font-mono">Esc</kbd>
                <span>Exit</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Speaker notes panel */}
        <AnimatePresence>
          {showSpeakerNotes && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 glass-strong border-l border-border p-6 flex flex-col"
              role="complementary"
              aria-label="Speaker notes"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText size={14} className="text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">Speaker Notes</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 overflow-y-auto">
                {scene.speakerNotes}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface/80 backdrop-blur-sm">
        <button
          onClick={handlePrev}
          disabled={currentScene === 0}
          className="flex items-center gap-2 px-4 py-2 glass border border-border rounded-lg text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous scene"
        >
          <ChevronLeft size={14} />
          <span className="text-sm hidden sm:block">Previous</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { const anchor = document.getElementById(scene.sectionId); exitPresentationMode(); setTimeout(() => anchor?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="px-4 py-2 glass border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary transition-all"
            aria-label="View this section in the website"
          >
            View Section
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentScene >= totalScenes - 1}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition-all"
          aria-label="Next scene"
        >
          <span className="text-sm hidden sm:block">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
