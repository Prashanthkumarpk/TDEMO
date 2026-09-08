import { motion } from 'framer-motion';
import { ArrowRight, Monitor, MessageSquare, FileText, Ticket, Mail, Database } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TOOLS = [
  { icon: Monitor, label: 'SAP GUI', color: 'text-primary', desc: 'T-codes & navigation' },
  { icon: MessageSquare, label: 'Microsoft Teams', color: 'text-info', desc: 'Communication' },
  { icon: Monitor, label: 'SM37 / SM36', color: 'text-warning', desc: 'Job monitoring' },
  { icon: Ticket, label: 'ServiceNow', color: 'text-success', desc: 'Incident management' },
  { icon: Mail, label: 'Email', color: 'text-text-secondary', desc: 'Coordination' },
  { icon: FileText, label: 'Documentation', color: 'text-purple-400', desc: 'Runbooks & guides' },
  { icon: Database, label: 'Multiple SAP Systems', color: 'text-danger', desc: 'DEV · QAS · PRD' },
];

const PAIN_POINTS = [
  { step: '01', title: 'Fragmented Tools', desc: 'Teams, SAP GUI, SM37, ServiceNow, email, documentation portals — each switch costs time.', icon: '⚡' },
  { step: '02', title: 'Delayed Understanding', desc: 'Technical logs and error messages require specialized knowledge to interpret correctly.', icon: '⏱' },
  { step: '03', title: 'Expert Dependency', desc: 'Critical information is locked in the minds of a few specialists who are not always available.', icon: '🔒' },
  { step: '04', title: 'Slower Resolution', desc: 'Coordination across teams, systems, and timezones extends mean time to resolution.', icon: '📉' },
  { step: '05', title: 'Business Impact', desc: 'Every hour of delayed resolution translates to operational and financial consequences.', icon: '💼' },
];

export function Challenge() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="challenge" className="section-padding relative" aria-label="The SAP access problem">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="The Challenge"
          title="Information is available."
          titleHighlight="But it is fragmented."
          subtitle="Accessing SAP operational value requires switching between multiple applications, holding specialized knowledge, and coordinating across teams."
        />

        {/* Tool chaos visualization */}
        <div ref={ref} className="mt-16 mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary mb-6">Typical tools for one operational question</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-xl p-4 flex flex-col items-center gap-2 text-center border border-border hover:border-white/15 transition-colors"
              >
                <tool.icon size={20} className={tool.color} aria-hidden="true" />
                <span className="text-xs font-medium text-text-primary leading-tight">{tool.label}</span>
                <span className="text-xs text-text-secondary opacity-60">{tool.desc}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 gap-2">
            <span className="text-xs text-text-secondary opacity-60">Each tool switch adds cognitive load, transition time, and potential error</span>
          </div>
        </div>

        {/* Pain chain */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" aria-hidden="true" />
          <div className="space-y-6 md:pl-16">
            {PAIN_POINTS.map((point, i) => (
              <motion.div
                key={point.step}
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-5 glass rounded-xl p-5 border border-border hover:border-primary/20 transition-colors group"
              >
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="text-lg" role="img" aria-label={point.title}>{point.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-primary">{point.step}</span>
                    <ArrowRight size={12} className="text-primary" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-text-primary">{point.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 glass rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-text-secondary text-sm max-w-xl">
              Organizations need a secure conversational intelligence layer that allows authorized users to ask questions, understand problems, and trigger governed actions — without navigating through multiple applications.
            </p>
            <div className="flex items-center gap-3 text-sm font-medium flex-wrap justify-center">
              <span className="text-info">Microsoft Teams</span>
              <span className="text-text-secondary">+</span>
              <span className="text-primary">Agentic AI</span>
              <span className="text-text-secondary">+</span>
              <span className="text-success">SAP Connectivity</span>
              <span className="text-text-secondary">+</span>
              <span className="text-text-primary">MSG Expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">=</span>
              <span className="text-text-primary font-semibold">One secure conversational entry point for SAP intelligence and action.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
