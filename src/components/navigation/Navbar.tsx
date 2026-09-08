import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Presentation } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const NAV_LINKS = [
  { href: '#challenge', label: 'Challenge' },
  { href: '#idea', label: 'The Idea' },
  { href: '#demo', label: 'Demo' },
  { href: '#use-cases', label: 'Use Cases' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#business-value', label: 'Value' },
  { href: '#roadmap', label: 'Roadmap' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enterPresentationMode } = useAppStore();

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
          <a href="#hero" className="flex items-center gap-2 focus-visible:outline-none" aria-label="SAP Agentic Command Center — Home">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-heading font-semibold text-text-primary">SAP</span>
              <span className="text-sm font-heading font-light text-text-secondary ml-1">Agentic Command Center</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Section links">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={enterPresentationMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass border border-primary/30 hover:border-primary text-primary text-xs font-medium rounded-lg transition-all"
              aria-label="Start presentation mode"
            >
              <Presentation size={13} />
              Present
            </button>
            <a
              href="#demo"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-medium rounded-lg transition-colors"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 inset-x-0 z-40 glass-strong border-b border-border px-4 py-4 lg:hidden"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary py-1.5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { enterPresentationMode(); setMobileOpen(false); }}
                className="flex items-center gap-1.5 text-primary text-sm py-1.5"
              >
                <Presentation size={14} />
                Start Presentation
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
