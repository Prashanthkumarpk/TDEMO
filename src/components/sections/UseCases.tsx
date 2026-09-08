import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SystemEnvBadge, Badge } from '@/components/common/Badge';

const USE_CASES = [
  {
    id: 'batch',
    tab: 'Batch Jobs',
    title: 'Batch Job Intelligence',
    description: 'Monitor, analyze, and resolve batch job failures across all SAP environments.',
    systemBadge: 'PRD',
    conversations: [
      {
        role: 'user' as const,
        content: 'Show me failed batch jobs in PRD during the last 24 hours.',
      },
      {
        role: 'agent' as const,
        content: 'I found 3 failed jobs in PRD: ZFI_PAYMENT_POSTING (authorization failure), ZSD_ORDER_RECONCILIATION (RFC timeout), and ZBW_DAILY_LOAD (extraction error). Business impact spans payment processing, sales reconciliation, and morning analytics.',
        badges: [{ label: 'PRD', type: 'env' as const }, { label: '3 Failed', type: 'danger' as const }],
      },
      {
        role: 'user' as const,
        content: 'Analyze ZFI_PAYMENT_POSTING.',
      },
      {
        role: 'agent' as const,
        content: 'Root cause: Background user BATCHUSR01 lost authorization for F_BKPF_BUK after role SAP_FI_BATCH_POST was modified 18 hours ago. Same job succeeded yesterday. Confidence: 94%. I can prepare an incident with the full analysis.',
        badges: [{ label: '94% confidence', type: 'success' as const }, { label: 'Audited', type: 'info' as const }],
      },
    ],
    capabilities: [
      'Failed job retrieval across all environments',
      'Job log analysis and error correlation',
      'Root-cause identification with evidence',
      'Business impact assessment',
      'Similar incident lookup',
      'Incident preparation with approval',
    ],
  },
  {
    id: 'incidents',
    tab: 'Incidents',
    title: 'Incident Copilot',
    description: 'Investigate, enrich, create, and track incidents — with complete context and human approval.',
    systemBadge: 'ITSM',
    conversations: [
      {
        role: 'user' as const,
        content: 'Create a high-priority incident for the failed payment job.',
      },
      {
        role: 'agent' as const,
        content: 'Incident prepared with title, priority (High), business impact, technical evidence, suggested assignment group, and 4 attachments. Awaiting your approval before submission.',
        badges: [{ label: 'HIGH', type: 'danger' as const }, { label: 'Approval Required', type: 'warning' as const }],
      },
      {
        role: 'user' as const,
        content: 'Approved.',
      },
      {
        role: 'agent' as const,
        content: 'Incident INC0012847 created. SAP Finance Application Support notified. Follow-up reminder scheduled for 30 minutes. Audit event logged.',
        badges: [{ label: 'Created', type: 'success' as const }, { label: 'INC0012847', type: 'info' as const }],
      },
    ],
    capabilities: [
      'Incident creation with full context',
      'Priority and assignment suggestions',
      'Evidence and log attachment',
      'Support team notification',
      'Follow-up scheduling',
      'Similar incident search',
    ],
  },
  {
    id: 'scenarios',
    tab: 'Business Scenarios',
    title: 'Business Scenario Discovery',
    description: 'Discover business processes, compare configuration, and identify gaps across SAP environments.',
    systemBadge: 'QAS',
    conversations: [
      {
        role: 'user' as const,
        content: 'Does automated payment processing exist in QAS?',
      },
      {
        role: 'agent' as const,
        content: 'Yes — partially configured. Payment proposal job and posting job exist. Gap identified: approval workflow is missing for Company Code 2000. Fully configured in PRD for both company codes.',
        badges: [{ label: 'QAS', type: 'env' as const }, { label: 'Gap Found', type: 'warning' as const }],
      },
      {
        role: 'user' as const,
        content: 'Compare with PRD.',
      },
      {
        role: 'agent' as const,
        content: 'PRD: Fully configured for CC1000 and CC2000. QAS: CC1000 only — FI_APPROVAL_WF missing for CC2000. Recommend: assign configuration task to Finance functional team.',
        badges: [{ label: 'Compared', type: 'info' as const }],
      },
    ],
    capabilities: [
      'Business process discovery',
      'Component availability check',
      'Cross-system comparison',
      'Configuration gap identification',
      'Readiness reporting',
      'Configuration task recommendation',
    ],
  },
  {
    id: 'cross-system',
    tab: 'Cross-System',
    title: 'Cross-System Intelligence',
    description: 'One conversation for operational intelligence across DEV, QAS, PRD, BW, BTP, and ECC.',
    systemBadge: 'ALL',
    conversations: [
      { role: 'user' as const, content: 'Which interfaces failed today?' },
      { role: 'agent' as const, content: 'RFC destination SALESD01 failed in PRD at 04:42 AM. IDoc posting interface IDOC_PRD01 returned 3 errors between 06:00–07:00 AM.', badges: [{ label: 'PRD', type: 'env' as const }] },
      { role: 'user' as const, content: 'Show transports waiting for import in PRD.' },
      { role: 'agent' as const, content: '4 transports are pending import in PRD. DEVK123456 (FI authorization fix), DEVK123457, DEVK123458, DEVK123459. Oldest is 3 days old. Recommend escalating the authorization fix as priority.', badges: [{ label: '4 Pending', type: 'warning' as const }] },
    ],
    capabilities: [
      'Interface failure monitoring',
      'Transport landscape visibility',
      'Cross-environment health check',
      'Recurring pattern identification',
      'System health reports',
      'Support handover summaries',
    ],
  },
];

