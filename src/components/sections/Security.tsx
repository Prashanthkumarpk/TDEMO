import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, FileText, AlertCircle } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const SECURITY_LAYERS = [
  {
    icon: Users,
    title: 'Identity & Access',
    color: '#5DA9FF',
    controls: [
      'Microsoft Entra ID authentication',
      'Single sign-on (SSO)',
      'Identity propagation to SAP',
      'Role-based access control',
      'SAP authorization validation',
    ],
  },
  {
    icon: Shield,
    title: 'Data Protection',
    color: '#A01441',
    controls: [
      'Sensitive data masking',
      'Least-privilege data access',
      'Environment restrictions',
      'Output validation',
      'Data retention controls',
    ],
  },
  {
    icon: Lock,
    title: 'Action Governance',
    color: '#F5B942',
    controls: [
      'Action allowlist enforcement',
      'Write action approval workflows',
      'Critical action restriction',
      'Rate limiting',
      'Secret management',
    ],
  },
  {
    icon: Eye,
    title: 'Observability',
    color: '#39C985',
    controls: [
      'Complete audit trail',
      'Query and action logging',
      'User activity tracking',
      'Anomaly detection',
      'Compliance reporting',
    ],
  },
  {
    icon: AlertCircle,
    title: 'AI Safety',
    color: '#8B5CF6',
    controls: [
      'Prompt injection protection',
      'Input validation',
      'Output content filtering',
      'Hallucination mitigation',
      'System boundary enforcement',
    ],
  },
  {
    icon: FileText,
    title: 'Compliance',
    color: '#F15B64',
    controls: [
      'GDPR-aware data handling',
      'SOX-compatible audit log',
      'Configurable data residency',
      'Approval workflow records',
      'Policy documentation',
    ],
  },
];

export function Security() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="security" className="section-padding relative" aria-label="Security and governance">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Trust By Design"
          title="Security and governance"
          titleHighlight="built in, not bolted on."
          subtitle="Authorization, audit, and governance controls are embedded at every layer of the architecture."
        />

        {/* Core principle */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-12 glass rounded-2xl p-6 border border-primary/30 text-center"
        >
          <Shield size={32} className="text-primary mx-auto mb-4" aria-hidden="true" />
          <p className="text-lg text-text-primary font-medium max-w-2xl mx-auto">
            The agent can never provide more access than the authenticated user and approved technical integration are authorized to use.
          </p>
        </motion.div>

        {/* Security grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SECURITY_LAYERS.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="glass rounded-xl p-5 border border-border hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <layer.icon size={18} style={{ color: layer.color }} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-text-primary">{layer.title}</h3>
              </div>
              <div className="space-y-1.5">
                {layer.controls.map((control, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                    <span>{control}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authorization flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-xl p-6 border border-border"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">Authorization Evaluation Sequence</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'User Identity', color: '#5DA9FF' },
              { label: 'Session Token', color: '#5DA9FF' },
              { label: 'User Role Check', color: '#A01441' },
              { label: 'Environment Check', color: '#A01441' },
              { label: 'Action Policy', color: '#F5B942' },
              { label: 'Data Permission', color: '#F5B942' },
              { label: 'Approval Required?', color: '#F15B64' },
              { label: 'Execute or Escalate', color: '#39C985' },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                  style={{ color: step.color, borderColor: step.color + '40', backgroundColor: step.color + '10' }}
                >
                  {step.label}
                </div>
                {i < arr.length - 1 && (
                  <div className="text-text-secondary opacity-30 text-xs">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-4 opacity-70">
            Authorization is evaluated before data retrieval and before action execution. All steps are logged in the audit trail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
