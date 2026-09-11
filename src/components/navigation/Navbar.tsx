import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Presentation } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

// Five presentation-facing nav items — labels exactly as requested
const NAV_LINKS = [
  { href: '#challenge',      label: 'Problem Statement', section: 'challenge'      },
  { href: '#idea',           label: 'Solution',          section: 'idea'           },
  { href: '#demo',           label: 'Demo',              section: 'demo'           },
  { href: '#personas',       label: 'Target Audience',   section: 'personas'       },
  { href: '#roadmap',        label: 'Roadmap',           section: 'roadmap'        },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enterPresentationMode, activeSection } = useAppStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong border-b border-border py-2' : 'py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 focus-visible:outline-none shrink-0"
            aria-label="SAP Agentic Command Center — Home"
          >
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#A01441,#C52A5C)', boxShadow: '0 0 12px rgba(160,20,65,0.45)' }}
            >
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary">INNOVA SPARK</span>
              <span className="text-sm font-heading font-semibold text-text-primary leading-tight">SAP Agentic Command Center</span>
            </div>
          </a>

          {/* Desktop nav — five items with active indicator */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Section links">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.section ||
                (link.section === 'roadmap' && activeSection === 'business-value');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/4'
                  }`}
                  style={isActive ? { background: 'rgba(160,20,65,0.1)' } : {}}
                >
                  {link.label}
                  {/* Active underline dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={enterPresentationMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass border border-primary/30 hover:border-primary/60 text-primary text-xs font-medium rounded-lg transition-all"
              aria-label="Start presentation mode"
            >
              <Presentation size={13} />
              Present
            </button>
            <a
              href="#demo"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-medium rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg,#A01441,#C52A5C)', boxShadow: '0 0 16px rgba(160,20,65,0.35)' }}
            >
              Try Demo
            </a>
            <button
              className="lg:hidden p-2 glass rounded-lg border border-border text-text-secondary"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[52px] inset-x-0 z-40 glass-strong border-b border-border px-5 py-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.section ||
                  (link.section === 'roadmap' && activeSection === 'business-value');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-text-primary font-medium'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    style={isActive ? { background: 'rgba(160,20,65,0.1)' } : {}}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    {link.label}
                  </a>
                );
              })}
              <div className="border-t border-border mt-2 pt-3">
                <button
                  onClick={() => { enterPresentationMode(); setMobileOpen(false); }}
                  className="flex items-center gap-2 text-primary text-sm font-medium px-3 py-2"
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
