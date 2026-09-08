import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Map, Download, Brain, Zap, BookOpen, Shield } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const WORKFLOW_STEPS = [
  {
    id: 'perceive',
    number: '01',
    label: 'Perceive',
    icon: Eye,
    color: '#5DA9FF',
    description: 'Understand conversational intent, entities, SAP system context, timeframe, and requested outcome.',
    details: ['Intent classification', 'Entity extraction (system, job, module)', 'Timeframe parsing', 'Outcome identification'],
  },
  {
    id: 'plan',
    number: '02',
    label: 'Plan',
    icon: Map,
    color: '#A01441',
    description: 'Determine which tools, SAP APIs, knowledge sources, systems, and policies are required.',
    details: ['Tool selection', 'Agent routing', 'Authorization pre-check', 'Query planning'],
  },
  {
    id: 'retrieve',
    number: '03',
    label: 'Retrieve',
    icon: Download,
    color: '#F5B942',
    description: 'Obtain permitted information from SAP systems, incident platforms, documentation, or knowledge sources.',
    details: ['SAP API calls', 'Incident search', 'Knowledge base lookup', 'Permission validation'],
  },
  {
    id: 'reason',
    number: '04',
    label: 'Reason',
    icon: Brain,
    color: '#8B5CF6',
    description: 'Correlate technical events, historical incidents, business context, and system metadata.',
    details: ['Event correlation', 'Root cause analysis', 'Business impact assessment', 'Confidence scoring'],
  },
  {
    id: 'act',
    number: '05',
    label: 'Act',
    icon: Zap,
    color: '#39C985',
    description: 'Prepare or execute an authorized action such as creating an incident, notifying a team, or generating a report.',
    details: ['Action preparation', 'Human-in-the-loop approval', 'Governed execution', 'Audit logging'],
  },
  {
    id: 'learn',
    number: '06',
    label: 'Learn',
    icon: BookOpen,
    color: '#F15B64',
    description: 'Capture approved resolutions and reusable operational knowledge while respecting governance policies.',
    details: ['Resolution capture', 'Pattern recognition', 'Knowledge base update', 'Policy compliance'],
  },
];

const ACTION_LEVELS = [
  { level: 'Read Actions', color: 'text-success', border: 'border-success/30', bg: 'bg-success/5', desc: 'Can be performed according to user authorization. No additional approval required.' },
  { level: 'Write Actions', color: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/5', desc: 'Require policy validation and may require explicit approval from an authorized user.' },
  { level: 'Critical Actions', color: 'text-danger', border: 'border-danger/30', bg: 'bg-danger/5', desc: 'Must be restricted, logged, and routed through controlled workflows with mandatory human approval.' },
];

export function AgenticWorkflow() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="agentic-workflow" className="section-padding" aria-label="Agentic workflow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Agentic Behaviour"
          title="This is not a"
          titleHighlight="simple FAQ bot."
          subtitle="SAP Command Center perceives intent, plans its approach, retrieves permitted data, reasons across sources, acts with authorization, and learns from approved resolutions."
          centered
        />

        {/* Workflow steps */}
        <div ref={ref} className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                className={`glass rounded-xl p-4 text-left transition-all border ${
                  activeStep === step.id ? 'border-opacity-60' : 'border-border hover:border-white/15'
                }`}
                style={activeStep === step.id ? { borderColor: step.color + '60' } : {}}
                aria-pressed={activeStep === step.id}
                aria-label={`${step.label} - ${step.description}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-text-secondary">{step.number}</span>
                  <step.icon size={16} style={{ color: step.color }} aria-hidden="true" />
                </div>
                <div className="text-sm font-semibold text-text-primary mb-1">{step.label}</div>
                <div className="text-xs text-text-secondary line-clamp-2">{step.description}</div>
              </motion.button>
            ))}
          </div>

          {/* Expanded step detail */}
          {activeStep && (() => {
            const step = WORKFLOW_STEPS.find(s => s.id === activeStep)!;
            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 glass rounded-xl p-5 border"
                style={{ borderColor: step.color + '30' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <step.icon size={20} style={{ color: step.color }} />
                  <h3 className="text-lg font-heading font-semibold" style={{ color: step.color }}>{step.label}</h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.details.map((d, i) => (
                    <span key={i} className="text-xs glass border border-border px-3 py-1.5 rounded-full text-text-primary">{d}</span>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* Human in the loop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 glass rounded-xl p-5 border border-warning/30 flex items-start gap-4"
        >
          <Shield size={20} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="text-sm font-semibold text-warning mb-1">Human-in-the-Loop Checkpoint</h4>
            <p className="text-sm text-text-secondary">
              Before any sensitive or write operation, the agent presents the proposed action for human review and approval. No write action is executed without explicit authorization.
            </p>
          </div>
        </motion.div>

        {/* Action levels */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {ACTION_LEVELS.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className={`rounded-xl p-4 border ${level.border} ${level.bg}`}
            >
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2 ${level.color}`}>
                {level.level}
              </div>
              <p className="text-xs text-text-secondary">{level.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
