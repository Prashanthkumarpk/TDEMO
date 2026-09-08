import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Brain, Database, Shield, Zap } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TRADITIONAL_STEPS = [
  'Log in to system',
  'Select environment',
  'Open transaction',
  'Know field names',
  'Apply filters',
  'Interpret logs',
  'Contact expert',
  'Create incident',
  'Follow up',
];

const AGENTIC_STEPS = [
  { label: 'Ask', color: '#5DA9FF', glow: 'rgba(93,169,255,0.3)' },
  { label: 'Understand', color: '#39C985', glow: 'rgba(57,201,133,0.3)' },
  { label: 'Decide', color: '#F5B942', glow: 'rgba(245,185,66,0.3)' },
  { label: 'Approve', color: '#A01441', glow: 'rgba(160,20,65,0.4)' },
  { label: 'Act', color: '#F7F7F8', glow: 'rgba(247,247,248,0.2)' },
];

// Visual flow: Teams → Agent → SAP Systems
const FLOW_NODES = [
  {
    icon: MessageSquare,
    label: 'Microsoft Teams',
    sublabel: 'Where users live',
    color: '#5DA9FF',
    glow: 'rgba(93,169,255,0.25)',
  },
  {
    icon: Brain,
    label: 'Agentic AI',
    sublabel: 'Intent + orchestration',
    color: '#A01441',
    glow: 'rgba(160,20,65,0.4)',
  },
  {
    icon: Shield,
    label: 'Governance',
    sublabel: 'Auth + audit + approval',
    color: '#F5B942',
    glow: 'rgba(245,185,66,0.25)',
  },
  {
    icon: Database,
    label: 'SAP Systems',
    sublabel: 'DEV · QAS · PRD · BW · BTP',
    color: '#39C985',
    glow: 'rgba(57,201,133,0.25)',
  },
];

export function Idea() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="idea" className="section-padding" aria-label="The SAP Agentic Command Center idea">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="The Idea"
          title="SAP Agentic"
          titleHighlight="Command Center"
          subtitle="A Microsoft Teams-based enterprise agent that securely connects people with SAP systems through natural language. The agent does not replace SAP — it makes SAP more accessible, responsive, and actionable."
        />

        {/* ── MAIN FLOW VISUAL ── */}
        <div ref={ref} className="mt-16 mb-16">
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-0">
            {FLOW_NODES.map((node, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center">
                {/* Node card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="relative flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border text-center min-w-[130px]"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${node.glow} 0%, rgba(17,19,26,0.9) 70%)`,
                    borderColor: `${node.color}30`,
                    boxShadow: `0 0 30px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Icon halo */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `radial-gradient(ellipse, ${node.glow} 0%, rgba(17,19,26,0.8) 100%)`,
                      border: `1px solid ${node.color}40`,
                      boxShadow: `0 0 16px ${node.glow}`,
                    }}
                  >
                    <node.icon size={20} style={{ color: node.color }} aria-hidden="true" />
                  </div>
                  <div className="text-xs font-semibold text-text-primary">{node.label}</div>
                  <div className="text-[10px] text-text-secondary leading-tight">{node.sublabel}</div>
                </motion.div>

                {/* Arrow connector */}
                {i < FLOW_NODES.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={visible ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                    className="flex items-center justify-center mx-2 sm:mx-1 my-2 sm:my-0"
                  >
                    <div className="flex items-center gap-0.5">
                      <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                      <ArrowRight size={14} className="text-text-secondary opacity-50 shrink-0" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Central message under the flow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border text-sm font-medium text-text-primary"
              style={{
                background: 'linear-gradient(135deg, rgba(160,20,65,0.12) 0%, rgba(17,19,26,0.8) 100%)',
                borderColor: 'rgba(160,20,65,0.3)',
                boxShadow: '0 0 20px rgba(160,20,65,0.15)',
              }}
            >
              <Zap size={14} className="text-primary" />
              One secure conversational entry point for SAP intelligence and action
            </div>
          </motion.div>
        </div>

        {/* ── Before vs After ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Traditional — left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-xs font-mono uppercase tracking-wider text-danger flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-danger" />
              Traditional Experience — 9 steps
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TRADITIONAL_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-xs px-2.5 py-1.5 rounded-full border border-white/8 text-text-secondary"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {step}
                  </span>
                  {i < TRADITIONAL_STEPS.length - 1 && (
                    <ArrowRight size={9} className="text-text-secondary opacity-25 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Agentic — right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="text-xs font-mono uppercase tracking-wider text-success flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Agentic Experience — 5 steps
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {AGENTIC_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="px-5 py-2.5 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      color: step.color,
                      borderColor: `${step.color}30`,
                      background: `${step.glow}`,
                      boxShadow: `0 0 16px ${step.glow}`,
                    }}
                  >
                    {step.label}
                  </div>
                  {i < AGENTIC_STEPS.length - 1 && (
                    <ArrowRight size={14} className="text-text-secondary opacity-40 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2.5">
              {[
                'Understands intent in natural language',
                'Identifies the correct SAP system and capability',
                'Retrieves permitted information through governed APIs',
                'Explains results in business-friendly language',
                'Proposes or executes authorized actions with approval',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span style={{ color: '#39C985' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
