import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SystemLandscape } from '@/components/three/SystemLandscape';

// Infinite-pulsing concentric rings
function PulsingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[320, 480, 640, 820, 1020].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full"
          animate={{ scale: [1, 1.06, 1], opacity: [0.18 - i * 0.03, 0.07, 0.18 - i * 0.03] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          style={{
            width: size, height: size,
            border: `1px solid rgba(160,20,65,${0.35 - i * 0.06})`,
            boxShadow: i === 0 ? '0 0 60px rgba(160,20,65,0.1) inset' : undefined,
          }}
        />
      ))}
    </div>
  );
}

// Thin horizontal shooting beams
function ShootingBeams() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ x: ['-110%', '110%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: 1.5 + i * 2.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: `${36 + i * 12}%`,
            left: 0,
            width: '30%',
            height: '1px',
            background: `linear-gradient(to right, transparent, rgba(160,20,65,${0.5 - i * 0.12}), rgba(197,42,92,0.3), transparent)`,
          }}
        />
      ))}
    </div>
  );
}

export function FinalMessage() {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });

  // Headline split into two dramatic lines
  const line1 = ['THE', 'FUTURE'];
  const line2 = ['IS', 'AGENTIC.'];

  const wordVariant = (delay: number) => ({
    initial: { opacity: 0, y: 60, filter: 'blur(18px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="The future is agentic"
    >
      {/* 3D landscape — more visible here */}
      <div className="absolute inset-0 z-0 opacity-30" aria-hidden="true">
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={null}>
            <SystemLandscape />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Atmosphere layers */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 85% at 50% 50%, rgba(7,8,12,0.15) 0%, rgba(7,8,12,0.7) 50%, rgba(7,8,12,0.97) 100%)' }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 h-56 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #07080C)' }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, #07080C)' }}
        aria-hidden="true"
      />

      {/* Crimson deep spotlight */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '1000px', height: '700px',
          background: 'radial-gradient(ellipse, rgba(160,20,65,0.14) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      {/* Rings + beams */}
      <div className="absolute inset-0 z-10">
        <PulsingRings />
        <ShootingBeams />
      </div>

      {/* ── CONTENT ── */}
      <div ref={ref} className="relative z-20 text-center px-4 sm:px-6">

        {/* T1 2026 badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div
            className="flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-[0.3em]"
            style={{
              background: 'rgba(160,20,65,0.1)',
              border: '1px solid rgba(160,20,65,0.35)',
              color: 'rgba(197,42,92,0.9)',
              boxShadow: '0 0 24px rgba(160,20,65,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Launch Target · T1 2026
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
            />
          </div>
        </motion.div>

        {/* THE FUTURE IS AGENTIC. — two-line staggered word drop */}
        <div className="mb-14 select-none">
          {/* Line 1: THE FUTURE */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 mb-1">
            {line1.map((word, i) => (
              <motion.span
                key={word}
                initial={wordVariant(0.25 + i * 0.16).initial}
                animate={visible ? wordVariant(0.25 + i * 0.16).animate : {}}
                transition={wordVariant(0.25 + i * 0.16).transition}
                className="block font-heading font-bold leading-none text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
                style={{
                  background: 'linear-gradient(115deg,#F7F7F8 0%,#FFB3C8 20%,#E05080 45%,#A01441 70%,#C52A5C 90%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 22px rgba(197,42,92,0.55)) drop-shadow(0 0 55px rgba(160,20,65,0.28))',
                  animation: visible ? 'gradientShift 6s ease-in-out infinite' : undefined,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          {/* Line 2: IS AGENTIC. */}
          <div className="flex items-start justify-center gap-4 sm:gap-6">
            {line2.map((word, i) => (
              <motion.span
                key={word}
                initial={wordVariant(0.58 + i * 0.16).initial}
                animate={visible ? wordVariant(0.58 + i * 0.16).animate : {}}
                transition={wordVariant(0.58 + i * 0.16).transition}
                className="block font-heading font-bold leading-none text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
                style={{
                  background: 'linear-gradient(115deg,#F7F7F8 0%,#FFB3C8 20%,#E05080 45%,#A01441 70%,#C52A5C 90%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 22px rgba(197,42,92,0.55)) drop-shadow(0 0 55px rgba(160,20,65,0.28))',
                  animation: visible ? 'gradientShift 6s ease-in-out infinite' : undefined,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider — expands from centre */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px w-28 sm:w-48"
            style={{ background: 'linear-gradient(to right, transparent, rgba(160,20,65,0.55))' }} />
          <div className="flex gap-1.5">
            {[0, 0.2, 0.4].map(d => (
              <motion.div
                key={d}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: d }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            ))}
          </div>
          <div className="h-px w-28 sm:w-48"
            style={{ background: 'linear-gradient(to left, transparent, rgba(160,20,65,0.55))' }} />
        </motion.div>

        {/* MSG GLOBAL SOLUTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 1.3 }}
          className="mb-10"
        >
          <p
            className="text-2xl sm:text-3xl font-heading font-bold tracking-wide mb-2"
            style={{
              color: '#F7F7F8',
              textShadow: '0 0 40px rgba(247,247,248,0.18), 0 0 80px rgba(247,247,248,0.07)',
            }}
          >
            MSG GLOBAL SOLUTIONS
          </p>
          <p
            className="text-sm font-light tracking-widest uppercase font-mono"
            style={{ color: 'rgba(167,171,183,0.65)', letterSpacing: '0.2em' }}
          >
            Your Partner for the Agentic Enterprise
          </p>
        </motion.div>

        {/* INNOVA SPARK — team + hackathon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.55 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.65 }}
              className="h-px w-14 origin-right"
              style={{ background: 'linear-gradient(to right, transparent, rgba(160,20,65,0.5))' }}
            />
            <span
              className="text-xs font-mono uppercase tracking-[0.45em]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              INNOVA SPARK
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.65 }}
              className="h-px w-14 origin-left"
              style={{ background: 'linear-gradient(to left, transparent, rgba(160,20,65,0.5))' }}
            />
          </div>
          <p
            className="text-[10px] font-mono uppercase tracking-[0.5em]"
            style={{ color: 'rgba(160,20,65,0.65)' }}
          >
            TECH INTERRUPT
          </p>
        </motion.div>

      </div>
    </section>
  );
}
