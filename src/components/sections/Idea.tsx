import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TRADITIONAL_STEPS = [
  'Log in to system',
  'Select correct environment',
  'Open transaction (SM37, SU53…)',
  'Know technical field names',
  'Apply correct filters',
  'Interpret technical log messages',
  'Contact the right expert',
  'Create incident manually',
  'Follow up across channels',
];

const AGENTIC_STEPS = [
  { label: 'Ask', color: 'text-info', bg: 'bg-info/10 border-info/25' },
  { label: 'Understand', color: 'text-success', bg: 'bg-success/10 border-success/25' },
  { label: 'Decide', color: 'text-warning', bg: 'bg-warning/10 border-warning/25' },
  { label: 'Approve', color: 'text-primary', bg: 'bg-primary/10 border-primary/25' },
  { label: 'Act', color: 'text-text-primary', bg: 'bg-white/5 border-white/15' },
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
          subtitle="A Microsoft Teams-based enterprise agent that securely connects people with SAP systems through natural language."
        />

        {/* Solution description */}
        <div ref={ref} className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">The Agent does not replace SAP.</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                It makes SAP more <span className="text-text-primary">accessible</span>, more <span className="text-text-primary">responsive</span>, more <span className="text-text-primary">intelligent</span>, and more <span className="text-primary font-medium">actionable</span>.
              </p>
              <div className="space-y-3">
                {[
                  'Understands the user\'s intent in natural language',
                  'Identifies the correct SAP system and capability',
                  'Retrieves permitted information through governed APIs',
                  'Explains the result in business-friendly language',
                  'Proposes or performs an authorized action with human approval',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-success shrink-0 mt-0.5">✓</span>
                    <span className="text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Traditional vs Agentic */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-danger mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-danger" />
                Traditional Experience
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TRADITIONAL_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-xs glass border border-border px-2.5 py-1 rounded-full text-text-secondary">
                      {step}
                    </span>
                    {i < TRADITIONAL_STEPS.length - 1 && (
                      <ArrowRight size={10} className="text-text-secondary opacity-40 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <span className="text-xs text-text-secondary opacity-60">becomes</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-success mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Agentic Experience
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {AGENTIC_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`px-4 py-2 rounded-xl border text-sm font-semibold ${step.color} ${step.bg}`}>
                      {step.label}
                    </div>
                    {i < AGENTIC_STEPS.length - 1 && (
                      <ArrowRight size={14} className="text-text-secondary opacity-40 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core vision block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass rounded-2xl px-8 py-6 border border-border max-w-3xl">
            <p className="text-text-secondary text-sm leading-relaxed">
              Enable employees, consultants, support teams, developers, functional experts, business users, and system administrators to securely interact with SAP systems through natural-language conversations in Microsoft Teams.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
