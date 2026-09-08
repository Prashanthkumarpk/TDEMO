import { Suspense, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon, Play, ChevronRight, Layers, MessageSquare, Zap, Shield } from 'lucide-react';
import { HeroScene } from '@/components/three/HeroScene';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useAppStore } from '@/store/appStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PREVIEW_MESSAGES = [
  { role: 'user',  text: 'Show me failed batch jobs in PRD right now.' },
  { role: 'agent', text: '3 failed jobs found in PRD. ZFI_PAYMENT_POSTING cancelled at 02:14 AM — probable cause: authorization failure. Confidence 94%.' },
  { role: 'user',  text: 'Create an incident and notify the support team.' },
  { role: 'agent', text: 'Incident INC0012847 created. SAP Finance Support notified. Awaiting your approval to proceed.' },
];

function LiveConversationPreview() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const DELAYS = [700, 1800, 3200, 4600];

    function startCycle() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setVisibleCount(0);
      DELAYS.forEach((d, i) => {
        const t = setTimeout(() => setVisibleCount(i + 1), d);
        timers.current.push(t);
      });
      // Restart loop after the last message has been visible for 3 s
      const restart = setTimeout(startCycle, DELAYS[DELAYS.length - 1] + 3000);
      timers.current.push(restart);
    }

    startCycle();
    return () => timers.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTyping = visibleCount === 1 || visibleCount === 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 1.1 }}
      className="relative neon-border-animated rounded-2xl"
      style={{ borderRadius: '16px' }}
    >
      {/* Teams-styled chrome */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/70"
        style={{ background: 'linear-gradient(150deg, rgba(20,22,30,0.97) 0%, rgba(12,14,20,0.99) 100%)' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 border-b"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-white">SC</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
              SAP Command Center
              <span className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: 'pulseRing 1.5s ease-out infinite' }} />
            </div>
            <div className="text-[10px] text-text-secondary opacity-55">Microsoft Teams · All systems connected</div>
          </div>
          <div className="flex gap-1">
            {['bg-danger/40', 'bg-warning/40', 'bg-success/40'].map((c, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[200px]">
          {PREVIEW_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
            >
              {msg.role === 'agent' && (
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #A01441, #6D0D2E)' }}
                >
                  <span className="text-[8px] font-bold text-white">A</span>
                </div>
              )}
              <div
                className={`max-w-[82%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'text-text-primary rounded-bl-sm'
                }`}
                style={
                  msg.role === 'user'
                    ? { background: 'linear-gradient(135deg, #A01441, #6D0D2E)', boxShadow: '0 0 12px rgba(160,20,65,0.35)' }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Agent typing indicator */}
          {showTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #A01441, #6D0D2E)' }}
              >
                <span className="text-[8px] font-bold text-white">A</span>
              </div>
              <div
                className="flex gap-1 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {[0, 1, 2].map(j => (
                  <div
                    key={j}
                    className="w-1 h-1 rounded-full bg-text-secondary animate-bounce"
                    style={{ animationDelay: `${j * 0.15}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input stub */}
        <div className="px-4 pb-4">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-[10px] text-text-secondary flex-1 opacity-60">Ask anything about your SAP landscape…</span>
            <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center">
              <Zap size={10} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Outer glow halo */}
      <div
        className="absolute -inset-6 -z-10 rounded-3xl opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(160,20,65,0.6) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function FeaturePill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs text-text-secondary"
      style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}
    >
      <Icon size={12} className="text-primary" />
      <span>{label}</span>
    </div>
  );
}

export function Hero() {
  const { enterPresentationMode } = useAppStore();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="SAP Agentic Command Center hero"
    >
      {/* ── Deep background ── */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: '#07080C' }}
        aria-hidden="true"
      />

      {/* ── Atmospheric crimson bloom — left side ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 5% 50%,  rgba(160,20,65,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 30% 25%, rgba(197,42,92,0.14) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 25% 80%, rgba(109,13,46,0.18) 0%, transparent 55%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Neon scan line sweep ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none neon-scan overflow-hidden"
        aria-hidden="true"
      />

      {/* ── Grid ── */}
      <div className="absolute inset-0 z-[2] grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

      {/* ── Neon vertical accent lines ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Left edge line */}
        <div style={{
          position: 'absolute', left: '6%', top: '18%', bottom: '18%', width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(93,169,255,0.25) 35%, rgba(93,169,255,0.25) 65%, transparent 100%)',
        }} />
        {/* Right-center divider */}
        <div style={{
          position: 'absolute', right: '36%', top: '25%', bottom: '25%', width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(160,20,65,0.2) 40%, rgba(160,20,65,0.2) 60%, transparent 100%)',
        }} />
        {/* Horizontal neon rule under headline */}
        <div style={{
          position: 'absolute', left: '4%', right: '55%', top: '58%', height: '1px',
          background: 'linear-gradient(to right, rgba(160,20,65,0.5), rgba(197,42,92,0.2), transparent)',
        }} />
      </div>

      {/* ── Three.js canvas — right-side rings & particles ── */}
      <div className="absolute inset-0 z-[4]" aria-hidden="true">
        <ErrorBoundary fallback={<div className="w-full h-full" />}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ── Vignette to keep text readable ── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 110% 80% at 50% 50%, transparent 15%, rgba(7,8,12,0.55) 55%, rgba(7,8,12,0.92) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Strong left vignette so text pops */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(7,8,12,0.7) 0%, rgba(7,8,12,0.3) 40%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #07080C)' }}
        aria-hidden="true"
      />

      {/* ── CONTENT ── */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 items-center">

          {/* LEFT — headline + CTAs */}
          <div>
            {/* Eyebrow badges */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="flex items-center gap-2 flex-wrap mb-7"
            >
              {[
                { label: 'TECH INTERRUPT', style: 'border-white/12 text-text-secondary' },
                { label: 'TI IDEA', style: 'border-primary/55 text-primary', dot: true },
                { label: 'INNOVA SPARK', style: 'border-white/12 text-text-secondary' },
              ].map(b => (
                <span
                  key={b.label}
                  className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${b.style}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {b.dot && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                  {b.label}
                </span>
              ))}
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-7"
            >
              <h1 className="font-heading font-bold leading-[1.05]">
                {/* Line 1 — white with subtle glow */}
                <span
                  className="block text-4xl sm:text-5xl xl:text-[4.4rem] text-text-primary"
                  style={{ textShadow: '0 0 40px rgba(255,255,255,0.12), 0 0 80px rgba(255,255,255,0.05)' }}
                >
                  SAP Agentic
                </span>
                {/* Line 2 — neon crimson gradient with drop-shadow glow */}
                <span
                  className="block text-4xl sm:text-5xl xl:text-[4.4rem]"
                  style={{
                    background: 'linear-gradient(115deg, #FF6A9B 0%, #E05080 25%, #A01441 55%, #C52A5C 85%, #FF6A9B 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 18px rgba(197,42,92,0.55)) drop-shadow(0 0 40px rgba(160,20,65,0.3))',
                    animation: !reducedMotion ? 'gradientShift 6s ease-in-out infinite' : undefined,
                  }}
                >
                  Command Center
                </span>
              </h1>
              <div
                className="mt-3 text-[10px] font-mono tracking-[0.35em] uppercase"
                style={{ color: 'rgba(197,42,92,0.7)', textShadow: '0 0 12px rgba(197,42,92,0.3)' }}
              >
                SACC · INNOVA SAPARK · MSG GLOBAL SOLUTIONS
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mb-9"
            >
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-text-secondary mb-2">
                One Conversation.{' '}
                <span className="text-text-primary font-medium">Every SAP System.</span>{' '}
                <span style={{ color: '#E05080', textShadow: '0 0 20px rgba(197,42,92,0.5)' }} className="font-semibold">
                  Intelligent Action.
                </span>
              </p>
              <p className="text-sm text-text-secondary opacity-50">From SAP complexity to conversational clarity.</p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={enterPresentationMode}
                className="group flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all text-sm glow-pulse"
                style={{
                  background: 'linear-gradient(135deg, #A01441 0%, #C52A5C 100%)',
                  boxShadow: '0 0 30px rgba(160,20,65,0.55), 0 0 60px rgba(160,20,65,0.2), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
                aria-label="Start presentation mode"
              >
                <Play size={15} className="group-hover:scale-110 transition-transform" />
                Start Presentation
              </button>
              <a
                href="#demo"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-text-primary transition-all border"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                Experience the Demo
                <ChevronRight size={15} />
              </a>
              <a
                href="#architecture"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-text-secondary hover:text-text-primary transition-all border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <Layers size={14} />
                Architecture
              </a>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-2"
            >
              <FeaturePill icon={MessageSquare} label="Microsoft Teams Native" />
              <FeaturePill icon={Zap} label="Multi-System SAP Intelligence" />
              <FeaturePill icon={Shield} label="Governance First" />
            </motion.div>
          </div>

          {/* RIGHT — Live Teams preview */}
          <div className="hidden lg:block">
            <LiveConversationPreview />
          </div>
        </div>

        {/* Bottom status strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 flex items-center gap-6 flex-wrap"
        >
          {[
            { label: 'Teams Agent',      status: 'Online',     color: '#39C985' },
            { label: 'SAP Connectivity', status: 'Connected',  color: '#39C985' },
            { label: 'PRD',              status: '3 Issues',   color: '#F15B64' },
            { label: 'QAS',              status: 'Warning',    color: '#F5B942' },
            { label: 'DEV',              status: 'Healthy',    color: '#39C985' },
            { label: 'BTP',              status: 'Online',     color: '#39C985' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div
                className={`w-1.5 h-1.5 rounded-full ${!reducedMotion ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
              <span className="font-medium" style={{ color: item.color }}>{item.status}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-text-secondary opacity-35">SCROLL</span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(160,20,65,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
