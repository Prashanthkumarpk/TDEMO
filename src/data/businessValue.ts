import type { ValuePillar, MetricCard, Differentiator, RoadmapPhase } from '@/types';

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'faster-access',
    title: 'Faster Access to SAP Information',
    description: 'Retrieve relevant SAP information through natural-language messages without knowing every transaction code, table, or navigation path.',
    icon: 'Zap',
    metric: 'Up to 70% fewer navigation steps',
  },
  {
    id: 'faster-detect',
    title: 'Reduced Mean Time to Detect',
    description: 'The agent highlights failed jobs, delayed processes, repeated failures, interface issues, and operational anomalies proactively.',
    icon: 'Search',
    metric: 'Up to 50% faster triage',
  },
  {
    id: 'faster-resolve',
    title: 'Reduced Mean Time to Resolve',
    description: 'The agent explains technical messages, retrieves related logs, identifies similar incidents, recommends resolution steps, and coordinates action.',
    icon: 'CheckCircle',
    metric: '1 conversation → complete context',
  },
  {
    id: 'lower-dependency',
    title: 'Lower Expert Dependency',
    description: 'Knowledge from documentation, incident histories, runbooks, and system metadata becomes accessible through a governed agent.',
    icon: 'Brain',
    metric: '24/7 guided assistance',
  },
  {
    id: 'better-ux',
    title: 'Improved Employee Experience',
    description: 'Users remain in Microsoft Teams instead of switching between disconnected SAP applications, monitoring tools, and ticketing systems.',
    icon: 'Smile',
    metric: 'One conversational entry point',
  },
  {
    id: 'cross-system',
    title: 'Cross-System Visibility',
    description: 'A unified view across DEV, QAS, PRD, BW, BTP, and legacy systems based on the authenticated user\'s authorization.',
    icon: 'Globe',
    metric: 'Multiple SAP systems, one conversation',
  },
  {
    id: 'reusable-platform',
    title: 'Reusable Innovation Platform',
    description: 'The same foundation supports finance, procurement, sales, HR, supply chain, insurance, manufacturing, analytics, and other SAP scenarios.',
    icon: 'Layers',
    metric: 'Scalable across all SAP modules',
  },
  {
    id: 'governance',
    title: 'Better Governance',
    description: 'Identity, role-based authorization, audit trails, approval workflows, data masking, action restrictions, and system-level policies are built in.',
    icon: 'Shield',
    metric: '100% governed actions',
  },
  {
    id: 'scenario-discovery',
    title: 'Faster Business Scenario Discovery',
    description: 'Consultants ask whether a process, configuration, interface, job, or API exists in a specific system — no manual navigation required.',
    icon: 'Compass',
    metric: 'Hours → minutes for discovery',
  },
  {
    id: 'msg-ip',
    title: 'Scalable MSG Intellectual Property',
    description: 'The concept evolves into a reusable accelerator for internal teams and customer engagements across MSG Global Solutions.',
    icon: 'Star',
    metric: 'Reusable across MSG projects',
  },
];

export const METRIC_CARDS: MetricCard[] = [
  { value: '70%', label: 'Fewer manual navigation steps', description: 'Illustrative target' },
  { value: '50%', label: 'Faster initial incident triage', description: 'Illustrative target' },
  { value: '1', label: 'Conversational entry point', description: 'Across multiple SAP systems' },
  { value: '24/7', label: 'Guided operational assistance', description: 'Always-on intelligence' },
  { value: '100%', label: 'Governed actions', description: 'Authorization and approval controls' },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: 'd1',
    not: 'Another chatbot',
    but: 'A governed enterprise action layer with evidence, confidence, and audit trail',
    icon: 'MessageSquare',
  },
  {
    id: 'd2',
    not: 'Limited to one SAP module',
    but: 'A reusable foundation across all SAP scenarios and modules',
    icon: 'Layers',
  },
  {
    id: 'd3',
    not: 'Only information retrieval',
    but: 'Investigation, recommendations, approvals, and controlled actions',
    icon: 'Activity',
  },
  {
    id: 'd4',
    not: 'A black box',
    but: 'Evidence, confidence scores, reasoning summaries, and complete audit trail',
    icon: 'Eye',
  },
  {
    id: 'd5',
    not: 'Unrestricted automation',
    but: 'Human-in-the-loop and policy-controlled execution for all write operations',
    icon: 'Shield',
  },
  {
    id: 'd6',
    not: 'Tied to one system',
    but: 'Cross-system and cross-environment intelligence in one conversation',
    icon: 'Globe',
  },
  {
    id: 'd7',
    not: 'Only a hackathon demo',
    but: 'A scalable accelerator concept for MSG projects and customer engagements',
    icon: 'TrendingUp',
  },
  {
    id: 'd8',
    not: 'A conventional presentation',
    but: 'An immersive, interactive product experience you are living right now',
    icon: 'Sparkles',
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    title: 'Assist',
    subtitle: 'Natural-language SAP queries',
    capabilities: [
      'Natural-language SAP queries',
      'Batch-job status and history',
      'Business-document lookup',
      'Incident search and retrieval',
      'Documentation discovery',
    ],
    color: '#5DA9FF',
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    title: 'Investigate',
    subtitle: 'Root-cause analysis and correlation',
    capabilities: [
      'Log correlation and analysis',
      'Root-cause recommendations',
      'Similar-incident retrieval',
      'Business-impact analysis',
      'Cross-system comparison',
    ],
    color: '#A01441',
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    title: 'Act',
    subtitle: 'Governed actions and automation',
    capabilities: [
      'Incident creation with approval',
      'Support-team notification',
      'Operational report generation',
      'Controlled workflow execution',
      'Approval-based SAP actions',
    ],
    color: '#F5B942',
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    title: 'Orchestrate',
    subtitle: 'Multi-agent collaboration',
    capabilities: [
      'Multi-agent collaboration',
      'Proactive anomaly detection',
      'Event-driven recommendations',
      'Cross-process resolution',
      'End-to-end operational automation',
    ],
    color: '#39C985',
  },
  {
    id: 'phase-5',
    phase: 'Phase 5',
    title: 'Autonomous, but Governed',
    subtitle: 'Policy-controlled intelligence',
    capabilities: [
      'Policy-controlled autonomous actions',
      'Continuous operational intelligence',
      'Predictive issue prevention',
      'Self-healing recommendations',
      'Human oversight for high-impact decisions',
    ],
    color: '#8B5CF6',
  },
];