export function UseCases() {
  const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
  const [ref, visible] = useIntersectionObserver();
  const activeCase = USE_CASES.find(uc => uc.id === activeTab)!;

  return (
    <section id="use-cases" className="section-padding" aria-label="Use case explorer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Use Cases"
          title="Four core capabilities."
          titleHighlight="One conversation."
          subtitle="Batch job intelligence, incident copilot, business scenario discovery, and cross-system visibility — all powered by the same agentic foundation."
        />

        {/* Tabs */}
        <div ref={ref} className="mt-12">
          <div className="flex border-b border-border overflow-x-auto">
            {USE_CASES.map(uc => (
              <button
                key={uc.id}
                onClick={() => setActiveTab(uc.id)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === uc.id ? 'tab-active' : 'tab-inactive'
                }`}
                aria-selected={activeTab === uc.id}
                role="tab"
              >
                {uc.tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid lg:grid-cols-2 gap-6"
              role="tabpanel"
            >
              {/* Simulated conversation */}
              <div className="glass rounded-2xl overflow-hidden border border-border">
                <div className="bg-bg-surface-light border-b border-border px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-danger/60" />
                    <div className="w-2 h-2 rounded-full bg-warning/60" />
                    <div className="w-2 h-2 rounded-full bg-success/60" />
                  </div>
                  <span className="text-xs text-text-secondary font-mono">SAP Command Center · {activeCase.title}</span>
                  <SystemEnvBadge env={activeCase.systemBadge} />
                </div>
                <div className="p-4 space-y-3">
                  {activeCase.conversations.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={visible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.role === 'user' ? 'bubble-user px-4 py-2.5' : 'bubble-agent px-4 py-3'}`}>
                        <p className="text-xs leading-relaxed text-text-primary mb-1.5">{msg.content}</p>
                        {'badges' in msg && msg.badges && (
                          <div className="flex flex-wrap gap-1">
                            {msg.badges.map((b, j) => (
                              <Badge key={j} variant={b.type === 'env' ? 'info' : b.type as 'danger' | 'warning' | 'success' | 'info'} size="sm">
                                {b.label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">{activeCase.title}</h3>
                  <p className="text-text-secondary">{activeCase.description}</p>
                </div>

                <div className="glass rounded-xl p-5 border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-3">Agent Capabilities</div>
                  <div className="space-y-2">
                    {activeCase.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-success">✓</span>
                        <span className="text-text-secondary">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-4 border border-primary/20">
                  <p className="text-xs text-text-secondary">
                    <span className="text-primary font-medium">Important: </span>
                    This is Demonstration Use Case 1. The architecture supports any SAP process, module, system, or customer scenario.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
