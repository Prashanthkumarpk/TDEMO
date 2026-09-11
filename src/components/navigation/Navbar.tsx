import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Presentation } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const NAV_LINKS = [
  { href: '#challenge', label: 'Problem Statement', section: 'challenge',     isConclusion: false },
  { href: '#idea',      label: 'Solution',          section: 'idea',          isConclusion: false },
  { href: '#demo',      label: 'Demo',              section: 'demo',          isConclusion: false },
  { href: '#personas',  label: 'Target Audience',   section: 'personas',      isConclusion: false },
  { href: '#roadmap',   label: 'Roadmap',           section: 'roadmap',       isConclusion: false },
  { href: '#final',     label: 'Conclusion',        section: 'final',         isConclusion: true  },
];

// ── Cinematic portal overlay — triggered when "Conclusion" is clicked ──────
function ConclusionTransition({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    // Scroll to the final section at peak of animation
    const scrollTimer = setTimeout(() => {
      document.getElementById('final')?.scrollIntoView({ behavior: 'smooth' });
    }, 450);
    const doneTimer = setTimeout(onDone, 1800);
    return () => { clearTimeout(scrollTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Deep crimson radial background sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, times: [0, 0.15, 0.65, 1], ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(100,5,30,0.97) 0%, #07080C 65%)' }}
      />

      {/* Expanding concentric rings */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          initial={{ width: 20, height: 20, opacity: 1 }}
          animate={{ width: '280vmax', height: '280vmax', opacity: 0 }}
          transition={{ duration: 1.5, delay: i * 0.11, ease: [0.15, 0, 0.35, 1] }}
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            border: `${Math.max(0.5, 2 - i * 0.35)}px solid rgba(160,20,65,${0.75 - i * 0.12})`,
            boxShadow: i === 0 ? '0 0 40px rgba(160,20,65,0.4)' : undefined,
          }}
        />
      ))}

      {/* Core burst bloom */}
      <motion.div
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: '90vmin', height: '90vmin', opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.08, 0, 0.2, 1] }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(197,42,92,0.75) 0%, rgba(160,20,65,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Starburst lines */}
      {[0, 45, 90, 135].map((deg, i) => (
        <motion.div
          key={deg}
          initial={{ scaleX: 0, opacity: 0.8 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.05 + i * 0.06, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transformOrigin: 'left center',
            transform: `translate(0,-50%) rotate(${deg}deg)`,
            width: '55vmax', height: '1px',
            background: 'linear-gradient(to right, rgba(197,42,92,0.6), transparent)',
          }}
        />
      ))}

      {/* Central headline */}
      <motion.div
        className="relative z-10 text-center select-none px-4"
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1, 0.96], y: [16, 0, 0, -8] }}
        transition={{ duration: 1.8, times: [0, 0.22, 0.68, 1] }}
      >
        <div
          className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight"
          style={{
            background: 'linear-gradient(120deg,#F7F7F8 0%,#FF6A9B 25%,#A01441 55%,#C52A5C 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 35px rgba(160,20,65,0.65)) drop-shadow(0 0 70px rgba(160,20,65,0.3))',
          }}
        >
          THE FUTURE IS AGENTIC.
        </div>
        <div
          className="text-xs font-mono tracking-[0.4em] uppercase"
          style={{ color: 'rgba(197,42,92,0.75)', textShadow: '0 0 20px rgba(160,20,65,0.5)' }}
        >
          INNOVA SPARK · MSG GLOBAL SOLUTIONS
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  const { enterPresentationMode, activeSection } = useAppStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleConclusionClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setShowConclusion(true);
  }, []);

  // Apple-style glass pill styles
  const pillStyle: React.CSSProperties = {
    background: scrolled
      ? 'rgba(9,10,16,0.82)'
      : 'rgba(9,10,16,0.52)',
    backdropFilter: 'blur(32px) saturate(200%) brightness(0.95)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%) brightness(0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    boxShadow: scrolled
      ? `0 8px 40px rgba(0,0,0,0.6),
         0 1px 0 rgba(255,255,255,0.09) inset,
         0 -1px 0 rgba(0,0,0,0.2) inset,
         0 0 0 1px rgba(160,20,65,0.06) inset`
      : `0 4px 24px rgba(0,0,0,0.4),
         0 1px 0 rgba(255,255,255,0.07) inset`,
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
  };

  const isLinkActive = (section: string) =>
    activeSection === section ||
    (section === 'roadmap' && activeSection === 'business-value');

  return (
    <>
      {/* Conclusion cinematic overlay */}
      <AnimatePresence>
        {showConclusion && (
          <ConclusionTransition key="conclusion" onDone={() => setShowConclusion(false)} />
        )}
      </AnimatePresence>

      {/* Floating pill wrapper — pointer-events-none so page clicks pass through the gap */}
      <div className="fixed top-0 inset-x-0 z-50 px-4 pt-3 pointer-events-none">
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-7xl mx-auto flex items-center justify-between px-4 py-2"
          style={pillStyle}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 focus-visible:outline-none shrink-0"
            aria-label="SAP Agentic Command Center — Home"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg,#A01441,#C52A5C)',
                boxShadow: '0 0 14px rgba(160,20,65,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <span className="text-[11px] font-bold text-white">S</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] mb-0.5" style={{ color: 'rgba(197,42,92,0.8)' }}>
                INNOVA SPARK
              </span>
              <span className="text-[11px] font-heading font-semibold text-text-primary leading-none">
                SAP Agentic Command Center
              </span>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const active = isLinkActive(link.section);
              return link.isConclusion ? (
                /* Conclusion — special glowing pill button */
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleConclusionClick}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ml-1"
                  style={{
                    color: '#E05080',
                    background: 'rgba(160,20,65,0.12)',
                    border: '1px solid rgba(160,20,65,0.3)',
                    boxShadow: '0 0 12px rgba(160,20,65,0.15)',
                  }}
                  aria-label="Navigate to Conclusion with cinematic transition"
                >
                  ✦ {link.label}
                </motion.a>
              ) : (
                /* Regular link */
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={active ? { background: 'rgba(255,255,255,0.07)' } : {}}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={enterPresentationMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-primary text-xs font-medium rounded-xl transition-all"
              style={{
                background: 'rgba(160,20,65,0.09)',
                border: '1px solid rgba(160,20,65,0.28)',
              }}
              aria-label="Start presentation mode"
            >
              <Presentation size={12} />
              Present
            </button>
            <a
              href="#demo"
              className="hidden sm:flex items-center px-3 py-1.5 text-white text-xs font-semibold rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg,#A01441,#C52A5C)',
                boxShadow: '0 0 16px rgba(160,20,65,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
            >
              Try Demo
            </a>
            <button
              className="lg:hidden p-2 rounded-xl text-text-secondary transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile menu — drops below the pill, same glass style ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] inset-x-4 z-40 rounded-2xl overflow-hidden lg:hidden"
            style={{
              background: 'rgba(9,10,16,0.93)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
            }}
          >
            <nav className="flex flex-col p-3 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(link => {
                const active = isLinkActive(link.section);
                return link.isConclusion ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleConclusionClick}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                    style={{
                      color: '#E05080',
                      background: 'rgba(160,20,65,0.1)',
                      border: '1px solid rgba(160,20,65,0.22)',
                    }}
                  >
                    <span>✦</span>
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      active ? 'text-text-primary font-medium' : 'text-text-secondary'
                    }`}
                    style={active ? { background: 'rgba(255,255,255,0.06)' } : {}}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    {link.label}
                  </a>
                );
              })}
              <div className="border-t mt-1 pt-2 px-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <button
                  onClick={() => { enterPresentationMode(); setMobileOpen(false); }}
                  className="flex items-center gap-2 text-primary text-sm font-medium px-3 py-2 rounded-xl w-full transition-colors"
                  style={{ background: 'rgba(160,20,65,0.07)' }}
                >
                  <Presentation size={14} />
                  Start Presentation
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
