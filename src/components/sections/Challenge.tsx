import { motion } from 'framer-motion';
import { Monitor, MessageSquare, FileText, Ticket, Mail, Database, AlertTriangle } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TOOLS = [
  { icon: Monitor, label: 'SAP GUI', color: '#F15B64', desc: 'T-codes & navigation' },
  { icon: MessageSquare, label: 'Microsoft Teams', color: '#5DA9FF', desc: 'Communication' },
  { icon: Monitor, label: 'SM37 / SU53', color: '#F5B942', desc: 'Job monitoring' },
  { icon: Ticket, label: 'ServiceNow', color: '#39C985', desc: 'Incident management' },
  { icon: Mail, label: 'Email chains', color: '#A7ABB7', desc: 'Coordination' },
  { icon: FileText, label: 'Documentation', color: '#8B5CF6', desc: 'Runbooks & guides' },
  { icon: Database, label: 'Multiple SAP Systems', color: '#A01441', desc: 'DEV · QAS · PRD' },
];

const PAIN_CHAIN = [
  { label: 'Fragmented Tools', icon: '⚡', color: '#F15B64', desc: 'Switching between Teams, SAP GUI, SM37, ServiceNow, email, and documentation portals for a single question.' },
  { label: 'Delayed Understanding', icon: '⏱', color: '#F5B942', desc: 'Technical logs and error messages require specialized knowledge that is not always at hand.' },
  { label: 'Expert Dependency', icon: '🔒', color: '#A01441', desc: 'Critical operational knowledge lives in the minds of a few specialists who are not always available.' },
  { label: 'Slower Resolution', icon: '📉', color: '#C52A5C', desc: 'Coordinating across teams, systems, and time zones extends mean time to resolution.' },
  { label: 'Business Impact', icon: '💼', color: '#8B5CF6', desc: 'Every hour of delayed resolution translates to operational and financial consequences.' },
];

export function Challenge() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="challenge" className="section-padding relative" aria-label="The SAP access problem">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Ambient red glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(241,91,100,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="The Challenge"
          title="Information is available."
          titleHighlight="But fragmented."
          subtitle="Accessing SAP operational value requires switching between multiple applications, holding specialized knowledge, and coordinating across teams — even for a simple question."
        />

        {/* Tool chaos — scattered cards */}
        <div ref={ref} className="mt-16 mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary mb-5">
            Typical tools needed for one operational question
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 20, rotate: (i % 2 === 0 ? -1 : 1) }}
                animate={visible ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07, type: 'spring', stiffness: 120 }}
                className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl border transition-all"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${tool.color}10 0%, rgba(17,19,26,0.85) 70%)`,
                  borderColor: `${tool.color}25`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}
                >
                  <tool.icon size={18} style={{ color: tool.color }} aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-text-primary leading-tight">{tool.label}</span>
                <span className="text-[10px] text-text-secondary opacity-60">{tool.desc}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-2 mt-4 text-xs text-text-secondary opacity-50"
          >
            <AlertTriangle size={12} className="text-warning" />
            Each tool switch adds cognitive load, transition time, and potential for error
          </motion.div>
        </div>

        {/* Pain chain — vertical timeline */}
        <div className="relative grid sm:grid-cols-5 gap-4">
          {/* Horizontal connector line (desktop) */}
          <div
            className="hidden sm:block absolute top-9 left-[10%] right-[10%] h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(160,20,65,0.3) 20%, rgba(160,20,65,0.3) 80%, transparent)' }}
            aria-hidden="true"
          />

          {PAIN_CHAIN.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 border relative z-10"
                style={{
                  background: `radial-gradient(ellipse, ${step.color}20 0%, rgba(17,19,26,0.9) 70%)`,
                  borderColor: `${step.color}40`,
                  boxShadow: `0 0 20px ${step.color}20`,
                  backgroundColor: '#07080C',
                }}
                role="img"
                aria-label={step.label}
              >
                {step.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1.5">{step.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Resolution statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex flex-col items-center gap-5 px-10 py-8 rounded-3xl border max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(160,20,65,0.1) 0%, rgba(17,19,26,0.9) 60%)',
              borderColor: 'rgba(160,20,65,0.25)',
              boxShadow: '0 0 40px rgba(160,20,65,0.1)',
            }}
          >
            <p className="text-text-secondary text-sm leading-relaxed">
              Organizations need a secure conversational intelligence layer that allows authorized users to ask questions, understand problems, discover business capabilities, and trigger governed actions — without navigating through multiple applications.
            </p>
            <div className="flex items-center gap-3 text-sm font-medium flex-wrap justify-center">
              <span style={{ color: '#5DA9FF' }}>Microsoft Teams</span>
              <span className="text-white/30">+</span>
              <span style={{ color: '#A01441' }}>Agentic AI</span>
              <span className="text-white/30">+</span>
              <span style={{ color: '#39C985' }}>SAP Connectivity</span>
              <span className="text-white/30">+</span>
              <span className="text-text-primary">MSG Expertise</span>
            </div>
            <div
              className="text-base font-semibold text-text-primary px-5 py-2 rounded-full border"
              style={{
                background: 'rgba(160,20,65,0.12)',
                borderColor: 'rgba(160,20,65,0.3)',
                textShadow: '0 0 20px rgba(197,42,92,0.4)',
              }}
            >
              = One secure conversational entry point for SAP intelligence and action
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
